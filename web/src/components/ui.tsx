import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  /** legacy no-ops */
  ox?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return <p className={`u-eyebrow ${className}`}>{children}</p>;
}

/** Section wrapper: centered container, generous vertical rhythm. */
export function Band({
  children,
  tone = "light",
  id,
  className = "",
  divide = false,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  divide?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={`${dark ? "bg-navy text-white" : "bg-bg text-ink"} ${
        divide && !dark ? "border-t border-line" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-[1180px] px-6 py-[clamp(3.5rem,8vw,6.5rem)]">
        {children}
      </div>
    </section>
  );
}

type Variant = "navy" | "gold" | "ghost";
const MAP: Record<string, Variant> = {
  navy: "navy", gold: "gold", ghost: "ghost",
  // legacy aliases
  oxblood: "navy", ink: "navy", outline: "ghost", primary: "navy",
};

export function Button({
  href,
  children,
  variant = "navy",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: string;
  className?: string;
}) {
  const v = MAP[variant] ?? "navy";
  return (
    <Link href={href} className={`btn group btn-${v} ${className}`}>
      {children}
      <ArrowRightIcon
        size={16}
        weight="bold"
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
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
    <Link href={href} className={`u-link text-sm ${className}`}>
      {children}
      <ArrowRightIcon size={14} weight="bold" />
    </Link>
  );
}

export function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[0.9375rem] text-ink">
      <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-gold text-white">
        <CheckIcon size={11} weight="bold" />
      </span>
      {children}
    </li>
  );
}

export function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-2 text-[0.9375rem] text-ink">
      <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-gold text-white">
        <CheckIcon size={11} weight="bold" />
      </span>
      {children}
    </li>
  );
}

export function Meter({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-[6px] w-full rounded-full bg-track">
      <div className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} />
    </div>
  );
}

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
      <span className="text-navy">{icon}</span>
      <span className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <span className="text-[1.9rem] font-bold leading-none tracking-tight text-ink">
        {value}
        <span className="text-[0.7rem] text-muted">/{max}</span>
      </span>
      <Meter value={value} max={max} />
    </div>
  );
}

export function Donut({
  value,
  label,
  size = 128,
}: {
  value: number;
  label?: string;
  size?: number;
}) {
  const stroke = 9;
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
          stroke="var(--navy)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-[1.5rem] font-bold leading-none text-ink">{value}%</div>
        {label && (
          <div className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-muted">{label}</div>
        )}
      </div>
    </div>
  );
}

export function TrustItem({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-navy">{icon}</span>
      <div>
        <div className="text-[0.8125rem] font-semibold text-ink">{title}</div>
        <div className="text-[0.8125rem] text-muted">{sub}</div>
      </div>
    </div>
  );
}
