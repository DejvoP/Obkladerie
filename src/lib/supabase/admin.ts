import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getServiceRoleKey, getSupabaseEnv } from "@/lib/supabase/env";

/** Service-role client — only for trusted server/scripts (bypasses RLS). */
export function createAdminClient() {
  const { url } = getSupabaseEnv();
  return createSupabaseClient(url, getServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createMiddlewareClient(
  requestCookies: { getAll: () => { name: string; value: string }[] },
  setAll: (
    cookies: { name: string; value: string; options?: Record<string, unknown> }[],
  ) => void,
) {
  const { url, anonKey } = getSupabaseEnv();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return requestCookies.getAll();
      },
      setAll,
    },
  });
}
