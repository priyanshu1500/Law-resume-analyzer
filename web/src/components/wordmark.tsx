export function Wordmark({
  size = "md",
  compact = false,
}: {
  size?: "sm" | "md" | "lg";
  /** legacy: show just the LA mark */
  compact?: boolean;
}) {
  const box = { sm: 30, md: 38, lg: 44 }[size];
  const text = { sm: "text-[1.05rem]", md: "text-[1.3rem]", lg: "text-[1.55rem]" }[size];
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="grid shrink-0 place-items-center rounded-[8px] bg-navy font-bold leading-none text-white"
        style={{ width: box, height: box, fontSize: box * 0.46 }}
      >
        L<span className="text-gold">A</span>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={`font-bold tracking-tight text-ink ${text}`}>
            Law<span className="text-gold">Analyser</span>
          </span>
          <span className="mt-0.5 block text-[0.5rem] font-bold uppercase tracking-[0.16em] text-muted">
            AI powered · Legally focused
          </span>
        </span>
      )}
    </span>
  );
}
