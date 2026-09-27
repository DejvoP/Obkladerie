import Image from "next/image";
import { ArrowIcon } from "@/components/arrow-icon";
import { Reveal } from "@/components/reveal";
import { getProductSlug, type Product } from "@/lib/content";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section id="produkty" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-content px-5 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal as="h2" variant="right" className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl">
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

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <Reveal
              key={product.id ?? getProductSlug(product)}
              variant="up"
              delay={index * 80}
            >
              <a
                href={`/produkty/${getProductSlug(product)}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden border border-line bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 font-serif text-xl text-charcoal sm:text-2xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{product.kind}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
