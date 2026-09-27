import { InquiryProvider } from "@/components/inquiry-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fetchCategories, fetchProducts } from "@/lib/db/catalog";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
  solidHeader?: boolean;
  inquiryProductName?: string;
};

export async function SiteShell({
  children,
  solidHeader = false,
  inquiryProductName,
}: SiteShellProps) {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <InquiryProvider initialProductName={inquiryProductName}>
      <div className="min-h-full bg-white">
        <SiteHeader
          solid={solidHeader}
          products={products}
          categories={categories}
        />
        {children}
        <SiteFooter />
      </div>
    </InquiryProvider>
  );
}
