"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import {
  EASE_OUT,
  EASE_SETTLE,
  LIFT,
  PEN_DRAW,
  SCORE_SPRING,
  WORD_IN,
  wordGroup,
} from "@/lib/motion";

/* ---- 4 · Score counter — spring, counts 0 -> to ---------------- */
export function ScoreCounter({
  to,
  className = "",
}: {
  to: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useSpring(0, SCORE_SPRING);
  const rounded = useTransform(mv, (v) => Math.round(v));
  if (reduce) return <span className={className}>{to}</span>;
  return (
    <motion.span
      ref={ref}
      className={className}
      onViewportEnter={() => mv.set(to)}
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
}
/** legacy alias */
export { ScoreCounter as CountUp };
export { ScoreCounter as CountUpSpring };

/* ---- 7 · Lift — snappy overshoot on hover/press --------------- */
export function Lift({
  children,
  className = "",
  y = -2,
  press = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  press?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileHover={{ y }}
      whileTap={press ? { scale: 0.985 } : undefined}
      transition={LIFT}
    >
      {children}
    </motion.div>
  );
}

/* ---- Arc-style subtle float + rotate on hover --------------- */
export function Tilt({
  children,
  deg = 1.5,
  className = "",
}: {
  children: ReactNode;
  deg?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileHover={{ rotate: deg, y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

/* ---- 3 · Typewriter — headline reveals, word by word --------- */
export function Typewriter({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) return <Tag className={className}>{text}</Tag>;
  const M = Tag === "h1" ? motion.h1 : Tag === "h2" ? motion.h2 : motion.span;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={wordGroup(delay)}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.06em" }}>
          <motion.span className="inline-block" variants={WORD_IN}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/* ---- 2 · Pen draw — SVG path that draws itself -------------- */
export function DrawGroup({
  children,
  className = "",
  viewBox,
  stagger = 0.18,
  preserveAspectRatio = "none",
}: {
  children: ReactNode;
  className?: string;
  viewBox: string;
  stagger?: number;
  preserveAspectRatio?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <svg className={className} viewBox={viewBox} fill="none" preserveAspectRatio={preserveAspectRatio}>
        {children}
      </svg>
    );
  return (
    <motion.svg
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.15 } } }}
    >
      {children}
    </motion.svg>
  );
}
export function DrawPath(props: React.ComponentProps<typeof motion.path>) {
  return <motion.path variants={PEN_DRAW} {...props} />;
}

/** burgundy underline under a run of text that draws itself when scrolled in */
export function PenUnderline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        aria-hidden
        className="absolute -bottom-[0.06em] left-0 h-[0.09em] w-full origin-left rounded-full bg-evidence"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
      />
    </span>
  );
}

/* ---- 5 · Page turn — rotateX hinge + rise as the section scrolls in.
   Triggered by scroll position (whileInView) but not scroll-scrubbed, so a
   section can never be left permanently mid-transparent. --------------- */
export function PageTurn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        style={{ transformOrigin: "top center" }}
        initial={{ rotateX: 12, y: 32, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.8, ease: EASE_SETTLE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ---- 6 · Ink spread — clip-path bloom -------------------- */
export function InkSpread({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ opacity: 0, scaleX: 0.92, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE_SETTLE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---- parallax for decorative layers only --------------- */
export function Parallax({
  children,
  distance = 40,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
