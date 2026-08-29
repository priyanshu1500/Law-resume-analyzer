import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteNav() {
  return (
    <header className="border-b border-ink bg-paper">
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6">
        <Link href="/" aria-label="LexIntent AI home">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-8 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
          <Link href="/#report" className="hidden hover:text-ink sm:inline">
            The Report
          </Link>
          <Link href="/#method" className="hidden hover:text-ink sm:inline">
            Method
          </Link>
          <Link href="/#fees" className="hidden hover:text-ink sm:inline">
            Fees
          </Link>
          <Link
            href="/assessment"
            className="border border-ink px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Analyse my resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
