"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TARGET_TEXT = "Training &\nApprenticeship";

export function AiHeadlineTrack({
  defaultText = TARGET_TEXT,
}: {
  defaultText?: string;
}) {
  const reduce = useReducedMotion();
  const [displayText, setDisplayText] = useState(defaultText);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Smooth AI stream on initial mount or re-trigger
  useEffect(() => {
    if (!mounted || reduce) return;

    clearTimer();

    // Stream character by character
    if (displayText.length < TARGET_TEXT.length) {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setDisplayText(TARGET_TEXT.slice(0, displayText.length + 1));
      }, 34);
      return clearTimer;
    }

    setIsTyping(false);
  }, [displayText, mounted, reduce, clearTimer]);

  return (
    <em
      className="relative not-italic inline-block whitespace-pre-line cursor-default"
      style={{
        fontStyle: "italic",
        fontWeight: 400,
        color: "var(--brand)",
      }}
      onClick={() => {
        // Quick trigger re-stream on click
        clearTimer();
        setDisplayText("");
      }}
      title="360.AI Track"
    >
      {displayText || "\u00A0"}
      {/* Blinking emerald AI stream cursor */}
      <span
        className={`inline-block w-[2.5px] ml-1 h-[0.82em] translate-y-[2px] bg-[var(--brand)] align-baseline ${
          isTyping ? "opacity-100" : "animate-pulse"
        }`}
        aria-hidden="true"
      />
    </em>
  );
}

export default AiHeadlineTrack;
