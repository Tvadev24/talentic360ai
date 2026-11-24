import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Building,
  Target,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

import { getProgram, site } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import ContactSection from "@/components/contact-section";
import CtaBand from "@/components/cta-band";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Academic Programs",
  description:
    "Empowering students with industry-ready skills through comprehensive academic training programs that seamlessly integrate theoretical knowledge with practical application.",
};

const CURRICULUM_TRACKS = [
  {
    title: "Artificial Intelligence & Data Engineering",
    description: "Applied Machine Learning, PyTorch/TensorFlow pipelines, Prompt Engineering, and Autonomous AI Agent development.",
    duration: "6 Months",
    credits: "UGC Aligned",
    icon: Sparkles,
  },
  {
    title: "Full-Stack Enterprise Cloud Architecture",
    description: "Next.js, Microservices, Kubernetes deployment, DevOps CI/CD pipelines, and high-concurrency systems design.",
    duration: "4 Months",
    credits: "Industry Certified",
    icon: Building,
  },
  {
    title: "Industrial Cyber-Physical Systems & IoT",
    description: "Sensors integration, edge compute networks, firmware programming, and automated hardware-software synchronization.",
    duration: "5 Months",
    credits: "Lab Capstone",
    icon: Target,
  },
  {
    title: "Executive Business Analytics & Product Strategy",
    description: "Predictive econometric modeling, KPI dashboards, product requirement framing, and enterprise data visualization.",
    duration: "3 Months",
    credits: "Executive Track",
    icon: TrendingUp,
  },
];

const PARTNERSHIP_BENEFITS = [
  "Curriculum co-designed with Fortune 500 engineering leaders",
  "Dedicated on-campus AI innovation labs and simulation sandboxes",
  "Guaranteed internship interviews with over 500+ corporate hiring partners",
  "Dual-certification backed by TALENTIC 360.AI LLP and industry bodies",
  "Faculty enablement workshops on emerging technology pedagogies",
  "Real-world capstone projects evaluated by working practitioners",
];

export default function AcademicPage() {
  const program = getProgram("academic");

  return (
    <>
      <PageHero
        eyebrow="Academic Solutions"
        title="Academic"
        accent="Programs"
        intro={
          program?.intro ??
          "Empowering students with industry-ready skills through comprehensive academic training programs that seamlessly integrate theoretical knowledge with practical application."
        }
        image="academicHero"
        imageAlt="University students collaborating in modern AI learning lab"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Academic", href: "/academic" },
        ]}
        meta={[
          { label: "Partnership Base", value: "50+ Colleges" },
          { label: "Students Trained", value: "40,000+" },
          { label: "Placement Rate", value: "95%" },
          { label: "Delivery", value: "Campus · Hybrid" },
        ]}
      />

      {/* Core Offerings Grid */}
      <section className="py-10 md:py-16">
        <div className="shell">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                  Core Pillars
                </span>
                <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]" style={{ color: "var(--ink)" }}>
                  Four Academic Pillars
                </h2>
              </div>
              <Link href="/contact" className="btn btn-primary btn-sm flex items-center gap-2">
                Initiate Campus Partnership
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          {program && <OfferingGrid items={program.offerings} columns={4} />}
        </div>
      </section>

      {/* Deep Dive: Academic Curriculum Tracks */}
      <section className="py-12 md:py-18" style={{ background: "var(--sunken)" }}>
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Curriculum Blueprint
              </span>
              <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)]" style={{ color: "var(--ink)" }}>
                Industry-Engineered Specializations
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Bridging the critical void between traditional campus textbooks and high-demand corporate technical competencies.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CURRICULUM_TRACKS.map((track, i) => {
              const Icon = track.icon;
              return (
                <Reveal key={track.title} delay={i * 0.08}>
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
                          {track.duration}
                        </span>
                      </div>

                      <h3 className="display mt-3 text-[1.28rem] font-bold" style={{ color: "var(--ink)" }}>
                        {track.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
                      <span className="text-[12px] font-mono font-semibold" style={{ color: "var(--brand)" }}>
                        {track.credits}
                      </span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:text-[var(--brand)]"
                        style={{ color: "var(--ink)" }}
                      >
                        Syllabus Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* University Integration Model */}
      <section className="py-12 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Institutional Enablement
              </span>
              <h2 className="display mt-2 text-[clamp(1.9rem,3.5vw,2.6rem)]" style={{ color: "var(--ink)" }}>
                How We Partner with Universities & Colleges
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                We work directly with Deans, Academic Councils, and Placement Cells to embed career-accelerating apprenticeship tracks directly into the ongoing semester timetable.
              </p>
            </Reveal>

            <div className="mt-6 space-y-3.5">
              {PARTNERSHIP_BENEFITS.map((benefit, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-[14.5px] leading-snug" style={{ color: "var(--ink)" }}>
                      {benefit}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary btn-md">
                  Request University MoU Draft
                </Link>
                <Link href="/why-us" className="btn btn-outline btn-md">
                  Explore Placement Metrics
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Uncover>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
                <Image
                  src={photo("academicDetail", { w: 900, h: 675 })}
                  alt="Students engaged in structured apprenticeship session"
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
