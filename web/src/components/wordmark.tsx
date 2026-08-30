export function Wordmark({
  size = "md",
  compact = false,
}: {
  size?: "sm" | "md" | "lg";
  /** legacy prop from the inner-flow headers; renders the small mark */
  compact?: boolean;
}) {
  const scale = { sm: "text-[1.05rem]", md: "text-[1.35rem]", lg: "text-[1.6rem]" }[
    compact ? "sm" : size
  ];
  return (
    <span className={`u-display inline-block leading-[0.8] ${scale}`}>
      <span className="relative">
        LEX
        <span className="absolute -right-2 top-0 size-[5px] bg-oxblood" aria-hidden />
      </span>
      <br />
      INTENT
    </span>
  );
}
