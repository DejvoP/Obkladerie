import { ArrowIcon } from "@/components/arrow-icon";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getProductSlug } from "@/lib/content";
import type { Product } from "@/lib/content";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section id="produkty" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-content px-5 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal
            as="h2"
            variant="right"
            className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl"
          >
            Vybrané produkty
          </Reveal>
          <Reveal variant="fade" delay={120}>
            <a
              href="/produkty"
              className="inline-flex items-center gap-2 text-base font-medium text-charcoal transition hover:text-accent"
            >
              Zobrazit všechny produkty
              <ArrowIcon className="size-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <Reveal
              key={product.id ?? getProductSlug(product)}
              variant="up"
              delay={index * 80}
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
