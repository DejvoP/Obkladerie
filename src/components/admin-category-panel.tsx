"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { getCategoryTypes } from "@/lib/category-types";
import type { CategorySlug } from "@/lib/content";
import { deleteCategory, saveCategory } from "@/lib/db/admin-client";

export type AdminCategoryItem = {
  id?: string;
  title: string;
  slug: CategorySlug | string;
  subtitle: string;
  image: string;
  types?: string[];
  showInCatalog?: boolean;
};

type AdminCategoryPanelProps = {
  open: boolean;
  category?: AdminCategoryItem | null;
  catalogSelectedCount?: number;
  onClose: () => void;
  onSave?: (category: AdminCategoryItem) => void;
  onDeleted?: (id: string) => void;
};

export function AdminCategoryPanel({
  open,
  category = null,
  catalogSelectedCount = 0,
  onClose,
  onSave,
  onDeleted,
}: AdminCategoryPanelProps) {
  const titleId = useId();
  const isEdit = Boolean(category);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [typeDraft, setTypeDraft] = useState("");
  const [showInCatalog, setShowInCatalog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    setImageFile(null);
    setImagePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setTypeDraft("");
    setError(null);
    setSaving(false);

    if (category) {
      setName(category.title);
      setDescription(category.subtitle);
      setImagePreview(category.image);
      setTypes(
        category.types ?? getCategoryTypes(String(category.slug)),
      );
      setShowInCatalog(Boolean(category.showInCatalog));
      return;
    }

    setName("");
    setDescription("");
    setTypes([]);
    setShowInCatalog(false);
  }, [open, category]);

  const handleImageChange = (file: File | null) => {
    setImagePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      if (file) return URL.createObjectURL(file);
      return category?.image ?? null;
    });
    setImageFile(file);
  };

  const addType = () => {
    const next = typeDraft.trim();
    if (!next) return;
    setTypes((prev) =>
      prev.some((item) => item.toLocaleLowerCase("cs") === next.toLocaleLowerCase("cs"))
        ? prev
        : [...prev, next],
    );
    setTypeDraft("");
  };

  const removeType = (value: string) => {
    setTypes((prev) => prev.filter((item) => item !== value));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    if (!isEdit && !imageFile && !imagePreview) {
      setError("Přidej obrázek kategorie.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const result = await saveCategory({
        id: category?.id,
        title: name.trim(),
        slug: category?.slug ? String(category.slug) : undefined,
        subtitle: description.trim(),
        types,
        showInCatalog,
        existingImageUrl: imageFile ? null : (imagePreview ?? category?.image),
        newImageFile: imageFile,
      });

      onSave?.({
        id: result.id,
        title: name.trim(),
        slug: result.slug,
        subtitle: description.trim(),
        image: result.imageUrl,
        types,
        showInCatalog,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Uložení selhalo.");
      setSaving(false);
      return;
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!category?.id || saving) return;
    if (!window.confirm("Opravdu chceš kategorii odebrat?")) return;

    setSaving(true);
    setError(null);
    try {
      await deleteCategory(category.id);
      onDeleted?.(category.id);
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
            {isEdit ? "Upravit kategorii" : "Nová kategorie"}
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                className="resize-y border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
              />
            </label>

            <div className="flex flex-col gap-3 text-sm text-charcoal">
              <span>Typy</span>
              <div className="flex items-stretch gap-2">
                <input
                  type="text"
                  value={typeDraft}
                  onChange={(event) => setTypeDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addType();
                    }
                  }}
                  placeholder="Název typu"
                  className="min-w-0 flex-1 border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
                />
                <button
                  type="button"
                  onClick={addType}
                  className="cursor-pointer border border-charcoal px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
                >
                  Přidat
                </button>
              </div>

              {types.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      type="button"
                      title={`Odebrat ${type}`}
                      onClick={() => removeType(type)}
                      className="inline-flex cursor-pointer items-center gap-2 border border-charcoal bg-white px-2.5 py-2 transition hover:bg-soft"
                    >
                      <span>{type}</span>
                      <span aria-hidden className="text-muted">
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">
                  Přidej typy, které půjdou vybrat u produktů v této kategorii.
                </p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3 border border-line bg-soft/60 px-4 py-3 text-sm text-charcoal transition hover:border-charcoal">
              <input
                type="checkbox"
                checked={showInCatalog}
                onChange={(event) => setShowInCatalog(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-charcoal"
              />
              <span>
                <span className="block font-medium">Vybrané kategorie</span>
                <span className="mt-0.5 block text-xs text-muted">
                  Zobrazit v sekci Vybrané kategorie na úvodní stránce
                  (max. 4{catalogSelectedCount > 0 ? ` · teď ${catalogSelectedCount}/4` : ""}).
                </span>
              </span>
            </label>

            <div className="flex flex-col gap-3 text-sm text-charcoal">
              <span>Obrázek</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative flex aspect-square w-28 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden border border-dashed border-line bg-soft transition hover:border-charcoal"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Náhled kategorie"
                    fill
                    unoptimized={imagePreview.startsWith("blob:")}
                    className="object-cover"
                  />
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6 text-muted"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M4 16.5 8.5 12l3 3 4.5-5.5L20 15" />
                      <rect x="3.5" y="4.5" width="17" height="15" />
                      <circle cx="9" cy="9" r="1.4" />
                    </svg>
                    <span className="px-2 text-center text-xs text-muted">
                      Nahrát
                    </span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) =>
                  handleImageChange(event.target.files?.[0] ?? null)
                }
              />
              {imageFile ? (
                <button
                  type="button"
                  onClick={() => handleImageChange(null)}
                  className="cursor-pointer self-start text-sm text-muted underline-offset-2 transition hover:text-charcoal hover:underline"
                >
                  Vrátit původní obrázek
                </button>
              ) : null}
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
                  : "Uložit kategorii"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
