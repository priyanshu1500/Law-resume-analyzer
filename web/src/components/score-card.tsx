import { ChartBarIcon } from "@phosphor-icons/react/dist/ssr";
import { CountUpSpring } from "./motion-bits";

/** The "CONFIDENTIAL" casefile score sheet that overlaps the exhibit. */
export function ScoreCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-[224px] rotate-[2deg] border border-ink bg-card px-6 py-6 shadow-[0_28px_55px_-26px_rgba(0,0,0,0.45)] ${className}`}
    >
      <span className="absolute -top-3 right-3 rotate-[-9deg] border border-oxblood bg-card px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-oxblood">
        Confidential
      </span>

      <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
        Career Score
      </div>
      <div className="mt-1 flex items-end gap-1">
        <span className="u-display text-[3.5rem] leading-[0.8] text-ink">
          <CountUpSpring to={78} />
        </span>
        <span className="pb-1.5 font-display text-[1.05rem] text-muted">/100</span>
      </div>

      <div className="my-4 h-px bg-rule" />

      <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
        Corporate Fit
      </div>
      <div className="u-display mt-0.5 text-[1.5rem] text-oxblood">High</div>

      <div className="my-4 h-px bg-rule" />

      <div className="flex items-center gap-2">
        <ChartBarIcon size={20} weight="fill" className="text-ink" />
        <span className="text-[0.8125rem] leading-tight text-ink-soft">
          Top 22%
          <br />
          <span className="text-muted">of law students</span>
        </span>
      </div>
    </div>
  );
}
