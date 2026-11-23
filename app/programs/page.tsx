import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { programs } from "@/lib/content";
import PageHero from "@/components/page-hero";
import StatsBand from "@/components/stats-band";
import AiMatchBand from "@/components/ai-match-band";
import CtaBand from "@/components/cta-band";
import Icon from "@/components/icon";
import { Reveal, Uncover } from "@/components/motion";
import { photo, isPhotoKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Academic, vocational, corporate, government, post-graduate, volunteering and remote training tracks from TALENTIC 360.AI LLP.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we deliver"
        title="Training that holds up"
        accent="in the real world"
        intro="Seven programme tracks across academic, vocational, corporate, government, post-graduate, volunteering and remote delivery — each built with industry input and measured on outcomes."
        image="heroWide"
        imageAlt="A training cohort mid-session"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
        ]}
        meta={[
          { label: "Programme tracks", value: "07" },
          { label: "Core offerings", value: "28" },
          { label: "Delivery modes", value: "On-site · Hybrid · Remote" },
          { label: "Placement rate", value: "95%" },
        ]}
      />

      <section className="py-8 md:py-12">
        <div className="shell grid gap-x-8 gap-y-8 md:grid-cols-2">
          {programs.map((program, i) => {
            const src = isPhotoKey(program.image)
              ? photo(program.image, { w: 900, h: 640 })
              : program.image;

            return (
              <Reveal key={program.slug} delay={(i % 2) * 0.08}>
                <article className="group flex h-full flex-col">
                  <Link href={`/programs/${program.slug}`} className="flex h-full flex-col">
                    <Uncover>
                      <div className="relative aspect-[7/5] w-full overflow-hidden">
                        <Image
                          src={src}
                          alt={program.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 46vw"
                          className="duotone object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </Uncover>

                    <h2
                      className="display mt-3.5 text-[1.45rem] transition-colors group-hover:text-[var(--brand)]"
                      style={{ color: "var(--ink)" }}
                    >
                      {program.navLabel}
                    </h2>

                    <p
                      className="mt-2 flex-1 text-[13.5px] leading-[1.7]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {program.intro}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {program.offerings.map((offering) => (
                        <li
                          key={offering.title}
                          className="flex items-center gap-1.5 border px-2.5 py-1 text-[11px]"
                          style={{
                            borderColor: "var(--line)",
                            color: "var(--ink)",
                            background: "var(--surface)",
                          }}
                        >
                          <Icon
                            name={offering.icon}
                            className="h-3 w-3 shrink-0"
                            strokeWidth={1.7}
                            style={{ color: "var(--brand)" }}
                          />
                          <span>{offering.title}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="link-rule mt-5">
                      {program.cta}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <AiMatchBand />

      <StatsBand />

      <CtaBand
        eyebrow="Not sure which track"
        title="Tell us the outcome. We'll point you at the right programme."
        body="Most partners arrive with a problem rather than a programme in mind — a skills gap, a hiring target, a compliance deadline. Start there."
        primary={{ label: "Get Started", href: "/contact" }}
        secondary={{ label: "About us", href: "/about" }}
        image="strategy"
      />
    </>
  );
}
