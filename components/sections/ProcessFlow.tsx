"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/lib/data/process";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Props {
  onNavigate: (id: string) => void;
}

export function ProcessFlow({ onNavigate }: Props) {
  const [active, setActive] = React.useState<string | null>(null);
  const activeStep = processSteps.find((s) => s.id === active);

  return (
    <section id="process" aria-labelledby="proc-h" className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
      <SectionHeader
        index="/ 02"
        eyebrow="Process flow"
        title={
          <>
            From <em className="not-italic font-normal italic">curiosity</em> to <em className="not-italic font-normal italic">cast ballot</em>
          </>
        }
        lede="Six steps. Tap one to see what it actually looks like in practice."
      />

      {/* horizontal flow on desktop, vertical on mobile */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {processSteps.map((s, i) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(isActive ? null : s.id)}
              className={cn(
                "btn-press group relative flex flex-col items-stretch overflow-hidden rounded-[14px] border text-left transition-colors",
                isActive
                  ? "border-ember/40 bg-ember-soft/50"
                  : "border-[rgb(var(--hairline)_/_0.10)] bg-surface hover:border-[rgb(var(--hairline)_/_0.20)]",
                "outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
              )}
              aria-expanded={isActive}
            >
              <div className="flex items-center justify-between border-b border-dashed border-[rgb(var(--hairline)_/_0.14)] px-3.5 py-2.5">
                <span className="font-mono text-[10.5px] tabular-nums tracking-[0.18em] text-muted-fg">
                  {String(i + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}
                </span>
                <ArrowRight
                  size={13}
                  className={cn(
                    "text-muted-fg transition-transform",
                    isActive && "rotate-90 text-ember"
                  )}
                />
              </div>
              <div className="px-3.5 py-3.5">
                <Glyph kind={s.glyph} className={isActive ? "text-ember" : "text-ink"} />
                <div className="mt-3 text-[14px] font-semibold tracking-tightish text-ink">
                  {s.label}
                </div>
                <div className="mt-1 text-[12.5px] text-muted-fg">{s.caption}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail revealer */}
      <AnimatePresence initial={false}>
        {activeStep && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 overflow-hidden"
          >
            <div className="ink-card flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-8 sm:p-6">
              <div className="sm:max-w-md">
                <div className="flex items-center gap-2">
                  <Badge tone="ember">Step {processSteps.findIndex((s) => s.id === activeStep.id) + 1}</Badge>
                  <Badge tone="neutral">{activeStep.who}</Badge>
                </div>
                <h3 className="display mt-3 text-[26px] leading-tight tracking-tighter2 text-ink">
                  {activeStep.label}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">
                  {activeStep.detail}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="ink" onClick={() => onNavigate("timeline")}>
                    Open in timeline
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => onNavigate("checklist")}>
                    Add to checklist
                  </Button>
                  <button
                    onClick={() => setActive(null)}
                    className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
                  >
                    Close <X size={12} />
                  </button>
                </div>
              </div>
              <div className="hidden flex-1 sm:block">
                <ProcessIllustration kind={activeStep.glyph} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Editorial line-art glyphs per step. Custom SVGs, no stock icons.
function Glyph({ kind, className }: { kind: string; className?: string }) {
  const common = {
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (kind) {
    case "before":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="9" width="28" height="22" rx="3" stroke="currentColor" />
          <path d="M6 15h28" stroke="currentColor" />
          <path d="M13 6v4M27 6v4" stroke="currentColor" />
          <circle cx="20" cy="22" r="2.4" stroke="currentColor" />
        </svg>
      );
    case "register":
      return (
        <svg {...common} aria-hidden>
          <rect x="8" y="6" width="20" height="28" rx="2" stroke="currentColor" />
          <circle cx="18" cy="15" r="3" stroke="currentColor" />
          <path d="M12 23h12M12 27h8" stroke="currentColor" />
          <path d="M30 26l3 3M28 30l5-5" stroke="currentColor" />
        </svg>
      );
    case "verify":
      return (
        <svg {...common} aria-hidden>
          <path d="M20 5l13 4v9c0 9-6 14-13 17C13 32 7 27 7 18V9l13-4z" stroke="currentColor" />
          <path d="M14 19l4 4 8-8" stroke="currentColor" />
        </svg>
      );
    case "vote":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="14" width="28" height="20" rx="2" stroke="currentColor" />
          <path d="M14 14l4-8h8l-4 8" stroke="currentColor" />
          <path d="M16 24h12" stroke="currentColor" />
        </svg>
      );
    case "count":
      return (
        <svg {...common} aria-hidden>
          <path d="M8 32V20M16 32V14M24 32V8M32 32V18" stroke="currentColor" />
          <path d="M5 32h30" stroke="currentColor" />
        </svg>
      );
    case "outcome":
      return (
        <svg {...common} aria-hidden>
          <path d="M14 32V18l-6 4 12-14 12 14-6-4v14z" stroke="currentColor" />
          <path d="M16 32h8" stroke="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function ProcessIllustration({ kind }: { kind: string }) {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-[12px] border border-dashed border-[rgb(var(--hairline)_/_0.14)] bg-surface-2/40">
      <svg viewBox="0 0 600 200" className="h-full w-full" aria-hidden>
        {/* faint grid lines like ledger paper */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={(i + 1) * 25}
            x2="600"
            y2={(i + 1) * 25}
            stroke="rgb(var(--hairline) / 0.06)"
          />
        ))}
        {/* scene varies by kind */}
        {kind === "vote" && (
          <g>
            <rect x="60" y="50" width="220" height="120" rx="6" fill="rgb(var(--surface))" stroke="rgb(var(--hairline) / 0.14)" />
            <path d="M120 95 l24 24 l60 -60" stroke="rgb(var(--ember))" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="320" y="80" width="180" height="60" rx="3" fill="rgb(var(--surface-2))" stroke="rgb(var(--hairline) / 0.12)" />
            <text x="335" y="115" fontFamily="serif" fontSize="22" fill="rgb(var(--ink))">VOTE CAST</text>
          </g>
        )}
        {kind === "count" && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={80 + i * 120} y={170 - 22 - i * 18} width="60" height={22 + i * 18} fill="rgb(var(--ember-soft))" stroke="rgb(var(--ember) / 0.4)" />
            ))}
          </g>
        )}
        {kind === "register" && (
          <g>
            <rect x="120" y="40" width="240" height="120" rx="6" fill="rgb(var(--surface))" stroke="rgb(var(--hairline) / 0.14)" />
            <line x1="150" y1="80" x2="330" y2="80" stroke="rgb(var(--hairline) / 0.16)" />
            <line x1="150" y1="105" x2="280" y2="105" stroke="rgb(var(--hairline) / 0.16)" />
            <line x1="150" y1="130" x2="320" y2="130" stroke="rgb(var(--hairline) / 0.16)" />
            <rect x="370" y="100" width="80" height="34" rx="6" fill="rgb(var(--ink))" />
            <text x="386" y="123" fontFamily="sans-serif" fontSize="13" fill="rgb(var(--paper))">SUBMIT</text>
          </g>
        )}
        {kind === "verify" && (
          <g>
            <circle cx="300" cy="100" r="48" fill="rgb(var(--ember-soft))" stroke="rgb(var(--ember) / 0.4)" />
            <path d="M278 100 l16 16 l32 -32" stroke="rgb(var(--ember))" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {kind === "before" && (
          <g>
            <rect x="120" y="40" width="360" height="120" rx="6" fill="rgb(var(--surface))" stroke="rgb(var(--hairline) / 0.14)" />
            <line x1="120" y1="72" x2="480" y2="72" stroke="rgb(var(--hairline) / 0.16)" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1={120 + i * 60} y1="40" x2={120 + i * 60} y2="160" stroke="rgb(var(--hairline) / 0.06)" />
            ))}
            <circle cx="200" cy="110" r="6" fill="rgb(var(--ember))" />
          </g>
        )}
        {kind === "outcome" && (
          <g>
            <rect x="240" y="60" width="120" height="120" fill="rgb(var(--surface))" stroke="rgb(var(--hairline) / 0.14)" />
            <path d="M260 130 l40 -50 l40 50" fill="rgb(var(--ember-soft))" stroke="rgb(var(--ember) / 0.5)" />
          </g>
        )}
      </svg>
    </div>
  );
}
