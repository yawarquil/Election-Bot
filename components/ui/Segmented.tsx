"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SegmentedProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
  ariaLabel?: string;
}

// Segmented control for explanation-depth toggle and similar.
// Slider uses layoutId animation for the "morphing" feel.
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  ariaLabel,
}: SegmentedProps<T>) {
  const id = React.useId();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex rounded-full border border-[rgb(var(--hairline)_/_0.10)] bg-surface p-1",
        size === "sm" ? "text-[12px]" : "text-[13px]"
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative z-10 select-none rounded-full font-medium tracking-tightish transition-colors",
              size === "sm" ? "h-7 px-3" : "h-8 px-3.5",
              active ? "text-paper" : "text-muted-fg hover:text-ink",
              "outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="absolute inset-0 -z-10 rounded-full bg-ink"
                aria-hidden
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
