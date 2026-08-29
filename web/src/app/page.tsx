import Image from "next/image";
import Link from "next/link";
import {
  ArticleIcon,
  ChartBarIcon,
  ScalesIcon,
  BriefcaseIcon,
  TrophyIcon,
  PenNibIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/masthead";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Eyebrow, ArrowLink, Meter, Donut } from "@/components/ui";
import { PRICING, SCORE } from "@/lib/mock";

const METHOD = [
  {
    n: "01",
    verb: "Answer",
    body: "Forty-nine intake questions across nine sections: your record, your exposure, your skills, and the seat you are actually aiming at.",
  },
  {
    n: "02",
    verb: "Analyse",
    body: "Upload your resume. It is read line by line against your stated goals and the norms of your target practice area, then scored on five dimensions.",
  },
  {
    n: "03",
    verb: "Advance",
    body: "You receive an editorial report: where you stand, the two or three gaps that matter, and a clear order to fix them in.",
  },
];

const DIMENSIONS = [
  { icon: <ArticleIcon size={18} />, label: "Content Quality", value: 82 },
  { icon: <BriefcaseIcon size={18} />, label: "Legal Experience", value: 74 },
  { icon: <ScalesIcon size={18} />, label: "Skills & Abilities", value: 70 },
  { icon: <TrophyIcon size={18} />, label: "Achievements & Impact", value: 68 },
  { icon: <PenNibIcon size={18} />, label: "Presentation & Clarity", value: 80 },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-paper">
      <Masthead />
      <SiteNav />

      {/* Hero — editorial manifesto, real image ------------------------- */}
      <section className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-10 py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:py-20">
          <div className="flex flex-col justify-center">
            <Eyebrow ox>Overview</Eyebrow>
            <h1 className="u-serif mt-5 text-[2.75rem] leading-[1.02] text-ink sm:text-[3.5rem] lg:text-[4.25rem]">
              Your legal career,
              <br />
              analysed by <span className="text-oxblood italic">AI</span>.
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft">
              A data-driven read of your profile, so you make informed decisions
              and stop guessing at what recruiters see.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/assessment"
                className="border border-ink bg-ink px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper transition-transform active:translate-y-px"
              >
                Begin the intake
              </Link>
              <ArrowLink href="/report">See a sample report</ArrowLink>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full border border-ink">
            <Image
              src="https://picsum.photos/seed/lexintent-colonnade/900/1125?grayscale"
              alt="Classical courthouse colonnade"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Method — numbered editorial columns --------------------------- */}
      <section id="instrument" className="border-t border-ink bg-paper-panel">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <h2 className="u-serif max-w-[24ch] text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
            One instrument, read three ways.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {METHOD.map((m) => (
              <div key={m.n} className="border-t-2 border-ink pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="u-dropnum text-[3rem]">{m.n}</span>
                  <span className="u-serif text-[1.5rem] text-ink">{m.verb}</span>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage — asymmetric: dimensions list + standfirst ---------- */}
      <section id="coverage" className="border-t border-ink">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Eyebrow>What the report measures</Eyebrow>
            <p className="u-serif mt-5 text-[1.75rem] leading-snug text-ink">
              Five dimensions, each scored out of one hundred, each with a written
              verdict you can act on the same afternoon.
            </p>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-soft">
              The number is the hook. The paragraph beneath it is the point:
              specific lines in your resume, what they signal, and the edit that
              changes the signal.
            </p>
          </div>
          <ul className="divide-y divide-rule border-y border-rule">
            {DIMENSIONS.map((d) => (
              <li key={d.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5">
                <span className="text-ink-mute">{d.icon}</span>
                <div>
                  <div className="u-eyebrow text-[0.6875rem]">{d.label}</div>
                  <div className="mt-2 w-full max-w-[220px]">
                    <Meter value={d.value} />
                  </div>
                </div>
                <span className="u-serif text-[1.5rem] text-ink">
                  {d.value}
                  <span className="align-top text-[0.7rem] text-ink-mute">/100</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sample scorecard — real mini component preview -------------- */}
      <section className="border-t border-ink bg-paper-panel">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
            <div>
              <Eyebrow ox>A worked example</Eyebrow>
              <h2 className="u-serif mt-5 text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
                This is what lands in your inbox.
              </h2>
              <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                A headline score and band, the five-dimension breakdown, a
                placement forecast for your target tier, and three written
                sections telling you exactly what to change.
              </p>
              <div className="mt-7">
                <ArrowLink href="/report">Open the full sample</ArrowLink>
              </div>
            </div>

            <div className="w-full max-w-[420px] border border-ink bg-paper-card p-7">
              <div className="u-eyebrow">Your legal career score</div>
              <div className="mt-3 flex items-end justify-between">
                <div className="u-serif text-[4rem] leading-none text-oxblood">
                  {SCORE.overall}
                  <span className="align-top text-[1.1rem] text-ink-mute">/100</span>
                </div>
                <Donut value={68} label="Tier-1 shortlist" size={104} />
              </div>
              <div className="mt-4">
                <Meter value={SCORE.overall} />
              </div>
              <p className="u-serif mt-4 text-[1.05rem] text-ink">{SCORE.band}</p>
              <ul className="mt-5 divide-y divide-rule border-t border-rule text-[0.8125rem]">
                {SCORE.breakdown.map((b) => (
                  <li key={b.key} className="flex items-center justify-between py-2.5">
                    <span className="text-ink-soft">{b.key}</span>
                    <span className="u-serif text-ink">{b.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fees — editorial two-row table ----------------------------- */}
      <section id="fees" className="border-t border-ink">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Eyebrow>Fees</Eyebrow>
          <h2 className="u-serif mt-4 text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
            Pay once for the read. Pay again only if you want us to do the writing.
          </h2>

          <div className="mt-10 border-t-2 border-ink">
            <div className="grid gap-6 border-b border-rule py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <div className="u-serif text-[2rem] text-ink">
                {PRICING.currency}
                {PRICING.analysis.toLocaleString("en-IN")}
              </div>
              <div>
                <div className="u-serif text-[1.25rem] text-ink">Resume analysis &amp; report</div>
                <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  The full intake, the AI analysis, the five-dimension score and
                  the three written sections. Delivered as a report you keep.
                </p>
              </div>
              <Link
                href="/assessment"
                className="whitespace-nowrap border border-ink px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Start here
              </Link>
            </div>

            <div className="grid gap-6 border-b border-rule py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <div className="u-serif text-[2rem] text-ink">
                {PRICING.currency}
                {PRICING.rewrite.toLocaleString("en-IN")}
              </div>
              <div>
                <div className="u-serif text-[1.25rem] text-ink">Full rewrite by the LexIntent desk</div>
                <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  Optional. After your report, our editors rebuild the document
                  around the findings and send you two rounds of revisions.
                </p>
              </div>
              <span className="whitespace-nowrap px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
                Offered after the report
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing band ---------------------------------------------- */}
      <section className="on-dark border-t border-ink bg-ink">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="u-serif max-w-[20ch] text-[1.75rem] leading-tight sm:text-[2.25rem]">
            Find out what your resume is really saying.
          </h2>
          <Link
            href="/assessment"
            className="border border-paper bg-paper px-7 py-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-transform active:translate-y-px"
          >
            Begin the intake
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
