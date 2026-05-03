"use client";

import * as React from "react";
import {
  Compass,
  GitBranch,
  ListChecks,
  CalendarClock,
  Vote,
  HelpCircle,
  BookOpen,
  Sparkles,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/cn";

export const navItems = [
  { id: "entry", label: "Overview", icon: Compass, hint: "Start here" },
  { id: "process", label: "Process", icon: GitBranch, hint: "How it works" },
  { id: "timeline", label: "Timeline", icon: CalendarClock, hint: "Election phases" },
  { id: "checklist", label: "Checklist", icon: ListChecks, hint: "Your next steps" },
  { id: "voting-day", label: "Voting Day", icon: Vote, hint: "On the day itself" },
  { id: "faq", label: "Q & Myths", icon: HelpCircle, hint: "Common confusion" },
  { id: "glossary", label: "Glossary", icon: BookOpen, hint: "Civic terms" },
  { id: "assistant", label: "Assistant", icon: Sparkles, hint: "Ask anything" },
] as const;

interface Props {
  active: string;
  onNavigate: (id: string) => void;
}

export function SideNav({ active, onNavigate }: Props) {
  return (
    <aside
      className="hidden lg:flex sticky top-14 h-[calc(100vh-3.5rem)] w-[232px] shrink-0 flex-col border-r border-[rgb(var(--hairline)_/_0.10)] bg-paper paper-grain"
      aria-label="Primary"
    >
      {/* logo / mark */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Mark />
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-tightish text-ink">
            Election Guide
          </div>
          <div className="text-[11px] text-muted-fg">a civic companion</div>
        </div>
      </div>

      <nav className="px-3">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <button
                  onClick={() => onNavigate(it.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left",
                    "text-[13.5px] font-medium tracking-tightish transition-colors",
                    isActive
                      ? "text-ink"
                      : "text-muted-fg hover:text-ink hover:bg-[rgb(var(--hairline)_/_0.04)]",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
                  )}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-ember"
                    />
                  )}
                  <Icon
                    size={17}
                    strokeWidth={1.6}
                    className={cn(
                      isActive ? "text-ember" : "text-muted-fg group-hover:text-ink"
                    )}
                  />
                  <span className="flex-1 truncate">{it.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto px-5 py-5">
        <div className="ink-card-2 px-3 py-2.5">
          <div className="flex items-start gap-2.5">
            <ScrollText size={14} className="mt-0.5 shrink-0 text-muted-fg" />
            <p className="text-[11.5px] leading-snug text-muted-fg">
              Always cross-check official deadlines with your election authority before acting.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Small editorial mark — a stamped square with a notched corner
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="relative grid place-items-center rounded-[7px] bg-ink text-paper"
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M5 12.5l4 4 10-10"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        aria-hidden
        className="absolute -right-[3px] -top-[3px] block h-2 w-2 rounded-[2px] bg-ember"
      />
    </span>
  );
}
