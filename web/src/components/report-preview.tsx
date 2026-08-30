import { CountUp } from "./count-up";
import { REPORT_PREVIEW } from "@/lib/mock";

function Cell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-5 ${className}`}>
      <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </div>
      <div className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}

const Bars = (
  <span className="inline-flex items-end gap-[3px] align-middle">
    {[9, 14, 11, 17].map((h, i) => (
      <span key={i} className="w-[4px] bg-oxblood" style={{ height: h }} />
    ))}
  </span>
);

export function ReportPreviewCard() {
  const r = REPORT_PREVIEW;
  return (
    <div className="card-hard">
      <div className="flex items-start justify-between border-b border-ink p-5">
        <div className="u-display text-[1.15rem] leading-[0.95] text-ink">
          Lex Intent Report
          <br />
          <span className="text-muted">Career Review</span>
        </div>
        <span className="shrink-0 bg-oxblood px-2 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#f3efe4]">
          {r.edition}
        </span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Cell label="Career Score">
          <span className="u-display text-[2.25rem] leading-[0.8] text-oxblood">
            <CountUp to={r.score} />
            <span className="font-display text-[0.9rem] text-muted">/100</span>
          </span>{" "}
          {Bars}
        </Cell>
        <Cell label="Recruiter's Read">{r.recruiterRead}</Cell>
      </div>

      <div className="grid grid-cols-1 divide-y divide-rule border-t border-rule sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Cell label="Missing Signals">
          <ul className="space-y-1">
            {r.missingSignals.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-oxblood">·</span>
                {s}
              </li>
            ))}
          </ul>
        </Cell>
        <Cell label="Placement Forecast">{r.forecast}</Cell>
      </div>

      <div className="border-t border-rule">
        <Cell label="90-Day Roadmap">{r.roadmap}</Cell>
      </div>
    </div>
  );
}
