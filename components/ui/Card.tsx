import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ink-card relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardCorner() {
  // editorial little corner notch — like a folded ballot stub
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 h-7 w-7"
      style={{
        background:
          "linear-gradient(225deg, rgb(var(--surface-2)) 50%, transparent 50%)",
      }}
    />
  );
}
