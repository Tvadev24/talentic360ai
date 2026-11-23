"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useEnter } from "@/components/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Mint that stays legible on any photograph, in either theme. */
const LINE = "rgba(167, 232, 199, 0.92)";
const CHIP = "rgba(8, 16, 12, 0.84)";

export type VisionRegion = {
  /** position and size as percentages of the frame */
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  value?: string;
};

function Bracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  } as const;
  return (
    <span
      aria-hidden="true"
      className={`absolute h-3.5 w-3.5 ${map[corner]}`}
      style={{ borderColor: LINE }}
    />
  );
}

export function AiVisionOverlay({
  regions,
  hud = "360.AI VISION",
  scan = true,
  grid = true,
  delay = 0,
}: {
  regions: VisionRegion[];
  hud?: string;
  scan?: boolean;
  grid?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [ref, entered] = useEnter<HTMLDivElement>();
  const shown = entered || reduce;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* sensor grid */}
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(167,232,199,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(167,232,199,0.16) 1px, transparent 1px)",
            backgroundSize: "11% 16%",
            opacity: 0.5,
          }}
        />
      )}

      {/* frame reticles */}
      <div className="absolute inset-3">
        <Bracket corner="tl" />
        <Bracket corner="tr" />
        <Bracket corner="bl" />
        <Bracket corner="br" />
      </div>

      {/* scanning sweep */}
      {scan && !reduce && (
        <motion.div
          className="absolute inset-x-0 h-20"
          initial={{ top: "-12%" }}
          animate={{ top: ["-12%", "104%"] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "linear", repeatDelay: 1.6 }}
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(167,232,199,0) 0%, rgba(167,232,199,0.10) 70%, rgba(167,232,199,0.32) 100%)",
            }}
          />
          <div className="h-px w-full" style={{ background: LINE, opacity: 0.85 }} />
        </motion.div>
      )}

      {/* detections */}
      {regions.map((region, i) => (
        <motion.div
          key={region.label + region.value}
          className="absolute"
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            width: `${region.w}%`,
            height: `${region.h}%`,
          }}
          initial={false}
          animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 1.06 }}
          transition={{ duration: 0.6, delay: shown ? delay + i * 0.2 : 0, ease: EASE }}
        >
          <span
            className="absolute inset-0 border"
            style={{ borderColor: "rgba(167,232,199,0.42)" }}
          />
          <Bracket corner="tl" />
          <Bracket corner="tr" />
          <Bracket corner="bl" />
          <Bracket corner="br" />

          <motion.span
            className="absolute -top-[9px] left-0 flex max-w-full items-center gap-1.5 whitespace-nowrap px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.16em] text-white"
            style={{ background: CHIP, border: "1px solid rgba(167,232,199,0.35)" }}
            initial={false}
            animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : -6 }}
            transition={{ duration: 0.4, delay: shown ? delay + i * 0.2 + 0.22 : 0 }}
          >
            <motion.span
              className="inline-block h-1 w-1 rounded-full"
              style={{ background: LINE }}
              animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
            />
            {region.label}
            {region.value && (
              <span style={{ color: LINE }} className="tabular-nums">
                {region.value}
              </span>
            )}
          </motion.span>
        </motion.div>
      ))}

      {/* heads-up chip */}
      <motion.div
        className="absolute left-5 top-5 flex items-center gap-2 px-2.5 py-[5px] font-mono text-[9.5px] uppercase tracking-[0.2em] text-white"
        style={{ background: CHIP, border: "1px solid rgba(167,232,199,0.3)" }}
        initial={false}
        animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -6 }}
        transition={{ duration: 0.5, delay: shown ? delay + 0.1 : 0 }}
      >
        <motion.span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: LINE }}
          animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        {hud}
      </motion.div>
    </div>
  );
}

export default AiVisionOverlay;
