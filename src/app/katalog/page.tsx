import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon } from "@/components/arrow-icon";
import { SiteShell } from "@/components/site-shell";
import { fetchCategories } from "@/lib/db/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kategorie - Obkladérie",
  description: "Všechny kategorie obkladů, dlažeb a doplňků Obkladérie.",
};

export default async function CatalogPage() {
  const categories = await fetchCategories();

  return (
    <SiteShell solidHeader>
      <main>
        <section className="bg-white pt-28 pb-20">
          <div className="mx-auto w-full max-w-content px-5 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
              <a href="/" className="transition hover:text-charcoal">
                Domů
              </a>
              <span>/</span>
              <span className="text-charcoal">Kategorie</span>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl">
                  Kategorie
                </h1>
                <p className="mt-3 text-base text-muted">
                  Kompletní přehled kategorií z katalogu Obkladérie
                </p>
              </div>
              <p className="shrink-0 text-sm text-muted">
                {categories.length}{" "}
                {categories.length === 1
                  ? "kategorie"
                  : categories.length >= 2 && categories.length <= 4
                    ? "kategorie"
                    : "kategorií"}
              </p>
            </div>

            {categories.length === 0 ? (
              <p className="mt-12 border border-line bg-soft px-6 py-12 text-center text-sm text-muted">
                Zatím tu nejsou žádné kategorie.
              </p>
            ) : (
              <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((item) => (
                  <a
                    key={item.id ?? item.slug}
                    href={`/produkty/${item.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-soft">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">
                        {item.title}
                      </h2>
                      <ArrowIcon className="size-4 shrink-0 text-charcoal transition-transform duration-200 group-hover:-rotate-45 group-hover:text-accent" />
                    </div>
                    {item.subtitle ? (
                      <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                    ) : null}
                  </a>
                ))}
              </div>
            )}

            <div className="mt-14 border-t border-line pt-8">
              <a
                href="/produkty"
                className="inline-flex items-center gap-2 text-base font-medium text-charcoal transition hover:text-accent"
              >
                Zobrazit všechny produkty
                <ArrowIcon className="size-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
