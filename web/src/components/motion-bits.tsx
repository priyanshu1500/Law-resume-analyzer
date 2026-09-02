"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/* ---- scroll parallax for decorative layers only ----------------- */
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---- number that counts up once on scroll into view ------------ */
export function CountUp({
  to,
  duration = 1200,
  className = "",
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const set = (n: number) => {
    if (ref.current) ref.current.textContent = String(n);
  };
  return (
    <motion.span
      ref={ref}
      className={className}
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        if (reduce) return set(to);
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          set(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true, amount: 0.6 }}
    >
      {reduce ? to : 0}
    </motion.span>
  );
}

/* ---- gentle hover tilt (used on the resume mockup) ------------- */
export function Tilt({
  children,
  deg = 2,
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
      whileHover={{ rotate: deg, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

/** legacy alias */
export { CountUp as CountUpSpring };
