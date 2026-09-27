"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ADMIN_AUTH_COOKIE,
  ADMIN_AUTH_VALUE,
  adminAuthCookie,
} from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/client";

const FALLBACK_USERNAME = "admin";
const FALLBACK_PASSWORD = "aaaa";

function hasPublicSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTarget = () => {
    const next = searchParams.get("next");
    return next && next.startsWith("/admin") ? next : "/admin";
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
          if (hasPublicSupabase()) {
            const supabase = createClient();
            const adminEmail =
              process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@obkladerie.cz";
            const loginEmail =
              username.trim().toLowerCase() === "admin"
                ? adminEmail
                : username.trim();

            const { data, error: authError } =
              await supabase.auth.signInWithPassword({
                email: loginEmail,
                password,
              });

            if (authError) {
              setError("Neplatné uživatelské jméno nebo heslo.");
              return;
            }

            const role = data.user?.app_metadata?.role;
            if (role !== "admin") {
              await supabase.auth.signOut();
              setError("Účet nemá oprávnění administrátora.");
              return;
            }
          } else if (
            process.env.NEXT_PUBLIC_ENABLE_STUB_AUTH === "true" &&
            username === FALLBACK_USERNAME &&
            password === FALLBACK_PASSWORD
          ) {
            document.cookie = adminAuthCookie();
            sessionStorage.setItem(ADMIN_AUTH_COOKIE, ADMIN_AUTH_VALUE);
          } else {
            setError(
              hasPublicSupabase()
                ? "Neplatné uživatelské jméno nebo heslo."
                : "Supabase není nastavené. Pro lokální stub nastav ENABLE_STUB_AUTH=true.",
            );
            return;
          }

          router.push(redirectTarget());
          router.refresh();
        } catch {
          setError("Přihlášení se nepovedlo. Zkus to znovu.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <label className="flex flex-col gap-2 text-sm text-charcoal">
        Uživatelské jméno
        <input
          type="text"
          required
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-charcoal">
        Heslo
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-charcoal"
        />
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 cursor-pointer bg-charcoal px-5 py-3.5 text-sm font-medium tracking-[0.12em] text-white uppercase transition hover:bg-charcoal/90 disabled:opacity-60"
      >
        {loading ? "Přihlašuji…" : "Přihlásit se"}
      </button>
    </form>
  );
}
