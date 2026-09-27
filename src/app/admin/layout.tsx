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
      <div className="flex h-svh overflow-hidden bg-soft">
        <AdminSidebar />
        <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </AdminInquiriesProvider>
  );
}
