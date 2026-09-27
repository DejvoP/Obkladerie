"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type InquiryContextValue = {
  openInquiry: (productName?: string) => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiry must be used within InquiryProvider");
  }
  return ctx;
}

type InquiryProviderProps = {
  children: ReactNode;
  initialProductName?: string;
};

export function InquiryProvider({
  children,
  initialProductName,
}: InquiryProviderProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [productName, setProductName] = useState(initialProductName ?? "");

  const openInquiry = useCallback((name?: string) => {
    setProductName(name?.trim() || "");
    setError("");
    setSuccess(false);
    setOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setOpen(false);
    setError("");
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !success) closeInquiry();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, success, closeInquiry]);

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => closeInquiry(), 2000);
    return () => window.clearTimeout(timer);
  }, [success, closeInquiry]);

  const value = useMemo(() => ({ openInquiry }), [openInquiry]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill this, humans leave empty
    if (String(data.get("website") ?? "").trim()) {
      setSubmitting(false);
      setSuccess(true);
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          productName: productName || null,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(payload?.error ?? "Odeslání se nepovedlo.");
        return;
      }

      form.reset();
      setSuccess(true);
    } catch {
      setError("Odeslání se nepovedlo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InquiryContext.Provider value={value}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-charcoal/45 p-4"
          onClick={success ? undefined : closeInquiry}
        >
          {success ? (
            <div
              className="flex w-full max-w-sm flex-col items-center border border-line bg-white px-8 py-12 text-center"
              onClick={(e) => e.stopPropagation()}
              role="status"
              aria-live="polite"
            >
              <span className="grid size-16 place-items-center rounded-full bg-soft text-charcoal">
                <svg
                  viewBox="0 0 24 24"
                  className="size-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path d="M5 12.5 9.5 17 19 7.5" />
                </svg>
              </span>
              <p className="mt-5 font-serif text-2xl text-charcoal">
                Úspěšně odesláno
              </p>
              <p className="mt-2 text-sm text-muted">
                Ozveme se vám co nejdřív.
              </p>
            </div>
          ) : (
            <form
              className="w-full max-w-md border border-line bg-white p-7"
              onClick={(e) => e.stopPropagation()}
              onSubmit={onSubmit}
            >
              <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                Poptávka
              </p>
              <h2 className="mt-2 font-serif text-3xl text-charcoal">
                Pošlete nám zadání
              </h2>
              {productName ? (
                <p className="mt-2 text-sm text-muted">
                  Zájem o: <span className="text-charcoal">{productName}</span>
                </p>
              ) : null}

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              <div className="mt-6 flex flex-col gap-3">
                <input
                  required
                  name="name"
                  placeholder="Jméno"
                  className="border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  name="company"
                  placeholder="Firma (volitelné)"
                  className="border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Jaký prostor chystáte?"
                  className="resize-none border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>
              {error ? (
                <p className="mt-3 text-sm text-red-700">{error}</p>
              ) : null}
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeInquiry}
                  className="cursor-pointer px-4 py-2 text-sm text-muted"
                >
                  Zavřít
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer bg-accent px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-accent-hover disabled:opacity-60"
                >
                  {submitting ? "Odesílám…" : "Odeslat"}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}
    </InquiryContext.Provider>
  );
}
