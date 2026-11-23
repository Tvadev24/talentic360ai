import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { hero, programs, site } from "@/lib/content";
import { Reveal } from "@/components/motion";
import AiHeadlineTrack from "@/components/ai-headline-track";
import AiNeuralCanvas from "@/components/ai-neural-canvas";
import AiTelemetryStrip from "@/components/ai-telemetry-strip";
import { photo } from "@/lib/images";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* measured grid behind the type */}
      <div className="shell relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-5 right-5 hidden lg:block"
          style={{
            backgroundImage: "linear-gradient(to right, var(--line) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 6) 100%",
            opacity: 0.45,
          }}
        />

        <div className="relative grid gap-8 pt-6 pb-8 md:pt-8 md:pb-10 lg:grid-cols-12 lg:gap-10 lg:pt-10 lg:pb-12">
          {/* Copy --------------------------------------------------- */}
          <div className="lg:col-span-7">
            <Reveal y={12} delay={0.05}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </span>
                AI-Enabled Apprenticeship Ecosystem · 2026 Cohort
              </div>
            </Reveal>

            <h1
              className="display mt-0 text-[clamp(1.85rem,3.8vw,2.95rem)] leading-[1.14]"
              style={{ color: "var(--ink)" }}
            >
              <span className="block overflow-hidden pb-1 -mb-1">
                <Reveal y={16} delay={0.1}>
                  <span className="block">{hero.titleLines[0]}</span>
                </Reveal>
              </span>

              <Reveal y={16} delay={0.22}>
                <AiHeadlineTrack defaultText={"Training &\nApprenticeship"} />
              </Reveal>

              <span className="block overflow-hidden pb-1 -mb-1">
                <Reveal y={16} delay={0.32}>
                  <span className="block">{hero.titleLines[2]}</span>
                </Reveal>
              </span>
            </h1>

            <Reveal delay={0.35}>
              <p
                className="mt-3.5 text-[0.95rem] leading-[1.65] md:mt-4 md:text-[1.025rem]"
                style={{ color: "var(--ink-soft)", maxWidth: "52ch" }}
              >
                {hero.description}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-6">
                <Link href={hero.primaryCta.href} className="btn btn-primary btn-lg">
                  {hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
                <Link href={hero.secondaryCta.href} className="btn btn-outline btn-lg">
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <dl
                className="mt-7 grid max-w-lg grid-cols-3 border-t md:mt-8"
                style={{ borderColor: "var(--line)" }}
              >
                {[
                  { k: "Sectors served", v: "07" },
                  { k: "Partner base", v: "500+" },
                  { k: "Placement rate", v: "95%" },
                ].map((item, i) => (
                  <div
                    key={item.k}
                    className={`py-3.5 ${i > 0 ? "border-l pl-5" : "pr-5"}`}
                    style={{ borderColor: "var(--line)" }}
                  >
                    <dd
                      className="display text-[1.6rem] tabular-nums"
                      style={{ color: "var(--ink)" }}
                    >
                      {item.v}
                    </dd>
                    <dt
                      className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {item.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Figures ------------------------------------------------ */}
          <div id="hero-figure" className="relative lg:col-span-5">
            <Reveal delay={0.2} y={30}>
              <AiNeuralCanvas />
            </Reveal>

            <Reveal delay={0.4} y={30}>
              <div
                className="relative -mt-14 ml-auto hidden w-[62%] border-[5px] sm:block lg:-ml-12 lg:mt-[-4rem] lg:w-[68%]"
                style={{ borderColor: "var(--paper)" }}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={photo("heroInset", { w: 700, h: 525 })}
                    alt="Technical drafting during a vocational training session"
                    fill
                    sizes="(max-width: 1024px) 60vw, 26vw"
                    className="duotone object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <p
                className="mt-4 flex items-start gap-2.5 font-mono text-[10.5px] leading-relaxed uppercase tracking-[0.12em] lg:mt-5"
                style={{ color: "var(--ink-muted)" }}
              >
                <span className="mt-[6px] h-px w-5 shrink-0" style={{ background: "var(--line)" }} />
                <span>
                  360.AI Neural Engine Active — {site.legalName}
                  <br />
                  Academic · Vocational · Corporate · Government
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Marquee ------------------------------------------------- */}
      <div
        className="marquee relative overflow-hidden border-y py-3"
        style={{ borderColor: "var(--line)", background: "var(--sunken)" }}
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {programs.map((p) => (
                <span
                  key={`${dup}-${p.slug}`}
                  className="flex items-center gap-6 whitespace-nowrap px-6 text-[12px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {p.navLabel}
                  <span
                    className="inline-block h-1 w-1 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Live AI Engine Telemetry Strip */}
      <AiTelemetryStrip />

      <div className="shell">
        <Reveal delay={0.1}>
          <a
            href="#about"
            className="my-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-[var(--brand)]"
            style={{ color: "var(--ink-muted)" }}
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.8} />
            Scroll to explore
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default HomeHero;
