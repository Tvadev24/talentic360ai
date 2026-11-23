import Image from "next/image";

import { whyUs } from "@/lib/content";
import SectionHead from "@/components/section-head";
import OfferingGrid from "@/components/offering-grid";
import { Reveal, Uncover } from "@/components/motion";
import { photo } from "@/lib/images";

export function WhyUsSection({ index = "03" }: { index?: string }) {
  return (
    <section id="why-us" className="scroll-mt-28 py-8 md:py-12">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHead
              index={index}
              eyebrow="The difference"
              title={whyUs.heading}
              accent={whyUs.headingAccent}
              accentStyle="color"
              intro={whyUs.intro}
            />
          </div>

          <div className="lg:col-span-5">
            <Uncover delay={0.1}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo("whyUsMain", { w: 800, h: 600 })}
                  alt="Colleagues marking a placement milestone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="duotone object-cover"
                />
              </div>
            </Uncover>
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <OfferingGrid items={whyUs.reasons} columns={3} />
        </div>

        <Reveal delay={0.1}>
          <p
            className="mt-4 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
            style={{ color: "var(--ink-muted)" }}
          >
            <span className="h-px w-5" style={{ background: "var(--line)" }} />
            Six reasons partners stay with us
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default WhyUsSection;
