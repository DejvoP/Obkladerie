"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "obkladerie-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: "all" | "necessary") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-4 left-4 right-4 z-[60] max-w-md sm:right-auto"
    >
      <div className="bg-charcoal px-5 py-5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
        <div className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center bg-white/10">
            <Cookie className="size-5 text-accent" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-white">Cookies</p>
            <p className="mt-1.5 text-sm leading-6 text-dark-text">
              Používáme pouze nezbytné cookies pro fungování webu. Detaily
              najdete v{" "}
              <a
                href="/ochrana-osobnich-udaju"
                className="underline decoration-white/40 underline-offset-2 transition hover:text-white hover:decoration-white"
              >
                ochraně osobních údajů
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => dismiss("all")}
            className="bg-accent px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-accent-hover"
          >
            Souhlasím
          </button>
          <button
            type="button"
            onClick={() => dismiss("necessary")}
            className="border border-white/25 bg-transparent px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/5"
          >
            Jen nezbytné
          </button>
        </div>
      </div>
    </div>
  );
}
