"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, description, disabled }: SwitchProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", disabled && "opacity-50")}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-ink" : "bg-[rgb(var(--hairline)_/_0.18)]",
          "outline-none focus-visible:ring-2 focus-visible:ring-ember/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          className={cn(
            "block h-4 w-4 rounded-full shadow-soft",
            checked ? "ml-[18px] bg-paper" : "ml-0.5 bg-paper dark:bg-surface-2"
          )}
        />
      </button>
      {(label || description) && (
        <span className="select-none">
          {label && <span className="text-[13px] font-medium text-ink">{label}</span>}
          {description && (
            <span className="block text-[12px] text-muted-fg">{description}</span>
          )}
        </span>
      )}
    </label>
  );
}
