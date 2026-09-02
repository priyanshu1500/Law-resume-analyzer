"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRightIcon, SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./wordmark";
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
            return (
              <Link
                key={label}
                href={href}
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
          <Link
            href="/login"
            className="btn btn-navy hidden !px-5 !py-2.5 text-[0.9rem] sm:inline-flex"
          >
            Login
            <ArrowRightIcon size={15} weight="bold" />
          </Link>
        )}
      </div>
    </motion.header>
  );
}
