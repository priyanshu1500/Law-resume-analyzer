"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, staggerParent, EASE } from "@/lib/motion";

const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;

/**
 * Fade + short rise on first scroll into view. Motion's whileInView handles
 * the observer; under reduced motion the element renders in its final state.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  /** ms, kept for call-site compatibility */
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
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE, delay: delay / 1000 },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/** Wrap a set of <RevealItem>s to stagger their entrance. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
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
      variants={staggerParent(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  variants = fadeUp,
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
