import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { about, programs, site } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import NetworkFigure from "@/components/network-figure";
import StatsBand from "@/components/stats-band";
import CtaBand from "@/components/cta-band";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="About"
        accent={about.headingAccent}
        accentStyle="color"
        intro={about.intro}
        image="aboutMain"
        imageAlt="A partnership agreement between TALENTIC 360.AI and an industry client"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        meta={[
          { label: "Sectors served", value: "07" },
          { label: "Corporate partners", value: "500+" },
          { label: "Professionals trained", value: "10,000+" },
          { label: "Placement rate", value: "95%" },
        ]}
      />

      {/* Positioning --------------------------------------------- */}
      <section className="py-8 md:py-12">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal y={12}>
              <div className="mb-4">
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Positioning
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="display text-[clamp(1.8rem,3.4vw,2.5rem)]"
                style={{ color: "var(--ink)" }}
              >
                {about.positioningTitle}
              </h2>
            </Reveal>

            <Uncover delay={0.14}>
              <div className="relative mt-6 aspect-[4/5] w-full">
                <Image
                  src={photo("aboutSecondary", { w: 800, h: 1000 })}
                  alt="A working session with a partner organisation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="duotone object-cover"
                />
              </div>
            </Uncover>
          </div>

          <div className="lg:col-span-7">
            {about.positioning.map((para, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <p
                  className={`text-[15px] leading-[1.75] md:text-[1.0625rem] ${i > 0 ? "mt-4" : ""}`}
                  style={{ color: "var(--ink-soft)", maxWidth: "58ch" }}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <blockquote
                className="mt-7 border-l-2 pl-6"
                style={{ borderColor: "var(--brand)" }}
              >
                <p
                  className="display text-[1.35rem] leading-[1.4] md:text-[1.55rem]"
                  style={{ color: "var(--ink)" }}
                >
                  “We don&apos;t just train—we transform.”
                </p>
                <footer
                  className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {site.legalName}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-7">
                <NetworkFigure />
                <p
                  className="mt-2.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  <span className="h-px w-5" style={{ background: "var(--line)" }} />
                  {about.visualCaption}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars -------------------------------------------------- */}
      <section className="pb-8 md:pb-12">
        <div className="shell">
          <Reveal>
            <div className="mb-4">
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ink-muted)" }}
              >
                What sets us apart
              </span>
            </div>
          </Reveal>
          <OfferingGrid items={about.pillars} columns={4} />
        </div>
      </section>

      <StatsBand />

      {/* Programme index ------------------------------------------ */}
      <section className="py-8 md:py-12">
        <div className="shell">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-3.5">
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    Where we work
                  </span>
                </div>
                <h2
                  className="display text-[clamp(1.7rem,3.2vw,2.3rem)]"
                  style={{ color: "var(--ink)" }}
                >
                  Seven programme tracks
                </h2>
              </div>
              <Link href="/programs" className="link-rule">
                View all programmes
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          <ul className="border-t" style={{ borderColor: "var(--line)" }}>
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.04}>
                <li className="border-b" style={{ borderColor: "var(--line)" }}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group grid items-center gap-4 py-3.5 transition-colors md:grid-cols-12"
                  >
                    <span
                      className="display text-[1.4rem] transition-colors group-hover:text-[var(--brand)] md:col-span-5"
                      style={{ color: "var(--ink)" }}
                    >
                      {program.navLabel}
                    </span>
                    <span
                      className="text-[13.5px] leading-relaxed md:col-span-6"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {program.intro}
                    </span>
                    <span className="md:col-span-1 md:justify-self-end">
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={1.8}
                        style={{ color: "var(--brand)" }}
                      />
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Let's design the programme your people actually need."
        body="Share your goals, timelines and headcount. We'll come back with a track, a curriculum outline and a delivery plan."
        primary={{ label: "Get Started", href: "/contact" }}
        secondary={{ label: "See programmes", href: "/programs" }}
        image="leadership"
      />
    </>
  );
}
