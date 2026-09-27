"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAdminInquiries } from "@/components/admin-inquiries-provider";
import { Logo } from "@/components/logo";
import {
  ADMIN_AUTH_COOKIE,
  clearAdminAuthCookie,
} from "@/lib/admin-auth";

const navItems = [
  { href: "/admin", label: "Přehled", icon: OverviewIcon },
  { href: "/admin/produkty", label: "Produkty", icon: ProductsIcon },
  { href: "/admin/kategorie", label: "Kategorie", icon: CategoriesIcon },
  { href: "/admin/poptavky", label: "Poptávky", icon: InquiriesIcon },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { pendingCount } = useAdminInquiries();

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-line bg-white">
      <div className="border-b border-line px-5 py-6">
        <a href="/" className="inline-flex" aria-label="Obkladérie">
          <Logo className="h-8 w-auto" />
        </a>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          const showBadge =
            item.href === "/admin/poptavky" && pendingCount > 0;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 text-base font-medium transition ${
                active
                  ? "bg-charcoal text-white"
                  : "text-charcoal hover:bg-soft"
              }`}
            >
              <Icon className="size-5 shrink-0" />
              <span className="min-w-0 flex-1">{item.label}</span>
              {showBadge ? (
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold leading-none ${
                    active
                      ? "bg-white text-charcoal"
                      : "bg-charcoal text-white"
                  }`}
                  aria-label={`${pendingCount} nevyřízených poptávek`}
                >
                  {pendingCount}
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-line p-3">
        <button
          type="button"
          onClick={async () => {
            try {
              if (
                process.env.NEXT_PUBLIC_SUPABASE_URL &&
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ) {
                const { createClient } = await import("@/lib/supabase/client");
                const supabase = createClient();
                await supabase.auth.signOut();
              }
            } catch {
              // ignore
            }
            document.cookie = clearAdminAuthCookie();
            sessionStorage.removeItem(ADMIN_AUTH_COOKIE);
            router.push("/login");
            router.refresh();
          }}
          className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-base font-medium text-charcoal transition hover:bg-soft"
        >
          <LogoutIcon className="size-5 shrink-0" />
          Odhlásit se
        </button>
      </div>
    </aside>
  );
}

function OverviewIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="13.5" y="3.5" width="7" height="7" />
      <rect x="3.5" y="13.5" width="7" height="7" />
      <rect x="13.5" y="13.5" width="7" height="7" />
    </svg>
  );
}

function ProductsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
      <path d="M12 12v8M4 8.5 12 12l8-3.5" />
    </svg>
  );
}

function CategoriesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function InquiriesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 5.5h14v10H9l-4 3v-13Z" />
      <path d="M8.5 9.5h7M8.5 12.5h4.5" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M10 5.5H6.5A2 2 0 0 0 4.5 7.5v9a2 2 0 0 0 2 2H10" />
      <path d="M10.5 12h9M16.5 8.5 20 12l-3.5 3.5" />
    </svg>
  );
}
