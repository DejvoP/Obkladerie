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
      <div className="flex min-h-svh max-w-[100vw] flex-col overflow-x-clip bg-white">
        <SiteHeader
          solid={solidHeader}
          products={products}
          categories={categories}
        />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter categories={categories} />
      </div>
    </InquiryProvider>
  );
}
