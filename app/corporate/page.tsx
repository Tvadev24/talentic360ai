import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  UsersRound,
  Rocket,
  ChartLine,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";

import { getProgram } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import ContactSection from "@/components/contact-section";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Corporate Programs",
  description:
    "Strategic corporate training solutions tailored for MNCs, corporates, and large manufacturers. Our mindful approach ensures alignment with your business objectives and long-term growth.",
};

const CORPORATE_SOLUTIONS = [
  {
    title: "Executive Leadership & Strategic Management",
    description: "C-suite mentoring, conflict resolution frameworks, strategic delegation, data-backed OKR governance, and organizational transformation.",
    duration: "Modular Cohorts",
    target: "Directors & Team Leads",
    icon: UsersRound,
  },
  {
    title: "Enterprise AI & GenAI Workforce Upskilling",
    description: "Empowering non-technical and technical business units to adopt generative AI copilots, automated workflows, and LLM-assisted pipelines.",
    duration: "4 - 8 Weeks",
    target: "Cross-Functional Teams",
    icon: Rocket,
  },
  {
    title: "Smart Manufacturing & Lean Six Sigma L&D",
    description: "DMAIC methodologies, root-cause analysis, defect reduction, TPM protocols, and operational throughput optimization on live lines.",
    duration: "Continuous Track",
    target: "Plant & Operations Heads",
    icon: Building2,
  },
  {
    title: "Talent Retention & High-Potential Acceleration",
    description: "Structured career mobility architectures that reduce key person attrition and groom the next tier of internal engineering and product managers.",
    duration: "Year-Round",
    target: "HiPo Individual Contributors",
    icon: ChartLine,
  },
];

const CORPORATE_ADVANTAGES = [
  "Custom tailored curriculum mapped precisely to your company's tech stack and KPIs",
  "Mindful training methodology combining deep theoretical insights with sandbox labs",
  "Measurable ROI through 360-Synapse capability scoring before and after the cohort",
  "Proven partner to Fortune 500 multinationals and premier Indian enterprises",
  "Dedicated client success partner and weekly executive steering reports",
  "Flexible delivery: on-site executive retreats, hybrid sprints, or fully managed academies",
];

export default function CorporatePage() {
  const program = getProgram("corporate");

  return (
    <>
      <PageHero
        eyebrow="Enterprise Workforce Transformation"
        title="Corporate"
        accent="Programs"
        intro={
          program?.intro ??
          "Strategic corporate training solutions tailored for MNCs, corporates, and large manufacturers. Our mindful approach ensures alignment with your business objectives and long-term growth."
        }
        image="corporateHero"
        imageAlt="Corporate professionals in strategic planning and leadership workshop"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate", href: "/corporate" },
        ]}
        meta={[
          { label: "Client Base", value: "500+ MNCs" },
          { label: "Onboarding Velocity", value: "+65% Faster" },
          { label: "Satisfaction", value: "98.4% CSAT" },
          { label: "Delivery", value: "Executive · Hybrid" },
        ]}
      />

      {/* Core Offerings Grid */}
      <section className="py-10 md:py-16">
        <div className="shell">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                  Strategic Capabilities
                </span>
                <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]" style={{ color: "var(--ink)" }}>
                  Four Enterprise Pillars
                </h2>
              </div>
              <Link href="/contact" className="btn btn-primary btn-sm flex items-center gap-2">
                Schedule Executive Consultation
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          {program && <OfferingGrid items={program.offerings} columns={4} />}
        </div>
      </section>

      {/* Enterprise Solutions Grid */}
      <section className="py-12 md:py-18" style={{ background: "var(--sunken)" }}>
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Tailored L&D Solutions
              </span>
              <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)]" style={{ color: "var(--ink)" }}>
                Customized Enterprise Training Suites
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Empowering MNCs, manufacturing conglomerates, and global capability centers (GCCs) to scale operational excellence through custom workforce academies.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CORPORATE_SOLUTIONS.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <Reveal key={solution.title} delay={i * 0.08}>
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
                          {solution.duration}
                        </span>
                      </div>

                      <h3 className="display mt-3 text-[1.28rem] font-bold" style={{ color: "var(--ink)" }}>
                        {solution.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                        {solution.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
                      <span className="text-[12px] font-mono font-semibold" style={{ color: "var(--brand)" }}>
                        {solution.target}
                      </span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:text-[var(--brand)]"
                        style={{ color: "var(--ink)" }}
                      >
                        Request Proposal <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Mindful Strategy for MNCs */}
      <section className="py-12 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Our Mindful Approach
              </span>
              <h2 className="display mt-2 text-[clamp(1.9rem,3.5vw,2.6rem)]" style={{ color: "var(--ink)" }}>
                We Don&apos;t Just Train — We Deliver Sustainable Business Outcomes
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                TALENTIC 360.AI LLP stands as the preferred enterprise training partner for large manufacturers and technology MNCs because our programs are built with measurable ROI metrics and direct executive oversight.
              </p>
            </Reveal>

            <div className="mt-6 space-y-3.5">
              {CORPORATE_ADVANTAGES.map((item, i) => (
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
                  Scope a Corporate Cohort
                </Link>
                <Link href="/contact" className="btn btn-outline btn-md">
                  Download Enterprise Case Studies
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Uncover>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
                <Image
                  src={photo("corporateDetail", { w: 900, h: 675 })}
                  alt="Enterprise team collaborating in an interactive innovation workshop"
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
