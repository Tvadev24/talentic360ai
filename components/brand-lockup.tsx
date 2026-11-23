import Image from "next/image";
import Link from "next/link";

export function BrandLockup({
  variant = "auto",
  withLegal = false,
  size = "md",
  href = "/",
}: {
  /** auto = swaps with theme, light = white mark, dark = ink mark */
  variant?: "auto" | "light" | "dark";
  withLegal?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string | null;
}) {
  const markSize =
    size === "lg"
      ? "h-[38px] w-[38px] sm:h-[46px] sm:w-[46px]"
      : size === "sm"
        ? "h-[28px] w-[28px]"
        : "h-[30px] w-[30px] sm:h-9 sm:w-9";
  const wordSize =
    size === "lg"
      ? "text-[16px] sm:text-[19px]"
      : size === "sm"
        ? "text-[13px]"
        : "text-[13px] sm:text-[15px]";

  const mark = (
    <span className={`relative shrink-0 ${markSize}`} aria-hidden="true">
      {variant !== "light" && (
        <Image
          src="/brand/logo-dark.png"
          alt=""
          width={96}
          height={96}
          priority
          className={variant === "auto" ? "h-full w-full object-contain dark:hidden" : "h-full w-full object-contain"}
        />
      )}
      {variant !== "dark" && (
        <Image
          src="/brand/logo-light.png"
          alt=""
          width={96}
          height={96}
          priority
          className={
            variant === "auto"
              ? "absolute inset-0 hidden h-full w-full object-contain dark:block"
              : "h-full w-full object-contain"
          }
        />
      )}
    </span>
  );

  const word = (
    <span className="flex flex-col leading-none">
      <span
        className={`${wordSize} whitespace-nowrap font-semibold tracking-[0.1em] sm:tracking-[0.14em] notranslate`}
        translate="no"
      >
        TALENTIC{" "}
        <span style={{ color: "var(--brand)" }}>360.AI</span>
        {withLegal && (
          <span className="ml-1.5 align-top text-[0.6em] tracking-[0.2em] opacity-60">
            LLP
          </span>
        )}
      </span>
      {size !== "sm" && (
        <span
          className="mt-[5px] hidden whitespace-nowrap text-[9.5px] font-medium uppercase tracking-[0.26em] sm:block"
          style={{ color: "var(--ink-muted)" }}
        >
          Training &amp; Apprenticeship
        </span>
      )}
    </span>
  );

  const inner = (
    <span className="flex items-center gap-3">
      {mark}
      {word}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="group inline-flex items-center" aria-label="TALENTIC 360.AI LLP — home">
      {inner}
    </Link>
  );
}

export default BrandLockup;
