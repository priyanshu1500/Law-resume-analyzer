import { Reveal } from "./reveal";

/* five report pages, laid out like a newspaper spread ------------- */

function MiniLine({ w = "100%", faint = true }: { w?: string; faint?: boolean }) {
  return (
    <div
      className={faint ? "h-[5px] bg-rule/70" : "h-[5px] bg-[#c9c4ba]"}
      style={{ width: w }}
    />
  );
}

function Page({
  folio,
  kicker,
  title,
  motif,
  rotate,
}: {
  folio: string;
  kicker: string;
  title: string;
  motif: React.ReactNode;
  rotate: string;
}) {
  return (
    <article
      className={`relative flex w-[220px] shrink-0 flex-col border border-ink bg-paper-card px-5 py-5 shadow-[0_28px_55px_-32px_rgba(17,17,17,0.4)] md:w-[236px] ${rotate}`}
      style={{ aspectRatio: "3 / 4" }}
    >
      <div className="border-b-2 border-ink pb-2 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-ink-mute">
        {kicker}
      </div>
      <h3 className="mt-3 font-serif text-[1.15rem] leading-[1.15] text-ink">
        {title}
      </h3>
      <div className="my-4 flex-1">{motif}</div>
      <div className="space-y-[6px]">
        <MiniLine w="96%" />
        <MiniLine w="88%" />
        <MiniLine w="72%" />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-rule pt-2">
        <span className="u-folio">{folio}</span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
          LexIntent
        </span>
      </div>
    </article>
  );
}

const RingMotif = (
  <div className="flex items-center gap-3">
    <svg viewBox="0 0 72 72" className="h-16 w-16 -rotate-90" fill="none">
      <circle cx="36" cy="36" r="30" stroke="var(--track)" strokeWidth="7" />
      <circle
        cx="36"
        cy="36"
        r="30"
        stroke="var(--oxblood)"
        strokeWidth="7"
        pathLength={100}
        strokeDasharray="78 100"
        strokeLinecap="round"
      />
    </svg>
    <div className="font-serif text-[1.75rem] leading-none text-ink">
      78<span className="text-[0.8rem] text-ink-mute">/100</span>
    </div>
  </div>
);

const QuoteMotif = (
  <div className="border-l-2 border-oxblood pl-3">
    <p className="font-serif text-[0.9rem] italic leading-snug text-ink">
      &ldquo;Reads like a strong second-year. The corporate signal is there;
      the drafting evidence is not.&rdquo;
    </p>
  </div>
);

const BarsMotif = (
  <div className="flex h-20 items-end gap-2">
    {[62, 78, 54, 71, 66].map((h, i) => (
      <div key={i} className="flex-1 bg-oxblood" style={{ height: `${h}%` }} />
    ))}
  </div>
);

const SignalsMotif = (
  <ul className="space-y-2 text-[0.8rem] text-ink-soft">
    {["Deal / matter role", "Linked writing sample", "Quantified results"].map(
      (s) => (
        <li key={s} className="flex items-center gap-2">
          <span className="size-3 shrink-0 rounded-full border border-dashed border-oxblood" />
          {s}
        </li>
      ),
    )}
  </ul>
);

const RoadmapMotif = (
  <div className="relative mt-6">
    <div className="h-px w-full bg-ink" />
    <div className="mt-0 flex justify-between">
      {["0", "30", "60", "90"].map((d) => (
        <div key={d} className="flex flex-col items-center">
          <span className="-mt-[5px] size-[9px] rounded-full bg-oxblood" />
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-mute">
            {d}d
          </span>
        </div>
      ))}
    </div>
  </div>
);

const PAGES = [
  { folio: "i", kicker: "Section One", title: "Career Score", motif: RingMotif, rotate: "md:-rotate-[2.5deg]" },
  { folio: "ii", kicker: "Section Two", title: "Recruiter Read", motif: QuoteMotif, rotate: "md:rotate-[1.5deg]" },
  { folio: "iii", kicker: "Section Three", title: "Five-Dimension Analysis", motif: BarsMotif, rotate: "md:-rotate-[1.5deg]" },
  { folio: "iv", kicker: "Section Four", title: "Missing Signals", motif: SignalsMotif, rotate: "md:rotate-[2.5deg]" },
  { folio: "v", kicker: "Section Five", title: "90-Day Roadmap", motif: RoadmapMotif, rotate: "md:-rotate-[1deg]" },
];

export function ReportSpread() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-0 md:pl-4">
        {PAGES.map((p, i) => (
          <Reveal key={p.folio} delay={i * 90} className="md:-ml-6 md:first:ml-0">
            <Page {...p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
