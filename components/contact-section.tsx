import Image from "next/image";

import { contact, site } from "@/lib/content";
import Icon from "@/components/icon";
import SectionHead from "@/components/section-head";
import ContactForm from "@/components/contact-form";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export function ContactSection({
  index = "04",
  defaultProgram,
  withImage = true,
  withHead = true,
}: {
  index?: string;
  defaultProgram?: string;
  withImage?: boolean;
  withHead?: boolean;
}) {
  return (
    <section id="contact" className="scroll-mt-28 py-8 md:py-12">
      <div className="shell">
        {withHead && (
          <SectionHead
            index={index}
            eyebrow="Start a conversation"
            title={contact.heading}
            accent={contact.headingAccent}
            intro={contact.intro}
          />
        )}

        <div className={`grid gap-8 lg:grid-cols-12 lg:gap-10 ${withHead ? "mt-8 md:mt-10" : ""}`}>
          {/* Details --------------------------------------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ink-muted)" }}
              >
                {contact.infoTitle}
              </h3>
            </Reveal>

            <ul className="mt-4 border-t" style={{ borderColor: "var(--line)" }}>
              {contact.details.map((detail, i) => (
                <Reveal key={detail.label} delay={0.06 * i}>
                  <li className="border-b py-3.5" style={{ borderColor: "var(--line)" }}>
                    <div className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border"
                        style={{ borderColor: "var(--line)", color: "var(--brand)" }}
                      >
                        <Icon name={detail.icon} className="h-3.5 w-3.5" strokeWidth={1.6} />
                      </span>
                      <div>
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="mt-0.5 block text-[14.5px] transition-colors hover:text-[var(--brand)]"
                            style={{ color: "var(--ink)" }}
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-[14.5px]" style={{ color: "var(--ink)" }}>
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-6">
                <h3
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {contact.officeHoursTitle}
                </h3>
                <ul className="mt-3 space-y-2">
                  {site.officeHours.map((line) => {
                    const [day, time] = line.split(": ");
                    return (
                      <li
                        key={line}
                        className="flex items-baseline justify-between gap-4 border-b pb-2 text-[13px]"
                        style={{ borderColor: "var(--line-soft)" }}
                      >
                        <span style={{ color: "var(--ink-soft)" }}>{day}</span>
                        <span className="tabular-nums" style={{ color: "var(--ink)" }}>
                          {time}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {withImage && (
              <Uncover delay={0.14}>
                <div className="relative mt-6 aspect-[4/3] w-full">
                  <Image
                    src={photo("contactMain", { w: 800, h: 600 })}
                    alt="An advisor discussing programme options with a client"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="duotone object-cover"
                  />
                </div>
              </Uncover>
            )}
          </div>

          {/* Form ------------------------------------------------ */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div
                className="border p-5 md:p-7"
                style={{ background: "var(--surface)", borderColor: "var(--line)" }}
              >
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <h3 className="display text-[1.4rem]" style={{ color: "var(--ink)" }}>
                    Tell us what you need
                  </h3>
                </div>
                <ContactForm defaultProgram={defaultProgram} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
