/**
 * LexIntent motion language. One set of easings, one spring, a few variants.
 * Editorial and physical, never bouncy-cartoon. Everything degrades to a
 * static end-state under prefers-reduced-motion (handled per component).
 */
import type { Variants, Transition } from "motion/react";

/** editorial ease: quick out, gentle settle */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** interaction ease: slight overshoot for tactile feel */
export const EASE_TACTILE = [0.34, 1.4, 0.64, 1] as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
};

/** fade + short rise — reads as a fade, per the 8-16px rule */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** container that staggers its <RevealItem> children */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** heavier arrival for a hero visual */
export const arrive: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** word in a headline that prints up into place */
export const wordRise: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
