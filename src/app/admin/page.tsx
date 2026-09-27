import { AdminOverview } from "@/components/admin-overview";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";

export default async function AdminPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <AdminOverview
      productCount={products.length}
      categoryCount={categories.length}
    />
  );
}
