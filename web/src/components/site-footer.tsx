import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="band-dark bg-paper">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1.4fr]">
          <div>
            <Wordmark />
            <p className="mt-5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-oxblood">
              Editorial Position
            </p>
            <p className="mt-2 max-w-[32ch] text-[0.8125rem] leading-relaxed text-muted">
              Every resume already makes an argument. We help you write the
              stronger one.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              ["How It Works", "/#how"],
              ["Sample Report", "/report"],
              ["Pricing", "/#pricing"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["About", "/#how"],
              ["Terms", "/#"],
              ["Privacy", "/#"],
            ]}
          />

          <div>
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink">
              Questions?
            </p>
            <form className="mt-3 flex items-center border border-rule-strong">
              <input
                type="email"
                defaultValue="hello@lexintent.com"
                aria-label="Email"
                className="w-full bg-transparent px-3 py-2.5 text-[0.8125rem] text-ink outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-full place-items-center border-l border-rule-strong px-3 py-2.5 text-ink transition-colors hover:bg-oxblood hover:text-paper"
              >
                <ArrowRightIcon size={14} weight="bold" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-rule pt-5">
          <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted">
            Built for law students. Backed by insight.
          </span>
          <span className="size-[7px] bg-oxblood" aria-hidden />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-oxblood">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-[0.8125rem] text-muted">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-ink">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
