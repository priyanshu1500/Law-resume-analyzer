/**
 * LawAnalyser motion system — exactly seven named interactions.
 * Physical, not decorative. No plain fades. Every one degrades to its
 * static end-state under prefers-reduced-motion (handled per component
 * in motion-bits.tsx).
 *
 *  1 PaperSlide   0.8s   heavy settle          entrances, layered cards
 *  2 PenDraw      0.5s   line draws itself     burgundy underlines, ticks
 *  3 Typewriter   0.35s  word/char stagger     short headlines
 *  4 ScoreCounter spring count 0 -> N          score numbers
 *  5 PageTurn     scroll rotateX + rise        report / fit sections
 *  6 InkSpread    0.7s   clip-path bloom       verdict stamps, rules
 *  7 Lift         0.15s  snappy overshoot      buttons, card hover
 */
import type { Variants, Transition } from "motion/react";

/* easings ---------------------------------------------------------- */
export const EASE_SETTLE = [0.16, 1, 0.3, 1] as const; // expo-out-ish, heavy end
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_SNAP = [0.34, 1.56, 0.64, 1] as const; // overshoot

/* 1 · Paper slide ------------------------------------------------- */
export const PAPER_SLIDE: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_SETTLE } },
};
export const paperGroup = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/* 2 · Pen draw ------------------------------------------------- */
export const PEN_DRAW: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.5, ease: EASE_OUT }, opacity: { duration: 0.06 } },
  },
};

/* 3 · Typewriter (per word) --------------------------------- */
export const WORD_IN: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_SETTLE } },
};
export const wordGroup = (delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: delay } },
});

/* 4 · Score counter ------------------------------------------ */
export const SCORE_SPRING: Transition = { type: "spring", stiffness: 90, damping: 20, mass: 1 };

/* 7 · CTA / card lift --------------------------------------- */
export const LIFT: Transition = { duration: 0.15, ease: EASE_SNAP };
