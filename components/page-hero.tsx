import Image from "next/image";
import Link from "next/link";

import { LineReveal, Parallax, Reveal, Uncover } from "@/components/motion";
import { photo, isPhotoKey } from "@/lib/images";

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt,
  crumbs,
  meta,
  accentStyle = "italic",
}: {
  eyebrow: string;
  index?: string;
  title: string;
  accent?: string;
  intro: string;
  image: string;
  imageAlt: string;
  crumbs?: { label: string; href: string }[];
  meta?: { label: string; value: string }[];
  accentStyle?: "italic" | "color";
}) {
  const src = isPhotoKey(image) ? photo(image, { w: 1800, h: 1000 }) : image;

  return (
    <section className="relative overflow-hidden pt-6 md:pt-10">
      <div className="shell">
        {crumbs && (
          <Reveal y={10}>
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-[11.5px]">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 && <span style={{ color: "var(--ink-muted)" }}>/</span>}
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-[var(--brand)]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <div className="mb-4">
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {eyebrow}
                </span>
              </div>
            </Reveal>

            <h1 className="display text-[clamp(1.85rem,3.8vw,2.95rem)] leading-[1.12]" style={{ color: "var(--ink)" }}>
              <LineReveal
                lines={
                  accent
                    ? [
                        title,
                        accentStyle === "italic" ? (
                          <em
                            key="accent"
                            style={{ fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}
                          >
                            {accent}
                          </em>
                        ) : (
                          <span
                            key="accent"
                            className="notranslate"
                            translate="no"
                            style={{ color: "var(--brand)" }}
                          >
                            {accent}
                          </span>
                        ),
                      ]
                    : [title]
                }
              />
            </h1>
          </div>

          <div className="flex items-end lg:col-span-5">
            <Reveal delay={0.25}>
              <p
                className="text-[14.5px] leading-[1.7]"
                style={{ color: "var(--ink-soft)", maxWidth: "48ch" }}
              >
                {intro}
              </p>
            </Reveal>
          </div>
        </div>

        {meta && (
          <Reveal delay={0.3}>
            <dl
              className="mt-6 grid grid-cols-2 border-t md:grid-cols-4"
              style={{ borderColor: "var(--line)" }}
            >
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="border-b border-r px-4 py-3.5 last:border-r-0"
                  style={{ borderColor: "var(--line)" }}
                >
                  <dt
                    className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {m.label}
                  </dt>
                  <dd className="display text-[1.1rem]" style={{ color: "var(--ink)" }}>
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      <div className="shell mt-7 md:mt-8">
        <Uncover delay={0.15}>
          <Parallax className="relative aspect-[16/9] w-full md:aspect-[21/9]" distance={34}>
            <div className="relative h-[calc(100%+68px)] w-full -translate-y-[34px]">
              <Image
                src={src}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                className="duotone object-cover"
              />
            </div>
          </Parallax>
        </Uncover>
      </div>
    </section>
  );
}

export default PageHero;
