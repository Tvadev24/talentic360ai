"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { aiEngine } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Assess — capability baseline against role requirement               */
/* ------------------------------------------------------------------ */

export function GapChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const show = inView || reduce;

  return (
    <div ref={ref} className="space-y-4">
      {aiEngine.capability.map((row, i) => (
        <div key={row.label} className="flex items-center gap-3">
          <span
            className="w-[68px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em]"
            style={{ color: "var(--ink-muted)" }}
          >
            {row.label}
          </span>

          <div
            className="relative h-[18px] flex-1 overflow-hidden"
            style={{ background: "var(--sunken)" }}
          >
            {/* the gap, hatched */}
            <motion.span
              className="absolute inset-y-0"
              style={{
                left: `${row.current}%`,
                width: `${row.required - row.current}%`,
                backgroundImage:
                  "repeating-linear-gradient(135deg, var(--ink-muted) 0 1px, transparent 1px 5px)",
                opacity: 0.45,
              }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: show ? 0.45 : 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
            />

            {/* measured capability today */}
            <motion.span
              className="absolute inset-y-0 left-0"
              style={{ background: "var(--brand)" }}
              initial={reduce ? false : { width: 0 }}
              animate={{ width: show ? `${row.current}%` : 0 }}
              transition={{ duration: 1, delay: 0.1 + i * 0.09, ease: EASE }}
            />

            {/* requirement marker */}
            <motion.span
              className="absolute inset-y-0 w-[2px]"
              style={{ left: `${row.required}%`, background: "var(--accent)" }}
              initial={reduce ? false : { opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: show ? 1 : 0, scaleY: show ? 1 : 0.3 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
            />
          </div>

          <span
            className="w-[58px] shrink-0 text-right font-mono text-[9.5px] tabular-nums"
            style={{ color: "var(--ink-soft)" }}
          >
            {row.current}
            <span style={{ color: "var(--ink-muted)" }}>→</span>
            {row.required}
          </span>
        </div>
      ))}

      <div
        className="flex items-center gap-4 border-t pt-3 font-mono text-[9px] uppercase tracking-[0.14em]"
        style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
      >
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-3" style={{ background: "var(--brand)" }} />
          today
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--ink-muted) 0 1px, transparent 1px 4px)",
            }}
          />
          gap
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-[2px]" style={{ background: "var(--accent)" }} />
          required
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Match — the gap scored against every programme track                */
/* ------------------------------------------------------------------ */

const MW = 340;
const MH = 206;
const HUB = { x: MW / 2, y: MH / 2 };
const RX = 112;
const RY = 64;

const tracks = ["Academic", "Vocational", "Corporate", "Government", "Post-Grad", "Volunteering", "Remote"];

const trackNodes = tracks.map((label, i) => {
  const angle = (-90 + (360 / tracks.length) * i) * (Math.PI / 180);
  return {
    label,
    x: HUB.x + Math.cos(angle) * RX,
    y: HUB.y + Math.sin(angle) * RY,
    cos: Math.cos(angle),
  };
});

const CYCLE = tracks.length * 1.05;

export function MatchGraph() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox={`0 0 ${MW} ${MH}`} className="h-auto w-full" role="img" aria-label="The capability gap scored against every programme track">
      {/* dormant links */}
      <g style={{ stroke: "var(--ink-muted)" }} strokeWidth={0.6} opacity={0.3}>
        {trackNodes.map((n) => (
          <line key={`d-${n.label}`} x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* the link under evaluation */}
      {!reduce && (
        <g style={{ stroke: "var(--brand)" }} strokeWidth={1.4} strokeLinecap="round">
          {trackNodes.map((n, i) => (
            <motion.line
              key={`l-${n.label}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: CYCLE,
                times: [i / tracks.length, (i + 0.12) / tracks.length, (i + 0.72) / tracks.length, (i + 0.95) / tracks.length],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </g>
      )}

      {/* nodes */}
      {trackNodes.map((n, i) => (
        <g key={n.label}>
          {!reduce && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              style={{ fill: "var(--brand)" }}
              animate={{ r: [4, 12], opacity: [0.3, 0] }}
              transition={{
                duration: CYCLE,
                times: [i / tracks.length, (i + 0.5) / tracks.length],
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r={4}
            style={{ fill: "var(--paper)", stroke: "var(--ink)" }}
            strokeWidth={1}
          />
          <text
            x={n.x + (n.cos > 0.15 ? 8 : n.cos < -0.15 ? -8 : 0)}
            y={n.y + (Math.abs(n.cos) <= 0.15 ? (n.y < HUB.y ? -9 : 13) : 2.5)}
            textAnchor={n.cos > 0.15 ? "start" : n.cos < -0.15 ? "end" : "middle"}
            fontSize="7"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            style={{ fill: "var(--ink-muted)" }}
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* hub */}
      <circle cx={HUB.x} cy={HUB.y} r={21} style={{ fill: "var(--brand)" }} />
      {!reduce && (
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          style={{ fill: "none", stroke: "var(--brand)" }}
          strokeWidth={1}
          animate={{ r: [21, 34], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <text
        x={HUB.x}
        y={HUB.y + 3}
        textAnchor="middle"
        fontSize="8"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        letterSpacing="0.5"
        style={{ fill: "var(--brand-contrast)" }}
      >
        360.AI
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Track — projected competence curve                                  */
/* ------------------------------------------------------------------ */

const W = 300;
const H = 170;
const PAD = { l: 26, r: 10, t: 12, b: 22 };

export function TrajectoryChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const show = inView || reduce;

  const points = aiEngine.trajectory;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const px = (i: number) => PAD.l + (innerW / (points.length - 1)) * i;
  const py = (v: number) => PAD.t + innerH - (innerH * v) / 100;

  const line = points.map((v, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(v)}`).join(" ");

  // confidence band: ±7 points, clamped
  const upper = points.map((v, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(Math.min(100, v + 7))}`);
  const lower = points
    .map((v, i) => `L${px(points.length - 1 - i)},${py(Math.max(0, points[points.length - 1 - i] - 7))}`)
    .slice(1);
  const band = `${upper.join(" ")} ${lower.join(" ")} Z`;

  const targetY = py(85);

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {/* gridlines */}
        <g style={{ stroke: "var(--line)" }} strokeWidth={0.6}>
          {[0, 25, 50, 75, 100].map((v) => (
            <line key={v} x1={PAD.l} y1={py(v)} x2={W - PAD.r} y2={py(v)} />
          ))}
        </g>

        <g
          style={{ fill: "var(--ink-muted)" }}
          fontSize="7"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
        >
          {[0, 50, 100].map((v) => (
            <text key={v} x={PAD.l - 5} y={py(v) + 2.5} textAnchor="end">
              {v}
            </text>
          ))}
          <text x={PAD.l} y={H - 6}>
            WK 1
          </text>
          <text x={W - PAD.r} y={H - 6} textAnchor="end">
            WK {points.length}
          </text>
        </g>

        {/* competence threshold */}
        <line
          x1={PAD.l}
          y1={targetY}
          x2={W - PAD.r}
          y2={targetY}
          style={{ stroke: "var(--accent)" }}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text
          x={PAD.l + 3}
          y={targetY - 4}
          textAnchor="start"
          fontSize="7"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          style={{ fill: "var(--accent)" }}
        >
          COMPETENT
        </text>

        {/* confidence band */}
        <motion.path
          d={band}
          style={{ fill: "var(--brand)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: show ? 0.14 : 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* trajectory */}
        <motion.path
          d={line}
          fill="none"
          style={{ stroke: "var(--brand)" }}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: show ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
        />

        {/* sampled readings */}
        {points.map((v, i) => (
          <motion.circle
            key={i}
            cx={px(i)}
            cy={py(v)}
            r={2}
            style={{ fill: "var(--paper)", stroke: "var(--brand)" }}
            strokeWidth={1.2}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.13 }}
          />
        ))}

        {/* live head */}
        {!reduce && show && (
          <motion.circle
            r={3.4}
            style={{ fill: "var(--brand)" }}
            animate={{
              cx: points.map((_, i) => px(i)),
              cy: points.map((v) => py(v)),
            }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          />
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Processing readout                                                  */
/* ------------------------------------------------------------------ */

export function InferenceTicker() {
  const lines = aiEngine.ticker;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(reduce ? lines[0] : "");

  useEffect(() => {
    if (reduce) return;
    const text = lines[index % lines.length];
    let char = 0;
    setTyped("");

    const typer = setInterval(() => {
      char += 1;
      setTyped(text.slice(0, char));
      if (char >= text.length) clearInterval(typer);
    }, 26);

    const advance = setTimeout(() => setIndex((v) => v + 1), 2400);

    return () => {
      clearInterval(typer);
      clearTimeout(advance);
    };
  }, [index, lines, reduce]);

  const previous = lines[(index - 1 + lines.length) % lines.length];
  const older = lines[(index - 2 + lines.length * 2) % lines.length];

  return (
    <div
      className="flex flex-col gap-1 font-mono text-[10.5px] leading-relaxed"
      role="status"
      aria-live="off"
    >
      {index > 1 && (
        <span style={{ color: "var(--ink-muted)", opacity: 0.4 }}>
          <span style={{ color: "var(--brand)" }}>›</span> {older}
        </span>
      )}
      {index > 0 && (
        <span style={{ color: "var(--ink-muted)", opacity: 0.7 }}>
          <span style={{ color: "var(--brand)" }}>›</span> {previous}
        </span>
      )}
      <span style={{ color: "var(--ink)" }}>
        <span style={{ color: "var(--brand)" }}>›</span> {typed}
        {!reduce && (
          <motion.span
            className="ml-[1px] inline-block h-[10px] w-[6px] translate-y-[1px]"
            style={{ background: "var(--brand)" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </span>
    </div>
  );
}
