"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Throwaway client-side persistence for the prototype. No backend yet —
 * state lives in localStorage so the funnel feels real across
 * questionnaire -> fit -> unlock -> upload -> report.
 */

const KEY = "lexintent.session.v2";

export type CompassResp = Record<string, number | number[]>;

export interface SessionState {
  /** Practice Compass responses, keyed by question id */
  responses: CompassResp;
  /** questionnaire completed at least once */
  fitDone: boolean;
  paid: boolean;
  resumeName: string | null;
}

const EMPTY: SessionState = { responses: {}, fitDone: false, paid: false, resumeName: null };

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

export function useSession() {
  const [state, setState] = useState<SessionState>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<SessionState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      write(next);
      return next;
    });
  }, []);

  const setResponse = useCallback((id: string, value: number | number[]) => {
    setState((prev) => {
      const next = { ...prev, responses: { ...prev.responses, [id]: value } };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    write(EMPTY);
    setState(EMPTY);
  }, []);

  return { state, ready, update, setResponse, reset };
}
