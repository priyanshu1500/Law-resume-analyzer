import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isAuthConfigured } from "./config";

/**
 * Cookie attributes shared by every Supabase client in this app.
 * `httpOnly` is intentionally left at the library default (false) — the
 * browser client (client.ts) needs to read this same cookie for client-side
 * session refresh, which is how @supabase/ssr's cookie-based auth works.
 * XSS-via-cookie-theft is mitigated elsewhere (CSP headers, Phase 8), not
 * here. `secure` is forced in production so the cookie never travels over
 * plain HTTP; left off in dev so `next dev` (http://localhost) still works.
 */
export const COOKIE_OPTIONS = {
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

/** Server Supabase client bound to the request cookies, or null when unconfigured. */
export async function getServerClient() {
  if (!isAuthConfigured) return null;
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookieOptions: COOKIE_OPTIONS,
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          /* called from a Server Component — middleware refreshes instead */
        }
      },
    },
  });
}

/** Admin client (service role) for trusted server writes. Null when unconfigured. */
export function getAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!isAuthConfigured || key.length < 20) return null;
  return createServerClient(SUPABASE_URL, key, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}
