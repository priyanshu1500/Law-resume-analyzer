"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Wordmark } from "./wordmark";
import { Button } from "./ui";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm"
      animate={{ boxShadow: scrolled ? "0 8px 24px -16px rgba(0,0,0,0.4)" : "0 0 0 rgba(0,0,0,0)" }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-3.5">
        <div className="flex items-center gap-5">
          <Link href="/" aria-label="LexIntent home">
            <motion.span
              className="inline-block origin-left"
              animate={{ scale: scrolled ? 0.9 : 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Wordmark />
            </motion.span>
          </Link>
          <span className="hidden h-9 w-px bg-rule-strong sm:block" aria-hidden />
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
          {[
            ["How It Works", "/#how"],
            ["Sample Report", "/report"],
            ["Pricing", "/#pricing"],
          ].map(([label, href]) => (
            <Link key={label} href={href} className="group relative py-1">
              {label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-oxblood transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Button href="/assessment" className="hidden sm:inline-flex">
          Analyse My Resume
        </Button>
      </div>
    </motion.header>
  );
}
