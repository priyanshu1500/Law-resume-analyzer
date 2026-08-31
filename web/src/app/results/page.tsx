"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Band, Eyebrow } from "@/components/ui";
import { useSession } from "@/lib/store";

export default function ResultsPage() {
  const { state, ready } = useSession();
  const fitDone = Object.keys(state.answers).length > 0;
  const reportDone = state.paid && Boolean(state.resumeName);

  return (
    <div className="min-h-[100dvh] bg-paper">
      <SiteNav />
      <Band>
        <Eyebrow>Your results</Eyebrow>
        <h1 className="u-display mt-4 text-[clamp(2rem,4.4vw,3.2rem)] [text-wrap:balance]">
          Two things. Your fit, and your resume.
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <HubCard
            kicker="Free"
            title="Your Career Fit"
            body="The law careers that suit how you think, work and want to live."
            cta={fitDone ? "Open your fit" : "Take the questionnaire"}
            href={fitDone ? "/fit" : "/questionnaire"}
            done={ready && fitDone}
          />
          <HubCard
            kicker="₹99"
            title="Your Resume Report"
            body="Score, recruiter's read, missing signals and the exact changes to make."
            cta={reportDone ? "Open your report" : "Start the analysis"}
            href={reportDone ? "/report" : "/unlock"}
            done={ready && reportDone}
          />
        </div>

        <p className="mt-8 text-[0.75rem] text-muted">
          <Link href="/questionnaire" className="hover:text-ink">
            Re-take the questionnaire
          </Link>
        </p>
      </Band>
      <SiteFooter />
    </div>
  );
}

function HubCard({
  kicker,
  title,
  body,
  cta,
  href,
  done,
}: {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  done: boolean;
}) {
  return (
    <Link
      href={href}
      className="card-hard group flex flex-col justify-between p-6 transition-transform hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-oxblood">
            {kicker}
          </span>
          {done && (
            <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
              Ready
            </span>
          )}
        </div>
        <h2 className="u-display mt-3 text-[1.5rem] text-ink">{title}</h2>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{body}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-oxblood">
        {cta}
        <ArrowRightIcon size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
