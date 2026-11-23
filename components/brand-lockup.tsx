import Link from "next/link";

export function BrandLockup({
  variant = "auto",
  withLegal = false,
  size = "md",
  href = "/",
}: {
  /** auto = swaps with theme, light = white, dark = blue */
  variant?: "auto" | "light" | "dark";
  withLegal?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string | null;
}) {
  const wordSize =
    size === "lg"
      ? "text-[18px] sm:text-[22px]"
      : size === "sm"
        ? "text-[15px]"
        : "text-[16px] sm:text-[19px]";

  const textColor =
    variant === "light"
      ? "#ffffff"
      : "#2563eb";

  const word = (
    <span
      className={`${wordSize} whitespace-nowrap font-black tracking-[0.03em] notranslate transition-opacity hover:opacity-90`}
      style={{ color: textColor }}
      translate="no"
    >
      TALENTIC 360.AI
      {withLegal && (
        <span className="ml-1.5 align-top text-[0.6em] tracking-[0.2em] opacity-60">
          LLP
        </span>
      )}
    </span>
  );

  if (!href) return word;

  return (
    <Link href={href} className="group inline-flex items-center" aria-label="TALENTIC 360.AI — home">
      {word}
    </Link>
  );
}

export default BrandLockup;
