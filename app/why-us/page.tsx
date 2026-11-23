import type { Metadata } from "next";
import Image from "next/image";

import { whyUs } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import StatsBand from "@/components/stats-band";
import CtaBand from "@/components/cta-band";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Why Us",
  description: whyUs.intro,
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="The difference"
        title={whyUs.heading}
        accent={whyUs.headingAccent}
        accentStyle="color"
        intro={whyUs.intro}
        image="whyUsMain"
        imageAlt="Colleagues marking a placement milestone"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Why Us", href: "/why-us" },
        ]}
        meta={[
          { label: "Trained professionals", value: "10,000+" },
          { label: "Corporate partners", value: "500+" },
          { label: "Placement rate", value: "95%" },
          { label: "Sectors", value: "07" },
        ]}
      />

      <section className="py-8 md:py-12">
        <div className="shell">
          <Reveal>
            <div className="mb-6">
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ink-muted)" }}
              >
                Six reasons partners stay
              </span>
            </div>
          </Reveal>

          <OfferingGrid items={whyUs.reasons} columns={3} />
        </div>
      </section>

      <StatsBand />

      <section className="py-8 md:py-12">
        <div className="shell grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Uncover>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo("whyUsSecondary", { w: 1000, h: 750 })}
                  alt="A recruitment and placement event at scale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="duotone object-cover"
                />
              </div>
            </Uncover>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <h2
                className="display text-[clamp(1.7rem,3.2vw,2.3rem)]"
                style={{ color: "var(--ink)" }}
              >
                Measured on outcomes, not attendance
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="mt-4 text-[14.5px] leading-[1.75]"
                style={{ color: "var(--ink-soft)", maxWidth: "54ch" }}
              >
                A certificate at the end of a course means very little on its own. Every track we run
                is assessed against industry standards, and we stay involved through mentorship and
                placement support until participants are in the roles they trained for.
              </p>
            </Reveal>

            <dl className="mt-6 border-t" style={{ borderColor: "var(--line)" }}>
              {[
                { k: "Assessment", v: "Industry-recognised certification at every exit point" },
                { k: "Support", v: "Mentorship and placement assistance after the cohort ends" },
                { k: "Faculty", v: "Practitioners with live industry experience, not career trainers" },
              ].map((row, i) => (
                <Reveal key={row.k} delay={i * 0.06}>
                  <div
                    className="grid gap-2 border-b py-3.5 md:grid-cols-12 md:gap-4"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <dt
                      className="text-[10.5px] font-semibold uppercase tracking-[0.18em] md:col-span-4"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {row.k}
                    </dt>
                    <dd className="text-[13.5px] leading-relaxed md:col-span-8" style={{ color: "var(--ink)" }}>
                      {row.v}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Find out for yourself"
        title="Bring us a skills problem worth solving."
        body="We'll show you how the track would run, who would teach it, and what the measurable outcome looks like."
        primary={{ label: "Get Started", href: "/contact" }}
        secondary={{ label: "See programmes", href: "/programs" }}
        image="cohort"
      />
    </>
  );
}
