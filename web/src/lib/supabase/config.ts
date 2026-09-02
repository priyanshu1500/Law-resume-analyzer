/**
 * Supabase is optional until the project keys are set. Every auth path
 * checks `isAuthConfigured` first, so the app builds and runs (with the
 * login gate disabled) when the env vars are absent.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isAuthConfigured =
  SUPABASE_URL.startsWith("http") && SUPABASE_ANON_KEY.length > 20;
