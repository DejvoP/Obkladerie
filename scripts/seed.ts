import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { createClient } from "@supabase/supabase-js";
import { defaultCategoryTypes } from "../src/lib/category-types";
import {
  catalog,
  getProductSlug,
  products,
} from "../src/lib/content";
import { initialInquiries } from "../src/lib/admin-inquiries";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Chybí env ${name}`);
  return value;
}

function parsePrice(price: string) {
  const match = price.trim().match(/^([\d\s]+)\s*(Kč\/\S+)$/i);
  if (!match) return { amount: 0, unit: "Kč/m²" };
  return {
    amount: Number(match[1].replace(/\s/g, "")),
    unit: match[2],
  };
}

function typeNameFromKind(kind: string) {
  const parts = kind.split("·").map((part) => part.trim());
  return parts.length > 1 ? parts.slice(1).join(" · ") : kind;
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@obkladerie.cz";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "aaaa";

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log("→ Mažu starý katalog…");
  await supabase.from("product_colors").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("product_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("category_types").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("inquiries").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("→ Kategorie…");
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .insert(
      catalog.map((item, index) => ({
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        image_url: item.image,
        sort_order: index,
      })),
    )
    .select("id, slug");

  if (catError || !categories) {
    throw catError ?? new Error("Nepodařilo se vložit kategorie");
  }

  const categoryIdBySlug = Object.fromEntries(
    categories.map((row) => [row.slug, row.id]),
  ) as Record<string, string>;

  console.log("→ Typy kategorií…");
  const typeRows: {
    category_id: string;
    name: string;
    sort_order: number;
  }[] = [];

  for (const [slug, names] of Object.entries(defaultCategoryTypes)) {
    const categoryId = categoryIdBySlug[slug];
    if (!categoryId) continue;
    names.forEach((name, index) => {
      typeRows.push({
        category_id: categoryId,
        name,
        sort_order: index,
      });
    });
  }

  const { data: types, error: typeError } = await supabase
    .from("category_types")
    .insert(typeRows)
    .select("id, category_id, name");

  if (typeError || !types) {
    throw typeError ?? new Error("Nepodařilo se vložit typy");
  }

  const typeIdByKey = Object.fromEntries(
    types.map((row) => [`${row.category_id}::${row.name}`, row.id]),
  );

  console.log("→ Produkty…");
  for (const product of products) {
    const categoryId = categoryIdBySlug[product.category];
    if (!categoryId) continue;

    const typeName = typeNameFromKind(product.kind);
    const typeId = typeIdByKey[`${categoryId}::${typeName}`] ?? null;
    const { amount, unit } = parsePrice(product.price);

    const { data: created, error: productError } = await supabase
      .from("products")
      .insert({
        slug: getProductSlug(product),
        name: product.name,
        description: "",
        kind: product.kind,
        category_id: categoryId,
        type_id: typeId,
        price_amount: amount,
        price_unit: unit,
        featured: Boolean(product.featured),
      })
      .select("id")
      .single();

    if (productError || !created) {
      console.error(product.name, productError);
      continue;
    }

    await supabase.from("product_images").insert({
      product_id: created.id,
      url: product.image,
      sort_order: 0,
    });

    if (product.colors.length) {
      await supabase.from("product_colors").insert(
        product.colors.map((hex, index) => ({
          product_id: created.id,
          hex,
          sort_order: index,
        })),
      );
    }
  }

  console.log("→ Poptávky…");
  await supabase.from("inquiries").insert(
    initialInquiries.map((item) => ({
      name: item.name,
      email: item.email,
      company: item.company ?? null,
      message: item.message,
      status: item.status,
      is_new: item.isNew,
      created_at: item.createdAt,
    })),
  );

  console.log("→ Admin uživatel…");
  const { data: listed } = await supabase.auth.admin.listUsers({ perPage: 200 });
  const existing = listed?.users.find((user) => user.email === adminEmail);

  if (existing) {
    await supabase.auth.admin.updateUserById(existing.id, {
      password: adminPassword,
      email_confirm: true,
    });
    console.log(`  aktualizován ${adminEmail}`);
  } else {
    const { error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { username: "admin" },
    });
    if (error) throw error;
    console.log(`  vytvořen ${adminEmail}`);
  }

  console.log("✓ Seed hotov.");
  console.log(`  Login: username "admin" / heslo "${adminPassword}"`);
  console.log(`  (email v Supabase: ${adminEmail})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
