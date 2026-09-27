import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminInquiriesProvider } from "@/components/admin-inquiries-provider";
import { AdminSidebar } from "@/components/admin-sidebar";

export const metadata: Metadata = {
  title: "Administrace - Obkladérie",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminInquiriesProvider>
      <div className="flex h-svh flex-col overflow-hidden bg-soft md:flex-row">
        <AdminSidebar />
        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </AdminInquiriesProvider>
  );
}
