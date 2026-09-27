"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowIcon } from "@/components/arrow-icon";
import { useInquiry } from "@/components/inquiry-provider";
import {
  getCategoryLabel,
  getProductSlug,
  getRelatedProducts,
  type Product,
} from "@/lib/content";

type ProductDetailProps = {
  product: Product;
  related?: Product[];
};

export function ProductDetail({
  product,
  related: relatedProp,
}: ProductDetailProps) {
  const { openInquiry } = useInquiry();
  const [activeColor, setActiveColor] = useState(0);
  const related = relatedProp ?? getRelatedProducts(product, 4);
  const categoryTitle =
    product.categoryTitle ?? getCategoryLabel(product.category);
  const surface = product.kind.includes("·")
    ? product.kind.split("·").slice(1).join("·").trim()
    : product.kind;

  const gallery = useMemo(() => {
    const images =
      product.images?.length
        ? product.images
        : product.image
          ? [product.image]
          : [];
    return images.filter(Boolean);
  }, [product.image, product.images]);

  const colorItems = useMemo(() => {
    if (product.colorItems?.length) return product.colorItems;
    return product.colors.map((hex, index) => ({
      hex,
      name: null as string | null,
      imageUrl: gallery[index] ?? gallery[0] ?? null,
    }));
  }, [product.colorItems, product.colors, gallery]);

  useEffect(() => {
    setActiveColor(0);
  }, [product.id, product.slug, product.name]);

  const selectColor = (index: number) => {
    setActiveColor(index);
  };

  const currentImage = useMemo(() => {
    const color = colorItems[activeColor];
    if (color?.imageUrl) return color.imageUrl;
    if (gallery[activeColor]) return gallery[activeColor];
    return gallery[0] ?? product.image;
  }, [activeColor, colorItems, gallery, product.image]);

  const colorLabel = (index: number) => {
    const item = colorItems[index];
    if (!item) return `Varianta ${index + 1}`;
    return item.name?.trim() || `Varianta ${index + 1}`;
  };

  const activeGalleryIndex = Math.max(
    0,
    gallery.findIndex((url) => url === currentImage),
  );

  return (
    <section className="bg-white pt-28 pb-20">
      <div className="mx-auto w-full max-w-content px-5 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <a href="/" className="transition hover:text-charcoal">
            Domů
          </a>
          <span>/</span>
          <a href="/produkty" className="transition hover:text-charcoal">
            Produkty
          </a>
          <span>/</span>
          <a
            href={`/produkty/${product.category}`}
            className="transition hover:text-charcoal"
          >
            {categoryTitle}
          </a>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <div className="relative aspect-square w-full overflow-hidden bg-soft">
              {currentImage ? (
                <Image
                  key={currentImage}
                  src={currentImage}
                  alt={`${product.name} — ${colorLabel(activeColor)}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition duration-500 ease-out"
                />
              ) : null}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal/25 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {colorItems.map((item, index) => (
                  <button
                    key={`${item.hex}-${index}`}
                    type="button"
                    onClick={() => selectColor(index)}
                    className={`size-7 border transition ${
                      index === activeColor
                        ? "border-white ring-1 ring-white/80"
                        : "border-white/40"
                    }`}
                    style={{ backgroundColor: item.hex }}
                    aria-label={colorLabel(index)}
                  />
                ))}
              </div>
            </div>

            {gallery.length > 1 ? (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {gallery.map((url, index) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => {
                      const colorIndex = colorItems.findIndex(
                        (item) => item.imageUrl === url,
                      );
                      selectColor(colorIndex >= 0 ? colorIndex : index);
                    }}
                    className={`relative aspect-square overflow-hidden border transition ${
                      url === currentImage || index === activeGalleryIndex
                        ? "border-charcoal"
                        : "border-line hover:border-charcoal"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} — foto ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col lg:max-w-xl">
            <h1 className="font-serif text-4xl leading-[1.08] text-charcoal sm:text-5xl lg:text-[3.25rem]">
              {product.name}
            </h1>
            <p className="mt-3 text-base leading-7 text-muted">{product.kind}</p>

            <p className="mt-6 text-base leading-8 text-charcoal/80">
              {product.description?.trim() ||
                `Série ${product.name} patří mezi ${categoryTitle.toLocaleLowerCase("cs")} Obkladérie. ${product.kind} dodá prostoru čistý výraz a snadno se kombinuje s ostatními povrchy v katalogu.`}
            </p>

            <div className="mt-8">
              <p className="text-sm font-medium text-charcoal">Barva</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {colorItems.map((item, index) => {
                  const selected = index === activeColor;
                  return (
                    <button
                      key={`${item.hex}-${index}`}
                      type="button"
                      onClick={() => selectColor(index)}
                      aria-pressed={selected}
                      aria-label={colorLabel(index)}
                      className={`inline-flex cursor-pointer items-center gap-2 border px-3 py-2.5 transition ${
                        selected
                          ? "border-charcoal bg-soft"
                          : "border-line hover:border-charcoal"
                      }`}
                    >
                      <span
                        className="size-4 border border-line"
                        style={{ backgroundColor: item.hex }}
                      />
                      <span className="text-sm text-charcoal">
                        {colorLabel(index)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-8 font-serif text-3xl text-charcoal sm:text-4xl">
              {product.price}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openInquiry(product.name)}
                className="inline-flex cursor-pointer bg-charcoal px-7 py-3.5 text-sm font-medium tracking-[0.08em] text-white uppercase transition hover:bg-charcoal/90"
              >
                Poptat produkt
              </button>
              <a
                href={`/produkty/${product.category}`}
                className="inline-flex items-center gap-2 border border-charcoal px-6 py-3.5 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
              >
                Další v kategorii
                <ArrowIcon className="size-4" />
              </a>
            </div>

            <dl className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-xs tracking-[0.14em] text-muted uppercase">
                  Kategorie
                </dt>
                <dd className="mt-1.5 text-sm text-charcoal">{categoryTitle}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-muted uppercase">
                  Povrch
                </dt>
                <dd className="mt-1.5 text-sm text-charcoal">{surface}</dd>
              </div>
              {product.format ? (
                <div>
                  <dt className="text-xs tracking-[0.14em] text-muted uppercase">
                    Formát
                  </dt>
                  <dd className="mt-1.5 text-sm text-charcoal">
                    {product.format}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-24 border-t border-line pt-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="font-serif text-4xl text-charcoal sm:text-5xl">
                Podobné produkty
              </h2>
              <a
                href={`/produkty/${product.category}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal transition hover:text-accent"
              >
                Celá kategorie
                <ArrowIcon className="size-4" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
              {related.map((item) => (
                <a
                  key={item.id ?? getProductSlug(item)}
                  href={`/produkty/${getProductSlug(item)}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden bg-soft">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 22vw, 45vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-medium text-charcoal sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.kind}</p>
                  <div className="mt-3 flex gap-1.5">
                    {item.colors.map((color) => (
                      <span
                        key={color}
                        className="size-3.5 border border-line"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-medium text-charcoal">
                    {item.price}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
