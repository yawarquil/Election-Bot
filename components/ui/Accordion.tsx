"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  id: string;
  title: React.ReactNode;
  trailing?: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
  itemClassName?: string;
}

export function Accordion({
  items,
  defaultOpen,
  className,
  itemClassName,
}: AccordionProps) {
  const [open, setOpen] = React.useState<string | null>(defaultOpen ?? null);

  return (
    <div
      className={cn(
        "ink-card divide-y divide-[rgb(var(--hairline)_/_0.10)] overflow-hidden",
        className
      )}
    >
      {items.map((it, i) => {
        const isOpen = it.id === open;
        return (
          <div key={it.id} className={cn(itemClassName)}>
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-${it.id}`}
              className={cn(
                "group flex w-full items-center gap-4 px-5 py-4 text-left",
                "outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
              )}
            >
              <span className="font-mono text-[11px] tabular-nums text-muted-fg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[15px] font-medium tracking-tightish text-ink">
                {it.title}
              </span>
              {it.trailing}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="text-muted-fg group-hover:text-ink"
                aria-hidden
              >
                <Plus size={18} strokeWidth={1.5} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-${it.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pl-[calc(1.25rem+2.5rem)] pr-5 text-[14px] leading-relaxed text-muted-fg">
                    {it.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
