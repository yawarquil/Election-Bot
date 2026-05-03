"use client";

import * as React from "react";
import { Command, Settings, Globe2, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { getRegion } from "@/lib/data/regions";
import { Mark } from "./SideNav";

interface Props {
  onCommand: () => void;
  onRegion: () => void;
  onSettings: () => void;
}

export function TopBar({ onCommand, onRegion, onSettings }: Props) {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);
  const regionId = useStore((s) => s.regionId);
  const region = getRegion(regionId);

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-[rgb(var(--hairline)_/_0.10)]",
        "bg-paper/80 backdrop-blur-md supports-[backdrop-filter]:bg-paper/65 paper-grain",
        "px-4 sm:px-6"
      )}
    >
      {/* mobile mark */}
      <div className="flex items-center gap-2 lg:hidden">
        <Mark size={26} />
        <span className="text-[13.5px] font-semibold tracking-tightish text-ink">
          Election Guide
        </span>
      </div>

      {/* command bar trigger — looks like a search input but opens palette */}
      <button
        onClick={onCommand}
        className={cn(
          "ml-auto hidden h-9 min-w-[280px] items-center gap-2 rounded-full border px-3 text-left text-[13px] sm:inline-flex",
          "border-[rgb(var(--hairline)_/_0.14)] bg-surface/80 text-muted-fg",
          "hover:border-[rgb(var(--hairline)_/_0.22)] hover:text-ink transition-colors",
          "outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
        )}
      >
        <Command size={14} className="shrink-0" />
        <span className="truncate">Ask or jump to anything</span>
        <kbd className="ml-auto hidden items-center gap-0.5 rounded-md border border-[rgb(var(--hairline)_/_0.16)] bg-paper px-1.5 py-0.5 font-mono text-[10px] text-muted-fg sm:inline-flex">
          ⌘ K
        </kbd>
      </button>

      <button
        onClick={onCommand}
        aria-label="Open command bar"
        className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink sm:hidden"
      >
        <Command size={16} />
      </button>

      <div className="flex items-center gap-1">
        <button
          onClick={onRegion}
          title="Region"
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-full border px-2.5 text-[12.5px] font-medium",
            "border-[rgb(var(--hairline)_/_0.14)] bg-surface text-ink hover:border-[rgb(var(--hairline)_/_0.22)]"
          )}
        >
          <span aria-hidden className="text-[14px]">{region.flagEmoji}</span>
          <span className="hidden sm:inline tracking-tightish">{region.country}</span>
          <Globe2 size={13} className="text-muted-fg sm:ml-0.5" />
        </button>

        <button
          onClick={cycleTheme}
          aria-label={`Theme: ${theme}`}
          title={`Theme: ${theme}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
        >
          {theme === "dark" ? (
            <Moon size={15} />
          ) : theme === "light" ? (
            <Sun size={15} />
          ) : (
            <span className="relative inline-flex">
              <Sun size={15} />
              <Moon
                size={9}
                className="absolute -bottom-0.5 -right-0.5"
                strokeWidth={2.2}
              />
            </span>
          )}
        </button>

        <button
          onClick={onSettings}
          aria-label="Settings"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
        >
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
}
