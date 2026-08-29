import Image from "next/image";
import Link from "next/link";
import {
  HouseIcon,
  FileTextIcon,
  ScalesIcon,
  QuestionIcon,
  HandshakeIcon,
  BooksIcon,
  MicrophoneStageIcon,
  MapTrifoldIcon,
  ArticleIcon,
  BriefcaseIcon,
  TrophyIcon,
  PenNibIcon,
  SparkleIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/masthead";
import { Wordmark } from "@/components/wordmark";
import { Eyebrow, ArrowLink, Meter, Donut, StatBlock, CheckRow } from "@/components/ui";
import {
  SCORE,
  FORECAST,
  CAREER_PATH,
  STRENGTHS,
  IMPROVEMENTS,
  RESOURCES,
  ACTIVITY,
} from "@/lib/mock";

const NAV = [
  { label: "Dashboard", icon: HouseIcon, active: true },
  { label: "Resume Analysis", icon: FileTextIcon },
  { label: "Career Paths", icon: ScalesIcon },
  { label: "Questionnaire", icon: QuestionIcon },
  { label: "Internship Matcher", icon: HandshakeIcon },
  { label: "Resource Library", icon: BooksIcon },
  { label: "Mock Interviews", icon: MicrophoneStageIcon },
  { label: "Roadmap", icon: MapTrifoldIcon },
];

const BREAKDOWN_ICONS = [ArticleIcon, BriefcaseIcon, ScalesIcon, TrophyIcon, PenNibIcon];

export default function DashboardPage() {
  return (
    <div className="min-h-[100dvh] bg-paper">
      <Masthead />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[210px_1fr_272px]">
        {/* Sidebar ------------------------------------------------ */}
        <aside className="border-b border-ink px-5 py-6 lg:border-b-0 lg:border-r">
          <Link href="/">
            <Wordmark />
          </Link>

          <nav className="mt-8 space-y-1">
            {NAV.map(({ label, icon: Icon, active }) => (
              <span
                key={label}
                className={`flex items-center gap-3 px-3 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] ${
                  active
                    ? "bg-oxblood text-paper"
                    : "text-ink-mute hover:text-ink"
                }`}
              >
                <Icon size={16} weight={active ? "fill" : "regular"} />
                {label}
              </span>
            ))}
          </nav>

          <figure className="mt-10 border-t border-rule pt-6">
            <blockquote className="u-pullquote text-[1.05rem]">
              The rule of law is the essence of constitutionalism.
            </blockquote>
            <figcaption className="u-eyebrow mt-3">Editorial position</figcaption>
          </figure>

          <div className="mt-10 flex items-center gap-3 border-t border-rule pt-6">
            <Image
              src="https://picsum.photos/seed/lexintent-priyanshu/96/96?grayscale"
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-full object-cover"
            />
            <div>
              <div className="u-serif text-[0.95rem] text-ink">Priyanshu S.</div>
              <div className="text-[0.6875rem] uppercase tracking-[0.1em] text-ink-mute">
                2nd year, B.A. LL.B.
              </div>
            </div>
          </div>
        </aside>

        {/* Main -------------------------------------------------- */}
        <main className="min-w-0 border-ink px-6 py-8 lg:border-r">
          {/* Hero + score */}
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Eyebrow>Overview</Eyebrow>
              <h1 className="u-serif mt-3 text-[2.5rem] leading-[1.02] text-ink sm:text-[3rem]">
                Your legal career, analysed by{" "}
                <span className="text-oxblood italic">AI</span>.
              </h1>
              <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                A data-driven evaluation of your profile to help you make informed
                career decisions and stay ahead in the field.
              </p>
              <div className="mt-5">
                <ArrowLink href="/report">View full report</ArrowLink>
              </div>
              <div className="relative mt-6 aspect-[16/7] w-full border border-ink">
                <Image
                  src="https://picsum.photos/seed/lexintent-supremecourt/1200/525?grayscale"
                  alt="Courthouse facade"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="border border-ink bg-paper-card p-6">
              <Eyebrow>Your legal career score</Eyebrow>
              <div className="u-serif mt-2 text-[4rem] leading-none text-oxblood">
                {SCORE.overall}
                <span className="align-top text-[1.1rem] text-ink-mute">/100</span>
              </div>
              <p className="u-serif mt-1 text-[1.15rem] text-ink">{SCORE.band}</p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                {SCORE.note}
              </p>
              <div className="mt-5">
                <Meter value={SCORE.overall} />
                <div className="mt-1 flex justify-between text-[0.625rem] uppercase tracking-[0.1em] text-ink-mute">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <section className="mt-10 border-t-2 border-ink pt-6">
            <Eyebrow>Score breakdown</Eyebrow>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {SCORE.breakdown.map((b, i) => {
                const Icon = BREAKDOWN_ICONS[i];
                return (
                  <StatBlock
                    key={b.key}
                    icon={<Icon size={18} />}
                    label={b.key}
                    value={b.value}
                  />
                );
              })}
            </div>
          </section>

          {/* Placement forecast */}
          <section className="mt-10 flex items-center gap-8 border-t border-ink pt-6">
            <Donut value={FORECAST.chance} label={FORECAST.target} size={128} />
            <div>
              <Eyebrow>Placement forecast</Eyebrow>
              <p className="u-serif mt-2 text-[1.75rem] leading-tight text-ink">
                {FORECAST.verdict}
              </p>
              <p className="mt-1 text-[0.875rem] text-ink-soft">
                of getting shortlisted at {FORECAST.target}
              </p>
              <div className="mt-3">
                <ArrowLink href="/report">See details</ArrowLink>
              </div>
            </div>
          </section>

          {/* Three columns */}
          <section className="mt-10 grid gap-8 border-t border-ink pt-6 md:grid-cols-3">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="u-dropnum text-[2rem]">01</span>
                <Eyebrow>Suggested career path</Eyebrow>
              </div>
              <p className="u-serif mt-3 flex items-center gap-2 text-[1.3rem] text-ink">
                <BriefcaseIcon size={18} className="text-ink-mute" />
                {CAREER_PATH.area}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
                Based on your profile, you have a {CAREER_PATH.match}% match for a
                career in {CAREER_PATH.area}.
              </p>
              <div className="mt-4">
                <ArrowLink href="/report">Explore path</ArrowLink>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span className="u-dropnum text-[2rem]">02</span>
                <Eyebrow>Key strengths</Eyebrow>
              </div>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {STRENGTHS.map((s) => (
                  <CheckRow key={s}>{s}</CheckRow>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span className="u-dropnum text-[2rem]">03</span>
                <Eyebrow ox>Areas to improve</Eyebrow>
              </div>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {IMPROVEMENTS.map((s) => (
                  <CheckRow key={s}>{s}</CheckRow>
                ))}
              </ul>
            </div>
          </section>

          {/* From the bench + activity */}
          <section className="mt-10 grid gap-8 border-t border-ink pt-6 md:grid-cols-2">
            <div>
              <Eyebrow>From the bench</Eyebrow>
              <blockquote className="u-pullquote mt-3 text-[1.5rem] leading-snug">
                &ldquo;Justice delayed is justice denied.&rdquo;
              </blockquote>
              <p className="u-eyebrow mt-3">Attributed, William Gladstone</p>
            </div>
            <div>
              <Eyebrow>Recent activity</Eyebrow>
              <ul className="mt-3 divide-y divide-rule border-y border-rule text-[0.8125rem]">
                {ACTIVITY.map((a) => (
                  <li key={a.label} className="flex items-center justify-between py-2.5">
                    <span className="flex items-center gap-2 text-ink-soft">
                      <span className="size-[6px] rounded-full bg-oxblood" />
                      {a.label}
                    </span>
                    <span className="text-ink-mute">{a.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        {/* Right rail ------------------------------------------- */}
        <aside className="space-y-8 border-t border-ink px-5 py-8 lg:border-t-0">
          <div>
            <div className="flex items-center justify-between">
              <Eyebrow>Recent analysis</Eyebrow>
              <Link href="/report" className="u-link text-[0.625rem]">
                View all
              </Link>
            </div>
            <Link
              href="/report"
              className="mt-3 flex items-center gap-3 border border-rule bg-paper-card p-3 hover:border-ink"
            >
              <FileTextIcon size={22} className="text-ink-mute" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.8125rem] text-ink">
                  Resume_Analysis.pdf
                </div>
                <div className="text-[0.6875rem] uppercase tracking-[0.1em] text-ink-mute">
                  24 Aug 2026
                </div>
              </div>
              <CaretRightIcon size={14} className="text-ink-mute" />
            </Link>
          </div>

          <div className="border-t border-rule pt-6">
            <Eyebrow ox>
              <SparkleIcon size={12} className="mr-1 inline align-[-1px]" />
              AI recommendation
            </Eyebrow>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
              Focus on building corporate exposure and strengthening your drafting
              experience before the next recruitment cycle.
            </p>
            <div className="mt-3">
              <ArrowLink href="/report">View recommendations</ArrowLink>
            </div>
          </div>

          <div className="border-t border-rule pt-6">
            <div className="flex items-center justify-between">
              <Eyebrow>Popular resources</Eyebrow>
              <span className="u-link text-[0.625rem]">View all</span>
            </div>
            <ul className="mt-3 divide-y divide-rule border-y border-rule">
              {RESOURCES.map((r) => (
                <li key={r.title} className="py-3">
                  <div className="text-[0.8125rem] leading-snug text-ink">
                    {r.title}
                  </div>
                  <div className="mt-1 text-[0.625rem] uppercase tracking-[0.12em] text-ink-mute">
                    {r.kind}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-ink bg-paper-card p-5">
            <PenNibIcon size={20} className="text-oxblood" />
            <div className="u-serif mt-3 text-[1.1rem] leading-tight text-ink">
              AI cover letter generator
            </div>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">
              Draft a tailored letter that leads with the strengths from your
              report.
            </p>
            <button className="mt-4 w-full border border-ink px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper">
              Try now
            </button>
          </div>

          <div className="relative aspect-[3/4] w-full border border-ink">
            <Image
              src="https://picsum.photos/seed/lexintent-justitia/600/800?grayscale"
              alt="Statue of Justitia holding scales"
              fill
              sizes="272px"
              className="object-cover"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
