"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: typeof LANGUAGES[0]) => {
    setSelected(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] font-medium transition-colors hover:bg-[var(--sunken)] hover:text-[var(--brand)] cursor-pointer"
        style={{
          borderColor: "var(--line)",
          color: "var(--ink-soft)",
          background: "transparent",
        }}
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.7} />
        <span className="hidden sm:inline">Select Language</span>
        <span className="sm:hidden font-mono text-[11px]">{selected.code.toUpperCase()}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={1.8}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-1.5 z-50 w-44 rounded-xl border p-1.5 shadow-xl backdrop-blur-md"
            style={{
              background: "var(--surface)",
              borderColor: "var(--line)",
            }}
          >
            <div className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Supported Languages
            </div>
            {LANGUAGES.map((lang) => {
              const isCurrent = lang.code === selected.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12.5px] transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-[var(--sunken)] font-semibold text-[var(--brand)]"
                      : "text-[var(--ink)] hover:bg-[var(--sunken)] hover:text-[var(--brand)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.native}</span>
                    <span className="text-[10px] opacity-60">({lang.label})</span>
                  </div>
                  {isCurrent && <Check className="h-3.5 w-3.5 text-[var(--brand)]" strokeWidth={2.2} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
