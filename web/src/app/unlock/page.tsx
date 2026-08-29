"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockKeyIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/masthead";
import { Wordmark } from "@/components/wordmark";
import { Eyebrow } from "@/components/ui";
import { PRICING } from "@/lib/mock";
import { useSession } from "@/lib/store";

const INCLUDED = [
  "Five-dimension score, each out of one hundred, each with a written verdict",
  "Placement forecast against the employer tier you named in the intake",
  "Three editorial sections: content, experience, presentation",
  "A prioritised list of fixes, in the order they will move the needle",
  "The report as a document you keep, re-runnable after you revise",
];

export default function UnlockPage() {
  const router = useRouter();
  const { update } = useSession();

  function pay() {
    // Prototype: no real charge. In production this is a Stripe Checkout
    // redirect; the webhook flips `paid` and only then does the AI run.
    update({ paid: true });
    router.push("/upload");
  }

  return (
    <div className="min-h-[100dvh] bg-paper">
      <Masthead tagline="Intake complete" index="UNLOCK" />
      <div className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-6 py-3">
          <Link href="/">
            <Wordmark compact />
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
          <div>
            <Eyebrow ox>Your answers are saved</Eyebrow>
            <h1 className="u-serif mt-5 text-[2.5rem] leading-[1.05] text-ink sm:text-[3rem]">
              Unlock the analysis.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft">
              You have finished the intake. Next you upload your resume and the
              analysis runs against everything you just told us.
            </p>

            <ul className="mt-10 divide-y divide-rule border-y-2 border-ink">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-4 py-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-[0.4rem] size-[6px] shrink-0 rounded-full bg-oxblood" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-2 text-[0.8125rem] italic text-ink-mute">
              <ShieldCheckIcon size={16} />
              Your resume is used only to produce your report. Analysis is
              guidance, not legal or career advice.
            </p>
          </div>

          <div className="md:sticky md:top-12 md:self-start">
            <div className="border border-ink bg-paper-card p-8">
              <div className="flex items-center gap-2 text-ink-mute">
                <LockKeyIcon size={18} />
                <span className="u-eyebrow">One-off fee</span>
              </div>
              <div className="u-serif mt-4 text-[3.5rem] leading-none text-ink">
                {PRICING.currency}
                {PRICING.analysis.toLocaleString("en-IN")}
              </div>
              <p className="mt-3 text-[0.875rem] text-ink-soft">
                Covers the AI analysis, the score and the written report. No
                subscription.
              </p>
              <button
                type="button"
                onClick={pay}
                className="mt-7 w-full border border-ink bg-ink px-6 py-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper transition-transform active:translate-y-px"
              >
                Pay {PRICING.currency}
                {PRICING.analysis.toLocaleString("en-IN")} &amp; continue
              </button>
              <p className="mt-3 text-center text-[0.6875rem] uppercase tracking-[0.12em] text-ink-mute">
                Prototype. No card is charged
              </p>

              <div className="mt-6 border-t border-rule pt-4 text-[0.8125rem] text-ink-soft">
                <span className="u-serif text-ink">
                  {PRICING.currency}
                  {PRICING.rewrite.toLocaleString("en-IN")}
                </span>{" "}
                optional rewrite by our editors, offered after you read the
                report.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
