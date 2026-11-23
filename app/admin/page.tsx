"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Lock, Shield } from "lucide-react";

import { admin } from "@/lib/content";
import BrandLockup from "@/components/brand-lockup";
import Toast, { type ToastState } from "@/components/toast";
import { Reveal } from "@/components/motion";

const USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? "admin";
const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(admin.sessionKey) === "true") {
        router.replace("/admin/dashboard");
      }
    } catch {
      /* storage unavailable — stay on the login screen */
    }
  }, [router]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username === USERNAME && password === PASSWORD) {
      try {
        localStorage.setItem(admin.sessionKey, "true");
      } catch {
        /* ignore */
      }
      setToast({ title: admin.successTitle, body: admin.successBody, tone: "success" });
      setTimeout(() => router.push("/admin/dashboard"), 500);
    } else {
      setToast({ title: admin.failTitle, body: admin.failBody, tone: "error" });
    }
  };

  return (
    <>
      <section className="flex min-h-[78vh] items-center py-20">
        <div className="shell">
          <div className="mx-auto w-full max-w-md">
            <Reveal>
              <div
                className="border p-8 md:p-10"
                style={{ background: "var(--surface)", borderColor: "var(--line)" }}
              >
                <div className="mb-8 flex flex-col items-center text-center">
                  <BrandLockup size="sm" href={null} />
                  <span
                    className="mt-7 grid h-12 w-12 place-items-center border"
                    style={{ borderColor: "var(--line)", color: "var(--brand)" }}
                  >
                    <Shield className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h1 className="display mt-5 text-[1.6rem]" style={{ color: "var(--ink)" }}>
                    {admin.loginTitle}
                  </h1>
                  <p className="mt-2 text-[13.5px]" style={{ color: "var(--ink-muted)" }}>
                    {admin.loginSubtitle}
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-7">
                  <div>
                    <label htmlFor="username" className="field-label">
                      {admin.usernameLabel}
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="field"
                      placeholder={admin.usernamePlaceholder}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="field-label">
                      {admin.passwordLabel}
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="field"
                      placeholder={admin.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    <Lock className="h-4 w-4" strokeWidth={1.8} />
                    {admin.submit}
                  </button>
                </form>

                <div className="mt-8 border-t pt-6 text-center" style={{ borderColor: "var(--line)" }}>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[12.5px] transition-colors hover:text-[var(--brand)]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {admin.back}
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className="mt-6 text-center text-[11.5px] leading-relaxed"
                style={{ color: "var(--ink-muted)" }}
              >
                Demonstration access only — credentials are checked in the browser. Replace this with
                server-side authentication before any real enquiry data sits behind it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
