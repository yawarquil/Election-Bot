"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { navItems } from "./SideNav";

interface Props {
  active: string;
  onNavigate: (id: string) => void;
}

// Compact bottom nav for mobile.
export function MobileNav({ active, onNavigate }: Props) {
  // Show 5 most-used on mobile
  const items = navItems.filter((i) =>
    ["entry", "timeline", "checklist", "voting-day", "assistant"].includes(i.id)
  );

  return (
    <nav
      aria-label="Mobile primary"
      className={cn(
        "fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-1 rounded-full",
        "border border-[rgb(var(--hairline)_/_0.14)] bg-paper/90 px-1.5 py-1.5 shadow-lift",
        "backdrop-blur-md supports-[backdrop-filter]:bg-paper/70 lg:hidden"
      )}
    >
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => onNavigate(it.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={it.label}
            className={cn(
              "relative flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1",
              "text-[10.5px] font-medium tracking-tightish transition-colors",
              isActive ? "text-ink" : "text-muted-fg"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="mob-pill"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="absolute inset-0 -z-10 rounded-full bg-[rgb(var(--hairline)_/_0.07)]"
                aria-hidden
              />
            )}
            <Icon size={17} strokeWidth={1.6} className={isActive ? "text-ember" : ""} />
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
