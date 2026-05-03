"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "ink" | "ember";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean;
}

// Tactile, non-generic. No default gradients. Subtle inset highlight on primary,
// hairline borders on secondary, textured ghost. Press depth on active.
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      block,
      className,
      children,
      ...props
    },
    ref
  ) {
    const sizes: Record<Size, string> = {
      sm: "h-8 text-[13px] px-3 gap-1.5 rounded-[10px]",
      md: "h-10 text-sm px-4 gap-2 rounded-[12px]",
      lg: "h-12 text-[15px] px-5 gap-2 rounded-[14px]",
    };

    const variants: Record<Variant, string> = {
      // Primary "ember" — solid ember with a printed-ink inset highlight, subtle ring on hover
      primary: cn(
        "bg-ember text-white",
        "shadow-[inset_0_1px_0_rgb(255_255_255_/_0.18),0_1px_0_rgb(0_0_0_/_0.10)]",
        "hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.22),0_1px_0_rgb(0_0_0_/_0.12),0_0_0_4px_rgb(184_84_43_/_0.16)]",
        "active:shadow-[inset_0_1px_2px_rgb(0_0_0_/_0.18)]"
      ),
      // Ink — deep ink solid for the "I'll do this now" decisive secondary
      ink: cn(
        "bg-ink text-paper",
        "shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06),0_1px_0_rgb(0_0_0_/_0.06)]",
        "hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.10),0_1px_0_rgb(0_0_0_/_0.10),0_0_0_4px_rgb(14_15_18_/_0.12)]",
        "dark:hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.10),0_1px_0_rgb(0_0_0_/_0.10),0_0_0_4px_rgb(240_236_228_/_0.12)]"
      ),
      // Secondary — hairline-bordered, paper-surfaced
      secondary: cn(
        "bg-surface text-ink",
        "border border-[rgb(var(--hairline)_/_0.14)]",
        "hover:bg-surface-2 hover:border-[rgb(var(--hairline)_/_0.20)]"
      ),
      // Ghost — visible at rest (no invisible buttons), warms on hover
      ghost: cn(
        "bg-transparent text-ink",
        "hover:bg-[rgb(var(--hairline)_/_0.05)]"
      ),
      // Ember outline
      ember: cn(
        "bg-ember-soft text-ember",
        "border border-[rgb(var(--ember)_/_0.30)]",
        "hover:bg-[rgb(var(--ember)_/_0.16)] dark:hover:bg-[rgb(var(--ember)_/_0.22)]"
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          "btn-press relative inline-flex select-none items-center justify-center font-medium tracking-tightish",
          "disabled:pointer-events-none disabled:opacity-50",
          "outline-none focus-visible:ring-2 focus-visible:ring-ember/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          "dark:focus-visible:ring-offset-paper",
          sizes[size],
          variants[variant],
          block && "w-full",
          className
        )}
        {...props}
      >
        {iconLeft && (
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
            {iconLeft}
          </span>
        )}
        <span className="truncate">{children}</span>
        {iconRight && (
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);
