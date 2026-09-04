"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./wordmark";
import { CaseFileCTA } from "./ui";
import { useAuth } from "@/lib/auth";

type NavItem = { label: string; href: string; id: string };

const LINKS: NavItem[] = [
  { label: "Home", href: "/", id: "home" },
  { label: "Features", href: "/#features", id: "features" },
  { label: "How It Works", href: "/#how", id: "how" },
  { label: "Pricing", href: "/#pricing", id: "pricing" },
  { label: "About", href: "/#about", id: "about" },
];

const SECTION_IDS = LINKS.filter((l) => l.id !== "home").map((l) => l.id);
const HEADER_LINE = 140; // px from viewport top; a section is "active" once its top is within this band

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { user, signOut } = useAuth();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(onHome ? "home" : null);
  // while a click-triggered smooth scroll is in flight, freeze the spy so the
  // indicator doesn't flicker through every section on the way
  const spyFrozenUntil = useRef(0);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  const runSpy = useCallback(() => {
    if (!onHome) return;
    if (Date.now() < spyFrozenUntil.current) return;
    if (window.scrollY < 120) {
      setActiveId("home");
      return;
    }
    let current = "home";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= HEADER_LINE) current = id;
    }
    // when the page can't scroll any further, the last section (About) wins
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      current = "about";
    }
    setActiveId(current);
  }, [onHome]);

  useEffect(() => {
    if (!onHome) {
      setActiveId(null);
      return;
    }
    runSpy();
    window.addEventListener("scroll", runSpy, { passive: true });
    window.addEventListener("resize", runSpy);
    return () => {
      window.removeEventListener("scroll", runSpy);
      window.removeEventListener("resize", runSpy);
    };
  }, [onHome, runSpy]);

  const handleClick = (item: NavItem) => (e: React.MouseEvent) => {
    if (!onHome) return; // let <Link> navigate to "/" then to the hash
    e.preventDefault();
    setActiveId(item.id); // move the indicator immediately
    spyFrozenUntil.current = Date.now() + 900;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    if (item.href === "/") {
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, "", "/");
    } else {
      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior, block: "start" });
      history.replaceState(null, "", item.href);
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md"
      animate={{ borderColor: scrolled ? "#e3e6ef" : "rgba(227,230,239,0)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between px-6">
        <Link href="/" aria-label="LexIntent home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((item) => {
            const active = item.id === activeId;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClick(item)}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[0.9375rem] font-medium transition-colors ${
                  active ? "text-navy" : "text-ink hover:text-navy"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gold"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
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
