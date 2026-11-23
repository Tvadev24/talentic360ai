"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, X } from "lucide-react";
import { useEffect } from "react";

export type ToastState = {
  title: string;
  body?: string;
  tone?: "success" | "error";
} | null;

export function Toast({
  toast,
  onClose,
  duration = 5000,
}: {
  toast: ToastState;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [toast, onClose, duration]);

  const error = toast?.tone === "error";

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[90] w-[min(26rem,calc(100vw-2rem))] -translate-x-1/2 border p-4 sm:left-auto sm:right-6 sm:translate-x-0"
          style={{
            background: "var(--surface)",
            borderColor: error ? "#b4432b" : "var(--brand)",
            borderLeftWidth: 3,
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
              style={{ background: error ? "#b4432b" : "var(--brand)" }}
            >
              {error ? (
                <AlertTriangle className="h-3 w-3 text-white" strokeWidth={2.2} />
              ) : (
                <Check className="h-3 w-3" strokeWidth={3} style={{ color: "var(--brand-contrast)" }} />
              )}
            </span>
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>
                {toast.title}
              </p>
              {toast.body && (
                <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {toast.body}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss"
              className="shrink-0 p-0.5"
              style={{ color: "var(--ink-muted)" }}
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
