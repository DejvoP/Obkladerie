import { createClient } from "@/lib/supabase/client";
import { slugifyProductName, type CategorySlug } from "@/lib/content";

const KIND_PREFIX: Record<string, string> = {
  obklady: "Obklad",
  dlazby: "Dlažba",
  venkovni: "Venkovní dlažba",
  doplnky: "Doplněk",
};

export type AdminProductInput = {
  id?: string;
  name: string;
  description: string;
  categorySlug: string;
  typeName: string;
  priceAmount: number;
  priceUnit: string;
  featured: boolean;
  format?: string | null;
  colors: { hex: string; name: string | null; imageUrl?: string | null }[];
  /** Existing remote URLs to keep */
  existingImageUrls: string[];
  /** New local files to upload */
  newImageFiles: File[];
};

export type AdminCategoryInput = {
  id?: string;
  title: string;
  slug?: string;
  subtitle: string;
  types: string[];
  showInCatalog: boolean;
  existingImageUrl?: string | null;
  newImageFile?: File | null;
};

function friendlyDbError(message: string) {
  if (
    message.includes("categories_slug_key") ||
    (message.includes("duplicate key") && message.includes("slug"))
  ) {
    return "Kategorie s tímto názvem už existuje. Uprav existující místo vytváření nové.";
  }
  if (
    message.includes("foreign key") ||
    message.includes("violates foreign key constraint")
  ) {
    return "Kategorii nejde smazat, dokud v ní jsou produkty. Nejdřív produkty přesuň nebo smaž.";
  }
  return message;
}

type SlugClient = ReturnType<typeof createClient>;

async function ensureUniqueCategorySlug(
  supabase: SlugClient,
  baseSlug: string,
  excludeId?: string,
) {
  const root = baseSlug || "kategorie";
  for (let n = 0; n < 50; n += 1) {
    const candidate = n === 0 ? root : `${root}-${n + 1}`;
    let query = supabase
      .from("categories")
      .select("id")
      .eq("slug", candidate);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return candidate;
  }
  throw new Error("Nepodařilo se vytvořit unikátní adresu kategorie.");
}

/** If a category was renamed but kept an old slug, free that slug for reuse. */
async function healStaleCategorySlug(
  supabase: SlugClient,
  wantedSlug: string,
  excludeId?: string,
) {
  let query = supabase
    .from("categories")
    .select("id, title, slug")
    .eq("slug", wantedSlug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data: occupant } = await query.maybeSingle();
  if (!occupant) return;

  const rightful = slugifyProductName(occupant.title);
  if (!rightful || rightful === occupant.slug) return;

  const healed = await ensureUniqueCategorySlug(
    supabase,
    rightful,
    occupant.id,
  );
  const { error } = await supabase
    .from("categories")
    .update({ slug: healed })
    .eq("id", occupant.id);
  if (error) throw new Error(friendlyDbError(error.message));
}

function composeKind(categorySlug: string, typeName: string) {
  const prefix = KIND_PREFIX[categorySlug] ?? "Produkt";
  return `${prefix} · ${typeName}`;
}

export async function uploadMedia(file: File, folder: string) {
  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveProduct(input: AdminProductInput) {
  const supabase = createClient();

  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", input.categorySlug)
    .maybeSingle();
  if (catError || !category) {
    throw new Error("Kategorie nebyla nalezena.");
  }

  const { data: typeRow } = await supabase
    .from("category_types")
    .select("id")
    .eq("category_id", category.id)
    .eq("name", input.typeName)
    .maybeSingle();

  const uploaded = await Promise.all(
    input.newImageFiles.map((file) => uploadMedia(file, "products")),
  );
  const imageUrls = [...input.existingImageUrls, ...uploaded].filter(Boolean);
  if (imageUrls.length === 0) {
    throw new Error("Přidej alespoň jeden obrázek.");
  }

  if (input.featured) {
    let query = supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("featured", true);
    if (input.id) {
      query = query.neq("id", input.id);
    }
    const { count, error: countError } = await query;
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) >= 5) {
      throw new Error(
        "Ve Vybraných produktech může být maximálně 5 produktů. Nejdřív u jiného odškrtni „Vybraný produkt“.",
      );
    }
  }

  const slug = slugifyProductName(input.name);
  const kind = composeKind(input.categorySlug, input.typeName);
  const payload = {
    slug,
    name: input.name.trim(),
    description: input.description.trim(),
    kind,
    category_id: category.id,
    type_id: typeRow?.id ?? null,
    price_amount: input.priceAmount,
    price_unit: input.priceUnit,
    featured: input.featured,
    format: input.format?.trim() || null,
    updated_at: new Date().toISOString(),
  };

  let productId = input.id;

  if (productId) {
    const { error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", productId);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select("id")
      .single();
    if (error || !data) throw new Error(error?.message ?? "Uložení selhalo.");
    productId = data.id;
  }

  await supabase.from("product_images").delete().eq("product_id", productId);
  await supabase.from("product_colors").delete().eq("product_id", productId);

  const { error: imagesError } = await supabase.from("product_images").insert(
    imageUrls.map((url, index) => ({
      product_id: productId,
      url,
      sort_order: index,
    })),
  );
  if (imagesError) throw new Error(imagesError.message);

  if (input.colors.length) {
    const { error: colorsError } = await supabase.from("product_colors").insert(
      input.colors.map((color, index) => ({
        product_id: productId,
        hex: color.hex,
        name: color.name,
        image_url:
          color.imageUrl ??
          imageUrls[index] ??
          imageUrls[0] ??
          null,
        sort_order: index,
      })),
    );
    if (colorsError) throw new Error(colorsError.message);
  }

  return {
    id: productId as string,
    slug,
    name: payload.name,
    description: payload.description,
    kind,
    categorySlug: input.categorySlug,
    imageUrls,
    priceAmount: input.priceAmount,
    priceUnit: input.priceUnit,
    featured: input.featured,
    format: payload.format,
    colors: input.colors.map((c) => c.hex),
    colorItems: input.colors.map((color, index) => ({
      hex: color.hex,
      name: color.name,
      imageUrl: color.imageUrl ?? imageUrls[index] ?? imageUrls[0] ?? null,
    })),
  };
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function saveCategory(input: AdminCategoryInput) {
  const supabase = createClient();
  const baseSlug = slugifyProductName(input.title);
  if (!baseSlug) {
    throw new Error("Zadej platný název kategorie.");
  }

  let imageUrl = input.existingImageUrl ?? "";
  if (input.newImageFile) {
    imageUrl = await uploadMedia(input.newImageFile, "categories");
  }
  if (!imageUrl) {
    throw new Error("Přidej obrázek kategorie.");
  }

  // Free slug if another category was renamed but still holds this slug
  await healStaleCategorySlug(supabase, baseSlug, input.id);

  // Same title already taken by another category?
  {
    let query = supabase
      .from("categories")
      .select("id, title")
      .eq("slug", baseSlug);
    if (input.id) query = query.neq("id", input.id);
    const { data: sameName } = await query.maybeSingle();
    if (sameName && slugifyProductName(sameName.title) === baseSlug) {
      throw new Error(
        `Kategorie „${sameName.title}“ už existuje. Otevři ji v seznamu a uprav, místo vytváření nové.`,
      );
    }
  }

  const slug = await ensureUniqueCategorySlug(
    supabase,
    baseSlug,
    input.id,
  );

  if (input.showInCatalog) {
    let query = supabase
      .from("categories")
      .select("id", { count: "exact", head: true })
      .eq("show_in_catalog", true);
    if (input.id) {
      query = query.neq("id", input.id);
    }
    const { count, error: countError } = await query;
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) >= 4) {
      throw new Error(
        "Na úvodce ve Vybraných kategoriích můžou být maximálně 4 kategorie. Nejdřív u jiné odškrtni „Vybrané kategorie“.",
      );
    }
  }

  const payload = {
    slug,
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    image_url: imageUrl,
    show_in_catalog: input.showInCatalog,
  };

  let categoryId = input.id;

  if (categoryId) {
    const { error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", categoryId);
    if (error) throw new Error(friendlyDbError(error.message));
  } else {
    const { data, error } = await supabase
      .from("categories")
      .insert(payload)
      .select("id")
      .single();
    if (error || !data) {
      throw new Error(
        friendlyDbError(error?.message ?? "Uložení selhalo."),
      );
    }
    categoryId = data.id;
  }

  const { data: existingTypes } = await supabase
    .from("category_types")
    .select("id, name")
    .eq("category_id", categoryId);

  const wanted = input.types.map((name) => name.trim()).filter(Boolean);
  const existingNames = new Set((existingTypes ?? []).map((t) => t.name));

  const toDelete = (existingTypes ?? []).filter(
    (t) => !wanted.includes(t.name),
  );
  if (toDelete.length) {
    await supabase
      .from("category_types")
      .delete()
      .in(
        "id",
        toDelete.map((t) => t.id),
      );
  }

  const toInsert = wanted
    .filter((name) => !existingNames.has(name))
    .map((name, index) => ({
      category_id: categoryId,
      name,
      sort_order: index,
    }));

  if (toInsert.length) {
    const { error } = await supabase.from("category_types").insert(toInsert);
    if (error) throw new Error(error.message);
  }

  // Refresh sort_order for remaining
  for (let index = 0; index < wanted.length; index += 1) {
    await supabase
      .from("category_types")
      .update({ sort_order: index })
      .eq("category_id", categoryId)
      .eq("name", wanted[index]);
  }

  return { id: categoryId as string, slug, imageUrl };
}

export async function deleteCategory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(friendlyDbError(error.message));
}

export async function markInquiryDone(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status: "done", is_new: false })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function markInquiriesDone(ids: string[]) {
  if (!ids.length) return;
  const supabase = createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status: "done", is_new: false })
    .in("id", ids);
  if (error) throw new Error(error.message);
}

export async function markInquiriesSeen(ids: string[]) {
  if (!ids.length) return;
  const supabase = createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ is_new: false })
    .in("id", ids)
    .eq("is_new", true);
  if (error) throw new Error(error.message);
}

export async function deleteInquiry(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteInquiries(ids: string[]) {
  if (!ids.length) return;
  const supabase = createClient();
  const { error } = await supabase.from("inquiries").delete().in("id", ids);
  if (error) throw new Error(error.message);
}

export async function fetchCategoryTypesForAdmin(categorySlug: string) {
  const supabase = createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .maybeSingle();
  if (!category) return [];

  const { data } = await supabase
    .from("category_types")
    .select("name")
    .eq("category_id", category.id)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => row.name as string);
}

export type { CategorySlug };
