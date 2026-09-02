import Link from "next/link";
import { LockSimpleIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HeroCluster } from "@/components/hero-cluster";
import { HowItWorks } from "@/components/sections";
import { DotGrid } from "@/components/illus";
import { PRICING } from "@/lib/mock";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <SiteNav />

      {/* HERO ---------------------------------------------------- */}
      <section className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-center gap-10 py-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-[1fr_1fr] lg:gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-navy">
              <SparkleIcon size={12} weight="fill" className="text-gold" />
              AI Powered
            </span>
            <h1 className="u-display mt-5 text-[clamp(2.75rem,7vw,4.75rem)]">
              <span className="block text-navy">Understand.</span>
              <span className="block text-gold">Improve.</span>
              <span className="block text-navy">Get Hired.</span>
            </h1>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-muted">
              Specialized AI analysis for law students and legal professionals. Make
              your resume stand out in the legal field.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/questionnaire">Take the Questionnaire</Button>
              <Button href="/fit" variant="ghost">
                View Sample Report
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-[0.8125rem] text-muted">
              <LockSimpleIcon size={15} className="text-gold" />
              Your data is secure &amp; confidential.
            </p>
          </div>

          <div className="lg:pl-6">
            <HeroCluster />
          </div>
        </div>
      </section>

      <hr className="divider mx-auto max-w-[1180px]" />

      {/* HOW IT WORKS + FEATURES ------------------------------- */}
      <section className="mx-auto max-w-[1180px] px-6 py-[clamp(3.5rem,8vw,6rem)]">
        <HowItWorks />
      </section>

      {/* QUOTE STRIP ------------------------------------------ */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="font-serif text-5xl leading-none text-gold" aria-hidden>
              &ldquo;
            </span>
            <p className="max-w-[36ch] text-[1.15rem] font-medium leading-snug text-ink">
              In the legal profession, your resume is your first argument.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Button href="/questionnaire">Get Started Now</Button>
            <DotGrid className="hidden md:block" cols={4} rows={3} color="#CB9323" />
          </div>
        </div>
      </section>

      {/* PRICING -------------------------------------------- */}
      <section id="pricing" className="mx-auto max-w-[1180px] px-6 py-[clamp(3.5rem,8vw,6rem)]">
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="u-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
            Pay once for the read. The rewrite is optional.
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10 divide-y divide-line border-t border-line">
          {[
            {
              price: PRICING.analysis,
              name: "Resume Analysis",
              body: "Score, recruiter's read, missing signals, line-by-line fixes and a 90-day roadmap. You make the edits.",
              tag: "Start here",
            },
            {
              price: PRICING.rewrite,
              name: "Done-for-you Rewrite",
              body: "Our desk rebuilds the resume around the findings, with two rounds of revisions.",
              tag: "After your report",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="grid gap-3 py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10"
            >
              <div className="text-[2rem] font-bold tracking-tight text-navy">
                {PRICING.currency}
                {t.price}
              </div>
              <div>
                <div className="text-[1.05rem] font-bold text-ink">{t.name}</div>
                <p className="mt-1 max-w-[56ch] text-[0.875rem] leading-relaxed text-muted">
                  {t.body}
                </p>
              </div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold">
                {t.tag}
              </span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={200} className="mt-8">
          <Link href="/questionnaire" className="btn btn-navy">
            Take the questionnaire
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
