import { About } from "@/components/about";
import { Catalog } from "@/components/catalog";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { Inspiration } from "@/components/inspiration";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import {
  fetchFeaturedProducts,
  fetchHomeCatalogCategories,
} from "@/lib/db/catalog";
import {
  ROOT_DESCRIPTION,
  ROOT_TITLE,
  buildMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  path: "/",
  image: "/hero.png",
});

export default async function Home() {
  const [categories, featured] = await Promise.all([
    fetchHomeCatalogCategories(4),
    fetchFeaturedProducts(5),
  ]);

  return (
    <SiteShell>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
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
