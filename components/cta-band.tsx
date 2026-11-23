import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, Uncover } from "@/components/motion";
import { photo, type PhotoKey } from "@/lib/images";

export function CtaBand({
  eyebrow = "Next step",
  title = "Ready to build a workforce that keeps up?",
  body = "Tell us what you are trying to achieve and we will map the right programme, cohort size and timeline.",
  primary = { label: "Get Started", href: "/contact" },
  secondary,
  image = "cohort" as PhotoKey,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: PhotoKey;
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0a100d" }}>
      <div className="shell grid items-center gap-8 py-8 md:py-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal y={12}>
            <div className="mb-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {eyebrow}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display text-[clamp(1.9rem,4vw,2.9rem)] text-white">{title}</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-3.5 text-[15px] leading-[1.7] text-white/55" style={{ maxWidth: "52ch" }}>
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={primary.href} className="btn btn-invert btn-lg">
                {primary.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="btn btn-lg"
                  style={{ borderColor: "rgba(255,255,255,0.28)", color: "#ffffff" }}
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Uncover delay={0.1}>
            <div className="relative aspect-[5/4] w-full">
              <Image
                src={photo(image, { w: 900, h: 720 })}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={{ filter: "saturate(0.55) contrast(1.05) brightness(0.82)" }}
              />
            </div>
          </Uncover>
        </div>
      </div>
    </section>
  );
}

export default CtaBand;
