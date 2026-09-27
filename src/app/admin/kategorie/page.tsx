import { AdminCategories } from "@/components/admin-categories";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

  const productCounts: Record<string, number> = {};
  for (const product of products) {
    productCounts[product.category] =
      (productCounts[product.category] ?? 0) + 1;
  }

  return (
    <AdminCategories
      initialCategories={categories}
      productCounts={productCounts}
    />
  );
}
