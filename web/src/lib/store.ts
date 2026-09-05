"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "./auth";
import type { Findings } from "./resume-analysis/types";

/**
 * Client-side session state. Anonymous progress lives in localStorage;
 * once signed in it is also synced to Supabase (via /api/responses) so the
 * user can resume on another device. The scoring engine reads `responses`
 * either way and is unaffected by auth.
 */

const KEY = "lexintent.session.v2";

export type CompassResp = Record<string, number | number[]>;

export interface SessionState {
  responses: CompassResp;
  fitDone: boolean;
  paid: boolean;
  resumeName: string | null;
  /** Real, deterministic resume-analysis output (Phase 2 engine). Lives only
   * in localStorage for now — no server persistence until Phase 5 (upload
   * pipeline security) lands. Null until a resume has actually been analyzed. */
  findings: Findings | null;
}

const EMPTY: SessionState = { responses: {}, fitDone: false, paid: false, resumeName: null, findings: null };

function read(): SessionState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: SessionState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode / quota — degrade silently */
  }
}

async function push(patch: { responses?: CompassResp; fitDone?: boolean }) {
  try {
    await fetch("/api/responses", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
  } catch {
    /* offline / not configured — localStorage still holds the truth */
  }
}

export function useSession() {
  const { user } = useAuth();
  const [state, setState] = useState<SessionState>(EMPTY);
  const [ready, setReady] = useState(false);
  const merged = useRef(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  // on sign-in: push local answers up (server merges), then adopt the merged set
  useEffect(() => {
    if (!user || merged.current) return;
    merged.current = true;
    (async () => {
      try {
        const local = read();
        const res = await fetch("/api/responses", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ responses: local.responses, fitDone: local.fitDone }),
        });
        const json = await res.json();
        if (json?.responses) {
          setState((prev) => {
            const next = { ...prev, responses: { ...prev.responses, ...json.responses } };
            write(next);
            return next;
          });
        }
      } catch {
        /* ignore */
      }
    })();
  }, [user]);

  const update = useCallback(
    (patch: Partial<SessionState>) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        write(next);
        return next;
      });
      if (user && (patch.fitDone !== undefined || patch.responses)) {
        push({ fitDone: patch.fitDone, responses: patch.responses });
      }
    },
    [user],
  );

  const setResponse = useCallback(
    (id: string, value: number | number[]) => {
      setState((prev) => {
        const next = { ...prev, responses: { ...prev.responses, [id]: value } };
        write(next);
        return next;
      });
      if (user) {
        if (debounce.current) clearTimeout(debounce.current);
        debounce.current = setTimeout(() => push({ responses: { [id]: value } }), 900);
      }
    },
    [user],
  );

  const reset = useCallback(() => {
    write(EMPTY);
    setState(EMPTY);
  }, []);

  return { state, ready, update, setResponse, reset };
}
