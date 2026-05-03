"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { glossary, findTerm } from "@/lib/data/glossary";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";

interface Props {
  onAsk: (q: string) => void;
}

export function GlossarySection({ onAsk }: Props) {
  const [activeId, setActiveId] = React.useState<string>(glossary[0].id);
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(needle) ||
        t.short.toLowerCase().includes(needle) ||
        t.plain.toLowerCase().includes(needle)
    );
  }, [q]);

  const active = findTerm(activeId);

  return (
    <section
      id="glossary"
      aria-labelledby="gl-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <SectionHeader
        index="/ 07"
        eyebrow="Glossary"
        title="Civic terms, in plain language"
        lede="The dictionary version, the human version, and why each one actually matters to you."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* term list */}
        <div className="lg:col-span-5">
          <div className="ink-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[rgb(var(--hairline)_/_0.10)] px-4">
              <Search size={14} className="text-muted-fg" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search terms"
                className="h-11 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-muted-fg"
                aria-label="Search glossary"
              />
              <span className="font-mono text-[10.5px] tabular-nums text-muted-fg">
                {filtered.length}
              </span>
            </div>
            <ul className="max-h-[480px] overflow-auto">
              {filtered.length === 0 && (
                <li className="px-5 py-10 text-center text-[13px] text-muted-fg">
                  No matches. Try “ballot” or “turnout”.
                </li>
              )}
              {filtered.map((t, i) => {
                const a = t.id === activeId;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => setActiveId(t.id)}
                      className={cn(
                        "flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left transition-colors",
                        a
                          ? "border-ember bg-[rgb(var(--ember)_/_0.06)]"
                          : "border-transparent hover:bg-[rgb(var(--hairline)_/_0.04)]"
                      )}
                    >
                      <span className="font-mono text-[10.5px] tabular-nums text-muted-fg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold tracking-tightish text-ink">
                          {t.term}
                        </span>
                        <span className="line-clamp-1 block text-[12px] text-muted-fg">
                          {t.short}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* term detail */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {active && (
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="ink-card p-6"
              >
                <div className="flex items-center gap-2">
                  <Badge tone="ember">Term</Badge>
                  <span className="text-[12px] text-muted-fg">/{active.id}</span>
                </div>
                <h3 className="display mt-3 text-[34px] leading-tight tracking-tighter2 text-ink">
                  {active.term}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-fg">
                  {active.short}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Block title="In plain language" body={active.plain} tone="ember" />
                  <Block title="Why it matters" body={active.matters} tone="sage" />
                </div>

                {active.related.length > 0 && (
                  <div className="mt-6 border-t border-[rgb(var(--hairline)_/_0.10)] pt-4">
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
                      Related terms
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {active.related.map((id) => {
                        const t = findTerm(id);
                        if (!t) return null;
                        return (
                          <button
                            key={id}
                            onClick={() => setActiveId(id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--hairline)_/_0.14)] bg-surface px-2.5 py-1 text-[12px] text-ink hover:border-[rgb(var(--hairline)_/_0.22)]"
                          >
                            {t.term}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-[rgb(var(--hairline)_/_0.10)] pt-4">
                  <span className="text-[12px] text-muted-fg">
                    Want this in a sentence you&rsquo;d actually say?
                  </span>
                  <button
                    onClick={() => onAsk(`What does ${active.term} mean?`)}
                    className="text-[12.5px] font-medium text-ember hover:underline"
                  >
                    Ask the assistant →
                  </button>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Block({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "ember" | "sage";
}) {
  return (
    <div
      className={cn(
        "rounded-[12px] border p-4",
        tone === "ember"
          ? "border-[rgb(var(--ember)_/_0.18)] bg-ember-soft/60"
          : "border-[rgb(var(--sage)_/_0.20)] bg-sage-soft/60"
      )}
    >
      <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
        {title}
      </div>
      <p className="mt-1 text-[14px] leading-relaxed text-ink">{body}</p>
    </div>
  );
}
