import Link from "next/link";
import { Wordmark } from "./wordmark";
import { Button } from "./ui";

export function SiteNav() {
  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-5">
          <Link href="/" aria-label="LexIntent home">
            <Wordmark />
          </Link>
          <span
            className="hidden h-9 w-px bg-rule-strong sm:block"
            aria-hidden
          />
          <div className="hidden items-start gap-2 sm:flex">
            <span className="mt-[0.3rem] size-[6px] shrink-0 bg-oxblood" aria-hidden />
            <span className="text-[0.625rem] font-bold uppercase leading-[1.35] tracking-[0.12em] text-ink">
              AI Career Analysis
              <br />
              for Law Students
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-ink lg:flex">
          <Link href="/#how" className="hover:text-oxblood">
            How It Works
          </Link>
          <Link href="/report" className="hover:text-oxblood">
            Sample Report
          </Link>
          <Link href="/#pricing" className="hover:text-oxblood">
            Pricing
          </Link>
        </nav>

        <Button href="/assessment" className="hidden sm:inline-flex">
          Analyse My Resume
        </Button>
      </div>
    </header>
  );
}
