import Link from "next/link";
import { ArrowUpRight, Lock, Mail, MapPin, Phone } from "lucide-react";

import { footer, site } from "@/lib/content";
import Icon from "@/components/icon";
import BrandLockup from "@/components/brand-lockup";
import { Reveal } from "@/components/motion";

const INK_BG = "#0a100d";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
  index?: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-baseline gap-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: INK_BG, color: "#e9e6dd" }}>
      <div className="shell relative z-10 pt-10 pb-6 md:pt-12">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-8">
          {/* Brand ------------------------------------------------ */}
          <Reveal>
            <div className="max-w-sm">
              <div className="text-white">
                <BrandLockup variant="light" withLegal href={null} size="md" />
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-white/55">{site.tagline}</p>

              <div className="mt-6 flex gap-2">
                {footer.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center border border-white/15 text-white/60 transition-colors duration-300 hover:border-white/50 hover:text-white"
                  >
                    <Icon name={social.icon} className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick links ------------------------------------------ */}
          <Reveal delay={0.08}>
            <Column title="Quick Links">
              <ul className="space-y-2.5">
                {footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </Reveal>

          {/* Programs --------------------------------------------- */}
          <Reveal delay={0.14}>
            <Column title="Programs">
              <ul className="space-y-2.5">
                {footer.programLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </Reveal>

          {/* Contact ---------------------------------------------- */}
          <Reveal delay={0.2}>
            <Column title="Contact">
              <ul className="space-y-3 text-[13.5px] text-white/65">
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" strokeWidth={1.6} />
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" strokeWidth={1.6} />
                  <a href={site.phoneHref} className="transition-colors hover:text-white">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" strokeWidth={1.6} />
                  <span>{site.location}</span>
                </li>
              </ul>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Office Hours
                </p>
                <ul className="space-y-1 text-[12.5px] text-white/55">
                  {site.officeHours.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </Column>
          </Reveal>
        </div>

        {/* Badges ------------------------------------------------- */}
        <div className="grid gap-6 border-b border-white/10 py-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Powered By
            </p>
            <ul className="flex flex-wrap gap-2">
              {footer.poweredBy.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 border border-white/12 px-2.5 py-1 text-[11px] text-white/60 transition-colors duration-300 hover:border-white/35 hover:text-white/90"
                >
                  <Icon name={item.icon} className="h-3 w-3" strokeWidth={1.6} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Compliance
            </p>
            <ul className="flex flex-wrap gap-2">
              {footer.compliance.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 border border-white/12 px-2.5 py-1 text-[11px] text-white/60 transition-colors duration-300 hover:border-white/35 hover:text-white/90"
                >
                  <Icon name={item.icon} className="h-3 w-3" strokeWidth={1.6} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline ----------------------------------------------- */}
        <div className="flex flex-col items-center justify-between gap-4 pt-5 md:flex-row">
          <p className="text-[12.5px] text-white/40">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12.5px]">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/45 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-white/30 transition-colors hover:text-white/70"
            >
              <Lock className="h-3 w-3" strokeWidth={1.8} />
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Oversized wordmark bleed ------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden"
        style={{ lineHeight: 0.78 }}
      >
        <p
          className="display text-center font-semibold notranslate"
          style={{
            color: "rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
            textWrap: "nowrap",
            fontSize: "clamp(2.5rem, 10.4vw, 11rem)",
            letterSpacing: "-0.035em",
          }}
          translate="no"
        >
          TALENTIC 360.AI
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
