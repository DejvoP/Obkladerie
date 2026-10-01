export type CategorySlug = string;

export const KNOWN_CATEGORY_SLUGS = [
  "obklady",
  "dlazby",
  "venkovni",
  "doplnky",
] as const;

export const categoryMeta: Record<
  string,
  { title: string; description: string }
> = {
  obklady: {
    title: "Obklady",
    description: "Do koupelen, kuchyní i interiérů",
  },
  dlazby: {
    title: "Dlažby",
    description: "Odolné povrchy pro interiér",
  },
  venkovni: {
    title: "Venkovní dlažby",
    description: "Terasy, balkony a exteriér",
  },
  doplnky: {
    title: "Doplňky",
    description: "Lišty, profily a příslušenství",
  },
};

export const catalog = [
  {
    title: "Obklady",
    slug: "obklady" as const,
    subtitle: "Do koupelen, kuchyní i interiérů",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Dlažby",
    slug: "dlazby" as const,
    subtitle: "Odolné povrchy pro interiér",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Venkovní dlažby",
    slug: "venkovni" as const,
    subtitle: "Terasy, balkony a exteriér",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Doplňky",
    slug: "doplnky" as const,
    subtitle: "Lišty, profily a příslušenství",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
  },
];

export type Product = {
  id?: string;
  slug?: string;
  name: string;
  kind: string;
  category: CategorySlug;
  categoryTitle?: string;
  image: string;
  images?: string[];
  price: string;
  colors: string[];
  colorItems?: { hex: string; name: string | null; imageUrl?: string | null }[];
  format?: string | null;
  featured?: boolean;
  description?: string;
};

export function isCategorySlug(value: string): boolean {
  return Boolean(value) && !value.includes("/");
}

export function getCategoryLabel(slug: string, fallback?: string) {
  return categoryMeta[slug]?.title ?? fallback ?? slug;
}

export function slugifyProductName(name: string) {
  return name
    .toLocaleLowerCase("cs")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProductSlug(product: Product & { slug?: string }) {
  return product.slug ?? slugifyProductName(product.name);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => getProductSlug(product) === slug);
}

export function getProductsByCategory(slug: CategorySlug) {
  return products.filter((product) => product.category === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (item) =>
        item.category === product.category && item.name !== product.name,
    )
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 5) {
  const featured = products.filter((product) => product.featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export const products: Product[] = [
  {
    name: "Travertin Beige",
    kind: "Obklad · Matný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80",
    price: "890 Kč/m²",
    colors: ["#C9B29A", "#8A7F72"],
    featured: true,
  },
  {
    name: "Marble White",
    kind: "Dlažba · Lesklý povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80",
    price: "1 240 Kč/m²",
    colors: ["#F5F1EC", "#D6D2CD"],
    featured: true,
  },
  {
    name: "Concrete Grey",
    kind: "Dlažba · Matný povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80",
    price: "760 Kč/m²",
    colors: ["#9A9A9A", "#6F6F6F"],
    featured: true,
  },
  {
    name: "Stone Sand",
    kind: "Obklad · Strukturovaný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80",
    price: "980 Kč/m²",
    colors: ["#D4C4B0", "#A89078"],
    featured: true,
  },
  {
    name: "Terrazzo Light",
    kind: "Dlažba · Mramorový efekt",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80",
    price: "1 150 Kč/m²",
    colors: ["#E8E2DA", "#B8A99A"],
    featured: true,
  },
  {
    name: "Oak Fluted",
    kind: "Obklad · Dřevodekor",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80",
    price: "1 090 Kč/m²",
    colors: ["#B8956A", "#7A5C3E"],
  },
  {
    name: "Slate Dark",
    kind: "Dlažba · Matný povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80",
    price: "920 Kč/m²",
    colors: ["#4A4A4A", "#2A2A2A"],
  },
  {
    name: "Calacatta Soft",
    kind: "Obklad · Lesklý povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
    price: "1 380 Kč/m²",
    colors: ["#F7F4EF", "#E0D8CE"],
  },
  {
    name: "Basalt Graphite",
    kind: "Venkovní dlažba · Matný povrch",
    category: "venkovni",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80",
    price: "1 050 Kč/m²",
    colors: ["#5C5C5C", "#3D3D3D"],
  },
  {
    name: "Lime Wash",
    kind: "Obklad · Matný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    price: "840 Kč/m²",
    colors: ["#EDE6DC", "#C2B8AA"],
  },
  {
    name: "Quartzite Pearl",
    kind: "Dlažba · Lesklý povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80",
    price: "1 290 Kč/m²",
    colors: ["#E8E8E8", "#B0B0B0"],
  },
  {
    name: "Terracotta Raw",
    kind: "Obklad · Matný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
    price: "870 Kč/m²",
    colors: ["#C4785A", "#8B4A32"],
  },
  {
    name: "Granite Ash",
    kind: "Dlažba · Strukturovaný povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80",
    price: "990 Kč/m²",
    colors: ["#8E8E8E", "#5A5A5A"],
  },
  {
    name: "Ivory Silk",
    kind: "Obklad · Hedvábný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80",
    price: "1 180 Kč/m²",
    colors: ["#F3EDE4", "#D2C6B6"],
  },
  {
    name: "Cement Soft",
    kind: "Dlažba · Matný povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80",
    price: "720 Kč/m²",
    colors: ["#C8C4BE", "#8F8A84"],
  },
  {
    name: "Travertin Noce",
    kind: "Obklad · Matný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80",
    price: "910 Kč/m²",
    colors: ["#B89A7A", "#7A6248"],
  },
  {
    name: "Marble Grey",
    kind: "Dlažba · Lesklý povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80",
    price: "1 210 Kč/m²",
    colors: ["#D0D0D0", "#7E7E7E"],
  },
  {
    name: "Sandstone Warm",
    kind: "Venkovní dlažba · Matný povrch",
    category: "venkovni",
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80",
    price: "1 020 Kč/m²",
    colors: ["#D9C3A5", "#A68B6A"],
  },
  {
    name: "Onyx Cream",
    kind: "Obklad · Prosvětlený povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
    price: "1 460 Kč/m²",
    colors: ["#F0E6D4", "#C9B29A"],
  },
  {
    name: "Pietra Grey",
    kind: "Dlažba · Matný povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80",
    price: "1 080 Kč/m²",
    colors: ["#6E6E6E", "#3F3F3F"],
  },
  {
    name: "Microcement White",
    kind: "Obklad · Matný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    price: "950 Kč/m²",
    colors: ["#F5F5F5", "#C9C9C9"],
  },
  {
    name: "Walnut Line",
    kind: "Obklad · Dřevodekor",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80",
    price: "1 130 Kč/m²",
    colors: ["#8B6B4A", "#5C4030"],
  },
  {
    name: "Porcelain Soft",
    kind: "Dlažba · Matný povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80",
    price: "790 Kč/m²",
    colors: ["#E6E1DA", "#AFA8A0"],
  },
  {
    name: "Limestone Pale",
    kind: "Obklad · Matný povrch",
    category: "obklady",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
    price: "860 Kč/m²",
    colors: ["#E8DFD2", "#B7AA98"],
  },
  {
    name: "Nero Marquina",
    kind: "Dlažba · Lesklý povrch",
    category: "dlazby",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80",
    price: "1 520 Kč/m²",
    colors: ["#2B2B2B", "#1F1F1F"],
  },
  {
    name: "Terrace Basalt",
    kind: "Venkovní dlažba · Strukturovaný povrch",
    category: "venkovni",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80",
    price: "1 120 Kč/m²",
    colors: ["#6A6A6A", "#3A3A3A"],
  },
  {
    name: "Outdoor Sand",
    kind: "Venkovní dlažba · Matný povrch",
    category: "venkovni",
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80",
    price: "980 Kč/m²",
    colors: ["#D2C0A8", "#9A8268"],
  },
  {
    name: "Hliníková lišta",
    kind: "Doplněk · Profil",
    category: "doplnky",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80",
    price: "189 Kč/ks",
    colors: ["#C0C0C0", "#8A8A8A"],
  },
  {
    name: "Dilatační profil",
    kind: "Doplněk · Profil",
    category: "doplnky",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80",
    price: "249 Kč/ks",
    colors: ["#D6D2CD", "#6F6F6F"],
  },
  {
    name: "Soklová lišta Stone",
    kind: "Doplněk · Sokl",
    category: "doplnky",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80",
    price: "320 Kč/m",
    colors: ["#C9B29A", "#8A7F72"],
  },
  {
    name: "Spárovací hmota Soft",
    kind: "Doplněk · Spárování",
    category: "doplnky",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    price: "159 Kč/kg",
    colors: ["#F5F1EC", "#D6D2CD"],
  },
];
