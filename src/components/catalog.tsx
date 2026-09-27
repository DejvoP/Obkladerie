import Image from "next/image";
import { ArrowIcon } from "@/components/arrow-icon";

type CatalogItem = {
  title: string;
  slug: string;
  subtitle: string;
  image: string;
};

type CatalogProps = {
  items: CatalogItem[];
};

export function Catalog({ items }: CatalogProps) {
  return (
    <section id="katalog" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-content px-5 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl">
            Vybrané kategorie
          </h2>
          <a
            href="/katalog"
            className="inline-flex items-center gap-2 text-base font-medium text-charcoal transition hover:text-accent"
          >
            Zobrazit všechny kategorie
            <ArrowIcon className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/produkty/${item.slug}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-soft">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">
                  {item.title}
                </h3>
                <ArrowIcon className="size-4 shrink-0 text-charcoal transition-transform duration-200 group-hover:-rotate-45 group-hover:text-accent" />
              </div>
              {item.subtitle ? (
                <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
