"use client";

import { motion, useReducedMotion } from "framer-motion";

const W = 490;
const H = 300;

const layers = [
  { x: 118, count: 4, label: "Input" },
  { x: 252, count: 5, label: "Hidden" },
  { x: 386, count: 3, label: "Output" },
];

const nodes = layers.map((layer) => {
  const pad = 42;
  const span = H - pad * 2;
  return Array.from({ length: layer.count }, (_, i) => ({
    x: layer.x,
    y: layer.count === 1 ? H / 2 : pad + (span / (layer.count - 1)) * i,
  }));
});

type Edge = { x1: number; y1: number; x2: number; y2: number; key: string; layer: number };

const edges: Edge[] = [];
for (let l = 0; l < nodes.length - 1; l++) {
  nodes[l].forEach((a, i) => {
    nodes[l + 1].forEach((b, j) => {
      edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, key: `${l}-${i}-${j}`, layer: l });
    });
  });
}

/* Deterministic picks so server and client agree. */
const activeEdges = edges.filter((_, i) => i % 7 === 2).slice(0, 7);
const particleEdges = edges.filter((_, i) => i % 5 === 1).slice(0, 9);

const inputLabels = ["Academic", "Vocational", "Corporate", "Government"];
const outputLabels = ["Skilled", "Certified", "Placed"];

export function NetworkFigure({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative w-full overflow-hidden border"
      style={{ background: "var(--surface)", borderColor: "var(--line)" }}
    >
      {/* corner registration marks — technical-drawing cue */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-b border-l",
        "right-3 bottom-3 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute h-3 w-3 ${pos}`}
          style={{ borderColor: "var(--line)" }}
        />
      ))}

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Diagram of a neural network mapping four training sectors to skilled, certified and placed outcomes"
      >
        {/* baseline edges */}
        <g style={{ stroke: "var(--ink-muted)" }} strokeWidth={0.5} opacity={0.22}>
          {edges.map((e) => (
            <line key={e.key} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
          ))}
        </g>

        {/* weighted connections lighting up */}
        <g style={{ stroke: "var(--brand)" }} strokeWidth={1.1} fill="none" strokeLinecap="round">
          {activeEdges.map((e, i) => (
            <motion.line
              key={`a-${e.key}`}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              strokeDasharray="7 150"
              initial={reduce ? undefined : { strokeDashoffset: 160 }}
              animate={reduce ? undefined : { strokeDashoffset: -160 }}
              transition={{ duration: 3.6, delay: i * 0.42, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </g>

        {/* signal particles travelling the graph */}
        {!reduce && (
          <g>
            {particleEdges.map((e, i) => (
              <motion.circle
                key={`p-${e.key}`}
                r={1.9}
                style={{ fill: "var(--brand)" }}
                animate={{
                  cx: [e.x1, e.x2],
                  cy: [e.y1, e.y2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.33 + (e.layer === 1 ? 0.75 : 0),
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: "linear",
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            ))}
          </g>
        )}

        {/* nodes */}
        {nodes.map((layer, li) =>
          layer.map((n, ni) => (
            <g key={`n-${li}-${ni}`}>
              {/* activation ripple */}
              {!reduce && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  style={{ fill: "var(--brand)" }}
                  animate={{ r: [5, 13], opacity: [0.28, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: li * 0.6 + ni * 0.22,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: "easeOut",
                  }}
                />
              )}
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={li === 1 ? 5 : 6}
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth={1}
                initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + (li * 5 + ni) * 0.045 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              {li === 1 && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={2}
                  fill="var(--brand)"
                  animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 2.6, delay: ni * 0.3, repeat: Infinity }}
                />
              )}
            </g>
          )),
        )}

        {/* layer captions */}
        {!compact && (
          <g
            style={{ fill: "var(--ink-muted)" }}
            fontSize="7.5"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            letterSpacing="1.4"
          >
            {layers.map((layer) => (
              <text key={layer.label} x={layer.x} y={H - 12} textAnchor="middle">
                {layer.label.toUpperCase()}
              </text>
            ))}
          </g>
        )}

        {/* edge labels */}
        <g
          style={{ fill: "var(--ink-soft)" }}
          fontSize="8"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
        >
          {inputLabels.map((label, i) => (
            <text key={label} x={106} y={nodes[0][i].y + 3} textAnchor="end">
              {label}
            </text>
          ))}
          {outputLabels.map((label, i) => (
            <text key={label} x={398} y={nodes[2][i].y + 3} textAnchor="start">
              {label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default NetworkFigure;
