import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "info" | "warn" | "ok" | "danger" | "ember" | "sage";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

// Status badges — small caps, refined, with an optional pulsing dot for live items.
export function Badge({ tone = "neutral", dot, className, children, ...props }: BadgeProps) {
  const tones: Record<Tone, string> = {
    neutral:
      "bg-[rgb(var(--hairline)_/_0.06)] text-muted-fg border-[rgb(var(--hairline)_/_0.10)]",
    info: "bg-[rgb(var(--hairline)_/_0.06)] text-ink border-[rgb(var(--hairline)_/_0.12)]",
    warn: "bg-[rgb(var(--warn)_/_0.10)] text-[rgb(var(--warn))] border-[rgb(var(--warn)_/_0.22)]",
    ok: "bg-[rgb(var(--ok)_/_0.10)] text-[rgb(var(--ok))] border-[rgb(var(--ok)_/_0.22)]",
    danger:
      "bg-[rgb(var(--danger)_/_0.10)] text-[rgb(var(--danger))] border-[rgb(var(--danger)_/_0.22)]",
    ember:
      "bg-ember-soft text-ember border-[rgb(var(--ember)_/_0.22)]",
    sage:
      "bg-sage-soft text-[rgb(var(--sage))] border-[rgb(var(--sage)_/_0.24)]",
  };

  const dotTones: Record<Tone, string> = {
    neutral: "bg-muted-fg",
    info: "bg-ink",
    warn: "bg-[rgb(var(--warn))]",
    ok: "bg-[rgb(var(--ok))]",
    danger: "bg-[rgb(var(--danger))]",
    ember: "bg-ember",
    sage: "bg-[rgb(var(--sage))]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em]",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            dotTones[tone]
          )}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full opacity-60 animate-ink-pulse",
              dotTones[tone]
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
