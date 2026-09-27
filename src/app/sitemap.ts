import type { MetadataRoute } from "next";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";
import { getProductSlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/katalog`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/produkty`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/login`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const categoryRoutes = categories.map((item) => ({
    url: `${base}/produkty/${item.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${base}/produkty/${getProductSlug(product)}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
