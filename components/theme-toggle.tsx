"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`;

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage can be blocked — the toggle still works for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border transition-colors ${className ?? ""}`}
      style={{ borderColor: "var(--line)" }}
    >
      {ready && (
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ y: 14, opacity: 0, rotate: -35 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {dark ? (
            <Moon className="h-[15px] w-[15px]" strokeWidth={1.6} />
          ) : (
            <Sun className="h-[15px] w-[15px]" strokeWidth={1.6} />
          )}
        </motion.span>
      )}
    </button>
  );
}

export default ThemeToggle;
