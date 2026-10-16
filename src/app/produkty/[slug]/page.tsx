import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductDetail } from "@/components/product-detail";
import { ProductsListing } from "@/components/products-listing";
import { SiteShell } from "@/components/site-shell";
import { getCategoryLabel, getProductSlug, type CategorySlug } from "@/lib/content";
import {
  fetchCategories,
  fetchProductBySlug,
  fetchProducts,
  fetchRelatedProducts,
} from "@/lib/db/catalog";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionJsonLd,
  productJsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);
  if (product) {
    const title = `${product.name} - Obkladerie`;
    const description =
      product.description?.trim() ||
      `${product.kind}. ${product.price}`;
    return buildMetadata({
      title,
      description,
      path: `/produkty/${getProductSlug(product)}`,
      image: product.image,
    });
  }

  const categories = await fetchCategories();
  const category = categories.find((item) => item.slug === slug);
  if (category) {
    return buildMetadata({
      title: `${category.title} - Obkladerie`,
      description: category.subtitle || getCategoryLabel(slug),
      path: `/produkty/${category.slug}`,
      image: category.image || "/hero.png",
    });
  }

  return buildMetadata({
    title: "Produkty - Obkladerie",
    description: "Kompletní nabídka Obkladerie.",
    path: `/produkty/${slug}`,
    noIndex: true,
  });
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
    const categoryTitle =
      product.categoryTitle ?? getCategoryLabel(product.category);
    return (
      <SiteShell solidHeader inquiryProductName={product.name}>
        <JsonLd
          data={[
            productJsonLd(product),
            breadcrumbJsonLd([
              { name: "Domů", path: "/" },
              { name: "Produkty", path: "/produkty" },
              {
                name: categoryTitle,
                path: `/produkty/${product.category}`,
              },
              {
                name: product.name,
                path: `/produkty/${getProductSlug(product)}`,
              },
            ]),
          ]}
        />
        <main>
          <ProductDetail product={product} related={related} />
        </main>
      </SiteShell>
    );
  }

  const category = categories.find((item) => item.slug === slug);
  if (category) {
    const description = category.subtitle || getCategoryLabel(slug);
    return (
      <SiteShell solidHeader>
        <JsonLd
          data={[
            collectionJsonLd({
              name: category.title,
              description,
              path: `/produkty/${category.slug}`,
            }),
            breadcrumbJsonLd([
              { name: "Domů", path: "/" },
              { name: "Produkty", path: "/produkty" },
              {
                name: category.title,
                path: `/produkty/${category.slug}`,
              },
            ]),
          ]}
        />
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
