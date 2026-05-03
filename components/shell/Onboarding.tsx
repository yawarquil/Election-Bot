"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const KEY = "ega-onboard-seen";

interface Props {
  onAsk: (q: string) => void;
}

// Non-intrusive onboarding nudge — appears once.
export function Onboarding({ onAsk }: Props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Welcome"
          className="fixed bottom-20 left-3 z-30 max-w-[320px] rounded-[14px] border border-[rgb(var(--hairline)_/_0.14)] bg-paper shadow-lift sm:bottom-6 sm:left-6"
        >
          <div className="flex items-start gap-3 p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ember-soft text-ember">
              <Sparkles size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-semibold tracking-tightish text-ink">
                Welcome — quick tip
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-fg">
                Press{" "}
                <kbd className="rounded-[4px] border border-[rgb(var(--hairline)_/_0.16)] bg-surface px-1 py-0.5 font-mono text-[10px] text-muted-fg">
                  ⌘ K
                </kbd>{" "}
                or{" "}
                <kbd className="rounded-[4px] border border-[rgb(var(--hairline)_/_0.16)] bg-surface px-1 py-0.5 font-mono text-[10px] text-muted-fg">
                  Ctrl K
                </kbd>{" "}
                anywhere to ask the assistant or jump to a section.
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="ink"
                  onClick={() => {
                    onAsk("Explain this like I'm a first-time voter");
                    close();
                  }}
                >
                  First-time voter walkthrough
                </Button>
                <button
                  onClick={close}
                  className="text-[12px] text-muted-fg hover:text-ink"
                >
                  Got it
                </button>
              </div>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="grid h-6 w-6 place-items-center rounded-full text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
