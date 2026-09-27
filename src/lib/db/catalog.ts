import {
  catalog as mockCatalog,
  getFeaturedProducts as mockFeatured,
  getProductBySlug as mockProductBySlug,
  getRelatedProducts as mockRelated,
  products as mockProducts,
  type CategorySlug,
  type Product,
} from "@/lib/content";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import {
  mapDbCategory,
  mapDbProduct,
  type CatalogItem,
  type DbCategory,
  type DbProduct,
} from "@/lib/db/types";

const productSelect = `
  id, slug, name, description, kind, category_id, type_id,
  price_amount, price_unit, featured, format,
  product_images ( url, sort_order ),
  product_colors ( hex, name, sort_order, image_url ),
  categories ( slug, title )
`;

export type AppProduct = Product & {
  id?: string;
  slug?: string;
  description?: string;
};

function isDbConfigured() {
  return hasSupabaseEnv();
}

function logDbError(scope: string, error: unknown) {
  const message =
    error && typeof error === "object" && "message" in error
      ? String((error as { message: unknown }).message)
      : String(error);
  console.error(`[catalog:${scope}]`, message);
}

export async function fetchCategories(): Promise<CatalogItem[]> {
  if (!isDbConfigured()) return mockCatalog;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select(
        "id, slug, title, subtitle, image_url, sort_order, show_in_catalog, category_types ( name, sort_order )",
      )
      .order("sort_order", { ascending: true });

    if (error) {
      logDbError("categories", error);
      return [];
    }
    if (!data?.length) return [];

    return (
      data as (DbCategory & {
        category_types?: { name: string; sort_order: number }[];
      })[]
    ).map((row) => {
      const types = [...(row.category_types ?? [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((t) => t.name);
      return { ...mapDbCategory(row), types };
    });
  } catch (error) {
    logDbError("categories", error);
    return [];
  }
}

export async function fetchHomeCatalogCategories(
  limit = 4,
): Promise<CatalogItem[]> {
  const all = await fetchCategories();
  const selected = all.filter((item) => item.showInCatalog);
  if (selected.length > 0) return selected.slice(0, limit);
  return all.slice(0, limit);
}

export async function fetchProducts(): Promise<AppProduct[]> {
  if (!isDbConfigured()) return mockProducts;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select(productSelect)
      .order("created_at", { ascending: false });

    if (error) {
      logDbError("products", error);
      return [];
    }
    if (!data?.length) return [];
    return (data as unknown as DbProduct[]).map(mapDbProduct);
  } catch (error) {
    logDbError("products", error);
    return [];
  }
}

export async function fetchProductBySlug(
  slug: string,
): Promise<AppProduct | null> {
  if (!isDbConfigured()) {
    return mockProductBySlug(slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select(productSelect)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      logDbError("productBySlug", error);
      return null;
    }
    if (!data) return null;
    return mapDbProduct(data as unknown as DbProduct);
  } catch (error) {
    logDbError("productBySlug", error);
    return null;
  }
}

export async function fetchProductsByCategory(
  categorySlug: CategorySlug,
): Promise<AppProduct[]> {
  const all = await fetchProducts();
  return all.filter((product) => product.category === categorySlug);
}

export async function fetchFeaturedProducts(
  limit = 5,
): Promise<AppProduct[]> {
  if (!isDbConfigured()) return mockFeatured(limit);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select(productSelect)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logDbError("featured", error);
      return [];
    }
    if (!data?.length) {
      const all = await fetchProducts();
      return all.slice(0, limit);
    }
    return (data as unknown as DbProduct[]).map(mapDbProduct);
  } catch (error) {
    logDbError("featured", error);
    return [];
  }
}

export async function fetchRelatedProducts(
  product: AppProduct,
  limit = 4,
): Promise<AppProduct[]> {
  if (!isDbConfigured()) {
    return mockRelated(product as Product, limit);
  }

  const all = await fetchProductsByCategory(product.category);
  return all.filter((item) => item.name !== product.name).slice(0, limit);
}

export async function fetchCategoryTypes(
  categorySlug: string,
): Promise<string[]> {
  if (!isDbConfigured()) {
    const { getCategoryTypes } = await import("@/lib/category-types");
    return getCategoryTypes(categorySlug);
  }

  try {
    const supabase = await createClient();
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (!category) return [];

    const { data, error } = await supabase
      .from("category_types")
      .select("name, sort_order")
      .eq("category_id", category.id)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data.map((row) => row.name as string);
  } catch {
    return [];
  }
}

export async function fetchInquiries() {
  if (!isDbConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logDbError("inquiries", error);
      return null;
    }
    return data;
  } catch (error) {
    logDbError("inquiries", error);
    return null;
  }
}
