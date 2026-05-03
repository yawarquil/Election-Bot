"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Sparkles, ChevronRight, Trash2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Segmented } from "@/components/ui/Segmented";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { useStore } from "@/lib/store";
import { answerFor, assistantSuggestions } from "@/lib/data/assistant";
import { getRegion } from "@/lib/data/regions";
import type { Depth } from "@/lib/types";
import { cn } from "@/lib/cn";

interface Turn {
  id: string;
  role: "user" | "assistant";
  text: string;
  notFound?: boolean;
  next?: string[];
}

interface Props {
  // controlled history shared with right-panel via parent
  turns: Turn[];
  setTurns: React.Dispatch<React.SetStateAction<Turn[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  /** lift submission so other surfaces can drive it */
  onSubmit: (q: string) => void;
}

export function AssistantSection({ turns, setTurns, loading, onSubmit }: Props) {
  const [q, setQ] = React.useState("");
  const depth = useStore((s) => s.depth);
  const setDepth = useStore((s) => s.setDepth);
  const region = getRegion(useStore((s) => s.regionId));

  const submit = (text?: string) => {
    const value = (text ?? q).trim();
    if (!value) return;
    onSubmit(value);
    setQ("");
  };

  const clear = () => setTurns([]);

  return (
    <section
      id="assistant"
      aria-labelledby="as-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <SectionHeader
        index="/ 08"
        eyebrow="Assistant"
        title="Ask anything. Switch how it's explained."
        lede="A non-partisan companion that simplifies legal language and points you to the official authority."
        trailing={
          <div className="flex items-center gap-2">
            <Segmented<Depth>
              ariaLabel="Explanation depth"
              size="sm"
              options={[
                { value: "quick", label: "Quick" },
                { value: "beginner", label: "Beginner" },
                { value: "student", label: "Student" },
                { value: "detailed", label: "Detailed" },
              ]}
              value={depth}
              onChange={setDepth}
            />
          </div>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* conversation */}
        <div className="lg:col-span-8">
          <div className="ink-card flex h-full flex-col overflow-hidden">
            <header className="flex items-center justify-between border-b border-[rgb(var(--hairline)_/_0.10)] px-4 py-3">
              <div className="flex items-center gap-2 text-[12px] text-muted-fg">
                <Sparkles size={13} className="text-ember" />
                Tuned for{" "}
                <span className="text-ink">{region.country}</span>
                <span className="text-muted-fg/60">·</span>
                <span className="capitalize">{depth} mode</span>
              </div>
              {turns.length > 0 && (
                <button
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
                  aria-label="Clear conversation"
                >
                  <Trash2 size={12} /> Clear
                </button>
              )}
            </header>

            <div className="min-h-[320px] flex-1 space-y-4 px-4 py-4 sm:px-6 sm:py-5">
              {turns.length === 0 && <AssistantEmpty onSuggest={submit} />}
              <AnimatePresence initial={false}>
                {turns.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={cn(
                      "flex gap-3",
                      t.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {t.role === "assistant" && (
                      <span
                        aria-hidden
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ember-soft text-ember"
                      >
                        <Sparkles size={13} />
                      </span>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-[14px] px-3.5 py-2.5 text-[14px] leading-relaxed",
                        t.role === "user"
                          ? "bg-ink text-paper"
                          : "border border-[rgb(var(--hairline)_/_0.10)] bg-surface text-ink"
                      )}
                    >
                      {t.text}
                      {t.notFound && t.role === "assistant" && (
                        <div className="mt-2 text-[12px] text-muted-fg">
                          Try one of the suggested prompts below — or rephrase your question.
                        </div>
                      )}
                      {t.next && t.next.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {t.next.map((n) => (
                            <button
                              key={n}
                              onClick={() => submit(n)}
                              className="inline-flex items-center gap-1 rounded-full border border-[rgb(var(--hairline)_/_0.14)] bg-paper/60 px-2 py-0.5 text-[11.5px] text-ink hover:border-[rgb(var(--hairline)_/_0.22)]"
                            >
                              <ChevronRight size={11} className="text-ember" />
                              {n}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {loading && <Typing />}
            </div>

            {/* composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex items-end gap-2 border-t border-[rgb(var(--hairline)_/_0.10)] bg-surface-2/40 p-3"
            >
              <textarea
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                rows={1}
                placeholder="Type your question. Press Enter to ask, Shift+Enter for a new line."
                className={cn(
                  "min-h-[40px] flex-1 resize-none rounded-[10px] border border-transparent bg-paper px-3 py-2 text-[14px] text-ink outline-none",
                  "focus:border-[rgb(var(--hairline)_/_0.20)]"
                )}
              />
              <Button type="submit" variant="ink" size="md" iconRight={<CornerDownLeft />}>
                Ask
              </Button>
            </form>
          </div>
        </div>

        {/* side: suggestions, trust */}
        <div className="space-y-5 lg:col-span-4">
          <div className="ink-card p-5">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              Suggested questions
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {assistantSuggestions.map((s) => (
                <Chip key={s.id} size="sm" onClick={() => submit(s.prompt)}>
                  {s.prompt}
                </Chip>
              ))}
            </div>
          </div>
          <div className="ink-card p-5">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              How this assistant works
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-muted-fg">
              <li className="flex gap-2"><Badge tone="sage">Neutral</Badge> Non-partisan, plain language.</li>
              <li className="flex gap-2"><Badge tone="ember">Source-aware</Badge> Tagged as explainer, checklist, or definition.</li>
              <li className="flex gap-2"><Badge tone="warn">Verify</Badge> Always cross-check against the official authority.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssistantEmpty({ onSuggest }: { onSuggest: (q: string) => void }) {
  return (
    <div className="grid place-items-center px-6 py-10 text-center">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-ember-soft text-ember">
        <Sparkles size={16} />
      </div>
      <h4 className="display mt-3 text-[22px] tracking-tightish text-ink">
        Ask in your own words
      </h4>
      <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-muted-fg">
        Try a question, or pick one of the prompts on the right. You can switch
        the explanation depth at any time without losing your place.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {assistantSuggestions.slice(0, 3).map((s) => (
          <Chip key={s.id} size="sm" onClick={() => onSuggest(s.prompt)}>
            {s.prompt}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ember-soft text-ember">
        <Sparkles size={13} />
      </span>
      <div className="flex items-center gap-1 rounded-[14px] border border-[rgb(var(--hairline)_/_0.10)] bg-surface px-3 py-2">
        <Dot delay={0} />
        <Dot delay={0.15} />
        <Dot delay={0.3} />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="block h-1.5 w-1.5 rounded-full bg-muted-fg"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.1, repeat: Infinity, delay }}
    />
  );
}

// Helper exposed for the page-level conversation handler
export function generateAnswer(query: string, depth: Depth) {
  const a = answerFor(query);
  if (!a) {
    return {
      text:
        "I don't have a confident answer for that yet. Try asking about eligibility, registration, polling day, documents, or a glossary term like 'constituency'.",
      next: [
        "Am I eligible?",
        "How do I register?",
        "What documents do I need?",
      ],
      notFound: true,
    };
  }
  return {
    text: a[depth],
    next: a.next,
    notFound: false,
  };
}
