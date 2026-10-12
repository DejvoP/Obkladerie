import type { MetadataRoute } from "next";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";
import { getProductSlug } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/katalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/produkty`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/obchodni-podminky`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/ochrana-osobnich-udaju`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((item) => ({
    url: `${base}/produkty/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => {
    const images = [
      ...(product.images?.length ? product.images : []),
      product.image,
    ].filter(Boolean);

    return {
      url: `${base}/produkty/${getProductSlug(product)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
      images: images.length ? images : undefined,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
