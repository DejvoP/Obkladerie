import { AdminProducts } from "@/components/admin-products";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <AdminProducts initialProducts={products} categories={categories} />
  );
}
