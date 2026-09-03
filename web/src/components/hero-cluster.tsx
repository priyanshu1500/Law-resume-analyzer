"use client";

import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { CountUp, Tilt } from "./motion-bits";
import {
  Arch,
  Blob,
  DotGrid,
  Magnifier,
  Scales,
  Squiggle,
} from "./illus";

/* ---- resume sheet ------------------------------------------------ */
function Line({ w, c = "bg-line", h = "h-2" }: { w: string; c?: string; h?: string }) {
  return <div className={`${h} rounded-full ${c}`} style={{ width: w }} />;
}

export function ResumePreview() {
  return (
    <div className="card relative w-[300px] overflow-hidden p-6 shadow-[0_24px_60px_-30px_rgba(23,38,57,0.25)] sm:w-[340px]">
      {/* folded gold corner */}
      <div className="absolute right-0 top-0 h-0 w-0 border-l-[26px] border-t-[26px] border-l-transparent border-t-gold" />
      <div className="text-[0.8125rem] font-semibold tracking-tight text-muted">RESUME.pdf</div>
      <div className="mt-4 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-navy text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10Zm0 2c-5 0-9 3-9 7h18c0-4-4-7-9-7Z" />
          </svg>
        </span>
        <div className="flex-1 space-y-2">
          <Line w="70%" c="bg-navy/80" />
          <Line w="45%" />
        </div>
      </div>
      <div className="mt-5 h-2.5 w-[55%] rounded-full bg-gold" />
      <ul className="mt-4 space-y-2.5">
        {[["bg-navy", "82%"], ["bg-line", "68%"], ["bg-gold/70", "74%"], ["bg-line", "58%"], ["bg-navy/60", "70%"]].map(
          ([c, w], i) => (
            <li key={i} className="flex items-center gap-2.5">
              <span className={`size-1.5 shrink-0 rounded-full ${c}`} />
              <Line w={w} h="h-2" />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/* ---- AI score card -------------------------------------------- */
export function ScoreCard() {
  return (
    <div className="card w-[150px] overflow-hidden text-center shadow-[0_18px_44px_-24px_rgba(1,61,111,0.4)]">
      <div className="bg-navy py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white">
        AI Score
      </div>
      <div className="px-4 py-4">
        <div className="text-[2.75rem] font-bold leading-none tracking-tight text-evidence">
          <CountUp to={86} />
        </div>
        <div className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted">
          out of 100
        </div>
        <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-navy" />
      </div>
    </div>
  );
}

/* ---- key insights card -------------------------------------- */
const INSIGHTS = ["Content Quality", "Role Relevance", "Skills Match", "ATS Friendly"];
export function InsightCard() {
  return (
    <div className="w-[180px] rounded-[16px] bg-gold p-4 text-white shadow-[0_20px_46px_-22px_rgba(203,147,35,0.6)]">
      <div className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/80">
        Key Insights
      </div>
      <ul className="mt-3 space-y-2.5">
        {INSIGHTS.map((t) => (
          <li key={t} className="flex items-center gap-2 text-[0.8125rem] font-semibold">
            <span className="grid size-[16px] shrink-0 place-items-center rounded-full bg-white text-gold">
              <CheckIcon size={10} weight="bold" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- the whole overlapping cluster --------------------------- */
export function HeroCluster() {
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[500px] sm:h-[480px]">
      {/* backdrops */}
      <Blob className="absolute -left-4 top-10 h-[210px] w-auto opacity-90" />
      <Arch className="absolute right-0 top-0 opacity-90" />
      <DotGrid className="absolute right-2 top-16" cols={5} rows={5} color="#CB9323" />
      <DotGrid className="absolute left-6 -bottom-2" cols={4} rows={3} color="#013D6F" />
      <Squiggle className="absolute left-32 bottom-0" />

      {/* scales */}
      <Scales size={150} className="absolute left-0 top-0" />

      {/* resume sheet */}
      <Tilt className="absolute right-0 top-6 sm:right-4">
        <ResumePreview />
        <Magnifier size={120} className="absolute -bottom-6 -left-8" />
      </Tilt>

      {/* score card — overlaps the sheet's lower-left */}
      <div className="absolute bottom-10 left-8">
        <ScoreCard />
      </div>

      {/* insight card */}
      <div className="absolute right-0 top-[46%] -translate-y-1/2">
        <InsightCard />
      </div>
    </div>
  );
}
