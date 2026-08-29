import { CountUp } from "./count-up";

const ROWS = [
  { label: "Corporate Law", value: 78 },
  { label: "Litigation", value: 61 },
  { label: "Judiciary", value: 73 },
];

/** Clean editorial report card, overlaid on the hero visual. No glass, no heavy shadow. */
export function ScoreCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-[206px] border border-ink bg-paper-card px-5 py-4 shadow-[0_24px_50px_-30px_rgba(17,17,17,0.4)] ${className}`}
    >
      <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
        Career score
      </div>
      <div className="mt-1 flex items-end gap-1">
        <span className="font-serif text-[3.25rem] leading-none text-ink">
          <CountUp to={78} />
        </span>
        <span className="pb-2 font-serif text-[1rem] text-ink-mute">/100</span>
      </div>
      <ul className="mt-3 divide-y divide-rule border-t border-rule">
        {ROWS.map((r) => (
          <li
            key={r.label}
            className="flex items-center justify-between py-[7px] text-[0.8125rem]"
          >
            <span className="text-ink-soft">{r.label}</span>
            <span className="font-serif text-ink">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
