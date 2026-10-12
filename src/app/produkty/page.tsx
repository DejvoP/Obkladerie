import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ProductsListing } from "@/components/products-listing";
import { SiteShell } from "@/components/site-shell";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";
import { breadcrumbJsonLd, buildMetadata, collectionJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

const TITLE = "Všechny produkty - Obkladérie";
const DESCRIPTION =
  "Kompletní nabídka obkladů, dlažeb a doplňků Obkladérie.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/produkty",
});

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <SiteShell solidHeader>
      <JsonLd
        data={[
          collectionJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/produkty",
          }),
          breadcrumbJsonLd([
            { name: "Domů", path: "/" },
            { name: "Produkty", path: "/produkty" },
          ]),
        ]}
      />
      <main>
        <ProductsListing products={products} categories={categories} />
      </main>
    </SiteShell>
  );
}
