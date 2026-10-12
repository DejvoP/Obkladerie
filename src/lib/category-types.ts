import type { CategorySlug } from "@/lib/content";

export const defaultCategoryTypes: Record<CategorySlug, string[]> = {
  obklady: [
    "Matný povrch",
    "Lesklý povrch",
    "Strukturovaný povrch",
    "Hedvábný povrch",
    "Prosvětlený povrch",
    "Dřevodekor",
  ],
  dlazby: [
    "Matný povrch",
    "Lesklý povrch",
    "Strukturovaný povrch",
    "Mramorový efekt",
  ],
  "betonove-sterky": ["Matný povrch", "Strukturovaný povrch"],
  "epoxidove-sterky": ["Profil", "Sokl", "Spárování"],
};

let workingTypes: Record<string, string[]> = {
  obklady: [...defaultCategoryTypes.obklady],
  dlazby: [...defaultCategoryTypes.dlazby],
  "betonove-sterky": [...defaultCategoryTypes["betonove-sterky"]],
  "epoxidove-sterky": [...defaultCategoryTypes["epoxidove-sterky"]],
};

export function getCategoryTypes(slug: string): string[] {
  return workingTypes[slug] ?? [];
}

export function setCategoryTypes(slug: string, types: string[]) {
  workingTypes = {
    ...workingTypes,
    [slug]: types.map((type) => type.trim()).filter(Boolean),
  };
}
