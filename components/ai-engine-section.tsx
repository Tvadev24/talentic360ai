import Image from "next/image";

import { aiEngine } from "@/lib/content";
import SectionHead from "@/components/section-head";
import AiVisionOverlay from "@/components/ai-vision-overlay";
import { GapChart, InferenceTicker, MatchGraph, TrajectoryChart } from "@/components/ai-panels";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

const panels = [GapChart, MatchGraph, TrajectoryChart];

export function AiEngineSection({ index = "02" }: { index?: string }) {
  return (
    <section
      id="engine"
      className="scroll-mt-28 border-y py-8 md:py-12"
      style={{ borderColor: "var(--line)", background: "var(--sunken)" }}
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Copy + live readout ---------------------------------- */}
          <div className="lg:col-span-5">
            <SectionHead
              index={index}
              eyebrow={aiEngine.eyebrow}
              title={aiEngine.heading}
              accent={aiEngine.headingAccent}
              intro={aiEngine.intro}
            />

            <Reveal delay={0.16}>
              <div
                className="mt-5 border p-4"
                style={{ background: "var(--surface)", borderColor: "var(--line)" }}
              >
                <div
                  className="mb-3 flex items-center justify-between border-b pb-2.5"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="font-mono text-[9.5px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    Processing
                  </span>
                  <span
                    className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--brand)" }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--brand)" }}
                    />
                    active
                  </span>
                </div>
                <InferenceTicker />
              </div>
            </Reveal>
          </div>

          {/* Vision frame ----------------------------------------- */}
          <div className="lg:col-span-7">
            <Uncover delay={0.1}>
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={photo("cohort", { w: 1100, h: 756 })}
                  alt="A cohort working together during a TALENTIC 360.AI session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.6) contrast(1.06) brightness(0.92)" }}
                />
                <AiVisionOverlay
                  hud={aiEngine.visionHud}
                  regions={[
                    { x: 2, y: 18, w: 28, h: 74, label: "Learner", value: "01" },
                    { x: 42, y: 9, w: 24, h: 71, label: "Learner", value: "02" },
                    { x: 66, y: 13, w: 27, h: 73, label: "Learner", value: "03" },
                    { x: 29, y: 42, w: 17, h: 26, label: "Device" },
                  ]}
                />
              </div>
            </Uncover>

            <Reveal delay={0.18}>
              <p
                className="mt-2.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: "var(--ink-muted)" }}
              >
                <span className="h-px w-5" style={{ background: "var(--line)" }} />
                Cohort capability mapping
              </p>
            </Reveal>
          </div>
        </div>

        {/* Three-stage model -------------------------------------- */}
        <div className="mt-8 grid border-l border-t md:mt-10 md:grid-cols-3">
          {aiEngine.steps.map((step, i) => {
            const Panel = panels[i];
            return (
              <Reveal key={step.title} delay={i * 0.1}>
                <article
                  className="flex h-full flex-col border-b border-r p-4 md:p-5"
                  style={{ background: "var(--surface)" }}
                >
                  <header
                    className="mb-4 flex items-baseline gap-3 border-b pb-3"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <h3 className="display text-[1.2rem]" style={{ color: "var(--ink)" }}>
                      {step.title}
                    </h3>
                  </header>

                  <div className="mb-4 flex min-h-[140px] w-full flex-1 items-center">
                    <div className="w-full">
                      <Panel />
                    </div>
                  </div>

                  <p
                    className="mb-2 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    <span className="h-px w-4" style={{ background: "var(--line)" }} />
                    {step.caption}
                  </p>

                  <p className="text-[13px] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                    {step.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "var(--ink-muted)" }}
          >
            {aiEngine.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default AiEngineSection;
