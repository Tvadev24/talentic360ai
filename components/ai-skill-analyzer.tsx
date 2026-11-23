"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Sparkles, CheckCircle2, Sliders, TrendingUp } from "lucide-react";
import SectionHead from "@/components/section-head";
import { Reveal } from "@/components/motion";

const SPECIALIZATIONS = [
  {
    id: "ai-engineer",
    title: "Applied Generative AI & LLM Systems",
    baseline: 42,
    target: 95,
    matchScore: "99.2%",
    duration: "14 Weeks",
    track: "Academic & Post-Graduate",
    keyModules: ["Transformer Architectures", "RAG & Vector Pipelines", "Agentic Workflows", "Model Alignment"],
    recommendation:
      "High-priority capability track. 360.AI cognitive scoring predicts 99.2% role competence upon completing hands-on enterprise capstones with industry mentors.",
  },
  {
    id: "corp-leader",
    title: "Enterprise AI Transformation & Leadership",
    baseline: 58,
    target: 96,
    matchScore: "98.7%",
    duration: "10 Weeks",
    track: "Corporate Executive",
    keyModules: ["AI Strategy & ROI", "Change Management", "Data Governance & Ethics", "AI-First Operations"],
    recommendation:
      "Strategic leadership stream. Tailored for CXOs and business unit heads to scale generative workflows and drive quantifiable operational efficiency.",
  },
  {
    id: "voc-tech",
    title: "Advanced Vocational & Automation Engineering",
    baseline: 35,
    target: 92,
    matchScore: "99.6%",
    duration: "16 Weeks",
    track: "Vocational & Industry",
    keyModules: ["Robotics Automation", "Sensor Intelligence", "Predictive Maintenance", "Smart Manufacturing"],
    recommendation:
      "Applied shop-floor robotics track. Directly mapped against National Skill benchmarks with 95%+ verified job placement assistance.",
  },
  {
    id: "cloud-mlops",
    title: "Cloud MLOps & Autonomous Infrastructure",
    baseline: 48,
    target: 94,
    matchScore: "98.9%",
    duration: "12 Weeks",
    track: "Remote & Hybrid",
    keyModules: ["Kubernetes for ML", "Feature Stores", "Real-Time Inference Engines", "Zero-Trust Security"],
    recommendation:
      "Designed for distributed systems engineers deploying models at scale. Fully remote delivery with automated code evaluation labs.",
  },
];

export function AiSkillAnalyzer() {
  const [selectedSpec, setSelectedSpec] = useState(SPECIALIZATIONS[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleSelect = (spec: typeof SPECIALIZATIONS[0]) => {
    setIsScanning(true);
    setSelectedSpec(spec);
    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  return (
    <section className="scroll-mt-28 border-y py-10 md:py-14 bg-[var(--sunken)]" style={{ borderColor: "var(--line)" }}>
      <div className="shell">
        <SectionHead
          eyebrow="360.AI Interactive Engine"
          title="Predictive Skill Matching"
          accent="& Capability Engine"
          intro="Experience how the 360.AI engine scores baseline competency against market demand and synthesizes the exact shortest route to mastery."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: Role Selector Buttons */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3">
              SELECT TARGET SPECIALIZATION
            </p>

            {SPECIALIZATIONS.map((spec) => {
              const active = selectedSpec.id === spec.id;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => handleSelect(spec)}
                  className={`w-full text-left p-3.5 border transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? "border-[var(--brand)] bg-[var(--surface)] shadow-md"
                      : "border-[var(--line)] bg-[var(--surface)]/70 hover:border-[var(--brand)]/50"
                  }`}
                >
                  <div>
                    <span className="block text-[13.5px] font-semibold text-[var(--ink)]">
                      {spec.title}
                    </span>
                    <span className="mt-0.5 flex items-center gap-2 font-mono text-[10.5px] text-[var(--ink-muted)]">
                      <span>{spec.track}</span>
                      <span>•</span>
                      <span>{spec.duration}</span>
                    </span>
                  </div>

                  <span
                    className={`font-mono text-[11px] font-semibold tabular-nums px-2 py-0.5 border ${
                      active
                        ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                        : "text-[var(--brand)] border-[var(--brand)]/20"
                    }`}
                  >
                    {spec.matchScore}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Live AI Engine Simulation Screen */}
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden border p-5 md:p-6 shadow-xl bg-[var(--surface)]"
              style={{ borderColor: "var(--line)" }}
            >
              {/* Scan Bar Animation */}
              {isScanning && (
                <div className="absolute inset-0 z-30 bg-white/70 dark:bg-black/70 flex flex-col items-center justify-center font-mono text-[11px] text-[var(--brand)]">
                  <Cpu className="h-6 w-6 animate-spin mb-2" />
                  <span>360.AI Recomputing Neural Capability Weights...</span>
                </div>
              )}

              {/* Engine Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 mb-4" style={{ borderColor: "var(--line)" }}>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[var(--brand)]">
                    Neural Gap Assessment Output
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  ALGORITHM: 360-HEURISTIC-MATCH-v4
                </span>
              </div>

              {/* Visual Capability Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-[var(--ink-muted)] uppercase tracking-wider">Candidate Starting Baseline</span>
                    <span className="font-bold text-[var(--ink)] tabular-nums">{selectedSpec.baseline}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[var(--sunken)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--ink-muted)] transition-all duration-700"
                      style={{ width: `${selectedSpec.baseline}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-[var(--brand)] uppercase tracking-wider font-semibold">
                      Target Role Competency (Post-360.AI Training)
                    </span>
                    <span className="font-bold text-[var(--brand)] tabular-nums">{selectedSpec.target}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[var(--sunken)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--brand)] transition-all duration-700 shadow-sm"
                      style={{ width: `${selectedSpec.target}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Core AI Synthesis Box */}
              <div
                className="mt-5 p-4 border bg-[var(--sunken)]/60 text-[12.5px] leading-relaxed text-[var(--ink-soft)]"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[var(--brand)] mb-1.5">
                  <Sparkles className="h-3 w-3 text-[var(--accent)]" />
                  <span>360.AI Synthesis Note</span>
                </div>
                <p>{selectedSpec.recommendation}</p>
              </div>

              {/* Key AI Modules */}
              <div className="mt-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-2">
                  Synthesized Curriculum Highlights:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSpec.keyModules.map((mod) => (
                    <span
                      key={mod}
                      className="flex items-center gap-1 border bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--ink)]"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <CheckCircle2 className="h-3 w-3 text-[var(--brand)]" />
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <span className="font-mono text-[11px] text-[var(--brand)] font-semibold">
                  Match Confidence: {selectedSpec.matchScore}
                </span>

                <Link href="/contact" className="btn btn-primary btn-sm">
                  Enroll with 360.AI Guidance
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSkillAnalyzer;
