import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { getProgram, programs } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import ContactSection from "@/components/contact-section";
import AiMatchBand from "@/components/ai-match-band";
import CtaBand from "@/components/cta-band";
import { Reveal, Uncover } from "@/components/motion";
import { photo, isPhotoKey } from "@/lib/images";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.navLabel,
    description: program.intro,
  };
}

export default async function ProgramPage({ params }: Params) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const index = programs.findIndex((p) => p.slug === slug);
  const others = programs.filter((p) => p.slug !== slug);
  const detailSrc = isPhotoKey(program.secondaryImage)
    ? photo(program.secondaryImage, { w: 1000, h: 1250 })
    : program.secondaryImage;

  return (
    <>
      <PageHero
        eyebrow="Programme track"
        index={String(index + 1).padStart(2, "0")}
        title={program.name}
        accent="Programs"
        intro={program.intro}
        image={program.image}
        imageAlt={program.imageAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: program.name, href: `/programs/${program.slug}` },
        ]}
        meta={[
          { label: "Core offerings", value: "04" },
          { label: "Sector", value: program.name },
          { label: "Delivery", value: program.slug === "remote" ? "Online · Hybrid" : "On-site · Hybrid" },
          { label: "Outcome", value: "Certified · Placed" },
        ]}
      />

      {/* Offerings ------------------------------------------------ */}
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
                    What&apos;s inside the track
                  </span>
                </div>
                <h2
                  className="display text-[clamp(1.7rem,3.2vw,2.3rem)]"
                  style={{ color: "var(--ink)" }}
                >
                  Four ways we deliver it
                </h2>
              </div>
              <Link href="/contact" className="btn btn-outline btn-sm">
                {program.cta}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          <OfferingGrid items={program.offerings} columns={4} />
        </div>
      </section>

      {/* Detail band ---------------------------------------------- */}
      <section className="pb-8 md:pb-12">
        <div className="shell grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Uncover>
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={detailSrc}
                  alt={program.secondaryImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="duotone object-cover"
                />
              </div>
            </Uncover>
            <Reveal delay={0.1}>
              <p
                className="mt-2.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: "var(--ink-muted)" }}
              >
                <span className="h-px w-5" style={{ background: "var(--line)" }} />
                {program.name} Track
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2
                className="display text-[clamp(1.6rem,3vw,2.2rem)]"
                style={{ color: "var(--ink)" }}
              >
                How {/^[aeiou]/i.test(program.name) ? "an" : "a"} {program.name} engagement runs
              </h2>
            </Reveal>

            <ol className="mt-5 border-t" style={{ borderColor: "var(--line)" }}>
              {[
                {
                  title: "Scope",
                  body: "We map the skills gap against your targets, existing capability and the timeline you are working to.",
                },
                {
                  title: "Design",
                  body: "A curriculum is assembled from the four offerings in this track, weighted to what you actually need.",
                },
                {
                  title: "Deliver",
                  body: "Practitioners run the cohort — classroom, on-the-job, virtual or a blend of all three.",
                },
                {
                  title: "Certify & place",
                  body: "Participants are assessed, certified to industry standards, and supported into roles.",
                },
              ].map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <li
                    className="grid gap-2 border-b py-3.5 md:grid-cols-12 md:gap-4"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <h3
                      className="display text-[1.1rem] md:col-span-4"
                      style={{ color: "var(--ink)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[13px] leading-[1.65] md:col-span-8"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {step.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <AiMatchBand
        body={`A ${program.name.toLowerCase()} track is proposed when the measured capability gap scores highest against these four offerings — not because it was next on a list.`}
      />

      {/* Other tracks --------------------------------------------- */}
      <section className="pb-8 md:pb-12">
        <div className="shell">
          <Reveal>
            <div className="mb-4">
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ink-muted)" }}
              >
                Other programme tracks
              </span>
            </div>
          </Reveal>

          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.05}>
                <Link
                  href={`/programs/${other.slug}`}
                  className="group flex items-center justify-between border p-5 transition-colors hover:border-[var(--brand)]"
                  style={{ borderColor: "var(--line)", background: "var(--surface)" }}
                >
                  <span>
                    <span
                      className="block text-[14px] font-semibold"
                      style={{ color: "var(--ink)" }}
                    >
                      {other.navLabel}
                    </span>
                    <span className="mt-1 block text-[11.5px]" style={{ color: "var(--ink-muted)" }}>
                      {other.offerings.length} core offerings
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.8}
                    style={{ color: "var(--brand)" }}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={program.name}
        title={`${program.cta} with our team.`}
        body={program.intro}
        primary={{ label: "Get Started", href: "/contact" }}
        secondary={{ label: "All programmes", href: "/programs" }}
        image={isPhotoKey(program.secondaryImage) ? program.secondaryImage : "cohort"}
      />

      <ContactSection defaultProgram={program.value} withImage={false} />
    </>
  );
}
