"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminProductPanel } from "@/components/admin-product-panel";
import { categoryMeta, type CategorySlug, type Product } from "@/lib/content";
import type { CatalogItem } from "@/lib/db/types";

function formatKind(kind: string) {
  const parts = kind.split("·").map((part) => part.trim());
  return parts.length > 1 ? parts.slice(1).join(" · ") : kind;
}

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("cs")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function categoryLabel(slug: string, categories: CatalogItem[]) {
  const found = categories.find((item) => item.slug === slug);
  if (found) return found.title;
  return categoryMeta[slug as CategorySlug]?.title ?? slug;
}

type AdminProductsProps = {
  initialProducts: Product[];
  categories: CatalogItem[];
};

export function AdminProducts({
  initialProducts,
  categories,
}: AdminProductsProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const typesByCategory = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const cat of categories) {
      map[String(cat.slug)] = cat.types ?? [];
    }
    return map;
  }, [categories]);

  const featuredSelectedCount = useMemo(
    () => products.filter((item) => item.featured).length,
    [products],
  );

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query.trim());
    if (!needle) return products;
    return products.filter((product) => {
      const haystack = normalizeSearch(
        `${product.name} ${product.kind} ${categoryLabel(product.category, categories)} ${product.price}`,
      );
      return haystack.includes(needle);
    });
  }, [query, products, categories]);

  const openCreate = () => {
    setEditingProduct(null);
    setPanelOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingProduct(null);
  };

  const handleSaved = (saved: Product) => {
    setProducts((prev) => {
      if (saved.id) {
        const index = prev.findIndex((item) => item.id === saved.id);
        if (index !== -1) {
          const next = [...prev];
          next[index] = saved;
          return next;
        }
      }
      const byName = prev.findIndex((item) => item.name === saved.name);
      if (byName !== -1) {
        const next = [...prev];
        next[byName] = saved;
        return next;
      }
      return [...prev, saved];
    });
    closePanel();
    router.refresh();
  };

  const handleDeleted = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    closePanel();
    router.refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">
          Produkty
        </h1>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex cursor-pointer items-center gap-2 bg-charcoal px-4 py-3 text-sm font-medium text-white transition hover:bg-charcoal/90"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Přidat produkt
        </button>
      </div>

      <div className="mt-8">
        <label className="sr-only" htmlFor="admin-product-search">
          Hledat produkty
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            id="admin-product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Hledat produkt…"
            className="w-full border border-line bg-white py-3 pr-4 pl-11 text-sm text-charcoal outline-none transition focus:border-charcoal"
          />
        </div>
      </div>

      <div className="mt-4 border border-line bg-white">
        <div className="hidden grid-cols-[4rem_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)_7.5rem] items-center gap-x-6 border-b border-line px-4 py-3 text-xs tracking-[0.12em] text-muted uppercase md:grid">
          <span className="col-span-2">Produkty</span>
          <span>Kategorie</span>
          <span>Typ</span>
          <span className="text-right">Cena</span>
          <span className="text-right">Akce</span>
        </div>

        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-sm text-muted">
            Žádné produkty neodpovídají hledání.
          </p>
        ) : (
          <ul>
            {filtered.map((product) => (
              <li
                key={product.id ?? product.name}
                className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 md:grid-cols-[4rem_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)_7.5rem] md:gap-x-6"
              >
                <span className="relative size-14 overflow-hidden bg-soft md:size-16">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </span>
                <div className="min-w-0 md:contents">
                  <p className="truncate text-sm font-medium text-charcoal">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted md:mt-0 md:text-sm md:text-charcoal">
                    {categoryLabel(product.category, categories)}
                  </p>
                  <p className="mt-0.5 hidden truncate text-sm text-muted md:mt-0 md:block">
                    {formatKind(product.kind)}
                  </p>
                  <p className="mt-1 text-sm font-medium text-charcoal md:mt-0 md:text-right">
                    {product.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openEdit(product)}
                  className="cursor-pointer justify-self-end border border-charcoal px-3 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
                >
                  Upravit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-3 text-sm text-muted">
        Zobrazeno {filtered.length} z {products.length} produktů
        {featuredSelectedCount > 0
          ? ` · vybrané na úvodce ${featuredSelectedCount}/5`
          : ""}
      </p>

      <AdminProductPanel
        open={panelOpen}
        product={editingProduct}
        categories={categories}
        typesByCategory={typesByCategory}
        featuredSelectedCount={featuredSelectedCount}
        onClose={closePanel}
        onSaved={handleSaved}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
