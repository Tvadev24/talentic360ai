"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Languages } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "EN", full: "English" },
  { code: "zh-CN", label: "中文", full: "中文 (简体)" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (options: Record<string, unknown>, host: string): unknown;
          InlineLayout: { SIMPLE: unknown };
        };
      };
    };
  }
}

function readCookieLanguage() {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "en";
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Boot Google Translate once, into a visually hidden host. */
  useEffect(() => {
    setCurrent(readCookieLanguage());

    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: string) => {
    setCurrent(code);
    setOpen(false);

    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
      return;
    }

    // Fallback: drive the translation through Google's own cookie.
    const host = window.location.hostname;
    const value = code === "en" ? "" : `/en/${code}`;
    const expiry = code === "en" ? "Thu, 01 Jan 1970 00:00:01 GMT" : "";
    document.cookie = `googtrans=${value};path=/;${expiry ? `expires=${expiry};` : ""}`;
    document.cookie = `googtrans=${value};path=/;domain=.${host};${expiry ? `expires=${expiry};` : ""}`;
    window.location.reload();
  };

  const active = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <div ref={wrapRef} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border px-3 py-[7px] text-[12px] font-semibold tracking-wide transition-colors"
        style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
      >
        <Languages className="h-[14px] w-[14px]" strokeWidth={1.6} />
        {!compact && <span>{active.label}</span>}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-[3px] border py-1"
            style={{ background: "var(--surface)", borderColor: "var(--line)" }}
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang.code === current}
                  onClick={() => choose(lang.code)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] transition-colors hover:bg-[var(--sunken)]"
                  style={{ color: lang.code === current ? "var(--brand)" : "var(--ink-soft)" }}
                >
                  {lang.full}
                  {lang.code === current && <span className="text-[10px]">●</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div id="google_translate_host" aria-hidden="true">
        <div id="google_translate_element" />
      </div>
    </div>
  );
}

export default LanguageSwitcher;
