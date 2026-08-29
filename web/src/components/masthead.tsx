const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

export function Masthead({
  tagline = "Analyze. Understand. Advance.",
  index = "LEX INDEX 01",
}: {
  tagline?: string;
  index?: string;
}) {
  return (
    <div className="border-b border-ink">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-mute">
        <span className="w-1/3">{DATE}</span>
        <span className="hidden w-1/3 text-center text-ink sm:block">
          {tagline}
        </span>
        <span className="w-1/3 text-right">{index}</span>
      </div>
    </div>
  );
}
