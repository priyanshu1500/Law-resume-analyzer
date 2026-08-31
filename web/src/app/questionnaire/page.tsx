"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/masthead";
import { Wordmark } from "@/components/wordmark";
import { SECTIONS, TOTAL_QUESTIONS, type Question } from "@/lib/questions";
import { useSession } from "@/lib/store";

export default function AssessmentPage() {
  const router = useRouter();
  const { state, ready, setAnswer } = useSession();
  const [step, setStep] = useState(0);

  const section = SECTIONS[step];
  const answeredCount = useMemo(
    () =>
      SECTIONS.flatMap((s) => s.questions).filter((q) => {
        const v = state.answers[q.id];
        return Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim());
      }).length,
    [state.answers],
  );

  const sectionComplete = section.questions.every((q) => {
    if (q.optional) return true;
    const v = state.answers[q.id];
    return Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim());
  });

  const isLast = step === SECTIONS.length - 1;

  function next() {
    if (isLast) {
      router.push("/fit");
      return;
    }
    setStep((s) => Math.min(SECTIONS.length - 1, s + 1));
    window.scrollTo({ top: 0 });
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0 });
  }

  const pct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  return (
    <div className="min-h-[100dvh] bg-paper">
      <Masthead tagline="Intake in progress" index={`SECTION ${section.index} / 09`} />

      <div className="border-b border-ink bg-paper">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <Link href="/">
            <Wordmark compact />
          </Link>
          <div className="flex items-center gap-4">
            <span className="u-eyebrow hidden sm:inline">
              {answeredCount} of {TOTAL_QUESTIONS} answered
            </span>
            <div className="h-[6px] w-40 bg-track">
              <div className="h-full bg-oxblood transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* section standfirst */}
          <aside className="md:sticky md:top-10 md:self-start">
            <div className="u-dropnum text-[4rem]">{section.index}</div>
            <h1 className="u-serif mt-2 text-[2rem] leading-tight text-ink">
              {section.title}
            </h1>
            <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              {section.standfirst}
            </p>
            <ol className="mt-8 space-y-1.5 text-[0.75rem] uppercase tracking-[0.12em]">
              {SECTIONS.map((s, i) => (
                <li
                  key={s.id}
                  className={
                    i === step
                      ? "text-oxblood"
                      : i < step
                        ? "text-ink-mute"
                        : "text-ink-mute/50"
                  }
                >
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    className="flex items-center gap-2 disabled:cursor-default"
                    disabled={i > step}
                  >
                    <span className="tabular-nums">{s.index}</span>
                    {s.title}
                    {i < step && <CheckIcon size={11} weight="bold" />}
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          {/* questions */}
          <div>
            {ready && (
              <ol className="divide-y-2 divide-ink border-t-2 border-ink">
                {section.questions.map((q, i) => (
                  <li key={q.id} className="py-8">
                    <div className="flex gap-4">
                      <span className="u-serif text-[1.1rem] text-oxblood">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p className="u-serif text-[1.25rem] leading-snug text-ink">
                          {q.prompt}
                          {q.optional && (
                            <span className="ml-2 align-middle text-[0.6875rem] uppercase tracking-[0.14em] text-ink-mute">
                              optional
                            </span>
                          )}
                        </p>
                        {q.help && (
                          <p className="mt-1.5 text-[0.8125rem] italic text-ink-mute">
                            {q.help}
                          </p>
                        )}
                        <div className="mt-4">
                          <Field
                            q={q}
                            value={state.answers[q.id]}
                            onChange={(v) => setAnswer(q.id, v)}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-10 flex items-center justify-between border-t border-rule pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="u-link disabled:opacity-30"
              >
                <ArrowLeftIcon size={13} weight="bold" />
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!sectionComplete}
                className="flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper transition-transform active:translate-y-px disabled:cursor-not-allowed disabled:opacity-30"
              >
                {isLast ? "Finish & continue" : "Next section"}
                <ArrowRightIcon size={13} weight="bold" />
              </button>
            </div>
            {!sectionComplete && (
              <p className="mt-3 text-right text-[0.75rem] italic text-ink-mute">
                Answer the required questions in this section to continue.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  q,
  value,
  onChange,
}: {
  q: Question;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  if (q.type === "single") {
    return (
      <div className="flex flex-wrap gap-2">
        {q.options!.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`border px-4 py-2 text-[0.875rem] transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule-strong text-ink-soft hover:border-ink"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  if (q.type === "multi") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div className="flex flex-wrap gap-2">
        {q.options!.map((opt) => {
          const active = arr.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() =>
                onChange(
                  active ? arr.filter((x) => x !== opt) : [...arr, opt],
                )
              }
              className={`flex items-center gap-2 border px-4 py-2 text-[0.875rem] transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule-strong text-ink-soft hover:border-ink"
              }`}
            >
              {active && <CheckIcon size={12} weight="bold" />}
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  if (q.type === "scale") {
    const current = value ? Number(value) : 0;
    return (
      <div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(String(n))}
              aria-label={`${n} of 5`}
              className={`h-10 flex-1 border text-[0.8125rem] transition-colors ${
                current === n
                  ? "border-ink bg-oxblood text-paper"
                  : "border-rule-strong text-ink-mute hover:border-ink"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[0.6875rem] uppercase tracking-[0.12em] text-ink-mute">
          <span>{q.scaleLabels?.[0]}</span>
          <span>{q.scaleLabels?.[1]}</span>
        </div>
      </div>
    );
  }

  if (q.type === "number") {
    return (
      <input
        type="number"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-40 border border-rule-strong bg-paper-card px-3 py-2 text-[0.9375rem] text-ink outline-none focus:border-ink"
      />
    );
  }

  return (
    <textarea
      rows={3}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer"
      className="w-full resize-y border border-rule-strong bg-paper-card px-3 py-2.5 text-[0.9375rem] leading-relaxed text-ink outline-none placeholder:text-ink-mute/60 focus:border-ink"
    />
  );
}
