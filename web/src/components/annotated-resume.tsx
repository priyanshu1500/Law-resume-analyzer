/**
 * Hero visual: a black-and-white law-student resume under an editor's
 * burgundy pen. Built from layout primitives + SVG ink marks that are
 * anchored to the content they annotate (not fixed coordinates), so the
 * circle always lands on the Skills block. Decorative; aria-hidden.
 */

function Line({ w = "100%", faint = false }: { w?: string; faint?: boolean }) {
  return (
    <div
      className={
        faint
          ? "h-[6px] rounded-[1px] bg-rule/70"
          : "h-[7px] rounded-[1px] bg-[#c9c4ba]"
      }
      style={{ width: w }}
    />
  );
}

function CircleMark() {
  return (
    <svg
      className="pointer-events-none absolute rotate-[-1.2deg]"
      style={{ left: -18, right: -16, top: -12, height: "calc(100% + 22px)" }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M6 46 C 2 20, 30 12, 52 13 C 82 14, 99 24, 96 47 C 93 74, 60 90, 34 87 C 12 84, 3 66, 6 46 Z"
        stroke="var(--oxblood)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function UnderlineMark() {
  return (
    <svg
      className="pointer-events-none absolute left-0 right-8 h-[7px]"
      style={{ bottom: -3 }}
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M1 6 C 28 2, 62 5, 99 3"
        stroke="var(--oxblood)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Block({
  heading,
  mark,
  children,
}: {
  heading: string;
  mark?: "circle" | "underline";
  children: React.ReactNode;
}) {
  return (
    <div className="relative space-y-[8px]">
      <div className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-[#4a4a4a]">
        {heading}
      </div>
      {children}
      {mark === "circle" && <CircleMark />}
      {mark === "underline" && <UnderlineMark />}
    </div>
  );
}

function Note({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`absolute font-serif text-[11px] italic leading-tight text-oxblood ${className}`}
    >
      {children}
    </span>
  );
}

export function AnnotatedResume() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[400px] select-none">
      {/* newspaper page peeking underneath: column rules + a headline bar */}
      <div
        className="absolute -bottom-9 -left-11 h-[95%] w-[88%] rotate-[-6deg] overflow-hidden border border-rule-strong bg-paper-card shadow-[0_18px_40px_-24px_rgba(17,17,17,0.3)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 15px, var(--rule) 15px 16px)",
        }}
      >
        <div className="mx-4 mt-4 h-[9px] w-[62%] bg-ink/70" />
        <div className="mx-4 mt-1 h-[5px] w-[40%] bg-rule-strong" />
      </div>

      {/* blank sheet behind */}
      <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-[3deg] border border-rule bg-paper-card shadow-[0_20px_45px_-25px_rgba(17,17,17,0.25)]" />

      {/* front sheet */}
      <div className="relative aspect-[7/9] rotate-[-1.2deg] border border-ink bg-paper-card px-7 py-6 shadow-[0_35px_70px_-30px_rgba(17,17,17,0.35)]">
        <div className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#4a4a4a]">
          Curriculum Vitæ
        </div>
        <div className="mt-2 space-y-[6px]">
          <div className="h-[10px] w-[46%] rounded-[1px] bg-ink/85" />
          <div className="h-[6px] w-[62%] rounded-[1px] bg-rule/70" />
        </div>

        <div className="mt-[18px] space-y-[18px]">
          <Block heading="Education">
            <Line w="92%" />
            <Line w="70%" faint />
          </Block>
          <Block heading="Internships" mark="underline">
            <Line w="88%" />
            <Line w="95%" />
            <Line w="64%" faint />
          </Block>
          <Block heading="Moot Court">
            <Line w="76%" />
            <Line w="58%" faint />
          </Block>
          <div className="relative">
            <Block heading="Publications">
              <Line w="90%" />
              <Line w="67%" faint />
            </Block>
            {/* curl arrow in the right margin, pointing up */}
            <svg
              className="pointer-events-none absolute -right-9 -top-1 h-14 w-9"
              viewBox="0 0 40 60"
              fill="none"
              stroke="var(--oxblood)"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M8 56 C 34 44, 36 22, 18 8" />
              <path d="M18 8 l 14 6 M18 8 l -2 16" />
            </svg>
          </div>
          <Block heading="Skills" mark="circle">
            <Line w="94%" />
            <Line w="82%" />
            <Line w="60%" faint />
          </Block>
        </div>

        {/* paper clip over the top edge */}
        <svg
          viewBox="0 0 40 90"
          className="absolute -top-4 right-9 h-[54px] w-[24px] drop-shadow-[0_2px_2px_rgba(17,17,17,0.25)]"
          fill="none"
          stroke="#9a9a9a"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M20 12 v50 a10 10 0 0 1-20 0 V20 a14 14 0 0 1 28 0 v44" />
        </svg>
      </div>

      {/* editor's margin notes with hairline leaders */}
      <Note className="left-[-13%] top-[9%] w-[80px] text-right">
        Too generic.
        <span className="absolute right-[-14px] top-1/2 h-px w-3 bg-oxblood" />
      </Note>
      <Note className="right-[-11%] top-[33%] w-[76px]">
        Strong internship.
        <span className="absolute left-[-14px] top-1/2 h-px w-3 bg-oxblood" />
      </Note>
      <Note className="right-[-12%] top-[62%] w-[70px]">
        Move this higher.
        <span className="absolute left-[-14px] top-1/2 h-px w-3 bg-oxblood" />
      </Note>
      <Note className="bottom-[13%] right-[-12%] w-[86px]">
        Missing drafting signal.
        <span className="absolute left-[-14px] top-1/2 h-px w-3 bg-oxblood" />
      </Note>
    </div>
  );
}
