/**
 * Hero visual: a legal casefile. Torn "EXHIBIT A" resume on a stack of
 * sheets and a kraft folder, marked up in red pen. Built from layout
 * primitives + SVG ink; decorative, aria-hidden.
 */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#3d3d3d]">
        {label}
      </div>
      <div className="text-[10.5px] leading-[1.4] text-[#2a2a2a]">{children}</div>
    </div>
  );
}

function Note({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`u-hand absolute text-[13.5px] ${className}`}>{children}</span>
  );
}

export function ExhibitStack() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[336px] select-none">
      {/* kraft folder, just peeking */}
      <div className="absolute -bottom-5 -right-4 h-[68%] w-[62%] rotate-[5deg] bg-kraft shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)]" />
      {/* torn blank sheets */}
      <div className="deckle absolute inset-0 -translate-x-4 translate-y-5 -rotate-[4deg] bg-[#efe9dc] shadow-[0_20px_45px_-25px_rgba(0,0,0,0.3)]" />
      <div className="deckle absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] bg-[#f4efe3] shadow-[0_20px_45px_-25px_rgba(0,0,0,0.3)]" />

      {/* front: EXHIBIT A resume */}
      <div className="deckle relative rotate-[-1.4deg] bg-[#f7f3e8] px-8 pb-9 pt-11 shadow-[0_36px_70px_-28px_rgba(0,0,0,0.4)]">
        <span className="absolute left-7 top-4 bg-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-paper">
          Exhibit A
        </span>

        <div className="font-doc text-[17px] font-medium tracking-tight text-[#1c1c1c]">
          Aarav Mehta
        </div>
        <div className="mt-0.5 text-[10px] text-[#4a4a4a]">
          4th Year, B.A. LL.B. (Hons.)
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Education">
            Symbiosis Law School, Pune
            <br />
            CGPA: 8.21/10
          </Field>
          <Field label="Internships">
            AZB &amp; Partners, Legal Intern
            <br />
            Jan 2024
            <br />
            Khaitan &amp; Co, Legal Intern
            <br />
            May 2023
          </Field>
          <Field label="Skills">
            Legal Research, Drafting,
            <br />
            Due Diligence
          </Field>
          <Field label="Publications">None listed</Field>
        </div>

        {/* red-pen arrows, pointing in from the left margin */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 130"
          preserveAspectRatio="none"
          fill="none"
        >
          <g stroke="var(--oxblood)" strokeWidth="0.8" strokeLinecap="round" vectorEffect="non-scaling-stroke">
            <path d="M2 31 C 9 29, 13 33, 15 38" />
            <path d="M15 38 l -5 -1 M15 38 l 1 -5" />
            <path d="M1 59 C 8 57, 12 61, 14 65" />
            <path d="M14 65 l -5 -1 M14 65 l 1 -5" />
            <path d="M2 92 C 8 91, 12 93, 14 97" />
            <path d="M14 97 l -5 0 M14 97 l 0 -5" />
          </g>
        </svg>
      </div>

      {/* paper clip */}
      <svg
        viewBox="0 0 40 90"
        className="absolute -top-5 right-14 h-[58px] w-[26px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]"
        fill="none"
        stroke="#9a9a9a"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M20 12 v50 a10 10 0 0 1-20 0 V20 a14 14 0 0 1 28 0 v44" />
      </svg>

      {/* editor's notes, in the left margin (desktop only) */}
      <Note className="hidden lg:block left-[-38%] top-[16%] w-[104px] rotate-[-4deg] text-right">
        Strong academic signal
      </Note>
      <Note className="hidden lg:block left-[-40%] top-[41%] w-[112px] rotate-[3deg] text-right">
        Good firms. Need better framing.
      </Note>
      <Note className="hidden lg:block left-[-37%] top-[70%] w-[102px] rotate-[-3deg] text-right">
        Missing drafting evidence
      </Note>
    </div>
  );
}
