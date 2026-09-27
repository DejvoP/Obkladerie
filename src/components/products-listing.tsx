"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  catalog as mockCatalog,
  categoryMeta,
  getProductSlug,
  products as mockProducts,
  type CategorySlug,
  type Product,
} from "@/lib/content";
import {
  countActiveFilters,
  createDefaultFilters,
  filterProducts,
  ProductFilterModal,
  type FilterValues,
} from "@/components/product-filter-modal";

type CatalogChip = {
  title: string;
  slug: string;
  subtitle?: string;
};

type ProductsListingProps = {
  lockedCategory?: CategorySlug;
  products?: Product[];
  categories?: CatalogChip[];
};

export function ProductsListing({
  lockedCategory,
  products = mockProducts,
  categories = mockCatalog,
}: ProductsListingProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(() =>
    createDefaultFilters(products),
  );

  useEffect(() => {
    setFilters((prev) => {
      const active = countActiveFilters(prev, products);
      return active > 0 ? prev : createDefaultFilters(products);
    });
  }, [products]);

  const title = lockedCategory
    ? (categoryMeta[lockedCategory]?.title ??
      categories.find((item) => item.slug === lockedCategory)?.title ??
      lockedCategory)
    : "Všechny produkty";
  const subtitle = lockedCategory
    ? (categoryMeta[lockedCategory]?.description ??
      categories.find((item) => item.slug === lockedCategory)?.subtitle ??
      "")
    : "Obklady, dlažby a doplňky na jednom místě";

  const filtered = useMemo(() => {
    const base = lockedCategory
      ? products.filter((product) => product.category === lockedCategory)
      : products;
    return filterProducts(base, filters);
  }, [lockedCategory, filters, products]);

  const activeFilters = countActiveFilters(filters, products);

  const resetFilters = () => setFilters(createDefaultFilters(products));

  return (
    <section className="bg-white pt-28 pb-20">
      <div className="mx-auto w-full max-w-content px-5 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <a href="/" className="transition hover:text-charcoal">
            Domů
          </a>
          <span>/</span>
          <a href="/produkty" className="transition hover:text-charcoal">
            Produkty
          </a>
          {lockedCategory ? (
            <>
              <span>/</span>
              <span className="text-charcoal">{title}</span>
            </>
          ) : null}
        </div>

        <div>
          <h1 className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <p className="text-base text-muted">{subtitle}</p>
            <p className="shrink-0 text-sm text-muted sm:text-base">
              Zobrazeno {filtered.length} produktů
              {activeFilters > 0
                ? ` · ${activeFilters} ${activeFilters === 1 ? "filtr" : "filtry"}`
                : ""}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            <a
              href="/produkty"
              className={`border px-3 py-2 text-sm transition ${
                !lockedCategory
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-line bg-white text-charcoal hover:border-charcoal"
              }`}
            >
              Všechny
            </a>
            {categories.map((item) => (
              <a
                key={item.slug}
                href={`/produkty/${item.slug}`}
                className={`border px-3 py-2 text-sm transition ${
                  item.slug === lockedCategory
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-line bg-white text-charcoal hover:border-charcoal"
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className={`inline-flex w-fit cursor-pointer items-center gap-2 self-end border px-4 py-2 text-sm font-medium transition sm:self-auto ${
              filterOpen || activeFilters > 0
                ? "border-charcoal bg-charcoal text-white"
                : "border-charcoal bg-white text-charcoal hover:bg-charcoal hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filtr
            {activeFilters > 0 ? (
              <span className="grid size-5 place-items-center bg-accent text-xs text-charcoal">
                {activeFilters}
              </span>
            ) : null}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 border border-line bg-soft px-6 py-12 text-center">
            <p className="font-serif text-3xl text-charcoal">Nic nenalezeno</p>
            <p className="mt-3 text-sm text-muted">
              Zkus jiný filtr nebo se podívej na celý katalog.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex bg-charcoal px-5 py-3 text-sm font-medium text-white transition hover:bg-charcoal/90"
              >
                Zrušit filtry
              </button>
              <a
                href="/produkty"
                className="inline-flex border border-charcoal px-5 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
              >
                Všechny produkty
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {filtered.map((product) => (
              <a
                key={product.id ?? getProductSlug(product)}
                href={`/produkty/${getProductSlug(product)}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-soft">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h2 className="mt-4 text-base font-medium text-charcoal sm:text-lg">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-muted">{product.kind}</p>
                <div className="mt-3 flex gap-1.5">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="size-3.5 border border-line"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm font-medium text-charcoal sm:text-base">
                  {product.price}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

      <ProductFilterModal
        open={filterOpen}
        initial={filters}
        products={products}
        onClose={() => setFilterOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setFilterOpen(false);
        }}
      />
    </section>
  );
}
