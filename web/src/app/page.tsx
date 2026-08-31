import Link from "next/link";
import {
  ShieldCheckIcon,
  LockSimpleIcon,
  CheckCircleIcon,
  ListChecksIcon,
  CrosshairIcon,
  FileTextIcon,
} from "@phosphor-icons/react/dist/ssr";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Band, Button, Eyebrow, Check, TrustItem } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { WordReveal, Parallax, Settle } from "@/components/motion-bits";
import { ExhibitStack } from "@/components/exhibit-stack";
import { ScoreCard } from "@/components/score-card";
import { EditorialStamp } from "@/components/editorial-stamp";
import { ReportPreviewCard } from "@/components/report-preview";
import { PageStack } from "@/components/page-stack";
import { Testimonials } from "@/components/testimonials";
import { PRICING } from "@/lib/mock";

const STEPS = [
  {
    n: "01",
    label: "Answer",
    icon: ListChecksIcon,
    body: "49 questions across 9 sections reveal what you're actually optimizing for.",
  },
  {
    n: "02",
    label: "Analyse",
    icon: CrosshairIcon,
    body: "Your resume is scored against five hiring signals recruiters notice first.",
  },
  {
    n: "03",
    label: "Advance",
    icon: FileTextIcon,
    body: "Get a newsroom-style report with your score, missing signals, and next steps.",
  },
];

const SAMPLE_CHECKS = [
  "Career Score",
  "Placement Forecast",
  "Recruiter's Read",
  "90-Day Roadmap",
  "Missing Signals",
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-paper">
      <SiteNav />

      {/* HERO ----------------------------------------------------- */}
      <Band>
        <div className="grid gap-14 lg:grid-cols-[1.06fr_0.9fr] lg:gap-10">
          <div className="flex flex-col justify-center">
            <h1 className="u-display text-[clamp(2.4rem,4.7vw,3.7rem)]">
              <span className="block">
                <WordReveal text="Your legal career," />
              </span>
              <span className="block">
                <WordReveal text="analysed like a" delay={0.25} />
              </span>
              <span className="block">
                <WordReveal text="recruiter" highlight="recruiter" delay={0.5} />.
              </span>
            </h1>
            <Reveal delay={650}>
              <p className="mt-7 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                We simulate how recruiters read your resume, score it across 5
                hiring signals, and show you exactly what to fix to get
                shortlisted.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/questionnaire">Take the Questionnaire</Button>
                <Button href="/fit" variant="outline">
                  See a Sample Fit
                </Button>
              </div>
            </Reveal>
            <RevealGroup className="mt-10 flex flex-wrap gap-x-10 gap-y-4" stagger={0.09} delay={0.8}>
              <RevealItem>
                <TrustItem
                  icon={<ShieldCheckIcon size={18} />}
                  title="Confidential"
                  sub="Your data is safe"
                />
              </RevealItem>
              <RevealItem>
                <TrustItem
                  icon={<LockSimpleIcon size={18} />}
                  title="Secure Upload"
                  sub="256-bit encryption"
                />
              </RevealItem>
              <RevealItem>
                <TrustItem
                  icon={<CheckCircleIcon size={18} />}
                  title="No Subscription"
                  sub="Pay once. That's it."
                />
              </RevealItem>
            </RevealGroup>
          </div>

          <div className="relative flex flex-col items-center justify-center pb-4 lg:pb-16 lg:pr-10">
            <Parallax distance={32}>
              <ExhibitStack />
            </Parallax>
            <Settle className="mt-8 lg:absolute lg:-bottom-2 lg:-right-4 lg:mt-0">
              <ScoreCard />
            </Settle>
          </div>
        </div>
      </Band>

      {/* HOW IT WORKS ------------------------------------------- */}
      <Band tone="dark" id="how">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <Reveal>
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="u-display mt-4 text-[clamp(2rem,4.4vw,3.25rem)]">
              One instrument,
              <br />
              read <span className="text-oxblood">three</span> ways.
            </h2>
          </Reveal>

          <RevealGroup className="grid gap-8 sm:grid-cols-[1fr_1fr_1fr_auto] sm:gap-6" stagger={0.1}>
            {STEPS.map(({ n, label, icon: Icon, body }) => (
              <RevealItem
                key={n}
                className="sm:border-l sm:border-rule sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
              >
                <Icon size={26} weight="regular" className="text-ink" />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="u-display text-[1.75rem] text-oxblood">{n}</span>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink">
                    {label}
                  </span>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                  {body}
                </p>
              </RevealItem>
            ))}
            <RevealItem className="hidden items-center justify-center pr-2 sm:flex">
              <EditorialStamp size={104} />
            </RevealItem>
          </RevealGroup>
        </div>
      </Band>

      {/* SAMPLE REPORT PREVIEW -------------------------------- */}
      <Band id="sample">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Sample Report Preview</Eyebrow>
            <h2 className="u-display mt-4 text-[clamp(1.9rem,4.2vw,3rem)]">
              The number is the <span className="text-oxblood">hook</span>. The
              paragraph beneath it is the <span className="text-oxblood">point</span>.
            </h2>
            <p className="mt-6 text-[0.875rem] font-bold uppercase tracking-[0.1em] text-ink">
              This is what lands in your inbox.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {SAMPLE_CHECKS.map((c) => (
                <Check key={c}>{c}</Check>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/report" variant="outline">
                View Full Sample Report
              </Button>
            </div>
          </Reveal>

          <Reveal delay={140} className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <ReportPreviewCard />
            </div>
            <PageStack />
          </Reveal>
        </div>
      </Band>

      {/* PRICING --------------------------------------------- */}
      <Band tone="dark" id="pricing">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="u-display mt-4 text-[clamp(2rem,4.4vw,3.25rem)]">
              Pay <span className="text-oxblood">once</span> for the read. Pay
              again only if you want us to do{" "}
              <span className="ink-underline">the writing</span>.
            </h2>
          </Reveal>

          <Reveal className="border-t-2 border-ink">
            <div className="grid gap-4 border-b border-rule py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <div className="u-display text-[2rem] text-oxblood">
                {PRICING.currency}
                {PRICING.analysis}
              </div>
              <div>
                <div className="u-display text-[1.15rem] text-ink">Resume Analysis</div>
                <p className="mt-1 max-w-[54ch] text-[0.875rem] leading-relaxed text-muted">
                  Score, recruiter&rsquo;s read, missing signals, line-by-line
                  fixes and a 90-day roadmap. You make the edits.
                </p>
              </div>
              <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-oxblood">
                Start here
              </span>
            </div>
            <div className="grid gap-4 border-b border-rule py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <div className="u-display text-[2rem] text-oxblood">
                {PRICING.currency}
                {PRICING.rewrite}
              </div>
              <div>
                <div className="u-display text-[1.15rem] text-ink">Done-for-you Rewrite</div>
                <p className="mt-1 max-w-[54ch] text-[0.875rem] leading-relaxed text-muted">
                  Our desk rebuilds the resume around the findings, with two
                  rounds of revisions.
                </p>
              </div>
              <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted">
                After your report
              </span>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* TESTIMONIALS -------------------------------------- */}
      <Band>
        <Reveal>
          <Testimonials />
        </Reveal>
      </Band>

      <SiteFooter />
    </div>
  );
}
