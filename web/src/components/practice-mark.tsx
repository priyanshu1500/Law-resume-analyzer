import { ART } from "@/lib/practice-compass/art";

/** Single-colour line-art mark, 100x100. Uses currentColor for the stroke. */
export function Mark({
  name,
  size = 46,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const d = ART[name] ?? ART.book;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={{ display: "block" }}
    >
      <path d={d} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
