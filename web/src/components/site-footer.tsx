import Link from "next/link";
import { Wordmark } from "./wordmark";

const COLS: [string, [string, string][]][] = [
  [
    "Product",
    [
      ["How It Works", "/#how"],
      ["Features", "/#features"],
      ["Pricing", "/#pricing"],
      ["Sample Report", "/report"],
    ],
  ],
  [
    "Company",
    [
      ["About", "/#about"],
      ["Contact", "mailto:hello@lexintent.com"],
      ["Terms", ""],
      ["Privacy", ""],
    ],
  ],
];

export function SiteFooter() {
  return (
    <footer id="about" className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1180px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
              The Resume Analyser is the first LexIntent tool for law students and
              legal professionals. More are on the way.
            </p>
          </div>
          {COLS.map(([title, links]) => (
            <div key={title}>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy">
                {title}
              </p>
              <ul className="mt-3 space-y-2 text-[0.875rem] text-muted">
                {links.map(([label, href]) =>
                  href ? (
                    <li key={label}>
                      <Link href={href} className="transition-colors hover:text-ink">
                        {label}
                      </Link>
                    </li>
                  ) : (
                    <li key={label}>
                      <span className="cursor-default opacity-60" title="Coming soon">
                        {label}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy">
              Get started
            </p>
            <Link href="/questionnaire" className="btn btn-navy mt-3 !py-2.5 text-[0.9rem]">
              Analyse my resume
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-line pt-5 text-[0.75rem] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} LexIntent</span>
          <span>Built for the Indian legal field.</span>
        </div>
      </div>
    </footer>
  );
}
