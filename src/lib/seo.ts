import type { Metadata } from "next";
import type { Product } from "@/lib/content";
import { getProductSlug } from "@/lib/content";

export const SITE_NAME = "Obkladerie";

/** Keep existing root title/description strings unchanged. */
export const ROOT_TITLE = "Obkladerie - prémiové obklady za outletové ceny";
export const ROOT_DESCRIPTION =
  "Kvalitní keramika od renomovaných italských výrobců z předchozích kolekcí. Stejná kvalita, výrazně lepší cena. Dodání 7-14 dní.";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://obkladerie.vercel.app";
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
  type = "website",
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? [{ url: image.startsWith("http") ? image : absoluteUrl(image) }]
    : [{ url: absoluteUrl("/hero.png") }];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "cs_CZ",
      type,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage.map((item) => item.url),
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/favicon.png"),
    email: "info@remodelto.cz",
    telephone: "+420606167019",
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CZ",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+420606167019",
        contactType: "customer service",
        email: "info@remodelto.cz",
        availableLanguage: ["Czech"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    inLanguage: "cs-CZ",
    description: ROOT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/produkty`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function parsePriceAmount(price: string) {
  const digits = price.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

export function productJsonLd(product: Product) {
  const slug = getProductSlug(product);
  const url = absoluteUrl(`/produkty/${slug}`);
  const amount = parsePriceAmount(product.price);
  const images = [
    ...(product.images?.length ? product.images : []),
    product.image,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description?.trim() ||
      `${product.kind}${product.price ? `. ${product.price}` : ""}`,
    image: images,
    sku: slug,
    category: product.categoryTitle || product.category,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: amount
      ? {
          "@type": "Offer",
          url,
          priceCurrency: "CZK",
          price: amount,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: SITE_NAME,
          },
        }
      : undefined,
  };
}

export function collectionJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}
