import { Reveal } from "@/components/motion";

export function SectionHead({
  index,
  eyebrow,
  title,
  accent,
  accentStyle = "italic",
  intro,
  align = "left",
  tone = "default",
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  accentStyle?: "italic" | "color";
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "invert";
  className?: string;
}) {
  const inkColor = tone === "invert" ? "#ffffff" : "var(--ink)";
  const softColor = tone === "invert" ? "rgba(255,255,255,0.6)" : "var(--ink-soft)";
  const mutedColor = tone === "invert" ? "rgba(255,255,255,0.4)" : "var(--ink-muted)";
  const lineColor = tone === "invert" ? "rgba(255,255,255,0.22)" : "var(--line)";

  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className ?? ""}`}
    >
      {eyebrow && (
        <Reveal y={12}>
          <div
            className={`mb-3.5 flex items-center ${align === "center" ? "justify-center" : ""}`}
          >
            <span
              className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: mutedColor }}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          className="display text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.12]"
          style={{ color: inkColor }}
        >
          {title}
          {accent && (
            <>
              {" "}
              {accentStyle === "italic" ? (
                <em
                  className="not-italic"
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: tone === "invert" ? "#9fd9bf" : "var(--brand)",
                  }}
                >
                  {accent}
                </em>
              ) : (
                <span
                  className="notranslate"
                  translate="no"
                  style={{ color: tone === "invert" ? "#9fd9bf" : "var(--brand)" }}
                >
                  {accent}
                </span>
              )}
            </>
          )}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.12}>
          <p
            className={`mt-3.5 text-[1rem] leading-[1.65] md:text-[1.0625rem] ${align === "center" ? "mx-auto" : ""}`}
            style={{ color: softColor, maxWidth: "62ch" }}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export default SectionHead;
