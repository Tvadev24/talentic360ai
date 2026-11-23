"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  TrendingUp,
  ShieldCheck,
  Activity,
  Layers,
  Award,
} from "lucide-react";
import { photo } from "@/lib/images";

const IMPACT_CARDS = [
  {
    id: "mapping",
    tag: "COGNITIVE DIAGNOSTIC",
    title: "AI-Powered Adaptive Skill Mapping",
    description:
      "Every cohort participant undergoes high-dimensional cognitive diagnostic scoring. Our 360-Synapse engine maps exact capability baselines against live enterprise job specifications in real-time.",
    metricValue: "99.4%",
    metricLabel: "Diagnostic Accuracy",
    progress: 99.4,
    statA: "40+ Skill Vectors",
    statB: "Real-time Telemetry",
    accentColor: "#34d399", // Emerald
    icon: Activity,
  },
  {
    id: "immersion",
    tag: "ENTERPRISE IMMERSION",
    title: "Hands-on Production Capstones with Industry Mentors",
    description:
      "Theoretical training is eliminated. Participants build scalable enterprise architectures under the direct mentorship of senior practitioners from Fortune 500 engineering and management teams.",
    metricValue: "10,000+",
    metricLabel: "Certified Professionals",
    progress: 96.8,
    statA: "500+ Corporate Partners",
    statB: "Zero-Void Curriculum",
    accentColor: "#60a5fa", // Blue
    icon: Layers,
  },
  {
    id: "placement",
    tag: "ALGORITHMIC PLACEMENT",
    title: "Continuous Role Matching & Accelerated Placement",
    description:
      "Upon milestone verification, the 360.AI match engine connects qualified candidates directly into pre-approved enterprise hiring pipelines, reducing corporate onboarding velocity by over 65%.",
    metricValue: "95%",
    metricLabel: "Placement Rate",
    progress: 95.0,
    statA: "14 Days Avg. Velocity",
    statB: "Industry Endorsed",
    accentColor: "#fbbf24", // Amber
    icon: Award,
  },
];

export function ParallaxShowcaseSection() {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simulatedScores, setSimulatedScores] = useState<Record<string, number>>({
    mapping: 99.4,
    immersion: 97.2,
    placement: 95.8,
  });

  const triggerSim = (id: string) => {
    setActiveSimulation(id);
    const randomized = Number((97.5 + Math.random() * 2.3).toFixed(1));
    setSimulatedScores((prev) => ({ ...prev, [id]: randomized }));
    setTimeout(() => {
      setActiveSimulation(null);
    }, 1800);
  };

  // Fixed background editorial image
  const bgUrl = photo("heroWide", { w: 1920, h: 1080, q: 85 });

  return (
    <section
      className="relative overflow-hidden py-20 md:py-32 text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(7, 16, 12, 0.88), rgba(5, 12, 9, 0.94)), url(${bgUrl})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Background Matrix Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52, 211, 153, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.2) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Subtle Radial Glow in Center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/10 blur-[130px]"
      />

      <div className="shell relative z-10">
        {/* Section Heading with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-emerald-300 backdrop-blur-md shadow-lg shadow-emerald-950/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Neural Impact Architecture
          </div>

          <h2 className="display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.12] text-white">
            Workforce Intelligence{" "}
            <em className="not-italic text-emerald-400 font-normal italic">at Global Scale</em>
          </h2>

          <p
            className="mt-4 text-[15px] leading-relaxed text-white/80 md:text-[16.5px]"
            style={{ maxWidth: "58ch" }}
          >
            The background remains anchored while our 3-stage capability engine drives measurable workforce transformation across academic, vocational, and corporate enterprises.
          </p>
        </motion.div>

        {/* Floating Glassmorphic Cards that scroll over the fixed background */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {IMPACT_CARDS.map((card, idx) => {
            const isSimulating = activeSimulation === card.id;
            const currentScore = simulatedScores[card.id] ?? card.progress;
            const IconComponent = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: idx * 0.16 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black/60 p-7 backdrop-blur-2xl transition-shadow duration-300 hover:border-emerald-400/50 hover:bg-black/75 hover:shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
                }}
              >
                {/* Glowing Top Shimmer Line */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div>
                  {/* Eyebrow & Status */}
                  <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3.5 text-[11px] font-mono">
                    <span className="font-semibold uppercase tracking-wider text-emerald-400">
                      {card.tag}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Stream
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3.5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-emerald-400 transition-colors group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="display text-[1.38rem] leading-snug text-white transition-colors group-hover:text-emerald-300">
                      {card.title}
                    </h3>
                  </div>

                  {/* Body description */}
                  <p className="mt-4 text-[13.5px] leading-relaxed text-white/75">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Metric & Live Interaction */}
                <div className="mt-8 border-t border-white/10 pt-5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="display text-[2.2rem] font-bold tabular-nums text-white group-hover:text-emerald-400 transition-colors">
                        {isSimulating ? `${currentScore}%` : card.metricValue}
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                        {card.metricLabel}
                      </div>
                    </div>

                    <div className="text-right text-[11px] font-mono text-white/70 space-y-1.5">
                      <div className="flex items-center justify-end gap-1.5 text-emerald-300 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{card.statA}</span>
                      </div>
                      <div className="text-white/50">{card.statB}</div>
                    </div>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${Math.min(100, currentScore)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                    />
                  </div>

                  {/* Interactive Simulation Trigger */}
                  <button
                    type="button"
                    onClick={() => triggerSim(card.id)}
                    disabled={isSimulating}
                    className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 py-2.5 text-[11px] font-mono uppercase tracking-wider text-white/90 transition-all hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:text-white cursor-pointer active:scale-[0.98]"
                  >
                    {isSimulating ? (
                      <>
                        <Zap className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
                        <span>Recalibrating Telemetry...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Run Impact Diagnostic</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Action Ribbon with Glassmorphic Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/15 bg-black/60 px-7 py-6 backdrop-blur-2xl shadow-xl"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-white">
                Ready to deploy customized AI apprenticeship tracks for your organization?
              </p>
              <p className="text-[12.5px] text-white/65 mt-0.5">
                Direct curriculum mapping with verifiable placement agreements across India and globally.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn btn-invert btn-sm flex items-center gap-2"
              style={{
                background: "#34d399",
                color: "#05110d",
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              Consult 360.AI Team
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ParallaxShowcaseSection;
