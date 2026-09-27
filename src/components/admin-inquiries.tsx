"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminInquiries } from "@/components/admin-inquiries-provider";
import {
  formatInquiryDate,
  inquiryDisplayName,
} from "@/lib/admin-inquiries";

type FilterKey = "all" | "pending" | "done";

export function AdminInquiries() {
  const {
    inquiries,
    markDone,
    markSeen,
    markAllDone,
    removeInquiry,
    removeAll,
  } = useAdminInquiries();
  const [filter, setFilter] = useState<FilterKey>("all");

  // Opening the list = "viewed" → NOVÁ → NEVYŘÍZENO
  useEffect(() => {
    const newIds = inquiries.filter((item) => item.isNew).map((item) => item.id);
    if (!newIds.length) return;

    const timer = window.setTimeout(() => {
      markSeen(newIds);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [inquiries, markSeen]);

  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      pending: inquiries.filter((item) => item.status === "pending").length,
      done: inquiries.filter((item) => item.status === "done").length,
    };
  }, [inquiries]);

  const filters: {
    key: FilterKey;
    label: string;
    count: number;
    icon: typeof AllIcon;
  }[] = [
    { key: "all", label: "Všechny", count: counts.all, icon: AllIcon },
    {
      key: "pending",
      label: "Nevyřízené",
      count: counts.pending,
      icon: PendingIcon,
    },
    { key: "done", label: "Vyřízené", count: counts.done, icon: DoneIcon },
  ];

  const filtered = useMemo(() => {
    const list = inquiries.filter((item) => {
      if (filter === "pending") return item.status === "pending";
      if (filter === "done") return item.status === "done";
      return true;
    });

    return [...list].sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === "pending" ? -1 : 1;
      }
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }, [filter, inquiries]);

  const pendingInFilter = useMemo(
    () => filtered.filter((item) => item.status === "pending"),
    [filtered],
  );

  return (
    <div>
      <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">
        Poptávky
      </h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = filter === item.key;
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`inline-flex cursor-pointer items-center gap-2 border px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-line bg-white text-charcoal hover:border-charcoal"
                }`}
              >
                <Icon className="size-4 shrink-0 opacity-80" />
                <span>{item.label}</span>
                <span
                  className={`grid size-5 place-items-center rounded-full text-[11px] font-semibold leading-none ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-soft text-muted"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={pendingInFilter.length === 0}
            onClick={() => {
              if (
                !window.confirm(
                  `Opravdu vyřídit ${pendingInFilter.length} poptávek?`,
                )
              ) {
                return;
              }
              markAllDone(pendingInFilter.map((item) => item.id));
            }}
            className="cursor-pointer border border-charcoal px-3.5 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:hover:bg-transparent disabled:hover:text-muted"
          >
            Vyřídit vše
          </button>
          <button
            type="button"
            disabled={filtered.length === 0}
            onClick={() => {
              if (
                !window.confirm(
                  `Opravdu smazat ${filtered.length} poptávek? Tuto akci nelze vrátit.`,
                )
              ) {
                return;
              }
              removeAll(filtered.map((item) => item.id));
            }}
            className="cursor-pointer border border-red-700 px-3.5 py-2 text-sm font-medium text-red-700 transition hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:hover:bg-transparent disabled:hover:text-muted"
          >
            Vymazat vše
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {filtered.length === 0 ? (
          <p className="border border-line bg-white px-5 py-10 text-sm text-muted">
            Žádné poptávky v tomto filtru.
          </p>
        ) : (
          filtered.map((inquiry) => {
            const pending = inquiry.status === "pending";
            const showNew = pending && inquiry.isNew;

            return (
              <article
                key={inquiry.id}
                className={`border bg-white px-5 py-4 transition ${
                  showNew
                    ? "border-red-300 shadow-[0_0_0_1px_rgba(220,38,38,0.12)]"
                    : "border-line"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-charcoal">
                        {inquiryDisplayName(inquiry)}
                      </h2>

                      {showNew ? (
                        <span className="inline-flex items-center gap-1.5 bg-red-600/10 px-2 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-red-700 uppercase">
                          <span
                            className="size-1.5 animate-pulse rounded-full bg-red-600"
                            aria-hidden
                          />
                          Nová
                        </span>
                      ) : pending ? (
                        <span className="bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-amber-800 uppercase">
                          Nevyřízeno
                        </span>
                      ) : (
                        <span className="bg-emerald-600/15 px-2 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-emerald-800 uppercase">
                          Vyřízeno
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="transition hover:text-charcoal"
                      >
                        {inquiry.email}
                      </a>
                      <span>{formatInquiryDate(inquiry.createdAt)}</span>
                    </div>

                    {inquiry.productName ? (
                      <p className="mt-3 text-sm text-charcoal">
                        <span className="font-semibold">Produkt:</span>{" "}
                        {inquiry.productName}
                      </p>
                    ) : null}

                    {inquiry.message ? (
                      <p className="mt-3 text-sm leading-relaxed text-charcoal/85">
                        {inquiry.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-start">
                    {pending ? (
                      <button
                        type="button"
                        onClick={() => markDone(inquiry.id)}
                        className="cursor-pointer border border-charcoal px-3 py-2 text-xs font-medium tracking-[0.06em] text-charcoal uppercase transition hover:bg-charcoal hover:text-white"
                      >
                        Vyřídit
                      </button>
                    ) : null}
                    <button
                      type="button"
                      aria-label="Smazat poptávku"
                      onClick={() => removeInquiry(inquiry.id)}
                      className="grid size-9 cursor-pointer place-items-center border border-line text-charcoal transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

function AllIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h10" />
    </svg>
  );
}

function PendingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l2.5 1.5" />
    </svg>
  );
}

function DoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 12.5 9.5 17 19 7.5" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M5 7h14" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6.5 7l1 12.5h9L17.5 7" />
      <path d="M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7" />
    </svg>
  );
}
