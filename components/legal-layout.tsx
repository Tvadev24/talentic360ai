import Link from "next/link";

import { site } from "@/lib/content";
import { Reveal } from "@/components/motion";

export type LegalSection = { heading: string; body: string[] };

export function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <article className="pt-14 pb-24 md:pt-20 md:pb-32">
      <div className="shell">
        <Reveal y={10}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[11.5px]">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--brand)]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Home
                </Link>
              </li>
              <li style={{ color: "var(--ink-muted)" }}>/</li>
              <li style={{ color: "var(--ink-soft)" }}>{title}</li>
            </ol>
          </nav>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-5">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8" style={{ background: "var(--line)" }} />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Legal
                </span>
              </div>
              <h1 className="display text-[clamp(2.1rem,4.6vw,3.2rem)]" style={{ color: "var(--ink)" }}>
                {title}
              </h1>
              <p
                className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--ink-muted)" }}
              >
                Last updated — {updated}
              </p>
              <p className="mt-7 text-[14.5px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
                {intro}
              </p>

              <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--line)" }}>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  Questions about this page? Write to{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-[var(--brand)]"
                    style={{ color: "var(--ink)" }}
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </header>

          <div className="lg:col-span-7">
            <ol className="border-t" style={{ borderColor: "var(--line)" }}>
              {sections.map((section, i) => (
                <Reveal key={section.heading} delay={i * 0.04}>
                  <li
                    className="grid gap-3 border-b py-8 md:grid-cols-12 md:gap-6"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="font-mono text-[11px] tabular-nums md:col-span-1"
                      style={{ color: "var(--brand)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-11">
                      <h2 className="display mb-3 text-[1.25rem]" style={{ color: "var(--ink)" }}>
                        {section.heading}
                      </h2>
                      {section.body.map((para, j) => (
                        <p
                          key={j}
                          className={`text-[14px] leading-[1.8] ${j > 0 ? "mt-4" : ""}`}
                          style={{ color: "var(--ink-soft)", maxWidth: "64ch" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
}

export default LegalLayout;
