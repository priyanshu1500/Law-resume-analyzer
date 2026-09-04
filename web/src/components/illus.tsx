/**
 * Flat-vector illustration set for LexIntent. 2px strokes, minimal fills,
 * rounded geometry, royal blue / gold / periwinkle. No 3D, no stock art.
 */

const S = {
  navy: "#1E40AF",
  gold: "#F59E0B",
  bronze: "#B45309",
  beige: "#E1DEF9",
  ink: "#0B132B",
  purple: "#5B4EE6",
  teal: "#14B8A6",
};

/* ---- decoration ------------------------------------------------- */

export function DotGrid({
  cols = 5,
  rows = 4,
  gap = 12,
  r = 2.2,
  color = S.gold,
  className = "",
}: {
  cols?: number;
  rows?: number;
  gap?: number;
  r?: number;
  color?: string;
  className?: string;
}) {
  const w = (cols - 1) * gap + r * 2;
  const h = (rows - 1) * gap + r * 2;
  return (
    <svg width={w} height={h} className={className} aria-hidden>
      {Array.from({ length: rows }).map((_, y) =>
        Array.from({ length: cols }).map((_, x) => (
          <circle key={`${x}-${y}`} cx={r + x * gap} cy={r + y * gap} r={r} fill={color} />
        )),
      )}
    </svg>
  );
}

export function Squiggle({ className = "", color = S.navy }: { className?: string; color?: string }) {
  return (
    <svg width="90" height="16" viewBox="0 0 90 16" fill="none" className={className} aria-hidden>
      <path
        d="M2 8c6-8 12 8 18 0s12 8 18 0 12 8 18 0 12 8 18 0 12 8 14 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Burst({ className = "", color = S.gold }: { className?: string; color?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={className} aria-hidden>
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <path d="M22 3v8M22 33v8M3 22h8M33 22h8M8 8l6 6M30 30l6 6M36 8l-6 6M14 30l-6 6" />
      </g>
    </svg>
  );
}

export function Arch({ className = "", color = S.navy }: { className?: string; color?: string }) {
  return (
    <svg width="160" height="90" viewBox="0 0 160 90" fill="none" className={className} aria-hidden>
      <path d="M2 90a78 78 0 0 1 156 0" fill={color} />
    </svg>
  );
}

export function Blob({ className = "", color = S.beige }: { className?: string; color?: string }) {
  return (
    <svg width="260" height="220" viewBox="0 0 260 220" className={className} aria-hidden>
      <path
        d="M196 26c34 22 55 63 48 101-7 39-42 74-83 82-41 9-88-9-114-42C21 135 24 84 52 52 80 20 133-4 168 6c10 3 19 12 28 20Z"
        fill={color}
      />
    </svg>
  );
}

/* ---- scales of justice ---------------------------------------- */
export function Scales({ size = 190, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <circle cx="100" cy="118" r="66" fill={S.beige} opacity="0.55" />
      <g stroke={S.navy} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M100 44v104" />
        <path d="M74 168h52" />
        <path d="M78 168c0-8 4-12 22-12s22 4 22 12" />
        <path d="M44 62h112" />
        <path d="M44 62 26 104M44 62l18 42" />
        <path d="M156 62l-18 42M156 62l18 42" />
      </g>
      <circle cx="100" cy="40" r="7" fill={S.gold} />
      <path d="M26 104a18 18 0 0 0 36 0Z" fill={S.gold} />
      <path d="M138 104a18 18 0 0 0 36 0Z" fill={S.gold} />
    </svg>
  );
}

/* ---- courthouse --------------------------------------------- */
export function Courthouse({ size = 240, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 300 240" fill="none" className={className} aria-hidden>
      <path d="M150 150a95 95 0 0 1 95 90H55a95 95 0 0 1 95-90Z" fill={S.gold} opacity="0.9" />
      <g stroke={S.navy} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M40 96 150 40l110 56" />
        <path d="M52 96h196" />
        <path d="M52 96v96M248 96v96" />
        <path d="M84 108v76M120 108v76M156 108v76M192 108v76M228 108v76" />
        <path d="M36 200h228M40 214h220" />
      </g>
      <g stroke={S.bronze} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M274 176c14-6 22-2 26 8-12 4-20 2-26-8Z" />
        <path d="M280 190c14-4 22 2 24 12-12 2-20-4-24-12Z" />
        <path d="M282 158v54" />
      </g>
    </svg>
  );
}

/* ---- magnifier (overlay) ---------------------------------- */
export function Magnifier({ size = 150, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none" className={className} aria-hidden>
      <circle cx="60" cy="60" r="42" fill="#fff" stroke={S.navy} strokeWidth="6" />
      <circle cx="60" cy="60" r="42" fill={S.navy} opacity="0.06" />
      <path d="M92 92 132 132" stroke={S.navy} strokeWidth="12" strokeLinecap="round" />
      <g stroke={S.gold} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M44 60l10 10 20-22" />
      </g>
    </svg>
  );
}
