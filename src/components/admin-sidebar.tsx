"use client";

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function logout() {
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
  }

  return (
    <>
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-4 md:hidden">
        <a href="/" className="inline-flex" aria-label="Obkladérie">
          <Logo className="h-7 w-auto" />
        </a>
        <button
          type="button"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center text-charcoal"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-charcoal transition ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-charcoal transition ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Zavřít menu"
          className="fixed inset-0 z-40 bg-charcoal/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-r border-line bg-white transition-transform duration-200 ease-out md:static md:z-auto md:max-w-none md:translate-x-0 md:shrink-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-6">
          <a href="/" className="inline-flex" aria-label="Obkladérie">
            <Logo className="h-8 w-auto" />
          </a>
          <button
            type="button"
            aria-label="Zavřít menu"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center text-charcoal md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
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
                onClick={() => setOpen(false)}
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
            onClick={logout}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-base font-medium text-charcoal transition hover:bg-soft"
          >
            <LogoutIcon className="size-5 shrink-0" />
            Odhlásit se
          </button>
        </div>
      </aside>
    </>
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
