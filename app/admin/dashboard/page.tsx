"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LayoutDashboard, LogOut, Search } from "lucide-react";

import { admin, contact, programs } from "@/lib/content";
import type { Submission } from "@/components/contact-form";
import { Reveal } from "@/components/motion";

const labelFor = (value: string) =>
  programs.find((p) => p.value === value)?.navLabel ?? value ?? "—";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let authed = false;
    try {
      authed = localStorage.getItem(admin.sessionKey) === "true";
    } catch {
      authed = false;
    }

    if (!authed) {
      router.replace("/admin");
      return;
    }

    try {
      const raw = localStorage.getItem(contact.storageKey);
      setSubmissions(raw ? (JSON.parse(raw) as Submission[]).reverse() : []);
    } catch {
      setSubmissions([]);
    }
    setReady(true);
  }, [router]);

  const logout = () => {
    try {
      localStorage.removeItem(admin.sessionKey);
    } catch {
      /* ignore */
    }
    router.push("/admin");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter((s) =>
      [s.name, s.email, s.program, labelFor(s.program), s.phone, s.message]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [submissions, query]);

  const stats = [
    { label: admin.stats[0], value: submissions.length },
    {
      label: admin.stats[1],
      value: submissions.filter((s) => s.program === "academic").length,
    },
    {
      label: admin.stats[2],
      value: submissions.filter((s) => s.program === "corporate").length,
    },
  ];

  if (!ready) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[13px]" style={{ color: "var(--ink-muted)" }}>
          Checking access…
        </p>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-20">
      <div className="shell">
        {/* Header ------------------------------------------------- */}
        <Reveal>
          <div
            className="flex flex-wrap items-center justify-between gap-5 border-b pb-7"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-4">
              <span
                className="grid h-11 w-11 place-items-center border"
                style={{ borderColor: "var(--line)", color: "var(--brand)" }}
              >
                <LayoutDashboard className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </span>
              <div>
                <h1 className="display text-[1.5rem]" style={{ color: "var(--ink)" }}>
                  {admin.dashboardTitle}
                </h1>
                <p
                  className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {admin.role}
                </p>
              </div>
            </div>

            <button type="button" onClick={logout} className="btn btn-ghost btn-sm">
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
              {admin.logout}
            </button>
          </div>
        </Reveal>

        {/* Stats -------------------------------------------------- */}
        <div className="mt-10 grid border-l border-t sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div
                className="border-b border-r p-7"
                style={{ background: "var(--surface)", borderColor: "var(--line)" }}
              >
                <p
                  className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")} — {stat.label}
                </p>
                <p className="display mt-3 text-[2.4rem] tabular-nums" style={{ color: "var(--ink)" }}>
                  {stat.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Table -------------------------------------------------- */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="display text-[1.4rem]" style={{ color: "var(--ink)" }}>
                  {admin.submissionsTitle}
                </h2>
                <p className="mt-1.5 text-[13.5px]" style={{ color: "var(--ink-muted)" }}>
                  {admin.submissionsSubtitle}
                </p>
              </div>

              <div className="flex w-full items-center gap-2 border-b sm:w-72" style={{ borderColor: "var(--line)" }}>
                <Search className="h-4 w-4 shrink-0" strokeWidth={1.7} style={{ color: "var(--ink-muted)" }} />
                <input
                  type="text"
                  className="field border-b-0"
                  placeholder={admin.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label={admin.searchPlaceholder}
                />
              </div>
            </div>

            <div
              className="overflow-x-auto border"
              style={{ background: "var(--surface)", borderColor: "var(--line)" }}
            >
              <table className="w-full min-w-[820px] text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--line)" }}>
                    {admin.tableHead.map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={admin.tableHead.length}
                        className="px-5 py-16 text-center text-[13.5px]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {admin.empty}
                      </td>
                    </tr>
                  )}

                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b align-top transition-colors last:border-b-0 hover:bg-[var(--sunken)]"
                      style={{ borderColor: "var(--line-soft)" }}
                    >
                      <td
                        className="whitespace-nowrap px-5 py-4 font-mono text-[11.5px]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {row.submittedAt}
                      </td>
                      <td className="px-5 py-4 text-[13.5px] font-medium" style={{ color: "var(--ink)" }}>
                        {row.name}
                      </td>
                      <td className="px-5 py-4 text-[12.5px]" style={{ color: "var(--ink-soft)" }}>
                        <a href={`mailto:${row.email}`} className="block hover:text-[var(--brand)]">
                          {row.email}
                        </a>
                        <a href={`tel:${row.phone}`} className="block hover:text-[var(--brand)]">
                          {row.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-block border px-2.5 py-1 text-[11px]"
                          style={{ borderColor: "var(--line)", color: "var(--brand)" }}
                        >
                          {labelFor(row.program)}
                        </span>
                      </td>
                      <td
                        className="max-w-sm px-5 py-4 text-[12.5px] leading-relaxed"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {row.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-[11.5px]" style={{ color: "var(--ink-muted)" }}>
              Showing {filtered.length} of {submissions.length} enquiries stored in this browser.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
