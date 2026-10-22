"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

type PreviewFile = {
  id: string;
  file: File;
  url: string;
};

const MAX_FILES = 5;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif|bmp|avif)$/i;

function isImageFile(file: File) {
  if (file.type.startsWith("image/")) return true;
  return IMAGE_EXT.test(file.name);
}

export function InquiryProvider({
  children,
  initialProductName,
}: InquiryProviderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [productName, setProductName] = useState(initialProductName ?? "");
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clearPreviews = useCallback(() => {
    setPreviews((prev) => {
      for (const item of prev) URL.revokeObjectURL(item.url);
      return [];
    });
  }, []);

  const resetForm = useCallback(() => {
    setStep(1);
    setName("");
    setCompany("");
    setEmail("");
    setMessage("");
    setError("");
    setSuccess(false);
    setSubmitting(false);
    clearPreviews();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [clearPreviews]);

  const openInquiry = useCallback(
    (selectedProduct?: string) => {
      resetForm();
      const nextProduct =
        selectedProduct?.trim() || initialProductName?.trim() || "";
      setProductName(nextProduct);
      setOpen(true);
    },
    [resetForm, initialProductName],
  );

  const closeInquiry = useCallback(() => {
    setOpen(false);
    resetForm();
    // Keep product context on product pages for the next open
    setProductName(initialProductName?.trim() || "");
  }, [resetForm, initialProductName]);

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
    const timer = window.setTimeout(() => closeInquiry(), 2200);
    return () => window.clearTimeout(timer);
  }, [success, closeInquiry]);

  const value = useMemo(() => ({ openInquiry }), [openInquiry]);

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;

    const incoming = Array.from(list);
    const images = incoming.filter(isImageFile);

    if (!images.length) {
      setError("Vyber prosím obrázky (JPG, PNG, WEBP…).");
      return;
    }

    setError("");
    setPreviews((prev) => {
      const room = MAX_FILES - prev.length;
      if (room <= 0) {
        setError(`Můžeš nahrát maximálně ${MAX_FILES} fotek.`);
        return prev;
      }
      const added = images.slice(0, room).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
      }));
      if (images.length > room) {
        setError(`Můžeš nahrát maximálně ${MAX_FILES} fotek.`);
      }
      return [...prev, ...added];
    });
  };

  const removePreview = (id: string) => {
    setPreviews((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((item) => item.id !== id);
    });
  };

  const goNext = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!message.trim()) {
      setError("Napiš, jaký prostor chystáte.");
      return;
    }
    setStep(2);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const honeypot = String(new FormData(form).get("website") ?? "").trim();

    if (honeypot) {
      setSubmitting(false);
      setSuccess(true);
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError("Vyplň jméno a e-mail.");
      setSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Neplatný e-mail.");
      setSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.set("name", name.trim());
    payload.set("email", email.trim());
    payload.set("company", company.trim());
    payload.set("message", message.trim());
    payload.set("website", "");
    if (productName) payload.set("productName", productName);
    for (const item of previews) {
      payload.append("attachments", item.file, item.file.name);
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(body?.error ?? "Odeslání se nepovedlo.");
        return;
      }

      clearPreviews();
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
          onClick={(event) => {
            if (success) return;
            if (event.target === event.currentTarget) closeInquiry();
          }}
        >
          {success ? (
            <div
              className="flex w-full max-w-sm flex-col items-center border border-line bg-white px-8 py-12 text-center"
              role="status"
              aria-live="polite"
            >
              <p className="font-serif text-2xl text-charcoal">
                Úspěšně odesláno
              </p>
              <span className="mt-6 grid size-16 place-items-center rounded-full bg-soft text-charcoal">
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
              <p className="mt-5 text-sm text-muted">Ozveme se vám</p>
            </div>
          ) : (
            <div className="max-h-[min(92vh,44rem)] w-full max-w-md overflow-y-auto border border-line bg-white">
              <input
                ref={fileInputRef}
                id="inquiry-photo-input"
                type="file"
                accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif"
                multiple
                className="sr-only"
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => {
                  addFiles(event.target.files);
                  event.target.value = "";
                }}
              />

              <div className="border-b border-line px-7 pt-7 pb-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                    Poptávka
                  </p>
                  <p className="text-xs text-muted">Krok {step} / 2</p>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-charcoal">
                  {step === 1 ? "Popis poptávky" : "Vaše údaje"}
                </h2>
                {productName ? (
                  <p className="mt-2 text-sm text-muted">
                    Zájem o:{" "}
                    <span className="text-charcoal">{productName}</span>
                  </p>
                ) : null}
                <div className="mt-5 flex gap-2">
                  <span
                    className={`h-0.5 flex-1 ${step >= 1 ? "bg-charcoal" : "bg-line"}`}
                  />
                  <span
                    className={`h-0.5 flex-1 ${step >= 2 ? "bg-charcoal" : "bg-line"}`}
                  />
                </div>
              </div>

              {step === 1 ? (
                <form className="p-7" onSubmit={goNext}>
                  <div className="flex flex-col gap-3">
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Jaký prostor chystáte? Pošlete nám fotografii toho, co hledáte, a my vám najdeme levnější variantu ve stejném stylu."
                      className="resize-none border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                    />

                    <div className="border border-dashed border-line bg-soft/40 p-4">
                      <p className="text-sm font-medium text-charcoal">
                        Fotky inspirace
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Volitelné · max. {MAX_FILES} fotek · JPG, PNG, WEBP
                      </p>
                      <label
                        htmlFor="inquiry-photo-input"
                        className="mt-3 inline-flex cursor-pointer border border-charcoal bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-white"
                        onClick={(event) => event.stopPropagation()}
                        onMouseDown={(event) => event.stopPropagation()}
                      >
                        Vybrat fotky
                      </label>
                    </div>

                    {previews.length > 0 ? (
                      <ul className="grid grid-cols-3 gap-2">
                        {previews.map((item) => (
                          <li
                            key={item.id}
                            className="relative aspect-square overflow-hidden border border-line bg-soft"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.url}
                              alt=""
                              className="size-full object-cover"
                            />
                            <button
                              type="button"
                              aria-label="Odebrat fotku"
                              onClick={() => removePreview(item.id)}
                              className="absolute top-1 right-1 grid size-6 place-items-center bg-charcoal/80 text-sm text-white transition hover:bg-charcoal"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {error ? (
                    <p className="mt-3 text-sm text-red-700">{error}</p>
                  ) : null}

                  <div className="mt-6 flex justify-between gap-2">
                    <button
                      type="button"
                      onClick={closeInquiry}
                      className="px-4 py-2 text-sm text-muted"
                    >
                      Zavřít
                    </button>
                    <button
                      type="submit"
                      className="bg-accent px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-accent-hover"
                    >
                      Další
                    </button>
                  </div>
                </form>
              ) : (
                <form className="p-7" onSubmit={onSubmit}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden
                  />

                  <div className="flex flex-col gap-3">
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jméno"
                      className="border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Firma (volitelné)"
                      className="border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-mail"
                      className="border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                  </div>

                  {previews.length > 0 ? (
                    <p className="mt-4 text-xs text-muted">
                      Přílohy: {previews.length}{" "}
                      {previews.length === 1 ? "fotka" : "fotky"}
                    </p>
                  ) : null}

                  {error ? (
                    <p className="mt-3 text-sm text-red-700">{error}</p>
                  ) : null}

                  <div className="mt-6 flex justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setStep(1);
                      }}
                      className="px-4 py-2 text-sm text-muted"
                    >
                      Zpět
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-accent px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-accent-hover disabled:opacity-60"
                    >
                      {submitting ? "Odesílám…" : "Odeslat"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      ) : null}
    </InquiryContext.Provider>
  );
}
