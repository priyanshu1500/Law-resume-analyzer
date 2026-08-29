import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export function Eyebrow({
  children,
  ox = false,
  className = "",
}: {
  children: React.ReactNode;
  ox?: boolean;
  className?: string;
}) {
  return (
    <p className={`u-eyebrow ${ox ? "u-eyebrow-ox" : ""} ${className}`}>
      {children}
    </p>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`u-link ${className}`}>
      {children}
      <ArrowRightIcon size={13} weight="bold" />
    </Link>
  );
}

/** horizontal score meter, as in the reference "Legal Career Score" */
export function Meter({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-[6px] w-full bg-track">
      <div className="h-full bg-oxblood" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** small stat with number over label and mini meter */
export function StatBlock({
  icon,
  label,
  value,
  max = 100,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-ink-mute">{icon}</span>
      <span className="u-eyebrow text-[0.625rem] leading-tight">{label}</span>
      <span className="u-serif text-[2rem] leading-none text-ink">
        {value}
        <span className="align-top text-[0.75rem] text-ink-mute">/{max}</span>
      </span>
      <Meter value={value} max={max} />
    </div>
  );
}

/** donut used for the placement forecast */
export function Donut({
  value,
  label,
  size = 128,
}: {
  value: number;
  label?: string;
  size?: number;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--oxblood)"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="u-serif text-[1.5rem] leading-none text-ink">{value}%</div>
        {label && <div className="u-eyebrow mt-1 text-[0.5rem]">{label}</div>}
      </div>
    </div>
  );
}

export function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-2 text-[0.9375rem] text-ink-soft">
      <span
        aria-hidden
        className="mt-[0.35rem] size-[6px] shrink-0 rounded-full bg-oxblood"
      />
      {children}
    </li>
  );
}
