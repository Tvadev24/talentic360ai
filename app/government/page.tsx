import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Scale,
  Users,
  Globe,
  CheckCircle2,
  Landmark,
  Building,
  Award,
  FileCheck2,
  HeartHandshake,
} from "lucide-react";

import { getProgram } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import ContactSection from "@/components/contact-section";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Government Programs",
  description:
    "Partnership programs with government bodies to support national skill development initiatives, policy implementation, and public sector workforce enhancement.",
};

const GOVERNMENT_INITIATIVES = [
  {
    title: "Skill India Mission & NSDC Alignment",
    description: "Executing large-scale youth certification and apprenticeship mandates under national skill qualification frameworks (NSQF).",
    duration: "Annual Mandates",
    focus: "Youth & Semi-Urban",
    icon: Award,
  },
  {
    title: "Digital Governance & Public Administration L&D",
    description: "Training municipal, state, and central administrative officers on modern e-governance systems, citizen data portals, and cyber hygiene.",
    duration: "State / District Level",
    focus: "Public Servants",
    icon: Landmark,
  },
  {
    title: "PSU & Defense Workforce Modernization",
    description: "Specialized technical training programs for public sector undertakings, infrastructure boards, and defense manufacturing units.",
    duration: "Custom Modules",
    focus: "PSU Technical Cadres",
    icon: Shield,
  },
  {
    title: "Grassroots Community & Women Empowerment",
    description: "Vocational micro-entrepreneurship programs supporting self-help groups (SHGs), rural artisans, and economically disadvantaged demographics.",
    duration: "Community Driven",
    focus: "Grassroots Development",
    icon: HeartHandshake,
  },
];

const GOVERNMENT_BENEFITS = [
  "100% adherence to central and state procurement standards, GFR, and compliance norms",
  "Transparent real-time biometric and geo-tagged attendance monitoring systems",
  "Audited third-party assessment and NSQF aligned certification architectures",
  "Pan-India network of training centers with rural and peri-urban delivery reach",
  "End-to-end placement tracking with verifiable 3-month post-placement retention data",
  "Active collaboration with district skill committees and state skill development missions",
];

export default function GovernmentPage() {
  const program = getProgram("government");

  return (
    <>
      <PageHero
        eyebrow="Public Sector & Nation Building"
        title="Government"
        accent="Programs"
        intro={
          program?.intro ??
          "Partnership programs with government bodies to support national skill development initiatives, policy implementation, and public sector workforce enhancement."
        }
        image="governmentHero"
        imageAlt="Public sector development project team supported by workforce skill initiatives"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Government", href: "/government" },
        ]}
        meta={[
          { label: "Framework", value: "Skill India / NSQF" },
          { label: "Reach", value: "Pan-India" },
          { label: "Compliance", value: "100% GFR Aligned" },
          { label: "Delivery", value: "District Centers" },
        ]}
      />

      {/* Core Offerings Grid */}
      <section className="py-10 md:py-16">
        <div className="shell">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                  Public Capabilities
                </span>
                <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]" style={{ color: "var(--ink)" }}>
                  Four Government Pillars
                </h2>
              </div>
              <Link href="/contact" className="btn btn-primary btn-sm flex items-center gap-2">
                Initiate Public Partnership
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          {program && <OfferingGrid items={program.offerings} columns={4} />}
        </div>
      </section>

      {/* Government Initiatives Grid */}
      <section className="py-12 md:py-18" style={{ background: "var(--sunken)" }}>
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Policy & Scheme Execution
              </span>
              <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)]" style={{ color: "var(--ink)" }}>
                Flagship Public Sector Initiatives
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Empowering government bodies, state missions, and PSUs with accountable, transparent, and scalable workforce upskilling frameworks.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {GOVERNMENT_INITIATIVES.map((initiative, i) => {
              const Icon = initiative.icon;
              return (
                <Reveal key={initiative.title} delay={i * 0.08}>
                  <div
                    className="flex flex-col justify-between rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ background: "var(--surface)", borderColor: "var(--line)" }}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div
                          className="grid h-10 w-10 place-items-center rounded-lg border"
                          style={{
                            borderColor: "var(--brand-tint)",
                            background: "var(--brand-tint)",
                            color: "var(--brand)",
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-[var(--sunken)] px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                          {initiative.duration}
                        </span>
                      </div>

                      <h3 className="display mt-3 text-[1.28rem] font-bold" style={{ color: "var(--ink)" }}>
                        {initiative.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                        {initiative.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
                      <span className="text-[12px] font-mono font-semibold" style={{ color: "var(--brand)" }}>
                        {initiative.focus}
                      </span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:text-[var(--brand)]"
                        style={{ color: "var(--ink)" }}
                      >
                        Tender / MoU Liaison <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nation Building Compliance & Scale */}
      <section className="py-12 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Governance & Verification
              </span>
              <h2 className="display mt-2 text-[clamp(1.9rem,3.5vw,2.6rem)]" style={{ color: "var(--ink)" }}>
                Audited Transparency & Pan-India Implementation
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                TALENTIC 360.AI LLP provides full transparency across scheme implementation—from beneficiary enrollment, biometric attendance, training quality, to verifiable employer absorption.
              </p>
            </Reveal>

            <div className="mt-6 space-y-3.5">
              {GOVERNMENT_BENEFITS.map((item, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-[14.5px] leading-snug" style={{ color: "var(--ink)" }}>
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary btn-md">
                  Submit RFP / Tender Inquiry
                </Link>
                <Link href="/contact" className="btn btn-outline btn-md">
                  Contact Government Liaison Office
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Uncover>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
                <Image
                  src={photo("governmentDetail", { w: 900, h: 675 })}
                  alt="Public governance and administrative infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </Uncover>
          </div>
        </div>
      </section>

      {/* Direct Contact & Inquiry */}
      <ContactSection withHead={true} />
    </>
  );
}
