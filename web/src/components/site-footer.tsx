import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="u-pullquote mt-5 text-[1.05rem]">
              &ldquo;The rule of law is the essence of constitutionalism.&rdquo;
            </p>
            <p className="u-eyebrow mt-2">Editorial position, LexIntent</p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-[0.8125rem] text-ink-soft">
            <Link href="/assessment" className="hover:text-oxblood">Begin intake</Link>
            <Link href="/report" className="hover:text-oxblood">Sample report</Link>
            <Link href="/#fees" className="hover:text-oxblood">Fees</Link>
            <Link href="/dashboard" className="hover:text-oxblood">Dashboard</Link>
            <Link href="/#instrument" className="hover:text-oxblood">Method</Link>
            <Link href="/#coverage" className="hover:text-oxblood">The report</Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-rule pt-5 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-mute sm:flex-row">
          <span>LexIntent AI</span>
          <span>Analysis is guidance, not legal or career advice.</span>
        </div>
      </div>
    </footer>
  );
}
