import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { about } from "@/lib/content";
import SectionHead from "@/components/section-head";
import OfferingGrid from "@/components/offering-grid";
import NetworkFigure from "@/components/network-figure";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export function AboutSection({
  withLink = true,
  index = "01",
}: {
  withLink?: boolean;
  index?: string;
}) {
  return (
    <section id="about" className="scroll-mt-28 py-8 md:py-12">
      <div className="shell">
        <SectionHead
          index={index}
          eyebrow="Who we are"
          title={about.heading}
          accent={about.headingAccent}
          accentStyle="color"
          intro={about.intro}
        />

        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:gap-10">
          {/* Positioning ----------------------------------------- */}
          <div className="lg:col-span-6">
            <Reveal>
              <h3 className="display text-[1.65rem]" style={{ color: "var(--ink)" }}>
                {about.positioningTitle}
              </h3>
            </Reveal>

            {about.positioning.map((para, i) => (
              <Reveal key={i} delay={0.08 + i * 0.07}>
                <p
                  className="mt-3.5 text-[15px] leading-[1.75]"
                  style={{ color: "var(--ink-soft)", maxWidth: "56ch" }}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={photo("aboutSecondary", { w: 900, h: 560 })}
                    alt="Working session with a partner organisation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="duotone object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {withLink && (
              <Reveal delay={0.3}>
                <Link href="/about" className="link-rule mt-5">
                  Read the full story
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </Reveal>
            )}
          </div>

          {/* Figure ---------------------------------------------- */}
          <div className="lg:col-span-6">
            <Uncover>
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src={photo("aboutMain", { w: 1000, h: 800 })}
                  alt="A partnership agreement between TALENTIC 360.AI and an industry client"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="duotone object-cover"
                />
              </div>
            </Uncover>

            <Reveal delay={0.12}>
              <div className="mt-4">
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

        {/* Pillars ---------------------------------------------- */}
        <div className="mt-8 md:mt-10">
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
      </div>
    </section>
  );
}

export default AboutSection;
