"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { PAPER_SLIDE, paperGroup } from "@/lib/motion";

const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -6% 0px" } as const;

/**
 * PaperSlide — the entrance. y:40 -> 0 over 0.8s with a heavy settle.
 * Not a fade: it always moves. Static end-state under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "span" ? motion.span : motion.div;
  if (reduce) {
    const Plain = as === "span" ? "span" : "div";
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 },
        },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.09,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={paperGroup(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  variants = PAPER_SLIDE,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
