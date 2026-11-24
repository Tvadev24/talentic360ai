import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Zap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  HardHat,
  Cpu,
  ShieldCheck,
  Factory,
  Settings,
} from "lucide-react";

import { getProgram } from "@/lib/content";
import PageHero from "@/components/page-hero";
import OfferingGrid from "@/components/offering-grid";
import ContactSection from "@/components/contact-section";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Vocational Programs",
  description:
    "Practical, industry-focused vocational training programs that equip individuals with the specialized skills needed to excel in their chosen trades and professions.",
};

const VOCATIONAL_TRADES = [
  {
    title: "Industrial Automation & Robotics Technician",
    description: "PLC programming, SCADA interfaces, sensor integration, robotic arm calibration, and automated production maintenance.",
    duration: "6 Months",
    standards: "NSDC / NCVT",
    icon: Cpu,
  },
  {
    title: "Precision CNC Machining & Tool Engineering",
    description: "G-Code/M-Code programming, multi-axis milling, lathe tooling, quality tolerance inspection, and CAD/CAM CAM operation.",
    duration: "4 Months",
    standards: "Industry Standard",
    icon: Settings,
  },
  {
    title: "Smart Grid & Industrial Electrical Systems",
    description: "High-voltage distribution, motor controls, solar PV installation, switchgear diagnostics, and preventative plant safety.",
    duration: "5 Months",
    standards: "Certified Electrician",
    icon: Zap,
  },
  {
    title: "Mechatronics & Assembly Plant Engineering",
    description: "Hydraulic and pneumatic circuits, electro-mechanical diagnostics, sensor networks, and production line optimization.",
    duration: "6 Months",
    standards: "Manufacturing Level 4",
    icon: Factory,
  },
];

const VOCATIONAL_HIGHLIGHTS = [
  "80% practical workshop immersion on production-grade machinery",
  "Zero-cost safety kit and technical PPE issued on day one",
  "Earn monthly training stipends during enterprise shop-floor apprenticeships",
  "Direct placement linkages with leading auto, manufacturing, and electrical MNCs",
  "Certified instructors with over 15+ years of active industrial plant experience",
  "Continuous skill audit with real-time competency scorecard",
];

export default function VocationalPage() {
  const program = getProgram("vocational");

  return (
    <>
      <PageHero
        eyebrow="Trade & Industry Excellence"
        title="Vocational"
        accent="Programs"
        intro={
          program?.intro ??
          "Practical, industry-focused vocational training programs that equip individuals with the specialized skills needed to excel in their chosen trades and professions."
        }
        image="vocationalHero"
        imageAlt="Vocational trainee engaged in precision metal welding and fabrication"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vocational", href: "/vocational" },
        ]}
        meta={[
          { label: "Hands-on Ratio", value: "80% Practical" },
          { label: "Graduates Placed", value: "25,000+" },
          { label: "Placement Time", value: "Avg 14 Days" },
          { label: "Certification", value: "NCVT / NSDC" },
        ]}
      />

      {/* Core Offerings Grid */}
      <section className="py-10 md:py-16">
        <div className="shell">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                  Core Pathways
                </span>
                <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]" style={{ color: "var(--ink)" }}>
                  Four Vocational Tracks
                </h2>
              </div>
              <Link href="/contact" className="btn btn-primary btn-sm flex items-center gap-2">
                Apply for Trade Apprenticeship
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          {program && <OfferingGrid items={program.offerings} columns={4} />}
        </div>
      </section>

      {/* Trade Specialization Grid */}
      <section className="py-12 md:py-18" style={{ background: "var(--sunken)" }}>
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                Shop Floor Readiness
              </span>
              <h2 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)]" style={{ color: "var(--ink)" }}>
                Core Manufacturing & Technical Trades
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Equipping workers and technicians with hands-on proficiency across modern automated factories, tooling centers, and engineering facilities.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {VOCATIONAL_TRADES.map((trade, i) => {
              const Icon = trade.icon;
              return (
                <Reveal key={trade.title} delay={i * 0.08}>
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
                          {trade.duration}
                        </span>
                      </div>

                      <h3 className="display mt-3 text-[1.28rem] font-bold" style={{ color: "var(--ink)" }}>
                        {trade.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                        {trade.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
                      <span className="text-[12px] font-mono font-semibold" style={{ color: "var(--brand)" }}>
                        {trade.standards}
                      </span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:text-[var(--brand)]"
                        style={{ color: "var(--ink)" }}
                      >
                        Trade Curriculum <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apprenticeship Advantage */}
      <section className="py-12 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>
                The Apprentice Advantage
              </span>
              <h2 className="display mt-2 text-[clamp(1.9rem,3.5vw,2.6rem)]" style={{ color: "var(--ink)" }}>
                Earn While You Learn on Live Industrial Production Lines
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Our candidates transition from basic workshop safety to operating multi-million rupee machinery in certified partner manufacturing facilities across Pune, Maharashtra, and industrial hubs across India.
              </p>
            </Reveal>

            <div className="mt-6 space-y-3.5">
              {VOCATIONAL_HIGHLIGHTS.map((item, i) => (
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
                  Register for Upcoming Batch
                </Link>
                <Link href="/contact" className="btn btn-outline btn-md">
                  Hire Certified Technicians
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Uncover>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
                <Image
                  src={photo("vocationalDetail", { w: 900, h: 675 })}
                  alt="Industrial drafting and technical training"
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
