"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdminCategoryPanel,
  type AdminCategoryItem,
} from "@/components/admin-category-panel";
import type { CatalogItem } from "@/lib/db/types";

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("cs")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function toRows(categories: CatalogItem[]): AdminCategoryItem[] {
  return categories.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    subtitle: item.subtitle,
    image: item.image,
    types: item.types ?? [],
    showInCatalog: Boolean(item.showInCatalog),
  }));
}

type AdminCategoriesProps = {
  initialCategories: CatalogItem[];
  productCounts: Record<string, number>;
};

export function AdminCategories({
  initialCategories,
  productCounts,
}: AdminCategoriesProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<AdminCategoryItem[]>(() =>
    toRows(initialCategories),
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<AdminCategoryItem | null>(null);

  useEffect(() => {
    setRows(toRows(initialCategories));
  }, [initialCategories]);

  const catalogSelectedCount = useMemo(
    () => rows.filter((item) => item.showInCatalog).length,
    [rows],
  );

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query.trim());
    if (!needle) return rows;
    return rows.filter((item) => {
      const haystack = normalizeSearch(`${item.title} ${item.subtitle}`);
      return haystack.includes(needle);
    });
  }, [query, rows]);

  const openCreate = () => {
    setEditingCategory(null);
    setPanelOpen(true);
  };

  const openEdit = (category: AdminCategoryItem) => {
    setEditingCategory(category);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingCategory(null);
  };

  const handleSave = (saved: AdminCategoryItem) => {
    setRows((prev) => {
      const index = prev.findIndex(
        (item) =>
          (saved.id && item.id === saved.id) || item.slug === saved.slug,
      );
      if (index === -1) return [...prev, saved];
      const next = [...prev];
      next[index] = saved;
      return next;
    });
    closePanel();
    router.refresh();
  };

  const handleDeleted = (id: string) => {
    setRows((prev) => prev.filter((item) => item.id !== id));
    closePanel();
    router.refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">
          Kategorie
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
          Přidat kategorii
        </button>
      </div>

      <div className="mt-8">
        <label className="sr-only" htmlFor="admin-category-search">
          Hledat kategorie
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
            id="admin-category-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Hledat kategorii…"
            className="w-full border border-line bg-white py-3 pr-4 pl-11 text-sm text-charcoal outline-none transition focus:border-charcoal"
          />
        </div>
      </div>

      <div className="mt-4 border border-line bg-white">
        <div className="hidden grid-cols-[3rem_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_7.5rem] items-center gap-x-6 border-b border-line px-4 py-3 text-xs tracking-[0.12em] text-muted uppercase md:grid">
          <span className="col-span-2">Kategorie</span>
          <span>Typy</span>
          <span>Produkty</span>
          <span className="text-right">Akce</span>
        </div>

        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-sm text-muted">
            Žádné kategorie neodpovídají hledání.
          </p>
        ) : (
          <ul>
            {filtered.map((item) => {
              const typeCount = item.types?.length ?? 0;
              const productCount = productCounts[String(item.slug)] ?? 0;

              return (
                <li
                  key={item.id ?? item.slug}
                  className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 md:grid-cols-[3rem_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_7.5rem] md:gap-x-6"
                >
                  <span className="relative size-10 overflow-hidden bg-soft md:size-11">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : null}
                  </span>
                  <div className="min-w-0 md:contents">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-charcoal">
                        {item.title}
                        {item.showInCatalog ? (
                          <span className="ml-2 text-xs font-normal tracking-[0.08em] text-muted uppercase">
                            Vybrané
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted md:hidden">
                        Typy {typeCount} · Produkty {productCount}
                      </p>
                    </div>
                    <p className="hidden text-sm text-charcoal md:block">
                      {typeCount}
                    </p>
                    <p className="hidden text-sm text-charcoal md:block">
                      {productCount}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="cursor-pointer justify-self-end border border-charcoal px-3 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
                  >
                    Upravit
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="mt-3 text-sm text-muted">
        Zobrazeno {filtered.length} z {rows.length} kategorií
        {catalogSelectedCount > 0
          ? ` · vybrané na úvodce ${catalogSelectedCount}/4`
          : ""}
      </p>

      <AdminCategoryPanel
        open={panelOpen}
        category={editingCategory}
        catalogSelectedCount={
          editingCategory?.showInCatalog
            ? catalogSelectedCount
            : catalogSelectedCount
        }
        onClose={closePanel}
        onSave={handleSave}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
