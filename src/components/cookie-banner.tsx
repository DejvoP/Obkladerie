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
      className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[min(22rem,calc(100vw-2rem))]"
    >
      <div className="w-full bg-charcoal px-3.5 py-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:px-5 sm:py-5">
        <div className="flex gap-2.5 sm:gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center bg-white/10 sm:size-10">
            <Cookie className="size-4 text-accent sm:size-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white sm:text-base">
              Cookies
            </p>
            <p className="mt-1 text-[12px] leading-5 text-dark-text sm:mt-1.5 sm:text-sm sm:leading-6">
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

        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={() => dismiss("all")}
            className="bg-accent px-3 py-2 text-sm font-semibold text-charcoal transition hover:bg-accent-hover sm:px-5 sm:py-2.5"
          >
            Souhlasím
          </button>
          <button
            type="button"
            onClick={() => dismiss("necessary")}
            className="border border-white/25 bg-transparent px-3 py-2 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/5 sm:px-5 sm:py-2.5"
          >
            Jen nezbytné
          </button>
        </div>
      </div>
    </div>
  );
}
