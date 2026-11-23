import Icon from "@/components/icon";
import { Stagger, StaggerItem } from "@/components/motion";
import type { Offering } from "@/lib/content";

export function OfferingGrid({
  items,
  columns = 4,
  startIndex = 1,
  tone = "default",
}: {
  items: Offering[];
  columns?: 2 | 3 | 4;
  startIndex?: number;
  tone?: "default" | "sunken";
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <Stagger className={`grid border-l border-t ${cols}`}>
      {items.map((item, i) => (
        <StaggerItem key={item.title}>
          <article
            className="group relative flex h-full flex-col border-b border-r p-5 transition-colors duration-500 md:p-6"
            style={{
              background: tone === "sunken" ? "var(--sunken)" : "var(--surface)",
            }}
          >
            {/* rule that draws across the top on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
              style={{ background: "var(--brand)" }}
            />

            <div className="mb-4 flex items-start justify-between">
              <span
                className="grid h-10 w-10 place-items-center border transition-colors duration-500 group-hover:border-[var(--brand)]"
                style={{ borderColor: "var(--line)", color: "var(--brand)" }}
              >
                <Icon name={item.icon} className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </div>

            <h3
              className="display mb-2 text-[1.18rem] leading-snug"
              style={{ color: "var(--ink)" }}
            >
              {item.title}
            </h3>
            <p className="text-[13px] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
              {item.description}
            </p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default OfferingGrid;
