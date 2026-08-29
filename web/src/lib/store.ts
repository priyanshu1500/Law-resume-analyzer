"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Throwaway client-side persistence for the static prototype.
 * No backend yet — answers live in localStorage so the flow feels real
 * across the intake -> unlock -> upload -> report steps.
 */

const KEY = "lexintent.session.v1";

export interface SessionState {
  answers: Record<string, string | string[]>;
  paid: boolean;
  resumeName: string | null;
}

const EMPTY: SessionState = { answers: {}, paid: false, resumeName: null };

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

  const setAnswer = useCallback(
    (id: string, value: string | string[]) => {
      setState((prev) => {
        const next = { ...prev, answers: { ...prev.answers, [id]: value } };
        write(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    write(EMPTY);
    setState(EMPTY);
  }, []);

  return { state, ready, update, setAnswer, reset };
}
