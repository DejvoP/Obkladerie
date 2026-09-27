import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { ProductsListing } from "@/components/products-listing";
import { SiteShell } from "@/components/site-shell";
import { getCategoryLabel, type CategorySlug } from "@/lib/content";
import {
  fetchCategories,
  fetchProductBySlug,
  fetchProducts,
  fetchRelatedProducts,
} from "@/lib/db/catalog";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Prefer product over category when slug collides
  const product = await fetchProductBySlug(slug);
  if (product) {
    return {
      title: `${product.name} - Obkladérie`,
      description:
        product.description?.trim() ||
        `${product.kind}. ${product.price}`,
    };
  }

  const categories = await fetchCategories();
  const category = categories.find((item) => item.slug === slug);
  if (category) {
    return {
      title: `${category.title} - Obkladérie`,
      description: category.subtitle || getCategoryLabel(slug),
    };
  }

  return { title: "Produkty - Obkladérie" };
}

export default async function ProductsSlugPage({ params }: Props) {
  const { slug } = await params;

  const [products, categories, product] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchProductBySlug(slug),
  ]);

  if (product) {
    const related = await fetchRelatedProducts(product, 4);
    return (
      <SiteShell solidHeader inquiryProductName={product.name}>
        <main>
          <ProductDetail product={product} related={related} />
        </main>
      </SiteShell>
    );
  }

  const category = categories.find((item) => item.slug === slug);
  if (category) {
    return (
      <SiteShell solidHeader>
        <main>
          <ProductsListing
            lockedCategory={slug as CategorySlug}
            products={products}
            categories={categories}
          />
        </main>
      </SiteShell>
    );
  }

  notFound();
}
