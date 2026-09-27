"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/content";

export type FilterValues = {
  priceMin: number;
  priceMax: number;
  formats: string[];
  colors: string[];
  designs: string[];
  surfaces: string[];
};

const FORMAT_OPTIONS = [
  {
    value: "30x60",
    label: "30 × 60 cm",
    match: (p: Product) => /30\s*[×x]\s*60/i.test(p.format ?? ""),
  },
  {
    value: "60x60",
    label: "60 × 60 cm",
    match: (p: Product) => /60\s*[×x]\s*60/i.test(p.format ?? ""),
  },
  {
    value: "60x120",
    label: "60 × 120 cm",
    match: (p: Product) => /60\s*[×x]\s*120/i.test(p.format ?? ""),
  },
  {
    value: "120x120",
    label: "120 × 120 cm",
    match: (p: Product) => /120\s*[×x]\s*120/i.test(p.format ?? ""),
  },
] as const;

const DESIGN_OPTIONS = [
  { value: "mramor", label: "Mramor", match: (p: Product) => /mramor/i.test(p.kind) },
  { value: "drevo", label: "Dřevodekor", match: (p: Product) => /dřev/i.test(p.kind) },
  {
    value: "beton",
    label: "Beton",
    match: (p: Product) => /concrete|beton|šed/i.test(`${p.name} ${p.kind}`),
  },
  {
    value: "kamen",
    label: "Kámen",
    match: (p: Product) => /travertin|kámen|stone|basalt/i.test(`${p.name} ${p.kind}`),
  },
  {
    value: "ostatni",
    label: "Ostatní",
    match: (p: Product) =>
      !/mramor|dřev|concrete|beton|travertin|basalt/i.test(`${p.name} ${p.kind}`),
  },
] as const;

const SURFACE_OPTIONS = [
  { value: "matny", label: "Matná", match: (p: Product) => /matný/i.test(p.kind) },
  { value: "leskly", label: "Vysoký lesk", match: (p: Product) => /lesklý/i.test(p.kind) },
  {
    value: "strukturovany",
    label: "Strukturovaná",
    match: (p: Product) => /strukturovaný/i.test(p.kind),
  },
  {
    value: "hedvabny",
    label: "Satinato",
    match: (p: Product) => /hedvábný|satin/i.test(p.kind),
  },
  {
    value: "ostatni",
    label: "Ostatní",
    match: (p: Product) =>
      !/matný|lesklý|strukturovaný|hedvábný|satin/i.test(p.kind),
  },
] as const;

function priceValue(price: string) {
  return Number(price.replace(/[^\d]/g, ""));
}

export function getProductPriceBounds(items: Product[] = products) {
  const prices = items.map((p) => priceValue(p.price)).filter((n) => Number.isFinite(n));
  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function createDefaultFilters(items: Product[] = products): FilterValues {
  const bounds = getProductPriceBounds(items);
  return {
    priceMin: bounds.min,
    priceMax: bounds.max,
    formats: [],
    colors: [],
    designs: [],
    surfaces: [],
  };
}

export function countActiveFilters(
  filters: FilterValues,
  items: Product[] = products,
) {
  const bounds = getProductPriceBounds(items);
  let count = 0;
  if (filters.priceMin > bounds.min || filters.priceMax < bounds.max) count += 1;
  if (filters.formats.length) count += 1;
  if (filters.colors.length) count += 1;
  if (filters.designs.length) count += 1;
  if (filters.surfaces.length) count += 1;
  return count;
}

export function filterProducts(items: Product[], filters: FilterValues) {
  return items.filter((product) => {
    const price = priceValue(product.price);

    if (price < filters.priceMin || price > filters.priceMax) return false;

    if (
      filters.colors.length > 0 &&
      !product.colors.some((color) => filters.colors.includes(color))
    ) {
      return false;
    }

    if (filters.surfaces.length > 0) {
      const match = SURFACE_OPTIONS.some(
        (option) =>
          filters.surfaces.includes(option.value) && option.match(product),
      );
      if (!match) return false;
    }

    if (filters.designs.length > 0) {
      const match = DESIGN_OPTIONS.some(
        (option) =>
          filters.designs.includes(option.value) && option.match(product),
      );
      if (!match) return false;
    }

    if (filters.formats.length > 0) {
      const match = FORMAT_OPTIONS.some(
        (option) =>
          filters.formats.includes(option.value) && option.match(product),
      );
      if (!match) return false;
    }

    return true;
  });
}

type ProductFilterModalProps = {
  open: boolean;
  initial: FilterValues;
  products?: Product[];
  onClose: () => void;
  onApply: (values: FilterValues) => void;
};

type SectionId = "cena" | "format" | "barva" | "design" | "povrch";

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function ProductFilterModal({
  open,
  initial,
  products: catalogProducts = products,
  onClose,
  onApply,
}: ProductFilterModalProps) {
  const titleId = useId();
  const bounds = useMemo(
    () => getProductPriceBounds(catalogProducts),
    [catalogProducts],
  );
  const [draft, setDraft] = useState(initial);
  const [openSections, setOpenSections] = useState<SectionId[]>([]);

  const colorOptions = useMemo(() => {
    const map = new Map<string, number>();
    for (const product of catalogProducts) {
      for (const color of product.colors) {
        map.set(color, (map.get(color) ?? 0) + 1);
      }
    }
    return [...map.entries()].map(([value, count]) => ({ value, count }));
  }, [catalogProducts]);

  const surfaceCounts = useMemo(() => {
    return Object.fromEntries(
      SURFACE_OPTIONS.map((option) => [
        option.value,
        catalogProducts.filter((product) => option.match(product)).length,
      ]),
    ) as Record<string, number>;
  }, [catalogProducts]);

  const designCounts = useMemo(() => {
    return Object.fromEntries(
      DESIGN_OPTIONS.map((option) => [
        option.value,
        catalogProducts.filter((product) => option.match(product)).length,
      ]),
    ) as Record<string, number>;
  }, [catalogProducts]);

  useEffect(() => {
    if (!open) return;
    setDraft(initial);
    setOpenSections([]);
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, initial, onClose]);

  if (!open) return null;

  const toggleSection = (id: SectionId) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const sectionOpen = (id: SectionId) => openSections.includes(id);
  const hasDraftFilters = countActiveFilters(draft) > 0;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-charcoal/45 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[min(90vh,40rem)] w-full max-w-md flex-col border border-line bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id={titleId} className="font-serif text-3xl text-charcoal">
            Filtr
          </h2>
          <button
            type="button"
            aria-label="Zavřít"
            onClick={onClose}
            className="grid size-10 place-items-center text-charcoal transition hover:text-muted"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          <FilterSection
            title="Cena"
            open={sectionOpen("cena")}
            onToggle={() => toggleSection("cena")}
          >
            <div className="space-y-4">
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                value={draft.priceMax}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    priceMax: Math.max(Number(event.target.value), prev.priceMin),
                  }))
                }
                className="filter-range w-full accent-charcoal"
              />
              <div className="flex items-center gap-3">
                <label className="flex flex-1 items-center justify-between gap-2 border border-line bg-soft px-3 py-2.5 text-sm text-charcoal">
                  <span className="shrink-0 text-muted">Kč</span>
                  <span className="sr-only">Cena od</span>
                  <input
                    type="number"
                    min={bounds.min}
                    max={draft.priceMax}
                    value={draft.priceMin}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        priceMin: Math.min(
                          Math.max(Number(event.target.value) || bounds.min, bounds.min),
                          prev.priceMax,
                        ),
                      }))
                    }
                    className="w-full min-w-0 bg-transparent text-right outline-none"
                  />
                </label>
                <span className="text-sm text-muted">až</span>
                <label className="flex flex-1 items-center justify-between gap-2 border border-line bg-soft px-3 py-2.5 text-sm text-charcoal">
                  <span className="shrink-0 text-muted">Kč</span>
                  <span className="sr-only">Cena do</span>
                  <input
                    type="number"
                    min={draft.priceMin}
                    max={bounds.max}
                    value={draft.priceMax}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        priceMax: Math.max(
                          Math.min(Number(event.target.value) || bounds.max, bounds.max),
                          prev.priceMin,
                        ),
                      }))
                    }
                    className="w-full min-w-0 bg-transparent text-right outline-none"
                  />
                </label>
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Formát dlažby"
            open={sectionOpen("format")}
            onToggle={() => toggleSection("format")}
          >
            <div className="flex flex-col gap-3">
              {FORMAT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-sm text-charcoal"
                >
                  <input
                    type="checkbox"
                    checked={draft.formats.includes(option.value)}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        formats: toggleValue(prev.formats, option.value),
                      }))
                    }
                    className="size-4 accent-charcoal"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Barva"
            open={sectionOpen("barva")}
            onToggle={() => toggleSection("barva")}
          >
            <div className="flex flex-wrap gap-2.5">
              {colorOptions.map((option) => {
                const selected = draft.colors.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    title={`${option.value} (${option.count})`}
                    aria-pressed={selected}
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        colors: toggleValue(prev.colors, option.value),
                      }))
                    }
                    className={`size-8 border transition ${
                      selected
                        ? "border-charcoal ring-1 ring-charcoal ring-offset-2"
                        : "border-line hover:border-charcoal"
                    }`}
                    style={{ backgroundColor: option.value }}
                  />
                );
              })}
            </div>
          </FilterSection>

          <FilterSection
            title="Design"
            open={sectionOpen("design")}
            onToggle={() => toggleSection("design")}
          >
            <div className="flex flex-col gap-3">
              {DESIGN_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-sm text-charcoal"
                >
                  <input
                    type="checkbox"
                    checked={draft.designs.includes(option.value)}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        designs: toggleValue(prev.designs, option.value),
                      }))
                    }
                    className="size-4 accent-charcoal"
                  />
                  <span>
                    {option.label}{" "}
                    <span className="text-muted">({designCounts[option.value]})</span>
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Povrchová úprava"
            open={sectionOpen("povrch")}
            onToggle={() => toggleSection("povrch")}
            last
          >
            <div className="flex flex-col gap-3">
              {SURFACE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-sm text-charcoal"
                >
                  <input
                    type="checkbox"
                    checked={draft.surfaces.includes(option.value)}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        surfaces: toggleValue(prev.surfaces, option.value),
                      }))
                    }
                    className="size-4 accent-charcoal"
                  />
                  <span>
                    {option.label}{" "}
                    <span className="text-muted">({surfaceCounts[option.value]})</span>
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        <div className="border-t border-line p-6">
          <div
            className={`flex items-stretch transition-[gap] duration-300 ease-out ${
              hasDraftFilters ? "gap-3" : "gap-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setDraft(createDefaultFilters(catalogProducts))}
              tabIndex={hasDraftFilters ? 0 : -1}
              aria-hidden={!hasDraftFilters}
              className={`overflow-hidden whitespace-nowrap border text-sm font-medium transition-all duration-300 ease-out ${
                hasDraftFilters
                  ? "max-w-[11rem] border-charcoal bg-white px-4 py-3.5 text-charcoal opacity-100 hover:bg-soft"
                  : "max-w-0 border-transparent px-0 py-3.5 opacity-0"
              }`}
            >
              Zrušit filtry
            </button>
            <button
              type="button"
              onClick={() => onApply(draft)}
              className="min-w-0 flex-1 bg-charcoal px-5 py-3.5 text-sm font-medium tracking-[0.14em] text-white uppercase transition-all duration-300 hover:bg-charcoal/90"
            >
              Aplikovat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
  last = false,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "py-5" : "border-b border-line py-5"}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-serif text-xl text-charcoal">{title}</span>
        <span
          className={`relative size-5 text-charcoal transition-transform duration-300 ease-out ${
            open ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden
        >
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`mt-5 transition-opacity duration-300 ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
