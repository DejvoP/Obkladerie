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
  venkovni: ["Matný povrch", "Strukturovaný povrch"],
  doplnky: ["Profil", "Sokl", "Spárování"],
};

let workingTypes: Record<string, string[]> = {
  obklady: [...defaultCategoryTypes.obklady],
  dlazby: [...defaultCategoryTypes.dlazby],
  venkovni: [...defaultCategoryTypes.venkovni],
  doplnky: [...defaultCategoryTypes.doplnky],
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
