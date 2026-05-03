"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom";
  delay?: number;
}

// Lightweight tooltip — no portal needed for inline use.
export function Tooltip({ content, children, side = "top", delay = 200 }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const t = React.useRef<number | null>(null);
  const id = React.useId();
  const tooltipId = `tt-${id}`;

  const show = () => {
    t.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (t.current) window.clearTimeout(t.current);
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(children, {
        "aria-describedby": open ? tooltipId : undefined,
      })}
      <AnimatePresence>
        {open && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[12px] font-medium",
              "bg-ink text-paper border-ink shadow-lift",
              side === "top" ? "bottom-full mb-2" : "top-full mt-2"
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
