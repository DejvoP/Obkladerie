"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { getCategoryTypes } from "@/lib/category-types";
import {
  catalog,
  type CategorySlug,
  type Product,
} from "@/lib/content";
import { deleteProduct, saveProduct } from "@/lib/db/admin-client";
import type { CatalogItem } from "@/lib/db/types";

const COLOR_NAME_BY_HEX: Record<string, string> = {
  "#F5F1EC": "Krémová",
  "#E8E2DA": "Písková",
  "#C9B29A": "Travertin",
  "#B8956A": "Dub",
  "#8A7F72": "Hnědošedá",
  "#6F6F6F": "Šedá",
  "#4A4A4A": "Grafit",
  "#1F1F1F": "Antracit",
  "#E8E8E8": "Světle šedá",
  "#9A9A9A": "Stříbrná",
  "#C4785A": "Terakota",
  "#7A5C3E": "Ořech",
  "#D9C3A5": "Béžová",
  "#5C5C5C": "Beton",
  "#F0E6D4": "Vanilka",
  "#2B2B2B": "Černá",
  "#D6D2CD": "Hedvábná",
  "#D4C4B0": "Lněná",
  "#A89078": "Mocca",
  "#B8A99A": "Kámen",
  "#2A2A2A": "Tmavý antracit",
  "#F7F4EF": "Alabastr",
  "#E0D8CE": "Linen",
  "#3D3D3D": "Tmavý beton",
  "#EDE6DC": "Slonovina",
  "#C2B8AA": "Taupe",
  "#B0B0B0": "Popel",
  "#8B4A32": "Cihla",
  "#8E8E8E": "Střední šedá",
  "#5A5A5A": "Břidlice",
  "#F3EDE4": "Perleť",
  "#D2C6B6": "Kašmír",
  "#C8C4BE": "Mlha",
  "#8F8A84": "Šedohnědá",
  "#B89A7A": "Karamel",
  "#7A6248": "Kaštan",
  "#D0D0D0": "Platina",
  "#7E7E7E": "Ocel",
  "#A68B6A": "Písek",
  "#6E6E6E": "Kouř",
  "#3F3F3F": "Uhel",
  "#F5F5F5": "Bílá",
  "#C9C9C9": "Světlý kámen",
  "#8B6B4A": "Teak",
  "#5C4030": "Eben",
  "#E6E1DA": "Křída",
  "#AFA8A0": "Šedobéžová",
  "#E8DFD2": "Mandlová",
  "#B7AA98": "Jíl",
  "#6A6A6A": "Žula",
  "#3A3A3A": "Čedič",
  "#D2C0A8": "Sláma",
  "#9A8268": "Cork",
  "#C0C0C0": "Chrom",
  "#8A8A8A": "Nerez",
};

const POPULAR_COLORS = [
  "#C9B29A",
  "#8A7F72",
  "#F5F1EC",
  "#D6D2CD",
  "#6F6F6F",
  "#1F1F1F",
  "#E8E2DA",
  "#B8956A",
  "#5C5C5C",
  "#C4785A",
] as const;

function getColorName(hex: string) {
  return COLOR_NAME_BY_HEX[hex.toUpperCase()] ?? "Vlastní";
}

function formatKind(kind: string) {
  const parts = kind.split("·").map((part) => part.trim());
  return parts.length > 1 ? parts.slice(1).join(" · ") : kind;
}

function normalizeHex(value: string) {
  const next = value.trim().toUpperCase();
  if (/^#[0-9A-F]{6}$/.test(next)) return next;
  if (/^[0-9A-F]{6}$/.test(next)) return `#${next}`;
  return null;
}

const PRICE_UNITS = ["Kč/m²", "Kč/m³", "Kč/ks", "Kč/m", "Kč/kg"] as const;
type PriceUnit = (typeof PRICE_UNITS)[number];
const MAX_IMAGES = 3;

function parsePrice(price: string): { amount: string; unit: PriceUnit } {
  const match = price.trim().match(/^([\d\s]+)\s*(Kč\/\S+)$/i);
  if (!match) return { amount: "", unit: "Kč/m²" };
  const unit = match[2] as PriceUnit;
  return {
    amount: match[1].replace(/\s/g, ""),
    unit: PRICE_UNITS.includes(unit) ? unit : "Kč/m²",
  };
}

type AdminProductPanelProps = {
  open: boolean;
  product?: Product | null;
  categories?: CatalogItem[];
  typesByCategory?: Record<string, string[]>;
  featuredSelectedCount?: number;
  onClose: () => void;
  onSaved?: (product: Product) => void;
  onDeleted?: (id: string) => void;
};

export function AdminProductPanel({
  open,
  product = null,
  categories = catalog,
  typesByCategory,
  featuredSelectedCount = 0,
  onClose,
  onSaved,
  onDeleted,
}: AdminProductPanelProps) {
  const titleId = useId();
  const isEdit = Boolean(product);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<CategorySlug>("obklady");
  const [surface, setSurface] = useState("");
  const [description, setDescription] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const [priceUnit, setPriceUnit] = useState<PriceUnit>("Kč/m²");
  const [images, setImages] = useState<{ preview: string; file: File | null }[]>(
    [],
  );
  const [colors, setColors] = useState<string[]>([]);
  const [colorDraft, setColorDraft] = useState("#C9B29A");
  const [customColorName, setCustomColorName] = useState("");
  const [featured, setFeatured] = useState(false);
  const [format, setFormat] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resolveTypes = (slug: string) =>
    typesByCategory?.[slug] ?? getCategoryTypes(slug);

  const typeOptions = resolveTypes(category);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    setImages((prev) => {
      for (const item of prev) {
        if (item.preview.startsWith("blob:")) URL.revokeObjectURL(item.preview);
      }
      return [];
    });

    setError(null);
    setSaving(false);

    if (product) {
      const parsed = parsePrice(product.price);
      const nextCategory = product.category;
      const options = resolveTypes(nextCategory);
      const kind = formatKind(product.kind);
      setName(product.name);
      setCategory(nextCategory);
      setSurface(options.includes(kind) ? kind : (options[0] ?? ""));
      setDescription(product.description ?? "");
      setPriceAmount(parsed.amount);
      setPriceUnit(parsed.unit);
      setColors(product.colors.map((color) => color.toUpperCase()));
      setColorDraft(product.colors[0]?.toUpperCase() ?? "#C9B29A");
      setCustomColorName("");
      setFeatured(Boolean(product.featured));
      setFormat(product.format ?? "");
      const existingImages =
        product.images?.length
          ? product.images
          : product.image
            ? [product.image]
            : [];
      setImages(existingImages.map((url) => ({ preview: url, file: null })));
      return;
    }

    const defaultCategory = (categories[0]?.slug as CategorySlug) ?? "obklady";
    const options = resolveTypes(defaultCategory);
    setName("");
    setCategory(defaultCategory);
    setSurface(options[0] ?? "");
    setDescription("");
    setPriceAmount("");
    setPriceUnit("Kč/m²");
    setColors([]);
    setColorDraft("#C9B29A");
    setCustomColorName("");
    setFeatured(false);
    setFormat("");
  }, [open, product, categories, typesByCategory]);

  useEffect(() => {
    if (!open) return;
    const options = resolveTypes(category);
    setSurface((prev) =>
      options.includes(prev) ? prev : (options[0] ?? ""),
    );
  }, [category, open, typesByCategory]);

  const addImages = (files: FileList | null) => {
    if (!files?.length) return;
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;

    const next = [...files].slice(0, remaining).map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...next]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      if (target?.preview.startsWith("blob:")) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const toggleColor = (color: string) => {
    const next = color.toUpperCase();
    setColors((prev) =>
      prev.includes(next)
        ? prev.filter((item) => item !== next)
        : [...prev, next],
    );
    setColorDraft(next);
  };

  const addCustomColor = () => {
    const next = normalizeHex(colorDraft);
    const label = customColorName.trim();
    if (!next || !label) return;
    COLOR_NAME_BY_HEX[next] = label;
    setColors((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setCustomColorName("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    if (colors.length === 0 || !priceAmount.trim()) {
      setError("Doplň cenu a alespoň jednu barvu.");
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setError("Popis musí mít alespoň 20 znaků.");
      return;
    }
    if (images.length === 0) {
      setError("Přidej alespoň jeden obrázek.");
      return;
    }
    if (!surface) {
      setError("Vyber typ produktu.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const amount = Number(priceAmount.replace(/\s/g, ""));
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Zadej platnou cenu.");
      }

      const existingImageUrls = images
        .filter((item) => !item.file)
        .map((item) => item.preview);
      const newImageFiles = images
        .map((item) => item.file)
        .filter((file): file is File => Boolean(file));

      const colorPayload = colors.map((hex, index) => ({
        hex,
        name: COLOR_NAME_BY_HEX[hex] ?? null,
        imageUrl:
          [...images]
            .map((item) => item.preview)
            .filter(Boolean)[index] ??
          images[0]?.preview ??
          null,
      }));

      const saved = await saveProduct({
        id: product?.id,
        name: name.trim(),
        description: description.trim(),
        categorySlug: category,
        typeName: surface,
        priceAmount: amount,
        priceUnit,
        featured,
        format: format.trim() || null,
        colors: colorPayload,
        existingImageUrls,
        newImageFiles,
      });

      onSaved?.({
        id: saved.id,
        slug: saved.slug,
        name: saved.name,
        description: saved.description,
        kind: saved.kind,
        category: saved.categorySlug as CategorySlug,
        image: saved.imageUrls[0] ?? "",
        images: saved.imageUrls,
        price: `${new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(saved.priceAmount)} ${saved.priceUnit}`,
        colors: saved.colors,
        colorItems: saved.colorItems,
        format: saved.format,
        featured: saved.featured,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Uložení selhalo.");
      setSaving(false);
      return;
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!product?.id || saving) return;
    if (!window.confirm("Opravdu chceš produkt odebrat?")) return;

    setSaving(true);
    setError(null);
    try {
      await deleteProduct(product.id);
      onDeleted?.(product.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Smazání selhalo.");
      setSaving(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Zavřít panel"
        onClick={onClose}
        className={`absolute inset-0 bg-charcoal/40 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-white shadow-[-12px_0_40px_rgba(31,31,31,0.08)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id={titleId} className="font-serif text-3xl text-charcoal">
            {isEdit ? "Upravit produkt" : "Nový produkt"}
          </h2>
          <button
            type="button"
            aria-label="Zavřít"
            onClick={onClose}
            className="grid size-10 cursor-pointer place-items-center text-charcoal transition hover:text-muted"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {error ? (
              <p className="border border-red-700/30 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}
            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Název
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Popis
              <textarea
                required
                minLength={20}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Min. 20 znaků — zobrazí se na detailu produktu"
                className="resize-y border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Kategorie
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as CategorySlug)
                }
                className="border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
              >
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Typ
              <select
                required
                value={surface}
                onChange={(event) => setSurface(event.target.value)}
                disabled={typeOptions.length === 0}
                className="border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal disabled:cursor-not-allowed disabled:bg-soft disabled:text-muted"
              >
                {typeOptions.length === 0 ? (
                  <option value="">Nejdřív přidej typy v kategorii</option>
                ) : (
                  typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                )}
              </select>
            </label>

            <div className="flex flex-col gap-2 text-sm text-charcoal">
              <span>Cena</span>
              <div className="flex gap-2">
                <input
                  required
                  inputMode="decimal"
                  value={priceAmount}
                  onChange={(event) =>
                    setPriceAmount(event.target.value.replace(/[^\d\s]/g, ""))
                  }
                  className="min-w-0 flex-1 border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
                />
                <select
                  value={priceUnit}
                  onChange={(event) =>
                    setPriceUnit(event.target.value as PriceUnit)
                  }
                  className="w-[7.5rem] shrink-0 border border-line bg-white px-3 py-3 text-sm outline-none transition focus:border-charcoal"
                >
                  {PRICE_UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Formát (volitelné)
              <select
                value={format}
                onChange={(event) => setFormat(event.target.value)}
                className="border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
              >
                <option value="">Bez formátu</option>
                <option value="30 × 60 cm">30 × 60 cm</option>
                <option value="60 × 60 cm">60 × 60 cm</option>
                <option value="60 × 120 cm">60 × 120 cm</option>
                <option value="120 × 120 cm">120 × 120 cm</option>
              </select>
            </label>

            <div className="flex flex-col gap-3 text-sm text-charcoal">
              <span>Barvy</span>

              <div>
                <p className="mb-2 text-xs tracking-[0.12em] text-muted uppercase">
                  Nejpoužívanější
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_COLORS.map((hex) => {
                    const selected = colors.includes(hex);
                    return (
                      <button
                        key={hex}
                        type="button"
                        title={getColorName(hex)}
                        aria-pressed={selected}
                        onClick={() => toggleColor(hex)}
                        className={`inline-flex cursor-pointer items-center gap-2 border px-2.5 py-2 transition ${
                          selected
                            ? "border-charcoal bg-soft"
                            : "border-line hover:border-charcoal"
                        }`}
                      >
                        <span
                          className="size-4 shrink-0 border border-line"
                          style={{ backgroundColor: hex }}
                        />
                        <span>{getColorName(hex)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs tracking-[0.12em] text-muted uppercase">
                  Vlastní barva
                </p>
                <div className="flex items-stretch gap-2">
                  <input
                    type="color"
                    value={normalizeHex(colorDraft) ?? "#C9B29A"}
                    onChange={(event) =>
                      setColorDraft(event.target.value.toUpperCase())
                    }
                    className="h-[46px] w-[46px] shrink-0 cursor-pointer border border-line bg-white p-1"
                  />
                  <input
                    type="text"
                    value={customColorName}
                    onChange={(event) => setCustomColorName(event.target.value)}
                    placeholder="Název barvy"
                    className="min-w-0 flex-1 border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
                  />
                  <button
                    type="button"
                    onClick={addCustomColor}
                    className="cursor-pointer border border-charcoal px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
                  >
                    Přidat
                  </button>
                </div>
              </div>

              {colors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      title={`Odebrat ${getColorName(color)}`}
                      onClick={() => toggleColor(color)}
                      className="inline-flex cursor-pointer items-center gap-2 border border-charcoal bg-white px-2.5 py-2 transition hover:bg-soft"
                    >
                      <span
                        className="size-4 shrink-0 border border-line"
                        style={{ backgroundColor: color }}
                      />
                      <span>{getColorName(color)}</span>
                      <span aria-hidden className="text-muted">
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">
                  Vyber nejpoužívanější barvu nebo přidej vlastní.
                </p>
              )}
              <p className="text-xs text-muted">
                Pořadí barev = pořadí obrázků (1. barva přepne 1. foto na webu).
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 border border-line bg-soft/60 px-4 py-3 text-sm text-charcoal transition hover:border-charcoal">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-charcoal"
              />
              <span>
                <span className="block font-medium">Vybraný produkt</span>
                <span className="mt-0.5 block text-xs text-muted">
                  Zobrazit v sekci Vybrané produkty na úvodní stránce
                  (max. 5
                  {featuredSelectedCount > 0
                    ? ` · teď ${featuredSelectedCount}/5`
                    : ""}
                  ).
                </span>
              </span>
            </label>

            <div className="flex flex-col gap-3 text-sm text-charcoal">
              <span>Obrázky</span>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: MAX_IMAGES }, (_, index) => {
                  const item = images[index];
                  if (item) {
                    return (
                      <div
                        key={`filled-${index}`}
                        className="relative aspect-square overflow-hidden border border-line bg-soft"
                      >
                        <Image
                          src={item.preview}
                          alt={`Obrázek ${index + 1}`}
                          fill
                          unoptimized={item.preview.startsWith("blob:")}
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1.5 right-1.5 grid size-7 cursor-pointer place-items-center bg-charcoal/75 text-white transition hover:bg-charcoal"
                          aria-label="Odebrat obrázek"
                        >
                          ×
                        </button>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={`empty-${index}`}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={images.length >= MAX_IMAGES}
                      className="aspect-square cursor-pointer border border-dashed border-line bg-soft transition hover:border-charcoal disabled:cursor-default disabled:opacity-50"
                      aria-label="Přidat obrázek"
                    />
                  );
                })}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(event) => {
                  addImages(event.target.files);
                  event.target.value = "";
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= MAX_IMAGES}
                className="inline-flex cursor-pointer items-center justify-center gap-2 border border-charcoal px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:hover:bg-transparent disabled:hover:text-muted"
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
                Přidat
              </button>
            </div>
          </div>

          <div className="flex gap-3 border-t border-line p-6">
            {isEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="cursor-pointer border border-red-700 px-4 py-3.5 text-sm font-medium text-red-700 transition hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Odebrat
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="cursor-pointer border border-charcoal px-4 py-3.5 text-sm font-medium text-charcoal transition hover:bg-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                Zrušit
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="flex-1 cursor-pointer bg-charcoal px-4 py-3.5 text-sm font-medium tracking-[0.12em] text-white uppercase transition hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Ukládám…"
                : isEdit
                  ? "Upravit"
                  : "Uložit produkt"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
