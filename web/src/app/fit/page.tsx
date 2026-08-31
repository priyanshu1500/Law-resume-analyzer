import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Band, Button, Eyebrow, Meter, Check } from "@/components/ui";
import { CAREER_FIT } from "@/lib/mock";

/**
 * Free career-fit result. Placeholder scaffold — the ranking, "the life"
 * copy and interest/working-style read are filled in once the scoring
 * system is in (see src/lib/fit.ts). Layout and the hand-off to the
 * ₹99 resume analysis are final.
 */
export default function FitPage() {
  const top = CAREER_FIT.ranked[0]?.path ?? "your best-fit path";

  return (
    <div className="min-h-[100dvh] bg-paper">
      <SiteNav />

      <Band>
        <Eyebrow>Your career fit</Eyebrow>
        <h1 className="u-display mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)] [text-wrap:balance]">
          The law careers that fit how you
          <br />
          think, work and want to live.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          Built from your questionnaire, not your resume. Free, and yours to
          keep.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* ranked matches */}
          <div>
            <Eyebrow muted>Best matches</Eyebrow>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {CAREER_FIT.ranked.map((r, i) => (
                <li key={r.path} className="py-4">
                  <div className="flex items-baseline justify-between">
                    <span className="flex items-baseline gap-3">
                      <span className="u-display text-[1.1rem] text-oxblood">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.95rem] font-semibold text-ink">
                        {r.path}
                      </span>
                    </span>
                    <span className="u-display text-[1.25rem] text-ink">
                      {r.matchPct}
                      <span className="text-[0.7rem] text-muted">%</span>
                    </span>
                  </div>
                  <div className="mt-2">
                    <Meter value={r.matchPct} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* the life */}
          <div className="card-hard p-6">
            <Eyebrow>The life · {top}</Eyebrow>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              {CAREER_FIT.theLife ||
                "What the hours, the setting and the trade-offs of this path actually look like — filled in from your answers."}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow muted>Interest match</Eyebrow>
            <div className="mt-4 space-y-3">
              {(CAREER_FIT.interestMatch.length
                ? CAREER_FIT.interestMatch
                : [
                    { label: "Deal-making", pct: 0 },
                    { label: "Advocacy", pct: 0 },
                    { label: "Policy & systems", pct: 0 },
                  ]
              ).map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-[0.8125rem] text-ink-soft">
                    <span>{m.label}</span>
                    <span className="text-muted">{m.pct}%</span>
                  </div>
                  <div className="mt-1">
                    <Meter value={m.pct} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow muted>How you work</Eyebrow>
            <ul className="mt-4 space-y-2">
              {(CAREER_FIT.workingStyle.length
                ? CAREER_FIT.workingStyle
                : [
                    { axis: "Solo ↔ Team", leaning: "—", note: "from your answers" },
                    { axis: "Detail ↔ Big picture", leaning: "—", note: "from your answers" },
                    { axis: "Advocacy ↔ Advisory", leaning: "—", note: "from your answers" },
                  ]
              ).map((w) => (
                <Check key={w.axis}>
                  <span className="text-ink">{w.axis}</span> — {w.leaning}
                </Check>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      <Band tone="dark">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="u-display max-w-[24ch] text-[clamp(1.8rem,3.6vw,2.6rem)] [text-wrap:balance]">
            Now make your resume argue for {top}.
          </h2>
          <Button href="/unlock">Analyse my resume · ₹99</Button>
        </div>
      </Band>

      <div className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-6 text-[0.75rem] text-muted">
          <Link href="/questionnaire" className="hover:text-ink">
            Re-take the questionnaire
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
