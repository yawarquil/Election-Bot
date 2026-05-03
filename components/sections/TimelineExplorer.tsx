"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Users,
  ListChecks,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { timelinePhases } from "@/lib/data/timeline";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Props {
  onAsk: (q: string) => void;
}

export function TimelineExplorer({ onAsk }: Props) {
  const [idx, setIdx] = React.useState(0);
  const phase = timelinePhases[idx];
  const total = timelinePhases.length;
  const progress = idx / (total - 1);

  // keyboard support: arrow left/right
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setIdx((i) => Math.min(i + 1, total - 1));
    if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
  };

  return (
    <section
      id="timeline"
      aria-labelledby="tl-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <SectionHeader
        index="/ 03"
        eyebrow="Election timeline"
        title="The seven phases of an election"
        lede="Drag, click, or use ←/→. Each phase opens what it means, who's involved, what you should do, and what trips people up."
        trailing={
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<ChevronLeft />}
              onClick={() => setIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
            >
              Prev
            </Button>
            <Button
              variant="ink"
              size="sm"
              iconRight={<ChevronRight />}
              onClick={() => setIdx(Math.min(total - 1, idx + 1))}
              disabled={idx === total - 1}
            >
              Next
            </Button>
          </div>
        }
      />

      {/* Scrubber rail */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Election phase"
        aria-valuemin={0}
        aria-valuemax={total - 1}
        aria-valuenow={idx}
        aria-valuetext={phase.label}
        onKeyDown={onKey}
        className="mt-10 select-none outline-none focus-visible:[&_.rail]:ring-2 focus-visible:[&_.rail]:ring-ember/60"
      >
        {/* phase ticks + labels */}
        <div className="relative">
          <div className="rail relative h-[3px] w-full rounded-full bg-[rgb(var(--hairline)_/_0.10)]">
            {/* progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-ember"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
            />
            {/* nodes */}
            {timelinePhases.map((p, i) => {
              const left = (i / (total - 1)) * 100;
              const past = i <= idx;
              return (
                <button
                  key={p.key}
                  onClick={() => setIdx(i)}
                  aria-label={p.label}
                  className={cn(
                    "absolute top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "h-6 w-6 grid place-items-center rounded-full",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
                  )}
                  style={{ left: `${left}%` }}
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      past
                        ? "bg-ember scale-100"
                        : "bg-surface border border-[rgb(var(--hairline)_/_0.18)] scale-90 hover:scale-100"
                    )}
                  />
                  {i === idx && (
                    <motion.span
                      layoutId="phase-halo"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full ring-4 ring-ember/20"
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* labels */}
          <div className="mt-3 hidden grid-cols-7 gap-1 sm:grid">
            {timelinePhases.map((p, i) => (
              <button
                key={p.key}
                onClick={() => setIdx(i)}
                className={cn(
                  "text-[11px] tracking-tightish text-left transition-colors",
                  i === idx ? "text-ink" : "text-muted-fg hover:text-ink"
                )}
              >
                <div className="font-mono tabular-nums text-[10px] uppercase tracking-[0.16em] text-muted-fg">
                  Phase {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-0.5 font-medium">{p.shortLabel}</div>
              </button>
            ))}
          </div>
          {/* mobile current label */}
          <div className="mt-3 sm:hidden">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg">
              Phase {String(idx + 1).padStart(2, "0")} / {total}
            </div>
            <div className="mt-0.5 text-[13px] font-medium text-ink">{phase.shortLabel}</div>
          </div>
        </div>
      </div>

      {/* Phase detail card — editorial layout */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.article
            key={phase.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:grid-cols-12 lg:gap-10"
          >
            {/* left column: editorial heading */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                <Badge tone="ember">Phase {idx + 1}</Badge>
                <Badge tone="neutral">{phase.durationLabel}</Badge>
              </div>
              <h3 className="display mt-4 text-[34px] leading-[1.04] tracking-tighter2 text-ink sm:text-[40px]">
                {phase.label}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">
                {phase.summary}
              </p>
              <div className="ink-card-2 mt-5 p-4">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
                  What this stage means
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink">
                  {phase.meaning}
                </p>
              </div>

              {/* checkpoints */}
              <div className="mt-5">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
                  Checkpoints
                </div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {phase.checkpoints.map((c) => (
                    <li key={c.label}>
                      <Badge tone={c.tone === "info" ? "neutral" : c.tone === "warn" ? "warn" : "ok"} dot>
                        {c.label}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* right column: actions, who, mistakes, tips */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-7 sm:grid-cols-2">
              <PhaseBlock
                icon={<ListChecks size={14} />}
                tone="ember"
                title="What citizens should do"
                items={phase.citizenActions}
              />
              <PhaseBlock
                icon={<Users size={14} />}
                tone="neutral"
                title="Who is involved"
                items={phase.whoIsInvolved}
              />
              <PhaseBlock
                icon={<AlertTriangle size={14} />}
                tone="warn"
                title="Common mistakes"
                items={phase.commonMistakes}
              />
              <PhaseBlock
                icon={<Lightbulb size={14} />}
                tone="sage"
                title="Helpful tips"
                items={phase.tips}
              />
            </div>

            <div className="lg:col-span-12 flex flex-wrap items-center gap-2 border-t border-[rgb(var(--hairline)_/_0.10)] pt-4">
              <Info size={14} className="text-muted-fg" />
              <span className="text-[12.5px] text-muted-fg">
                Want this stage explained simply?
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  onAsk(`Explain ${phase.label.toLowerCase()} like I'm a first-time voter`)
                }
              >
                Ask the assistant
              </Button>
              <div className="ml-auto sm:hidden flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  iconLeft={<ChevronLeft />}
                  onClick={() => setIdx(Math.max(0, idx - 1))}
                  disabled={idx === 0}
                >
                  Prev
                </Button>
                <Button
                  variant="ink"
                  size="sm"
                  iconRight={<ChevronRight />}
                  onClick={() => setIdx(Math.min(total - 1, idx + 1))}
                  disabled={idx === total - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PhaseBlock({
  icon,
  tone,
  title,
  items,
}: {
  icon: React.ReactNode;
  tone: "ember" | "neutral" | "warn" | "sage";
  title: string;
  items: string[];
}) {
  return (
    <div className="ink-card flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <Badge tone={tone}>
          <span className="inline-flex items-center gap-1">
            {icon}
            <span>{title}</span>
          </span>
        </Badge>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-[13.5px] leading-snug text-ink">
            <span
              aria-hidden
              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-fg"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
