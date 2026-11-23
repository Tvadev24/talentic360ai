import { Counter, Reveal } from "@/components/motion";
import { whyUs } from "@/lib/content";

export function StatsBand({ tone = "brand" }: { tone?: "brand" | "paper" }) {
  const invert = tone === "brand";

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: invert ? "var(--band)" : "var(--sunken)" }}
    >
      <div className="shell">
        <dl className="grid md:grid-cols-3">
          {whyUs.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div
                className={`px-2 py-6 md:px-8 md:py-8 ${i > 0 ? "border-t md:border-l md:border-t-0" : ""}`}
                style={{ borderColor: invert ? "var(--band-line)" : "var(--line)" }}
              >
                <dt
                  className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: invert ? "var(--band-ink-soft)" : "var(--ink-muted)" }}
                >
                  {stat.label}
                </dt>
                <dd
                  className="display text-[clamp(2.4rem,5.2vw,3.4rem)] tabular-nums"
                  style={{ color: invert ? "var(--band-ink)" : "var(--ink)" }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default StatsBand;
