import type { Metadata } from "next";

import { contact } from "@/lib/content";
import PageHero from "@/components/page-hero";
import ContactSection from "@/components/contact-section";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.intro,
};

const faqs = [
  {
    q: "How quickly can a programme start?",
    a: "Most corporate and vocational cohorts can be scoped and scheduled within a few weeks. Academic partnerships follow the institution's calendar.",
  },
  {
    q: "What is the minimum cohort size?",
    a: "It depends on the track. Remote and self-paced programmes run for individuals; on-site enterprise programmes are usually built around a full team or department.",
  },
  {
    q: "Do you work outside India?",
    a: "Our remote and hybrid tracks are delivered without geographical limits. On-site delivery is arranged case by case.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title={contact.heading}
        accent={contact.headingAccent}
        intro={contact.intro}
        image="contactMain"
        imageAlt="An advisor discussing programme options with a client"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <ContactSection withHead={false} withImage={false} />

      <section className="pb-10 md:pb-14">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="mb-4">
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Before you write
                </span>
              </div>
              <h2
                className="display text-[clamp(1.6rem,3vw,2.1rem)]"
                style={{ color: "var(--ink)" }}
              >
                Common questions
              </h2>
            </Reveal>
          </div>

          <dl className="border-t lg:col-span-8" style={{ borderColor: "var(--line)" }}>
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.06}>
                <div className="border-b py-3.5" style={{ borderColor: "var(--line)" }}>
                  <dt
                    className="display mb-2 flex items-start gap-3 text-[1.1rem]"
                    style={{ color: "var(--ink)" }}
                  >
                    {faq.q}
                  </dt>
                  <dd
                    className="pl-8 text-[13.5px] leading-[1.7]"
                    style={{ color: "var(--ink-soft)", maxWidth: "60ch" }}
                  >
                    {faq.a}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
