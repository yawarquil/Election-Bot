"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, FileText, Printer, RotateCcw, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { scenarios } from "@/lib/data/scenarios";
import { checklistFor } from "@/lib/data/checklist";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Urgency } from "@/lib/types";

const urgencyTone: Record<Urgency, "warn" | "ember" | "neutral" | "sage"> = {
  now: "warn",
  soon: "ember",
  later: "neutral",
  info: "sage",
};
const urgencyLabel: Record<Urgency, string> = {
  now: "Do now",
  soon: "Do soon",
  later: "Later",
  info: "FYI",
};

export function ChecklistSection() {
  const scenario = useStore((s) => s.scenario);
  const setScenario = useStore((s) => s.setScenario);
  const completed = useStore((s) => s.completedChecklist);
  const toggle = useStore((s) => s.toggleChecklist);
  const reset = useStore((s) => s.resetChecklist);

  const items = React.useMemo(() => checklistFor(scenario), [scenario]);
  const done = items.filter((i) => completed.includes(i.id)).length;
  const pct = items.length === 0 ? 0 : Math.round((done / items.length) * 100);

  const next = items.find((i) => !completed.includes(i.id));

  const onPrint = () => window.print();

  return (
    <section
      id="checklist"
      aria-labelledby="cl-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <SectionHeader
        index="/ 04"
        eyebrow="Personalised checklist"
        title="A short, honest list of what's left"
        lede="Pick the scenario closest to where you are. We'll show only the steps that matter to you."
        trailing={
          <div className="hidden sm:flex items-center gap-2">
            <Button size="sm" variant="secondary" iconLeft={<Printer />} onClick={onPrint}>
              Print / Export
            </Button>
            <Button
              size="sm"
              variant="ghost"
              iconLeft={<RotateCcw />}
              onClick={reset}
              aria-label="Reset progress"
            >
              Reset
            </Button>
          </div>
        }
      />

      {/* scenario selector */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((s) => {
          const active = s.id === scenario;
          return (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={cn(
                "btn-press relative overflow-hidden rounded-[14px] border p-4 text-left transition-colors",
                active
                  ? "border-ember/50 bg-ember-soft/60"
                  : "border-[rgb(var(--hairline)_/_0.10)] bg-surface hover:border-[rgb(var(--hairline)_/_0.20)]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10.5px] tabular-nums tracking-[0.16em] text-muted-fg">
                  Scenario
                </span>
                {active && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ember text-paper">
                    <Check size={12} />
                  </span>
                )}
              </div>
              <div className="mt-2 text-[14.5px] font-semibold tracking-tightish text-ink">
                {s.title}
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-muted-fg">
                {s.blurb}
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress + Next-step suggestion */}
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="ink-card flex items-center gap-5 p-5 lg:col-span-7">
          <div className="relative h-14 w-14 shrink-0">
            <ProgressRing pct={pct} />
            <div className="absolute inset-0 grid place-items-center text-[13px] font-mono tabular-nums text-ink">
              {pct}%
            </div>
          </div>
          <div>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              Progress
            </div>
            <div className="mt-0.5 text-[15px] tracking-tightish text-ink">
              <span className="font-mono tabular-nums text-ink">{done}</span>{" "}
              <span className="text-muted-fg">of</span>{" "}
              <span className="font-mono tabular-nums text-ink">{items.length}</span>{" "}
              steps complete
            </div>
            <div className="mt-1 text-[12.5px] text-muted-fg">
              Saved on this device. No account needed.
            </div>
          </div>
        </div>
        <div className="ink-card flex items-start gap-3 p-5 lg:col-span-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember-soft text-ember">
            <AlertCircle size={16} />
          </div>
          <div className="flex-1">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              Suggested next
            </div>
            {next ? (
              <>
                <div className="mt-0.5 text-[14px] font-medium tracking-tightish text-ink">
                  {next.title}
                </div>
                <Button
                  className="mt-2"
                  size="sm"
                  variant="ink"
                  onClick={() => toggle(next.id)}
                >
                  Mark as done
                </Button>
              </>
            ) : (
              <div className="mt-1 text-[14px] font-medium text-ink">
                You're all set for this scenario.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checklist list */}
      <ol className="mt-6 space-y-2.5">
        <AnimatePresence initial={false}>
          {items.map((it, i) => {
            const isDone = completed.includes(it.id);
            return (
              <motion.li
                key={it.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className={cn(
                    "ink-card flex items-start gap-4 p-4",
                    isDone && "bg-surface-2/60"
                  )}
                >
                  <button
                    onClick={() => toggle(it.id)}
                    aria-pressed={isDone}
                    aria-label={isDone ? "Mark as not done" : "Mark as done"}
                    className={cn(
                      "btn-press mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors",
                      isDone
                        ? "border-ember bg-ember text-paper"
                        : "border-[rgb(var(--hairline)_/_0.20)] hover:border-[rgb(var(--hairline)_/_0.30)]"
                    )}
                  >
                    <AnimatePresence>
                      {isDone && (
                        <motion.span
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={13} strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10.5px] tabular-nums tracking-[0.16em] text-muted-fg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4
                        className={cn(
                          "text-[14.5px] font-semibold tracking-tightish",
                          isDone ? "text-muted-fg line-through" : "text-ink"
                        )}
                      >
                        {it.title}
                      </h4>
                      <Badge tone={urgencyTone[it.urgency]}>{urgencyLabel[it.urgency]}</Badge>
                    </div>
                    <p
                      className={cn(
                        "mt-1.5 text-[13.5px] leading-relaxed",
                        isDone ? "text-muted-fg" : "text-ink/85"
                      )}
                    >
                      {it.detail}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-muted-fg">
                      {it.estMinutes != null && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={12} /> {it.estMinutes} min
                        </span>
                      )}
                      {it.documents && (
                        <span className="inline-flex items-center gap-1.5">
                          <FileText size={12} /> {it.documents.join(" · ")}
                        </span>
                      )}
                      {it.caution && (
                        <span className="inline-flex items-center gap-1.5 text-[rgb(var(--warn))]">
                          <AlertCircle size={12} /> {it.caution}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
      <div className="mt-6 flex items-center gap-2 sm:hidden">
        <Button size="sm" variant="secondary" iconLeft={<Printer />} onClick={onPrint}>
          Print / Export
        </Button>
        <Button size="sm" variant="ghost" iconLeft={<RotateCcw />} onClick={reset}>
          Reset
        </Button>
      </div>
    </section>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden>
      <circle cx="28" cy="28" r={r} stroke="rgb(var(--hairline) / 0.12)" strokeWidth="3" fill="none" />
      <motion.circle
        cx="28"
        cy="28"
        r={r}
        stroke="rgb(var(--ember))"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: off }}
        transition={{ type: "spring", stiffness: 180, damping: 26 }}
        transform="rotate(-90 28 28)"
      />
    </svg>
  );
}
