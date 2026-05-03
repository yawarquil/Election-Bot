"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: "sm" | "md";
  iconLeft?: React.ReactNode;
}

// Morphing chip — hairline at rest, ink-fills when active. Used for prompts and filters.
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { active, size = "md", iconLeft, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "btn-press group relative inline-flex select-none items-center gap-1.5 rounded-full font-medium tracking-tightish",
        "border transition-colors",
        size === "sm" ? "h-7 px-3 text-[12px]" : "h-9 px-3.5 text-[13px]",
        active
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-ink border-[rgb(var(--hairline)_/_0.16)] hover:bg-[rgb(var(--hairline)_/_0.05)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-ember/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        className
      )}
      {...props}
    >
      {iconLeft && (
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">
          {iconLeft}
        </span>
      )}
      <span className="truncate">{children}</span>
    </button>
  );
});
