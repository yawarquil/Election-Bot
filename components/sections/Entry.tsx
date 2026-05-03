"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft, Sparkles } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { assistantSuggestions } from "@/lib/data/assistant";
import { useStore } from "@/lib/store";
import { getRegion } from "@/lib/data/regions";
import { cn } from "@/lib/cn";

interface Props {
  onAsk: (q: string) => void;
  onNavigate: (id: string) => void;
}

// Editorial entry — not a generic SaaS hero. Number, eyebrow, serif display, prompt with submit affordance.
export function Entry({ onAsk, onNavigate }: Props) {
  const [q, setQ] = React.useState("");
  const regionId = useStore((s) => s.regionId);
  const region = getRegion(regionId);

  const submit = (text?: string) => {
    const value = (text ?? q).trim();
    if (!value) return;
    onAsk(value);
    setQ("");
  };

  return (
    <section
      id="entry"
      aria-labelledby="entry-h"
      className="relative scroll-mt-20 px-4 pt-10 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20"
    >
      {/* editorial markings */}
      <div className="flex items-center justify-between text-[11px] text-muted-fg">
        <div className="flex items-center gap-3">
          <span className="font-mono tabular-nums tracking-[0.18em]">/ 01</span>
          <span className="uppercase tracking-[0.18em]">Overview</span>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Badge tone="ember" dot>
            Civic guide · v1.0
          </Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* left: editorial heading */}
        <div className="lg:col-span-7">
          <motion.h1
            id="entry-h"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[44px] leading-[1.02] tracking-tighter2 text-ink sm:text-[58px] md:text-[68px]"
          >
            Understand elections,
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">step by step.</span>
              <span
                aria-hidden
                className="absolute inset-x-1 bottom-1 -z-0 h-[10px] bg-ember/25 sm:h-[14px]"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-fg sm:text-[16.5px]"
          >
            A calm, non-partisan companion that walks you through the timeline,
            paperwork and polling-day reality of voting — in plain language,
            without jargon.
          </motion.p>

          {/* Prompt input */}
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="mt-8 flex max-w-xl items-stretch overflow-hidden rounded-[14px] border border-[rgb(var(--hairline)_/_0.16)] bg-surface focus-within:border-[rgb(var(--hairline)_/_0.30)] focus-within:shadow-soft"
          >
            <span className="grid w-12 shrink-0 place-items-center text-muted-fg">
              <Sparkles size={15} />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={280}
              placeholder='Try: "How do I register?" or "What documents do I need?"'
              aria-label="What do you want to understand?"
              className={cn(
                "h-12 flex-1 bg-transparent pr-2 text-[14.5px] text-ink outline-none placeholder:text-muted-fg sm:h-14 sm:text-[15px]"
              )}
            />
            <button
              type="submit"
              aria-label="Ask"
              className={cn(
                "btn-press my-1.5 mr-1.5 inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-3 text-[12.5px] font-medium text-paper",
                "shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08),0_1px_0_rgb(0_0_0_/_0.06)]"
              )}
            >
              Ask
              <CornerDownLeft size={13} />
            </button>
          </motion.form>

          {/* Quick chips */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 flex max-w-xl flex-wrap gap-2"
          >
            {assistantSuggestions.slice(0, 6).map((s) => (
              <Chip
                key={s.id}
                size="sm"
                onClick={() => submit(s.prompt)}
                aria-label={s.prompt}
              >
                {s.prompt}
              </Chip>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex items-center gap-3 text-[12px] text-muted-fg"
          >
            <span className="font-mono tabular-nums">{region.flagEmoji}</span>
            <span>
              Currently tuned for <span className="text-ink">{region.country}</span>{" "}
              — change in the top bar.
            </span>
          </motion.div>
        </div>

        {/* right: editorial "ballot stub" feature card with shortcuts */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <BallotStubCard onNavigate={onNavigate} />
        </motion.aside>
      </div>
    </section>
  );
}

// The standout entry visual — a stylised "ballot stub" with pinhole edge and an editorial schedule
function BallotStubCard({ onNavigate }: { onNavigate: (id: string) => void }) {
  const items = [
    { tag: "01", label: "Eligibility check", caption: "Are you allowed to vote here?", id: "process" },
    { tag: "02", label: "Registration", caption: "Get your name on the roll.", id: "checklist" },
    { tag: "03", label: "Verification", caption: "Confirm your station & details.", id: "checklist" },
    { tag: "04", label: "Polling day", caption: "What to carry, what to expect.", id: "voting-day" },
  ];
  return (
    <div className="relative">
      {/* pinhole edge — subtle decorative dots like a perforation */}
      <div
        aria-hidden
        className="absolute -left-[7px] top-6 hidden h-[calc(100%-3rem)] w-[14px] flex-col items-center justify-around lg:flex"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-paper border border-[rgb(var(--hairline)_/_0.10)]"
          />
        ))}
      </div>
      <div className="ink-card relative overflow-hidden">
        <div className="flex items-start justify-between border-b border-dashed border-[rgb(var(--hairline)_/_0.16)] px-5 py-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-fg">
              Voter journey
            </div>
            <div className="display mt-1 text-[20px] tracking-tightish text-ink">
              Your four-stop guide
            </div>
          </div>
          <Badge tone="sage">Plain language</Badge>
        </div>
        <ol className="divide-y divide-dashed divide-[rgb(var(--hairline)_/_0.14)]">
          {items.map((it) => (
            <li key={it.tag}>
              <button
                onClick={() => onNavigate(it.id)}
                className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[rgb(var(--hairline)_/_0.04)]"
              >
                <span className="font-mono text-[11px] tabular-nums text-muted-fg">
                  {it.tag}
                </span>
                <span className="flex-1">
                  <span className="block text-[14px] font-medium tracking-tightish text-ink">
                    {it.label}
                  </span>
                  <span className="block text-[12.5px] text-muted-fg">{it.caption}</span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-muted-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                />
              </button>
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-2 border-t border-[rgb(var(--hairline)_/_0.10)] bg-surface-2/60 px-5 py-3">
          <div className="font-mono text-[10px] tabular-nums tracking-[0.16em] text-muted-fg">
            EST · 5 MIN READ
          </div>
          <div className="ml-auto" />
          <Button size="sm" variant="ink" onClick={() => onNavigate("timeline")}>
            See full timeline
          </Button>
        </div>
      </div>
    </div>
  );
}
