"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Entrance trigger                                                    */
/*                                                                     */
/* IntersectionObserver plus a scroll/resize fallback, so an element    */
/* can never be left permanently hidden if the observer misbehaves.     */
/* ------------------------------------------------------------------ */

export function useEnter<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const cleanup = () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };

    const reveal = () => {
      cleanup();
      setVisible(true);
    };

    const check = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh * 0.94 && rect.bottom > -1) reveal();
    };

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(check);
    }

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) reveal();
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0 },
      );
      observer.observe(el);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();

    return cleanup;
  }, [visible]);

  return [ref, visible] as const;
}

/* ------------------------------------------------------------------ */
/* Reveal — the workhorse scroll entrance                              */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [ref, visible] = useEnter<HTMLDivElement>();
  const shown = visible || reduce;

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={className}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : y }}
      transition={{ duration: 0.75, delay: shown ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger group                                                       */
/* ------------------------------------------------------------------ */

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [ref, visible] = useEnter<HTMLDivElement>();
  const shown = visible || reduce;

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={className}
      initial={false}
      animate={shown ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay + 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Line-by-line heading reveal                                         */
/* ------------------------------------------------------------------ */

export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-3 -mb-3">
          <motion.span
            data-reveal=""
            className={`block pb-2 -mb-2 ${lineClassName ?? ""}`}
            initial={reduce ? false : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: delay + i * 0.11, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax image frame                                                */
/* ------------------------------------------------------------------ */

export function Parallax({
  children,
  className,
  distance = 44,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image that uncovers itself behind a wipe                            */
/* ------------------------------------------------------------------ */

export function Uncover({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [ref, visible] = useEnter<HTMLDivElement>();
  const shown = visible || reduce;

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={false}
      animate={{ clipPath: shown ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1.05, delay: shown ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Counting number                                                     */
/* ------------------------------------------------------------------ */

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const [started, setStarted] = useState(false);

  // Fallback so the figure is never stuck at zero.
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (inView || started) mv.set(value);
  }, [inView, started, mv, value]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toLocaleString("en-US") + suffix;
      return;
    }
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString("en-US") + suffix;
      }
    });
  }, [spring, suffix, reduce, value]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Thin scroll progress rule                                           */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    >
      <div className="h-full w-full" style={{ background: "var(--brand)" }} />
    </motion.div>
  );
}

export { motion };
