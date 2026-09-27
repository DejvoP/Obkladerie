"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { useInquiry } from "@/components/inquiry-provider";
import {
  getCategoryLabel,
  getProductSlug,
  products as mockProducts,
  type Product,
} from "@/lib/content";

type CategoryLink = {
  title: string;
  slug: string;
};

type SiteHeaderProps = {
  solid?: boolean;
  products?: Product[];
  categories?: CategoryLink[];
};

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("cs")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function SiteHeader({
  solid: forceSolid = false,
  products = mockProducts,
  categories,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 80, left: 0 });
  const { openInquiry } = useInquiry();
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);

  const productLinks = useMemo(() => {
    const links = [{ href: "/produkty", label: "Všechny produkty" }];
    const cats =
      categories?.length
        ? categories
        : [
            { slug: "obklady", title: "Obklady" },
            { slug: "dlazby", title: "Dlažby" },
            { slug: "venkovni", title: "Venkovní dlažby" },
            { slug: "doplnky", title: "Doplňky" },
          ];
    for (const cat of cats) {
      links.push({
        href: `/produkty/${cat.slug}`,
        label: cat.title || getCategoryLabel(String(cat.slug)),
      });
    }
    return links;
  }, [categories]);

  const nav = [
    { href: onHome ? "#kvalita" : "/#kvalita", label: "Proč my" },
    { href: onHome ? "#o-nas" : "/#o-nas", label: "O nás" },
    { href: onHome ? "#kontakt" : "/#kontakt", label: "Kontakt" },
  ];

  const solid = forceSolid || scrolled || open || productsOpen;

  const searchResults = useMemo(() => {
    const query = normalizeSearch(searchQuery.trim());
    if (!query) return [];
    return products
      .filter((product) => {
        const haystack = normalizeSearch(
          `${product.name} ${product.kind} ${product.categoryTitle ?? getCategoryLabel(product.category)} ${product.description ?? ""}`,
        );
        return haystack.includes(query);
      })
      .slice(0, 8);
  }, [searchQuery, products]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const updateMenuPos = () => {
    const header = headerRef.current;
    const button = productsButtonRef.current;
    if (!header || !button) return;
    const headerRect = header.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setMenuPos({ top: headerRect.bottom, left: buttonRect.left });
  };

  useEffect(() => {
    if (forceSolid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  useEffect(() => {
    if (!open) setMobileProductsOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setMobileProductsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    const locked = open || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
        setOpen(false);
        setProductsOpen(false);
        setMobileProductsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, searchOpen]);

  useEffect(() => {
    if (!productsOpen) return;
    updateMenuPos();
    window.addEventListener("resize", updateMenuPos);
    return () => window.removeEventListener("resize", updateMenuPos);
  }, [productsOpen]);

  useEffect(() => {
    if (!productsOpen) return;
    const onClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [productsOpen]);

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Zavřít menu"
          className="fixed inset-0 z-40 bg-charcoal/40 md:hidden"
          onClick={() => {
            setOpen(false);
            setMobileProductsOpen(false);
          }}
        />
      ) : null}

      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          solid ? "bg-[#ffffff]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-content px-5 lg:px-8">
          <div
            className={`flex h-20 w-full items-stretch justify-between ${
              solid ? "border-b border-line" : ""
            }`}
          >
          <a href="/" className="inline-flex items-center" aria-label="Obkladérie">
            <Logo
              className="h-9 w-auto"
              priority
              variant={solid ? "default" : "inverted"}
            />
          </a>

          <nav
            className={`hidden h-full items-stretch gap-9 text-[15px] md:flex ${
              solid ? "text-charcoal" : "text-white"
            }`}
          >
            <div
              ref={dropdownRef}
              className="relative flex h-full items-center"
              onMouseEnter={() => {
                updateMenuPos();
                setProductsOpen(true);
              }}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                ref={productsButtonRef}
                type="button"
                aria-expanded={productsOpen}
                aria-haspopup="menu"
                onClick={() => {
                  updateMenuPos();
                  setProductsOpen((v) => !v);
                }}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  solid ? "hover:text-accent" : "hover:text-white/70"
                }`}
              >
                Produkty
                <svg
                  viewBox="0 0 12 12"
                  className={`size-3 fill-current transition-transform ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M2.2 4.2 6 8l3.8-3.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>

              {productsOpen ? (
                <div
                  role="menu"
                  style={{
                    top: solid ? menuPos.top - 1 : menuPos.top,
                    left: menuPos.left,
                    backgroundColor: solid ? "#ffffff" : undefined,
                  }}
                  className={`fixed z-50 min-w-[15rem] py-3 ${
                    solid
                      ? "border border-t-0 border-[#e7e2dc] text-charcoal shadow-none"
                      : "border border-t-0 border-white/15 bg-charcoal/50 text-white backdrop-blur-md shadow-[0_12px_40px_rgba(31,31,31,0.12)]"
                  }`}
                >
                  {productLinks.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setProductsOpen(false)}
                      className={`block px-5 py-2.5 text-[15px] transition-colors ${
                        solid
                          ? index === 0
                            ? "mb-1 border-b border-line pb-3 font-medium hover:bg-soft"
                            : "text-muted hover:bg-soft hover:text-charcoal"
                          : index === 0
                            ? "mb-1 border-b border-white/10 pb-3 font-medium hover:bg-white/10"
                            : "text-dark-text hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`inline-flex items-center transition-colors ${
                  solid ? "hover:text-accent" : "hover:text-white/70"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Hledat"
              onClick={() => {
                setSearchQuery("");
                setSearchOpen(true);
              }}
              className={`grid size-11 place-items-center transition-colors ${
                solid
                  ? "text-charcoal hover:text-accent"
                  : "text-white hover:text-white/70"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-[22px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="hidden bg-accent px-5 py-3 text-[15px] font-medium text-charcoal transition hover:bg-accent-hover sm:inline-block"
            >
              Poptávka
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-px w-full ${solid ? "bg-charcoal" : "bg-white"}`}
                />
                <span
                  className={`h-px w-full ${solid ? "bg-charcoal" : "bg-white"}`}
                />
              </span>
            </button>
          </div>
          </div>
        </div>

        {open ? (
          <div className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-[#ffffff] md:hidden">
            {mobileProductsOpen ? (
              <div className="flex flex-col text-[17px] text-charcoal">
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen(false)}
                  className="flex w-full items-center gap-2 px-5 py-4 text-left text-[15px] text-muted"
                >
                  <span aria-hidden>&lt;</span>
                  Zpět
                </button>
                {productLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setMobileProductsOpen(false);
                      setOpen(false);
                    }}
                    className="px-5 py-4 transition-colors active:bg-soft"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col text-[17px] text-charcoal">
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen(true)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors active:bg-soft"
                >
                  <span>Produkty</span>
                  <svg
                    viewBox="0 0 12 12"
                    className="size-3.5 -rotate-90 fill-current text-muted"
                    aria-hidden
                  >
                    <path
                      d="M2.2 4.2 6 8l3.8-3.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </button>
                {nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-5 py-4 transition-colors active:bg-soft"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="px-5 py-5">
                  <button
                    type="button"
                    className="w-full bg-accent px-4 py-3.5 text-[15px] font-medium text-charcoal transition hover:bg-accent-hover"
                    onClick={() => {
                      setOpen(false);
                      openInquiry();
                    }}
                  >
                    Poptávka
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </header>

      {searchOpen ? (
        <div
          className="search-overlay-enter fixed inset-0 z-[60] grid place-items-start bg-charcoal/40 p-4 pt-28"
          onClick={closeSearch}
        >
          <div
            className="search-panel-enter mx-auto w-full max-w-xl border border-line bg-white shadow-[0_16px_48px_rgba(31,31,31,0.12)]"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="p-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchResults[0]) {
                  closeSearch();
                  window.location.href = `/produkty/${getProductSlug(searchResults[0])}`;
                }
              }}
            >
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledat obklady, dlažby, materiály…"
                className="w-full border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-accent"
              />
            </form>

            {searchQuery.trim() ? (
              <div
                key={searchQuery.trim()}
                className="search-dropdown-enter border-t border-line"
              >
                {searchResults.length > 0 ? (
                  <ul role="listbox" className="max-h-[22rem] overflow-y-auto py-2">
                    {searchResults.map((product, index) => (
                      <li
                        key={product.id ?? getProductSlug(product)}
                        className="search-item-enter"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <a
                          href={`/produkty/${getProductSlug(product)}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-soft"
                        >
                          <span className="relative size-12 shrink-0 overflow-hidden bg-soft">
                            <Image
                              src={product.image}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-charcoal">
                              {product.name}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-muted">
                              {product.kind}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm text-charcoal">
                            {product.price}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="search-item-enter px-4 py-6 text-sm text-muted">
                    Nic nenalezeno pro „{searchQuery.trim()}“
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
