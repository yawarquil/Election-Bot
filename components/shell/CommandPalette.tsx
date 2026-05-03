"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CornerDownLeft, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "./SideNav";
import { glossary } from "@/lib/data/glossary";
import { assistantSuggestions } from "@/lib/data/assistant";

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onAskAssistant: (q: string) => void;
}

export function CommandPalette({ open, onClose, onNavigate, onAskAssistant }: Props) {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setQ("");
    setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  type Result =
    | { type: "nav"; id: string; label: string; hint: string }
    | { type: "term"; id: string; label: string; hint: string }
    | { type: "ask"; label: string; hint: string };

  const results: Result[] = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    const navHits: Result[] = navItems
      .filter((n) =>
        !needle
          ? true
          : (n.label + n.hint).toLowerCase().includes(needle)
      )
      .map((n) => ({ type: "nav", id: n.id, label: n.label, hint: n.hint }));

    const termHits: Result[] = glossary
      .filter(
        (t) =>
          !!needle &&
          (t.term.toLowerCase().includes(needle) ||
            t.short.toLowerCase().includes(needle))
      )
      .slice(0, 6)
      .map((t) => ({ type: "term", id: t.id, label: t.term, hint: t.short }));

    const askHits: Result[] = needle
      ? [{ type: "ask", label: `Ask the assistant: "${q}"`, hint: "Get a contextual explanation" }]
      : assistantSuggestions.slice(0, 4).map((s) => ({
          type: "ask",
          label: s.prompt,
          hint: "Suggested question",
        }));

    return [...navHits, ...termHits, ...askHits];
  }, [q]);

  const [active, setActive] = React.useState(0);
  React.useEffect(() => setActive(0), [q]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (!r) return;
      runResult(r);
    }
  };

  function runResult(r: Result) {
    if (r.type === "nav") {
      onNavigate(r.id);
      onClose();
    } else if (r.type === "term") {
      onNavigate("glossary");
      onClose();
    } else if (r.type === "ask") {
      const prompt = q.trim() || (r.label.startsWith("Ask the assistant") ? q : r.label);
      onAskAssistant(prompt || r.label);
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed left-1/2 top-[20%] z-50 w-[min(640px,calc(100vw-24px))] -translate-x-1/2",
              "ink-card overflow-hidden shadow-lift"
            )}
          >
            <div className="flex items-center gap-2 border-b border-[rgb(var(--hairline)_/_0.10)] px-4">
              <Search size={16} className="shrink-0 text-muted-fg" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask, jump to a section, or look up a term"
                className="h-12 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted-fg"
              />
              <kbd className="rounded-md border border-[rgb(var(--hairline)_/_0.16)] bg-paper px-1.5 py-0.5 font-mono text-[10px] text-muted-fg">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[60vh] overflow-auto py-2" role="listbox">
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-[13px] text-muted-fg">
                  No matches. Try “registration”, “polling day”, or a term like “constituency”.
                </li>
              )}
              {results.map((r, i) => (
                <li key={`${r.type}-${(r as any).id ?? i}`} role="option" aria-selected={i === active}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runResult(r)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left",
                      i === active ? "bg-[rgb(var(--hairline)_/_0.06)]" : "bg-transparent"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-md",
                        r.type === "ask"
                          ? "bg-ember-soft text-ember"
                          : "bg-[rgb(var(--hairline)_/_0.07)] text-muted-fg"
                      )}
                    >
                      {r.type === "ask" ? (
                        <Sparkles size={13} />
                      ) : r.type === "term" ? (
                        <span className="text-[10px] font-mono">Aa</span>
                      ) : (
                        <ArrowRight size={13} />
                      )}
                    </span>
                    <span className="flex-1 truncate">
                      <span className="block text-[13.5px] font-medium tracking-tightish text-ink">
                        {r.label}
                      </span>
                      <span className="block text-[12px] text-muted-fg">{r.hint}</span>
                    </span>
                    <span className="text-muted-fg">
                      <CornerDownLeft size={13} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-[rgb(var(--hairline)_/_0.10)] px-4 py-2 text-[11px] text-muted-fg">
              <span className="inline-flex items-center gap-1.5">
                <KbdHint label="↑↓" /> navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <KbdHint label="↵" /> open
              </span>
              <span className="inline-flex items-center gap-1.5">
                <KbdHint label="ESC" /> close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function KbdHint({ label }: { label: string }) {
  return (
    <kbd className="rounded-[5px] border border-[rgb(var(--hairline)_/_0.14)] bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-fg">
      {label}
    </kbd>
  );
}
