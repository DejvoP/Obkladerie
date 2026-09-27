import type { CategorySlug, Product } from "@/lib/content";

export type DbCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image_url: string;
  sort_order: number;
  show_in_catalog?: boolean;
};

export type DbCategoryType = {
  id: string;
  category_id: string;
  name: string;
  sort_order: number;
};

export type DbProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: string;
  category_id: string;
  type_id: string | null;
  price_amount: number | string;
  price_unit: string;
  featured: boolean;
  format?: string | null;
  product_images?: { url: string; sort_order: number }[];
  product_colors?: {
    hex: string;
    name: string | null;
    sort_order: number;
    image_url?: string | null;
  }[];
  categories?:
    | { slug: string; title: string }
    | { slug: string; title: string }[]
    | null;
};

export type CatalogItem = {
  id?: string;
  title: string;
  slug: CategorySlug | string;
  subtitle: string;
  image: string;
  types?: string[];
  showInCatalog?: boolean;
};

export function formatPrice(amount: number | string, unit: string) {
  const value = typeof amount === "string" ? Number(amount) : amount;
  const formatted = new Intl.NumberFormat("cs-CZ", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${formatted} ${unit}`;
}

export function mapDbProduct(row: DbProduct): Product & {
  id: string;
  slug: string;
  description: string;
  images: string[];
} {
  const images = [...(row.product_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.url);
  const colorRows = [...(row.product_colors ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const colorItems = colorRows.map((c) => ({
    hex: c.hex,
    name: c.name,
    imageUrl: c.image_url ?? null,
  }));
  const colors = colorItems.map((c) => c.hex);

  const categoryRel = Array.isArray(row.categories)
    ? row.categories[0]
    : row.categories;
  const categorySlug = (categoryRel?.slug ?? "obklady") as CategorySlug;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    kind: row.kind,
    category: categorySlug,
    categoryTitle: categoryRel?.title,
    image: images[0] ?? "",
    images,
    price: formatPrice(row.price_amount, row.price_unit),
    colors,
    colorItems,
    format: row.format ?? null,
    featured: row.featured,
  };
}

export function mapDbCategory(row: DbCategory): CatalogItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle,
    image: row.image_url,
    showInCatalog: Boolean(row.show_in_catalog),
  };
}
