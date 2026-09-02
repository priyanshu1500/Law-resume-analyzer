"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getBrowserClient } from "./supabase/client";
import { isAuthConfigured } from "./supabase/config";

type AuthState = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthState>({
  user: null,
  loading: false,
  configured: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isAuthConfigured);

  useEffect(() => {
    const sb = getBrowserClient();
    if (!sb) return;
    let alive = true;
    sb.auth.getUser().then((res: { data: { user: User | null } }) => {
      if (alive) {
        setUser(res.data.user ?? null);
        setLoading(false);
      }
    });
    const { data: sub } = sb.auth.onAuthStateChange(
      (_e: string, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      configured: isAuthConfigured,
      signOut: async () => {
        await getBrowserClient()?.auth.signOut();
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
