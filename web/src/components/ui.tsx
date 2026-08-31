import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

export function Eyebrow({
  children,
  muted = false,
  className = "",
}: {
  children: React.ReactNode;
  muted?: boolean;
  /** legacy no-op: the eyebrow is oxblood by default now */
  ox?: boolean;
  className?: string;
}) {
  return (
    <p className={`u-eyebrow ${muted ? "u-eyebrow-muted" : ""} ${className}`}>
      {children}
    </p>
  );
}

/** Full-bleed polarity band. `tone="dark"` flips the semantic tokens. */
export function Band({
  children,
  tone = "light",
  id,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${tone === "dark" ? "band-dark" : ""} border-b-2 border-ink ${className}`}
    >
      <div className="mx-auto max-w-[1240px] px-6 py-[clamp(4rem,9vw,7rem)]">
        {children}
      </div>
    </section>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "oxblood" | "ink" | "outline";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "oxblood",
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform hover:-translate-y-px active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";
  const styles = {
    oxblood: "bg-oxblood text-[#f3efe4] hover:bg-oxblood-deep",
    ink: "bg-ink text-[#f3efe4] border border-ink hover:bg-transparent hover:text-ink",
    outline: "border border-ink text-ink hover:bg-ink hover:text-[#f3efe4]",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRightIcon
        size={13}
        weight="bold"
        className="transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
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
    <Link href={href} className={`u-link ${className}`}>
      {children}
      <ArrowRightIcon size={12} weight="bold" />
    </Link>
  );
}

export function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[0.875rem] text-ink-soft">
      <CheckCircleIcon
        size={16}
        weight="fill"
        className="mt-[0.15rem] shrink-0 text-oxblood"
      />
      {children}
    </li>
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
      <span className="mt-[0.1rem] text-ink">{icon}</span>
      <div>
        <div className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink">
          {title}
        </div>
        <div className="text-[0.75rem] text-muted">{sub}</div>
      </div>
    </div>
  );
}

/* ---- primitives still used by the inner flow screens ------------- */

export function Meter({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-[6px] w-full bg-track">
      <div className="h-full bg-oxblood" style={{ width: `${pct}%` }} />
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
      <span className="text-muted">{icon}</span>
      <span className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      <span className="u-display text-[2rem] leading-none text-ink">
        {value}
        <span className="text-[0.75rem] text-muted">/{max}</span>
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
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
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
        <div className="u-display text-[1.5rem] leading-none text-ink">{value}%</div>
        {label && (
          <div className="text-[0.5rem] font-bold uppercase tracking-[0.12em] text-muted">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

export function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-2 text-[0.9375rem] text-ink-soft">
      <span aria-hidden className="mt-[0.35rem] size-[6px] shrink-0 bg-oxblood" />
      {children}
    </li>
  );
}
