"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "@/components/wordmark";
import { Mark } from "@/components/practice-mark";
import { Q, QMARK, SECTIONS, secOf } from "@/lib/practice-compass/data";
import { q37Stem, selfCheck } from "@/lib/practice-compass/engine";
import { useSession } from "@/lib/store";
import { useAuth } from "@/lib/auth";

/** last question index that stays open to anonymous users (end of section 1) */
const GATE_AFTER = SECTIONS[0].b;

if (process.env.NODE_ENV !== "production") {
  const errs = selfCheck();
  if (errs.length) console.error("Practice Compass instrument errors:", errs);
}

type Ans = number | number[] | undefined;
const arr = (a: Ans): number[] => (a === undefined ? [] : Array.isArray(a) ? a : [a]);
const one = (a: Ans) => (Array.isArray(a) ? a[0] : a);

function answered(q: any, a: Ans) {
  if (q.k === "rate") return a !== undefined;
  if (q.k === "rank") return Array.isArray(a) && a.length === q.n;
  if (q.k === "multi") return Array.isArray(a) && a.length > 0;
  return Array.isArray(a) ? a.length > 0 : a !== undefined;
}

export default function QuestionnairePage() {
  const router = useRouter();
  const { state, ready, setResponse, update } = useSession();
  const { user, configured } = useAuth();
  const gated = configured && !user;
  const [phase, setPhase] = useState<"intro" | "quiz">("intro");
  const [idx, setIdx] = useState(0);
  const [curtain, setCurtain] = useState<null | { mark: string; name: string; line: string }>(null);

  const R = state.responses as Record<string, Ans>;

  // resume where the user left off
  useEffect(() => {
    if (!ready) return;
    let i = 0;
    while (i < Q.length && answered(Q[i], R[Q[i].id])) i++;
    if (i > 0) {
      const cap = gated ? Math.min(i, GATE_AFTER + 1) : i;
      setIdx(Math.min(cap, Q.length - 1));
      setPhase("quiz");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, gated]);

  const q = Q[idx];
  const sec = secOf(idx);
  const a = R[q?.id];
  const total = Q.length;
  const mins = Math.round((total * 17) / 60);

  const showCurtain = (s: typeof SECTIONS[number], hold = 1150) =>
    new Promise<void>((res) => {
      setCurtain({ mark: s.mark, name: s.name, line: s.line });
      window.setTimeout(() => {
        setCurtain(null);
        window.setTimeout(res, 240);
      }, hold);
    });

  async function start() {
    setPhase("quiz");
    await showCurtain(SECTIONS[0]);
    window.scrollTo(0, 0);
  }

  function set(v: number | number[]) {
    setResponse(q.id, v as number | number[]);
  }

  async function next() {
    const before = secOf(idx);
    const ni = idx + 1;
    // login wall after section 1 — answers are already saved locally
    if (gated && ni > GATE_AFTER) {
      router.push(`/login?next=${encodeURIComponent("/questionnaire")}`);
      return;
    }
    if (ni >= Q.length) {
      update({ fitDone: true });
      router.push("/fit");
      return;
    }
    const after = secOf(ni);
    setIdx(ni);
    if (after.id !== before.id) await showCurtain(after);
    window.scrollTo(0, 0);
  }
  function back() {
    if (idx > 0) {
      setIdx(idx - 1);
      window.scrollTo(0, 0);
    }
  }

  const pct = useMemo(() => (100 * idx) / total, [idx, total]);

  /* ---- intro ---- */
  if (phase === "intro") {
    return (
      <Shell>
        <div className="mx-auto max-w-[680px] px-6 py-[clamp(3rem,10vh,6rem)]">
          <p className="u-eyebrow">Practice Compass</p>
          <h1 className="u-display mt-4 text-[clamp(2rem,5vw,3.2rem)] [text-wrap:balance]">
            Which kind of law suits the way you actually work?
          </h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            Questions about how you like to spend a day — not about marks, college, or
            where you interned. Then eighteen practice areas, ranked, with the reason for
            each one.
          </p>
          <button
            onClick={start}
            className="mt-8 press rounded-[14px] bg-navy px-8 py-4 text-[0.9375rem] font-semibold text-white transition-transform hover:-translate-y-px"
          >
            Start
          </button>
          <p className="mt-4 text-[0.8125rem] text-muted">
            {total} questions · about {mins} minutes · nothing is stored
          </p>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-[0.8125rem] text-muted">
            <span><b className="text-ink">18</b> practice areas</span>
            <span><b className="text-ink">9</b> ways of working</span>
            <span><b className="text-ink">0</b> right answers</span>
          </div>
        </div>
        {curtain && <Curtain {...curtain} />}
      </Shell>
    );
  }

  /* ---- login wall (after section 1) ---- */
  if (gated && idx > GATE_AFTER) {
    return (
      <Shell>
        <div className="mx-auto max-w-[560px] px-6 py-[clamp(3rem,10vh,6rem)]">
          <p className="u-eyebrow">Section 1 complete</p>
          <h1 className="u-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)] [text-wrap:balance]">
            Sign in to finish the questionnaire.
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-muted">
            Your first {GATE_AFTER + 1} answers are saved. Signing in lets you finish the
            remaining sections and come back to your result on any device — the result
            itself is calculated from your answers exactly the same way.
          </p>
          <Link
            href={`/login?next=${encodeURIComponent("/questionnaire")}`}
            className="btn btn-navy mt-7"
          >
            Sign in to continue
            <ArrowRightIcon size={15} weight="bold" />
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---- quiz ---- */
  const stem = q.q === "__DYNAMIC__" ? q37Stem(state.responses as any) : q.q;

  return (
    <Shell
      top={
        <div className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-[680px] items-center justify-between gap-4 px-6 py-3">
            <span className="truncate text-[0.75rem] font-medium text-muted">
              <b className="text-ink">{sec.name}</b>
            </span>
            <span className="shrink-0 text-[0.75rem] tabular-nums text-muted">
              {idx + 1} of {total}
            </span>
          </div>
          <div className="h-[2px] bg-line">
            <div
              className="h-[2px] bg-navy transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      }
    >
      <div className="mx-auto max-w-[680px] px-6 pb-24 pt-6">
        <Mark name={QMARK[q.id] || "book"} size={46} className="mb-3 text-muted" />
        <h2 className="text-[clamp(1.25rem,3.4vw,1.6rem)] leading-[1.32] text-ink [text-wrap:pretty]">
          {stem}
        </h2>
        {q.help && <p className="mt-2 text-[0.875rem] text-muted">{q.help}</p>}
        {q.k === "multipick" && <Pill>Pick up to {q.max} · best first</Pill>}
        {q.k === "multi" && <Pill>Any that apply</Pill>}
        {q.k === "rank" && (
          <p className="mt-2 text-[0.875rem] text-muted">
            Tap in order, best first. Tap again to remove.{" "}
            <b className="text-ink">{arr(a).length} of {q.n}</b> chosen.
          </p>
        )}

        <div className="mt-5">
          <Field q={q} a={a} set={set} />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <button
            onClick={back}
            disabled={idx === 0}
            className="flex items-center gap-2 text-[0.875rem] text-muted disabled:opacity-30"
          >
            <ArrowLeftIcon size={14} weight="bold" /> Back
          </button>
          <button
            onClick={next}
            disabled={!answered(q, a)}
            className="press flex items-center gap-2 rounded-[14px] bg-navy px-6 py-3 text-[0.8125rem] font-semibold text-white transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-30"
          >
            {idx === total - 1 ? "See my result" : "Continue"}
            <ArrowRightIcon size={13} weight="bold" />
          </button>
        </div>
      </div>
      {curtain && <Curtain {...curtain} />}
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

function Shell({
  children,
  top,
}: {
  children: React.ReactNode;
  top?: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-white">
      <div className="border-b border-line">
        <div className="mx-auto max-w-[680px] px-6 py-3">
          <Link href="/">
            <Wordmark size="sm" />
          </Link>
        </div>
      </div>
      {top}
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-3 inline-block border border-navy px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-navy">
      {children}
    </span>
  );
}

function Curtain({ mark, name, line }: { mark: string; name: string; line: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white motion-safe:animate-[fadein_.3s_ease]">
      <div className="px-6 text-center">
        <Mark name={mark} size={74} className="mx-auto text-navy" />
        <div className="mt-5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-muted">
          {name}
        </div>
        <div className="u-display mt-2 text-[clamp(1.5rem,4.4vw,2rem)]">{line}</div>
      </div>
    </div>
  );
}

/* ---- field renderers ---- */
function Field({
  q,
  a,
  set,
}: {
  q: any;
  a: Ans;
  set: (v: number | number[]) => void;
}) {
  const sel = arr(a);

  if (q.k === "pick" || q.k === "multipick") {
    const max = q.k === "multipick" ? q.max : 1;
    const full = sel.length >= max;
    return (
      <div className="flex flex-col gap-2">
        {q.o.map((o: any, i: number) => {
          const on = sel.includes(i);
          const dim = q.k === "multipick" && full && !on;
          const label = o.unc ? "·" : on && q.k === "multipick" ? sel.indexOf(i) + 1 : String.fromCharCode(65 + i);
          return (
            <button
              key={i}
              onClick={() => {
                if (q.k === "pick") return set([i]);
                let c = sel.slice();
                const at = c.indexOf(i);
                if (at >= 0) c.splice(at, 1);
                else if (o.unc || o.excl) c = [i];
                else {
                  c = c.filter((x) => !q.o[x].unc && !q.o[x].excl);
                  if (c.length >= q.max) c.shift();
                  c.push(i);
                }
                set(c);
              }}
              aria-pressed={on}
              className={`flex w-full items-start gap-3 border p-3.5 text-left transition-colors ${
                on ? "border-navy bg-white" : "border-line bg-white hover:border-navy-deep"
              } ${dim ? "opacity-50" : ""} ${o.unc ? "border-dashed bg-transparent" : ""}`}
            >
              <span
                className={`mt-0.5 grid size-[21px] shrink-0 place-items-center rounded-full border text-[0.6875rem] font-semibold ${
                  on ? "border-navy bg-navy text-white" : "border-line text-muted"
                }`}
              >
                {label}
              </span>
              <span className={`text-[0.95rem] leading-[1.45] ${o.unc ? "text-muted" : ""} ${on ? "font-medium" : ""}`}>
                {o.t}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (q.k === "rate") {
    return (
      <div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => set(v)}
              aria-pressed={one(a) === v}
              className={`flex-1 border py-4 text-[0.9375rem] font-semibold transition-colors ${
                one(a) === v
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-muted hover:border-navy-deep"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[0.8125rem] text-muted">
          <span>{q.lo}</span>
          <span>{q.hi}</span>
        </div>
      </div>
    );
  }

  if (q.k === "rank") {
    return (
      <div className="flex flex-col gap-2">
        {q.set.map((s: string, i: number) => {
          const r = sel.indexOf(i);
          return (
            <button
              key={i}
              onClick={() => {
                const c = sel.slice();
                const at = c.indexOf(i);
                if (at >= 0) c.splice(at, 1);
                else if (c.length < q.n) c.push(i);
                set(c);
              }}
              aria-pressed={r >= 0}
              className={`flex w-full items-start gap-3 border p-3.5 text-left transition-colors ${
                r >= 0 ? "border-navy bg-white" : "border-line bg-white hover:border-navy-deep"
              }`}
            >
              <span
                className={`mt-0.5 grid size-[21px] shrink-0 place-items-center border text-[0.6875rem] font-semibold ${
                  r >= 0 ? "border-navy bg-navy text-white" : "border-line text-muted"
                }`}
              >
                {r >= 0 ? r + 1 : ""}
              </span>
              <span className={`text-[0.95rem] leading-[1.45] ${r >= 0 ? "font-medium" : ""}`}>{s}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (q.k === "multi") {
    return (
      <div className="flex flex-wrap gap-2">
        {q.set.map((s: string, i: number) => {
          const on = sel.includes(i);
          return (
            <button
              key={i}
              onClick={() => {
                let c = sel.filter((x) => x !== -1);
                const at = c.indexOf(i);
                if (at >= 0) c.splice(at, 1);
                else c.push(i);
                set(c);
              }}
              aria-pressed={on}
              className={`border px-3.5 py-2.5 text-[0.9rem] transition-colors ${
                on ? "border-navy bg-navy font-medium text-white" : "border-line bg-white hover:border-navy-deep"
              }`}
            >
              {s}
            </button>
          );
        })}
        <button
          onClick={() => set(sel.includes(-1) ? [] : [-1])}
          aria-pressed={sel.includes(-1)}
          className={`border px-3.5 py-2.5 text-[0.9rem] transition-colors ${
            sel.includes(-1) ? "border-navy bg-navy font-medium text-white" : "border-line bg-white hover:border-navy-deep"
          }`}
        >
          {q.none}
        </button>
      </div>
    );
  }

  return null;
}
