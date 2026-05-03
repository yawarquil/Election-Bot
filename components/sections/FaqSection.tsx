"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ShieldQuestion, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { faqs, mythsAndFacts } from "@/lib/data/faq";
import { cn } from "@/lib/cn";

interface Props {
  onAsk: (q: string) => void;
}

export function FaqSection({ onAsk }: Props) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <SectionHeader
        index="/ 06"
        eyebrow="Q & Myths"
        title="Common confusion, clearly answered"
        lede="A short FAQ for the questions that come up everywhere — followed by a myth-vs-fact card flip for the ones that travel by forwarded message."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Accordion
            items={faqs.map((f) => ({
              id: f.id,
              title: f.question,
              trailing: (
                <Badge tone="neutral" className="hidden sm:inline-flex">
                  Common Q
                </Badge>
              ),
              content: (
                <div className="space-y-3">
                  <p>{f.answer}</p>
                  {f.followups && (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-muted-fg">
                        Try next
                      </span>
                      {f.followups.map((q) => (
                        <button
                          key={q}
                          onClick={() => onAsk(q)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--hairline)_/_0.14)] bg-surface px-2.5 py-1 text-[12px] text-ink hover:border-[rgb(var(--hairline)_/_0.22)]"
                        >
                          <Sparkles size={11} className="text-ember" />
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ),
            }))}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Myth vs fact
          </div>
          <div className="mt-3 space-y-3">
            {mythsAndFacts.map((m, i) => (
              <MythCard key={m.id} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MythCard({ m, index }: { m: { id: string; myth: string; fact: string; why: string }; index: number }) {
  const [revealed, setRevealed] = React.useState(false);
  return (
    <article
      className="ink-card relative overflow-hidden"
      aria-label={`Myth versus fact ${index + 1}`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-[rgb(var(--danger)_/_0.10)] text-[rgb(var(--danger))]">
          <ShieldQuestion size={14} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[rgb(var(--danger))]">
            Myth
          </div>
          <p className="mt-0.5 text-[14px] leading-snug text-ink">{m.myth}</p>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {revealed ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-dashed border-[rgb(var(--hairline)_/_0.14)] bg-[rgb(var(--ok)_/_0.06)]"
          >
            <div className="flex items-start gap-3 px-4 py-3.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-[rgb(var(--ok)_/_0.14)] text-[rgb(var(--ok))]">
                <ShieldCheck size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[rgb(var(--ok))]">
                  Fact
                </div>
                <p className="mt-0.5 text-[14px] leading-snug text-ink">{m.fact}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-fg">
                  {m.why}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className={cn(
              "btn-press w-full border-t border-dashed border-[rgb(var(--hairline)_/_0.14)] px-4 py-2.5 text-left text-[12.5px] font-medium tracking-tightish text-muted-fg",
              "hover:bg-[rgb(var(--hairline)_/_0.05)] hover:text-ink"
            )}
          >
            Reveal the fact →
          </button>
        )}
      </AnimatePresence>
    </article>
  );
}
