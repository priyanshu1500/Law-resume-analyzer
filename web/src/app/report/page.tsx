import { SiteNav } from "@/components/site-nav";
import { Eyebrow, ArrowLink, Meter, Donut, CheckRow } from "@/components/ui";
import { ScoreCounter, PageTurn, InkSpread } from "@/components/motion-bits";
import {
  SCORE,
  FORECAST,
  CAREER_PATH,
  STRENGTHS,
  IMPROVEMENTS,
  REPORT_SECTIONS,
  PRICING,
} from "@/lib/mock";

export default function ReportPage() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <SiteNav />
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-[1180px] items-center justify-end px-6 py-3">
          <ArrowLink href="/results">Open results</ArrowLink>
        </div>
      </div>

      <main className="mx-auto max-w-[1180px] px-6">
        {/* Title block ------------------------------------------------ */}
        <section className="grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div className="flex flex-col justify-center">
            <Eyebrow ox>Resume analysis</Eyebrow>
            <h1 className="u-display mt-4 text-[2.75rem] leading-[1.03] text-ink sm:text-[3.5rem]">
              Where you stand, and what to change first.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">
              {SCORE.note}
            </p>
          </div>
          <div className="border border-line bg-white p-8">
            <Eyebrow>Your legal career score</Eyebrow>
            <div className="u-display mt-3 text-[5rem] leading-none text-evidence">
              <ScoreCounter to={SCORE.overall} />
              <span className="align-top text-[1.4rem] text-muted">/100</span>
            </div>
            <p className="u-display mt-1 text-[1.25rem] text-ink">{SCORE.band}</p>
            <div className="mt-4">
              <Meter value={SCORE.overall} />
              <div className="mt-1 flex justify-between text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </section>

        {/* Score breakdown ----------------------------------------- */}
        <section className="border-t border-line py-12">
          <Eyebrow>Score breakdown</Eyebrow>
          <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {SCORE.breakdown.map((b) => (
              <div key={b.key}>
                <div className="u-eyebrow text-[0.625rem] leading-tight">{b.key}</div>
                <div className="u-display mt-2 text-[2.5rem] leading-none text-ink">
                  {b.value}
                  <span className="align-top text-[0.75rem] text-muted">/100</span>
                </div>
                <div className="mt-3">
                  <Meter value={b.value} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Forecast + career path -------------------------------- */}
        <section className="grid gap-12 border-t border-line py-12 md:grid-cols-2 md:gap-16">
          <div className="flex items-start gap-8">
            <Donut value={FORECAST.chance} label={FORECAST.target} size={132} />
            <div>
              <Eyebrow>Placement forecast</Eyebrow>
              <p className="u-display mt-3 text-[1.75rem] leading-tight text-ink">
                {FORECAST.verdict} of a {FORECAST.target} shortlist.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {FORECAST.detail}
              </p>
            </div>
          </div>
          <div className="border-l border-line pl-8">
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-gold text-[2.5rem]">01</span>
              <Eyebrow>Suggested direction</Eyebrow>
            </div>
            <p className="u-display mt-2 text-[1.75rem] text-ink">
              {CAREER_PATH.area}{" "}
              <span className="text-evidence">/ {CAREER_PATH.match}% match</span>
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {CAREER_PATH.rationale}
            </p>
          </div>
        </section>

        {/* Strengths / improvements ----------------------------- */}
        <section className="grid gap-12 border-t border-line py-12 md:grid-cols-2 md:gap-16">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-gold text-[2.5rem]">02</span>
              <Eyebrow>Key strengths</Eyebrow>
            </div>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {STRENGTHS.map((s) => (
                <CheckRow key={s}>{s}</CheckRow>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-gold text-[2.5rem]">03</span>
              <Eyebrow ox>Fix in this order</Eyebrow>
            </div>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {IMPROVEMENTS.map((s, i) => (
                <li key={s} className="flex items-start gap-3 py-2.5 text-[0.9375rem] text-muted">
                  <span className="u-display text-navy">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Written sections ------------------------------------ */}
        {REPORT_SECTIONS.map((sec) => (
          <PageTurn key={sec.id}>
            <article className="grid gap-8 border-t border-line py-12 md:grid-cols-[0.4fr_1.6fr] md:gap-12">
              <div>
                <span className="font-bold text-gold text-[3.5rem]">{sec.index}</span>
                <h2 className="u-display mt-2 text-[1.5rem] leading-tight text-ink">
                  {sec.title}
                </h2>
                <p className="mt-2 text-[0.8125rem] italic text-evidence">
                  {sec.verdict}
                </p>
              </div>
              <div>
                <p className="u-display text-[1.2rem] leading-relaxed text-ink">
                  {sec.body}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4 text-[0.875rem] text-muted">
                  {sec.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span aria-hidden className="mt-[0.4rem] size-[5px] shrink-0 rounded-full bg-muted" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </PageTurn>
        ))}

        {/* Rewrite upsell ------------------------------------- */}
        <InkSpread className="my-12 border border-line bg-ink px-8 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[46ch]">
              <Eyebrow className="!text-gold">Optional next step</Eyebrow>
              <h2 className="u-display mt-3 text-[1.75rem] leading-tight !text-white">
                Want our editors to rebuild it around these findings?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">
                The LexIntent desk rewrites your resume against every point above
                and sends you two rounds of revisions.
              </p>
            </div>
            <div className="shrink-0">
              <div className="u-display text-[2.5rem] leading-none text-white">
                {PRICING.currency}
                {PRICING.rewrite.toLocaleString("en-IN")}
              </div>
              <button className="mt-3 w-full border border-white/30 bg-white px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-transform active:translate-y-px">
                Commission the rewrite
              </button>
            </div>
          </div>
        </InkSpread>

        <div className="border-t border-line py-8">
          <ArrowLink href="/results">Continue to your results</ArrowLink>
        </div>
      </main>
    </div>
  );
}
