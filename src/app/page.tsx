import { About } from "@/components/about";
import { Catalog } from "@/components/catalog";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { Inspiration } from "@/components/inspiration";
import { SiteShell } from "@/components/site-shell";
import {
  fetchFeaturedProducts,
  fetchHomeCatalogCategories,
} from "@/lib/db/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, featured] = await Promise.all([
    fetchHomeCatalogCategories(4),
    fetchFeaturedProducts(5),
  ]);

  return (
    <SiteShell>
      <main>
        <Hero />
        <Catalog items={categories} />
        <Inspiration />
        <FeaturedProducts products={featured} />
        <About />
      </main>
    </SiteShell>
  );
}
