"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isAuthConfigured } from "./config";

let cached: ReturnType<typeof createBrowserClient> | null = null;

/** Browser Supabase client, or null when auth isn't configured yet. */
export function getBrowserClient() {
  if (!isAuthConfigured) return null;
  cached ??= createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return cached;
}
