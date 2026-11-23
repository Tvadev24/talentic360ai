import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { navigation } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="flex min-h-[72vh] items-center py-20">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[11px]" style={{ color: "var(--brand)" }}>
              404
            </span>
            <span className="h-px w-8" style={{ background: "var(--line)" }} />
            <span
              className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "var(--ink-muted)" }}
            >
              Page not found
            </span>
          </div>

          <h1 className="display text-[clamp(2.4rem,6vw,4.2rem)]" style={{ color: "var(--ink)" }}>
            This page isn&apos;t{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>here</em>
          </h1>

          <p
            className="mt-6 text-[15.5px] leading-[1.75]"
            style={{ color: "var(--ink-soft)", maxWidth: "48ch" }}
          >
            The link may be out of date, or the page may have moved. Everything on the site is one
            click away from the list on the right.
          </p>

          <Link href="/" className="btn btn-primary btn-lg mt-9">
            Back to home
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <nav className="lg:col-span-5" aria-label="Site sections">
          <ul className="border-t" style={{ borderColor: "var(--line)" }}>
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b" style={{ borderColor: "var(--line)" }}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between py-4"
                  style={{ color: "var(--ink)" }}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[10.5px] tabular-nums"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[1.2rem] transition-colors group-hover:text-[var(--brand)]">
                      {item.label}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                    style={{ color: "var(--brand)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
