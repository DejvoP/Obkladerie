import type { Metadata } from "next";
import { ProductsListing } from "@/components/products-listing";
import { SiteShell } from "@/components/site-shell";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Všechny produkty - Obkladérie",
  description: "Kompletní nabídka obkladů, dlažeb a doplňků Obkladérie.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <SiteShell solidHeader>
      <main>
        <ProductsListing products={products} categories={categories} />
      </main>
    </SiteShell>
  );
}
