/** Five stacked report sheets with tab labels, plus a handwritten aside. */
export function PageStack() {
  return (
    <div aria-hidden className="relative hidden h-[300px] w-[150px] select-none lg:block">
      {["01", "02", "03", "04", "05"].map((n, i) => (
        <div
          key={n}
          className="absolute left-0 top-0 h-[260px] w-[130px] border border-ink bg-card shadow-[0_16px_30px_-20px_rgba(0,0,0,0.35)]"
          style={{ transform: `translate(${i * 10}px, ${i * 12}px) rotate(${i * 1.4}deg)` }}
        >
          <span className="absolute right-2 top-3 text-[9px] font-bold tracking-[0.1em] text-muted">
            {n}
          </span>
        </div>
      ))}
      <span className="u-hand absolute -right-4 bottom-[-2rem] w-[130px] rotate-[-4deg] text-[15px]">
        5-page newsroom-style report
      </span>
    </div>
  );
}
