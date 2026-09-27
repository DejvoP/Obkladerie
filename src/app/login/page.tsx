import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Přihlášení - Obkladérie",
  description: "Administrace Obkladérie",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh flex-col bg-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,178,154,0.28),_transparent_55%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-5 py-16 lg:px-8">
        <div className="mx-auto w-full max-w-md border border-line bg-white p-6 sm:p-8">
          <div className="flex justify-center">
            <a href="/" className="inline-flex" aria-label="Obkladérie">
              <Logo className="h-9 w-auto" priority />
            </a>
          </div>

          <div className="mt-8">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
