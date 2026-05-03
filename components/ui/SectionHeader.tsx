import * as React from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  index?: string;
  align?: "start" | "center";
  trailing?: React.ReactNode;
  className?: string;
}

// Editorial section headers — number, eyebrow, display title, lede
export function SectionHeader({
  eyebrow,
  title,
  lede,
  index,
  align = "start",
  trailing,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          {index && (
            <span className="font-mono text-[11px] tabular-nums tracking-[0.18em] text-muted-fg">
              {index}
            </span>
          )}
          {eyebrow && (
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-fg">
              {eyebrow}
            </span>
          )}
        </div>
        <h2 className="display mt-2 text-[28px] leading-[1.05] tracking-tighter2 text-ink sm:text-[34px] md:text-[40px]">
          {title}
        </h2>
        {lede && (
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted-fg sm:text-[15px]">
            {lede}
          </p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </header>
  );
}
