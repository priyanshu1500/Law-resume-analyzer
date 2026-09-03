"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./wordmark";
import { CaseFileCTA } from "./ui";
import { useAuth } from "@/lib/auth";

const LINKS: [string, string][] = [
  ["Home", "/"],
  ["Features", "/#features"],
  ["How It Works", "/#how"],
  ["Pricing", "/#pricing"],
  ["About", "/#about"],
];

export function SiteNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  return (
    <motion.header
      className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md"
      animate={{ borderColor: scrolled ? "#e5e7eb" : "rgba(229,231,235,0)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between px-6">
        <Link href="/" aria-label="LawAnalyser home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 text-[0.9375rem] font-medium text-ink lg:flex">
          {LINKS.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : false;
            const isHash = href.startsWith("/#");
            const targetId = isHash ? href.slice(2) : "";
            return (
              <Link
                key={label}
                href={href}
                onClick={(e) => {
                  // same-page navigation: scroll ourselves so it works even
                  // when the URL fragment is unchanged or the target is the top
                  if (pathname !== "/") return;
                  if (href === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (isHash) {
                    const el = document.getElementById(targetId);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      history.replaceState(null, "", href);
                    }
                  }
                }}
                className={`relative py-1 transition-colors hover:text-navy ${active ? "text-gold" : ""}`}
              >
                {label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        {user ? (
          <div className="hidden items-center gap-3 sm:flex">
            <span className="max-w-[160px] truncate text-[0.8125rem] text-muted">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy hover:text-navy-deep"
            >
              <SignOutIcon size={14} weight="bold" />
              Sign out
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/login"
              className="text-[0.875rem] font-medium text-muted transition-colors hover:text-navy"
            >
              Sign in
            </Link>
            <CaseFileCTA compact />
          </div>
        )}
      </div>
    </motion.header>
  );
}
