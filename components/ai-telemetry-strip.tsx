"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, Sparkles, CheckCircle2, Zap } from "lucide-react";

export function AiTelemetryStrip() {
  const [inferences, setInferences] = useState(14820);
  const [activeLatency, setActiveLatency] = useState(7.6);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setInferences((prev) => prev + Math.floor(Math.random() * 2) + 1);
      setActiveLatency(Number((7.2 + Math.random() * 0.9).toFixed(1)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerDiagnostic = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1200);
  };

  return (
    <div
      className="relative overflow-hidden border-b bg-[#091510] py-2.5 text-white/85"
      style={{ borderColor: "rgba(52, 211, 153, 0.2)" }}
    >
      {/* Laser diagnostic scan line when triggered */}
      {pulseActive && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent animate-[shimmer_1.2s_ease-in-out]" />
      )}

      <div className="shell flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
        {/* Left: Engine identity & status */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            360.AI INTELLIGENCE PLATFORM
          </span>

          <span className="hidden sm:inline-block h-3 w-px bg-white/15" />

          <span className="hidden sm:flex items-center gap-1 text-white/60">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>Cluster IN-WEST-01 Active</span>
          </span>
        </div>

        {/* Center: Live Telemetry Metrics */}
        <div className="flex items-center gap-4 text-white/70">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-emerald-400" />
            <span className="text-white/50">Inferences:</span>
            <span className="font-semibold text-white tabular-nums">
              {inferences.toLocaleString()}
            </span>
          </div>

          <span className="h-3 w-px bg-white/15" />

          <div className="hidden md:flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-400" />
            <span className="text-white/50">Latency:</span>
            <span className="font-semibold text-emerald-300 tabular-nums">{activeLatency}ms</span>
          </div>

          <span className="hidden md:inline-block h-3 w-px bg-white/15" />

          <div className="flex items-center gap-1.5">
            <Cpu className="h-3 w-3 text-emerald-400" />
            <span className="text-white/50">Precision:</span>
            <span className="font-semibold text-emerald-300 tabular-nums">99.4%</span>
          </div>
        </div>

        {/* Right: Live Interactive Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerDiagnostic}
            title="Run simulated neural diagnostic pulse"
            className="flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-900/80 cursor-pointer"
          >
            <Sparkles className="h-3 w-3 text-emerald-400 animate-spin-slow" />
            <span>Test Inference</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiTelemetryStrip;
