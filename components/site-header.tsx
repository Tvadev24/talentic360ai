"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";

import { navigation, site } from "@/lib/content";
import BrandLockup from "@/components/brand-lockup";
import ThemeToggle from "@/components/theme-toggle";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* Utility strip                                               */}
      {/* ---------------------------------------------------------- */}
      <div className="hidden lg:block" style={{ background: "var(--band)" }}>
        <div
          className="shell flex h-9 items-center justify-between text-[11.5px]"
          style={{ color: "var(--band-ink-soft)" }}
        >
          <div className="flex items-center gap-7">
            <a href={`mailto:${site.email}`} className="band-link flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
              {site.email}
            </a>
            <a href={site.phoneHref} className="band-link flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
              {site.phone}
            </a>
          </div>
          <p className="font-medium uppercase tracking-[0.12em]">{site.officeHours[0]}</p>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Main bar                                                    */}
      {/* ---------------------------------------------------------- */}
      <motion.header
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="sticky top-0 z-50 border-b"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--paper) 92%, transparent)" : "var(--paper)",
          borderColor: scrolled ? "var(--line)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "background 300ms ease, border-color 300ms ease",
        }}
      >
        <div className="shell flex items-center justify-between gap-6 py-2.5 md:py-3">
          <BrandLockup size="md" />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active = isActive(item.href);

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-3.5 py-2 text-[13.5px] font-medium transition-colors"
                    style={{ color: active ? "var(--brand)" : "var(--ink-soft)" }}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 bottom-0 h-px"
                        style={{ background: "var(--brand)" }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </Link>
                );
              }

              const open = openDropdown === item.label;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1.5 px-3.5 py-2 text-[13.5px] font-medium transition-colors"
                    style={{ color: active ? "var(--brand)" : "var(--ink-soft)" }}
                    aria-expanded={open}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      strokeWidth={1.8}
                    />
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 bottom-0 h-px"
                        style={{ background: "var(--brand)" }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 border shadow-lg"
                        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
                      >
                        <div className="grid grid-cols-2 p-2 gap-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex items-center justify-between px-3.5 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-[var(--sunken)] hover:text-[var(--brand)]"
                              style={{ color: "var(--ink)" }}
                            >
                              <span>{child.label}</span>
                              <ArrowRight
                                className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                                style={{ color: "var(--brand)" }}
                                strokeWidth={1.8}
                              />
                            </Link>
                          ))}
                        </div>
                        <div className="border-t px-2 py-1.5" style={{ borderColor: "var(--line-soft)" }}>
                          <Link
                            href="/programs"
                            className="flex items-center justify-between px-3.5 py-2 text-[12px] font-semibold tracking-wide transition-colors hover:bg-[var(--sunken)]"
                            style={{ color: "var(--brand)" }}
                          >
                            View every programme
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border lg:hidden"
              style={{ borderColor: "var(--line)" }}
            >
              <Menu className="h-[17px] w-[17px]" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ---------------------------------------------------------- */}
      {/* Mobile panel                                                */}
      {/* ---------------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] lg:hidden"
            style={{ background: "var(--paper)" }}
          >
            <div className="flex h-full flex-col">
              <div className="shell flex items-center justify-between py-4">
                <BrandLockup size="sm" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full border"
                  style={{ borderColor: "var(--line)" }}
                >
                  <X className="h-[17px] w-[17px]" strokeWidth={1.6} />
                </button>
              </div>

              <nav className="shell flex-1 overflow-y-auto pb-10" aria-label="Mobile">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: EASE }}
                    className="border-b py-1"
                    style={{ borderColor: "var(--line-soft)" }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline py-3.5"
                      style={{ color: isActive(item.href) ? "var(--brand)" : "var(--ink)" }}
                    >
                      <span className="display text-[26px]">{item.label}</span>
                    </Link>

                    {item.children && (
                      <div className="mb-3 ml-8 flex flex-wrap gap-x-5 gap-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-[13px]"
                            style={{ color: "var(--ink-muted)" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.45, ease: EASE }}
                  className="mt-8 space-y-4"
                >
                  <Link href="/contact" className="btn btn-primary btn-lg w-full">
                    Get Started
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1 text-[12.5px]" style={{ color: "var(--ink-muted)" }}>
                      <p>{site.email}</p>
                      <p>{site.phone}</p>
                    </div>
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SiteHeader;
