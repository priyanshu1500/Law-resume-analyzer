"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { EASE, wordRise, staggerParent } from "@/lib/motion";

/* ---- scroll parallax for decorative layers only ------------------ */

export function Parallax({
  children,
  /** px of travel across the element's scroll pass; positive = moves up */
  distance = 60,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance, -distance]),
    { stiffness: 120, damping: 30, mass: 0.5 },
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ---- headline that prints in, word by word --------------------- */

export function WordReveal({
  text,
  className = "",
  highlight,
  delay = 0,
}: {
  text: string;
  className?: string;
  /** one word (lowercase match) rendered in oxblood with a drawn underline */
  highlight?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i}>
            {w.toLowerCase().replace(/[.,]/g, "") === highlight ? (
              <span className="ink-underline" data-shown="true">
                {w}
              </span>
            ) : (
              w
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={staggerParent(0.06, delay)}
    >
      {words.map((w, i) => {
        const isHi = w.toLowerCase().replace(/[.,]/g, "") === highlight;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.08em" }}
          >
            <motion.span
              className={`inline-block ${isHi ? "ink-underline" : ""}`}
              data-shown={isHi ? "true" : undefined}
              variants={wordRise}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

/* ---- red-pen SVG paths that draw themselves in sequence -------- */

export function DrawGroup({
  children,
  className = "",
  viewBox,
  stagger = 0.35,
}: {
  children: ReactNode;
  className?: string;
  viewBox: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <svg className={className} viewBox={viewBox} fill="none" preserveAspectRatio="none">
        {children}
      </svg>
    );
  }
  return (
    <motion.svg
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerParent(stagger, 0.2)}
    >
      {children}
    </motion.svg>
  );
}

export function DrawPath(props: React.ComponentProps<typeof motion.path>) {
  return (
    <motion.path
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        show: {
          pathLength: 1,
          opacity: 1,
          transition: { pathLength: { duration: 0.5, ease: EASE }, opacity: { duration: 0.08 } },
        },
      }}
      {...props}
    />
  );
}

/* ---- handwritten note that fades + settles into place --------- */

export function InkNote({
  children,
  className = "",
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span className={`u-hand absolute ${className}`} style={{ rotate: `${rotate}deg` }}>
        {children}
      </span>
    );
  }
  return (
    <motion.span
      className={`u-hand absolute ${className}`}
      initial={{ opacity: 0, y: 6, rotate: rotate - 3 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.35 }}
    >
      {children}
    </motion.span>
  );
}

/* ---- score card: count-up + a small settle, then a slow breath -- */

export function CountUpSpring({
  to,
  className = "",
}: {
  to: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mv = useSpring(0, { stiffness: 90, damping: 22 });
  const rounded = useTransform(mv, (v) => Math.round(v));

  if (reduce) return <span className={className}>{to}</span>;
  return (
    <motion.span
      className={className}
      onViewportEnter={() => mv.set(to)}
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
}

/** One-time arrival settle. Was a perpetual float; a constantly-visible
 *  element does not need to move forever. */
export function Settle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

/* ---- tactile hover/press wrapper for cards -------------------- */

export function Lift({
  children,
  className = "",
  amount = 4,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileHover={{ y: -amount }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}
