import Link from "next/link";
import {
  LockKeyIcon,
  ScalesIcon,
  NotePencilIcon,
  MapPinLineIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/masthead";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Eyebrow, ArrowLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { AnnotatedResume } from "@/components/annotated-resume";
import { ScoreCard } from "@/components/score-card";
import { ReportSpread } from "@/components/report-spread";
import { PRICING } from "@/lib/mock";

const TRUST = [
  { icon: LockKeyIcon, label: "Your data stays private", note: "Read once to write your report. Never sold, never used for training." },
  { icon: ScalesIcon, label: "Built with lawyers", note: "The rubric was written with practising Indian advocates and recruiters." },
  { icon: NotePencilIcon, label: "Human-guided AI", note: "The model follows an editorial checklist, not a black box." },
  { icon: MapPinLineIcon, label: "Designed for Indian law", note: "NLU cycles, chambers, tier structure, bar enrolment, the local reality." },
];

const METHOD = [
  { n: "01", verb: "Answer", body: "A 49-question intake across nine sections: your record, your exposure, your skills, and the seat you are actually aiming at." },
  { n: "02", verb: "Analyse", body: "Your resume is read line by line against those answers and the norms of your target practice area, then scored on five dimensions." },
  { n: "03", verb: "Advance", body: "You receive the five-page report: a score, the recruiter read, the signals you are missing, and a 90-day plan." },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-paper">
      <Masthead tagline="Legal Career Intelligence" index="VOL. I / NO. 07" />
      <SiteNav />

      {/* HERO -------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-14 py-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-20">
          <Reveal className="flex flex-col justify-center">
            <Eyebrow ox>Editorial Report</Eyebrow>
            <h1 className="u-serif mt-5 text-[2.6rem] leading-[1.03] text-ink sm:text-[3.35rem] lg:text-[4rem]">
              Your legal career, analysed like a{" "}
              <span className="ink-underline">recruiter</span>.
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Upload your resume. Our AI reviews it the way Indian law firms and
              chambers actually do, then returns a score, recruiter insights, the
              signals you are missing, and a practical roadmap.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/assessment"
                className="border border-ink bg-ink px-6 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper transition-transform active:translate-y-px"
              >
                Analyse my resume
              </Link>
              <ArrowLink href="/report">Read a sample report</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={140} className="relative flex flex-col items-center justify-center">
            <AnnotatedResume />
            <ScoreCard className="mt-8 lg:absolute lg:bottom-[-3.75rem] lg:left-[-7.5rem] lg:mt-0" />
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP ---------------------------------------------- */}
      <section className="border-y border-ink bg-paper-panel">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-rule px-6 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {TRUST.map(({ icon: Icon, label, note }, i) => (
            <Reveal
              key={label}
              delay={i * 70}
              className="px-0 py-7 sm:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <Icon size={24} weight="regular" className="text-ink" />
              <div className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink">
                {label}
              </div>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-mute">
                {note}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RECRUITER'S NOTES — editorial passage ------------------- */}
      <section className="border-b border-ink">
        <div className="relative mx-auto max-w-[1400px] px-6 py-16">
          <span className="absolute left-6 top-16 hidden text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-ink-mute lg:block">
            Recruiter&rsquo;s Notes
          </span>
          <div className="mx-auto max-w-[62ch] lg:ml-[16%]">
            <p className="u-serif text-[1.6rem] leading-[1.4] text-ink">
              A recruiter spends about ninety seconds with your resume. They are
              not reading it. They are scanning for four or five signals that
              tell them whether you can do the work.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              Most law-student resumes list where they were, not what they did.
              They bury the one strong internship under three weak ones. They
              claim drafting and research without a single line that evidences
              either. LexIntent reads for those signals first, tells you which
              ones are missing, and shows you the edit that fixes each.
            </p>
          </div>
        </div>
      </section>

      {/* REPORT SPREAD ----------------------------------------- */}
      <section id="report" className="border-b border-ink bg-paper-panel">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Reveal>
            <Eyebrow>The Report</Eyebrow>
            <h2 className="u-serif mt-4 max-w-[20ch] text-[2rem] leading-tight text-ink sm:text-[2.6rem]">
              Five pages. One honest read.
            </h2>
            <p className="mt-5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              Delivered as a set of printed-style pages you keep, not a
              dashboard you rent. Re-run it after you revise.
            </p>
          </Reveal>
          <div className="mt-12">
            <ReportSpread />
          </div>
        </div>
      </section>

      {/* METHOD ---------------------------------------------- */}
      <section id="method" className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Reveal>
            <h2 className="u-serif max-w-[22ch] text-[2rem] leading-tight text-ink sm:text-[2.6rem]">
              How the read is done.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {METHOD.map((m, i) => (
              <Reveal key={m.n} delay={i * 90} className="border-t-2 border-ink pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="u-dropnum text-[3rem]">{m.n}</span>
                  <span className="u-serif text-[1.5rem] text-ink">{m.verb}</span>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {m.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEES ---------------------------------------------- */}
      <section id="fees" className="border-b border-ink bg-paper-panel">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Reveal>
            <Eyebrow>Fees</Eyebrow>
            <h2 className="u-serif mt-4 max-w-[26ch] text-[2rem] leading-tight text-ink sm:text-[2.6rem]">
              Pay once for the read. Pay again only if you want the rewrite.
            </h2>
          </Reveal>

          <div className="mt-10 border-t-2 border-ink">
            <div className="grid gap-6 border-b border-rule py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <div className="u-serif text-[2rem] text-ink">
                {PRICING.currency}
                {PRICING.analysis.toLocaleString("en-IN")}
              </div>
              <div>
                <div className="u-serif text-[1.25rem] text-ink">
                  Resume analysis &amp; five-page report
                </div>
                <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  The full intake, the AI analysis, the score, the recruiter
                  read, missing signals and your 90-day roadmap.
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
                <div className="u-serif text-[1.25rem] text-ink">
                  Full rewrite by the LexIntent desk
                </div>
                <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  Optional. After your report, our editors rebuild the document
                  around the findings, with two rounds of revisions.
                </p>
              </div>
              <span className="whitespace-nowrap px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
                Offered after the report
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING ---------------------------------------------- */}
      <section className="on-dark border-b border-ink bg-ink">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="u-serif max-w-[22ch] text-[1.9rem] leading-tight sm:text-[2.4rem]">
            Open the report on your own future.
          </h2>
          <Link
            href="/assessment"
            className="whitespace-nowrap border border-paper bg-paper px-7 py-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-transform active:translate-y-px"
          >
            Analyse my resume
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
