import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Icon from "@/components/icon";
import { Parallax, Reveal, Uncover } from "@/components/motion";
import { photo, isPhotoKey } from "@/lib/images";
import type { Program } from "@/lib/content";

export function ProgramBand({
  program,
  flip = false,
}: {
  program: Program;
  index?: number;
  flip?: boolean;
}) {
  const src = isPhotoKey(program.image) ? photo(program.image, { w: 900, h: 1200 }) : program.image;

  return (
    <section
      id={program.slug}
      className="scroll-mt-28 border-t py-6 md:py-9"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Figure ------------------------------------------------- */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <Uncover className="relative">
            <Parallax className="relative aspect-[4/5] w-full" distance={26}>
              <div className="relative h-[calc(100%+52px)] w-full -translate-y-[26px]">
                <Image
                  src={src}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="duotone object-cover"
                />
              </div>
            </Parallax>
          </Uncover>

          <Reveal delay={0.1}>
            <p
              className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em]"
              style={{ color: "var(--ink-muted)" }}
            >
              {program.name} Track
            </p>
          </Reveal>
        </div>

        {/* Copy --------------------------------------------------- */}
        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          <Reveal y={14}>
            <div className="mb-3.5">
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ink-muted)" }}
              >
                Programme Track
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.5rem)]" style={{ color: "var(--ink)" }}>
              {program.name}{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
                Programs
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-3.5 text-[15px] leading-[1.7]"
              style={{ color: "var(--ink-soft)", maxWidth: "58ch" }}
            >
              {program.intro}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {program.offerings.map((offering) => (
                <div key={offering.title} className="border-t pt-3" style={{ borderColor: "var(--line)" }}>
                  <dt className="mb-1 flex items-start gap-2">
                    <Icon
                      name={offering.icon}
                      className="mt-[2px] h-3.5 w-3.5 shrink-0"
                      strokeWidth={1.6}
                    />
                    <span
                      className="text-[13.5px] font-semibold leading-snug"
                      style={{ color: "var(--ink)" }}
                    >
                      {offering.title}
                    </span>
                  </dt>
                  <dd className="text-[12.5px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
                    {offering.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.18}>
            <Link href={`/programs/${program.slug}`} className="link-rule mt-6">
              {program.cta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ProgramBand;
