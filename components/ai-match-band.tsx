import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { InferenceTicker, MatchGraph } from "@/components/ai-panels";
import { Reveal } from "@/components/motion";

export function AiMatchBand({
  title = "Matched by the 360.AI engine",
  body = "Tracks are not picked from a brochure. The capability gap is scored against every offering we run, and the shortest credible route to competence is the one we propose.",
  href = "/#engine",
  linkLabel = "See how the engine works",
}: {
  title?: string;
  body?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <section
      className="border-y py-8 md:py-10"
      style={{ borderColor: "var(--line)", background: "var(--sunken)" }}
    >
      <div className="shell grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <div
              className="border p-4"
              style={{ background: "var(--surface)", borderColor: "var(--line)" }}
            >
              <MatchGraph />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "var(--line)" }} />
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ink-muted)" }}
              >
                The intelligence layer
              </span>
            </div>
            <h2
              className="display text-[clamp(1.6rem,3vw,2.2rem)]"
              style={{ color: "var(--ink)" }}
            >
              {title}
            </h2>
            <p
              className="mt-3 text-[14.5px] leading-[1.7]"
              style={{ color: "var(--ink-soft)", maxWidth: "54ch" }}
            >
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div
              className="mt-5 border p-4"
              style={{ background: "var(--surface)", borderColor: "var(--line)" }}
            >
              <InferenceTicker />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <Link href={href} className="link-rule mt-5">
              {linkLabel}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default AiMatchBand;
