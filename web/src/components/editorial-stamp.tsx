import { StarIcon } from "@phosphor-icons/react/dist/ssr";

/** Circular "EDITORIAL STANDARD" seal. Decorative. */
export function EditorialStamp({ size = 132 }: { size?: number }) {
  const id = "stamp-path";
  return (
    <div
      className="relative shrink-0 text-oxblood"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path
            id={id}
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          />
        </defs>
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
        <text
          fill="currentColor"
          className="text-[13px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <textPath href={`#${id}`} startOffset="2%">
            LexIntent · Editorial Standard ·
          </textPath>
        </text>
      </svg>
      <StarIcon
        size={size * 0.16}
        weight="fill"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-oxblood"
      />
    </div>
  );
}
