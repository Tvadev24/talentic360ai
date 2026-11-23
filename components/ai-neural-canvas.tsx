"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Eye, Activity, Sparkles, RefreshCw, Layers } from "lucide-react";
import { photo } from "@/lib/images";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  baseAlpha: number;
}

interface PulsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export function AiNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"neural" | "vision" | "matrix">("neural");
  const [inferencesCount, setInferencesCount] = useState(14820);
  const [fps, setFps] = useState(60);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  // Increment inference counter gently
  useEffect(() => {
    const interval = setInterval(() => {
      setInferencesCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Neural network canvas animation loop
  useEffect(() => {
    if (activeTab !== "neural") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: PulsePacket[] = [];

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize nodes based on canvas area
      const nodeCount = Math.max(28, Math.min(48, Math.floor((width * height) / 8000)));
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 2.5 + 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
          baseAlpha: Math.random() * 0.4 + 0.5,
        });
      }
      packets = [];
    };

    resize();
    window.addEventListener("resize", resize);

    let lastFrameTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      // Calculate FPS
      frameCount++;
      if (time - lastFrameTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastFrameTime)));
        frameCount = 0;
        lastFrameTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep AI backdrop gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        40,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      bgGrad.addColorStop(0, "rgba(15, 77, 58, 0.28)");
      bgGrad.addColorStop(0.55, "rgba(8, 28, 21, 0.88)");
      bgGrad.addColorStop(1, "rgba(5, 14, 11, 0.98)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient AI coordinate grid
      ctx.strokeStyle = "rgba(78, 168, 134, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 42;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes
      const maxDistance = Math.min(width, height) * 0.36;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Bounce on edges
        if (node.x <= 10 || node.x >= width - 10) node.vx *= -1;
        if (node.y <= 10 || node.y >= height - 10) node.vy *= -1;

        // Mouse attraction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 1) {
            const force = (140 - dist) / 140;
            node.x += (dx / dist) * force * 1.2;
            node.y += (dy / dist) * force * 1.2;
          }
        }

        // Connect to neighbors
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.45;
            ctx.strokeStyle = `rgba(110, 231, 183, ${alpha})`;
            ctx.lineWidth = (1 - dist / maxDistance) * 1.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Occasionally spawn a pulse packet along this connection
            if (packets.length < 16 && Math.random() < 0.0035) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: Math.random() * 0.015 + 0.01,
              });
            }
          }
        }

        // Draw node glow & core
        const currentRadius = node.radius + Math.sin(node.pulse) * 1.2;
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentRadius * 4);
        glowGrad.addColorStop(0, "rgba(52, 211, 153, 0.95)");
        glowGrad.addColorStop(0.4, "rgba(16, 185, 129, 0.45)");
        glowGrad.addColorStop(1, "rgba(16, 185, 129, 0)");

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 3.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw data pulse packets traveling along synapses
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const n1 = nodes[packet.fromNode];
        const n2 = nodes[packet.toNode];
        if (!n1 || !n2) continue;

        const px = n1.x + (n2.x - n1.x) * packet.progress;
        const py = n1.y + (n2.y - n1.y) * packet.progress;

        ctx.fillStyle = "#a7f3d0";
        ctx.shadowColor = "#34d399";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Scanning beam line
      const scanY = (Math.sin(time * 0.001) * 0.5 + 0.5) * height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "rgba(110, 231, 183, 0)");
      scanGrad.addColorStop(0.5, "rgba(110, 231, 183, 0.22)");
      scanGrad.addColorStop(1, "rgba(110, 231, 183, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, width, 60);

      ctx.strokeStyle = "rgba(167, 243, 208, 0.75)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [activeTab]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[4/5] w-full overflow-hidden border border-emerald-900/40 bg-[#05110d] shadow-2xl transition-all"
      style={{
        boxShadow: "0 20px 50px -10px rgba(15, 77, 58, 0.35)",
      }}
    >
      {/* Top AI Mode Switcher Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#081510]/85 px-3 py-2 text-[10px] font-mono text-white/80 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-wider text-emerald-400">360.AI CORE</span>
          <span className="text-white/30">|</span>
          <span className="text-white/60 tabular-nums">{inferencesCount.toLocaleString()} inf</span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 rounded bg-black/40 p-0.5 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("neural")}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9.5px] uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "neural"
                ? "bg-emerald-600 text-white font-semibold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Activity className="h-3 w-3" />
            <span>Neural</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("vision")}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9.5px] uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "vision"
                ? "bg-emerald-600 text-white font-semibold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Eye className="h-3 w-3" />
            <span>Vision</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9.5px] uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "matrix"
                ? "bg-emerald-600 text-white font-semibold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Matrix</span>
          </button>
        </div>
      </div>

      {/* Screen 1: Canvas Neural Network Animation */}
      {activeTab === "neural" && (
        <div className="relative h-full w-full">
          <canvas ref={canvasRef} className="h-full w-full block cursor-crosshair" />

          {/* Floating Telemetry Badges */}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[9.5px] text-emerald-300/85">
            <div className="space-y-1 rounded border border-emerald-500/20 bg-black/65 px-2.5 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Cpu className="h-3 w-3" />
                <span className="font-semibold uppercase tracking-wider">Cognitive Mapping</span>
              </div>
              <div className="text-white/65">Model: 360-Synapse-v4.2</div>
              <div className="flex items-center gap-2 text-white/50">
                <span>Latency: 7.8ms</span>
                <span>•</span>
                <span>Accuracy: 99.4%</span>
              </div>
            </div>

            <div className="rounded border border-emerald-500/20 bg-black/65 px-2 py-1 tabular-nums backdrop-blur-md">
              <span className="text-emerald-400">{fps}</span> FPS
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Vision HUD Feed with Camera Tracking */}
      {activeTab === "vision" && (
        <div className="relative h-full w-full">
          <Image
            src={photo("heroMain", { w: 1000, h: 1250 })}
            alt="360.AI Vision Tracking Cohort"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.7) contrast(1.1) brightness(0.85)" }}
          />

          {/* Vision HUD Overlays */}
          <div className="absolute inset-0 bg-emerald-950/20 pointer-events-none" />

          {/* Detection 1: Facilitator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-[14%] top-[24%] h-[24%] w-[22%] border-2 border-emerald-400/80 bg-emerald-400/10"
          >
            <span className="absolute -top-5 left-0 flex items-center gap-1 bg-black/85 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-400/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Facilitator (99.2%)
            </span>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-l-2 border-t-2 border-emerald-300" />
            <span className="absolute -top-1 -right-1 h-2 w-2 border-r-2 border-t-2 border-emerald-300" />
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-emerald-300" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-emerald-300" />
          </motion.div>

          {/* Detection 2: Cohort */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="absolute left-[6%] top-[54%] h-[36%] w-[88%] border-2 border-teal-400/70 bg-teal-400/10"
          >
            <span className="absolute -top-5 left-0 flex items-center gap-1 bg-black/85 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-teal-300 border border-teal-400/40">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              Cohort Learners [08 Active]
            </span>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-l-2 border-t-2 border-teal-300" />
            <span className="absolute -top-1 -right-1 h-2 w-2 border-r-2 border-t-2 border-teal-300" />
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-teal-300" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-teal-300" />
          </motion.div>

          {/* Live Scanner Beam */}
          <motion.div
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/20 to-emerald-400/60 pointer-events-none"
            animate={{ top: ["-10%", "105%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-0.5 w-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          </motion.div>
        </div>
      )}

      {/* Screen 3: Tensor Matrix Stream */}
      {activeTab === "matrix" && (
        <div className="relative h-full w-full bg-[#040d0a] p-5 font-mono text-[10.5px] text-emerald-400/90 overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-3 text-[9px] uppercase tracking-widest text-emerald-300/60">
            <span>Tensor Flow Log · Live Batch #491</span>
            <span className="text-emerald-400">Stream OK</span>
          </div>

          <div className="space-y-2 leading-relaxed">
            <p className="text-white/80">
              <span className="text-emerald-500 font-bold">&gt;&gt;</span> Initializing 360.AI capability tensor weights...
            </p>
            <p className="text-emerald-300/80">
              [LAYER 01] Academic Apprenticeship Match: <span className="text-white font-semibold">0.9942</span>
            </p>
            <p className="text-emerald-300/80">
              [LAYER 02] Corporate Leadership Competence: <span className="text-white font-semibold">0.9880</span>
            </p>
            <p className="text-emerald-300/80">
              [LAYER 03] Vocational Technical Skill Index: <span className="text-white font-semibold">0.9961</span>
            </p>
            <p className="text-emerald-300/80">
              [LAYER 04] Public Sector Alignment: <span className="text-white font-semibold">0.9754</span>
            </p>

            <div className="my-3 border-t border-dashed border-emerald-500/20 pt-2 text-[9.5px] text-emerald-400/60">
              <p>LOSS: 0.0018 · LEARNING_RATE: 2e-5 · GRADIENT_NORM: 0.124</p>
              <p>OPTIMIZER: AdamW (Weight Decay: 0.01) · MEMORY: 3.4GB / 8GB</p>
            </div>

            <div className="flex items-center gap-2 text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Inference Active: Real-time cohort adaptation enabled.</span>
            </div>
          </div>
        </div>
      )}

      {/* Corner Cyber Brackets */}
      <span className="pointer-events-none absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-emerald-400/80 z-20" />
      <span className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-emerald-400/80 z-20" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-emerald-400/80 z-20" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-emerald-400/80 z-20" />
    </div>
  );
}

export default AiNeuralCanvas;
