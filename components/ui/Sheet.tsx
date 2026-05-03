"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  side?: "right" | "bottom";
  widthClass?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  widthClass = "w-[420px]",
}: SheetProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={
              side === "right"
                ? { x: "100%" }
                : { y: "100%" }
            }
            animate={{ x: 0, y: 0 }}
            exit={
              side === "right" ? { x: "100%" } : { y: "100%" }
            }
            transition={{ type: "spring", stiffness: 360, damping: 36 }}
            className={cn(
              "fixed z-50 flex flex-col bg-paper paper-grain shadow-lift",
              side === "right"
                ? cn(
                    "right-0 top-0 h-full max-w-full border-l border-[rgb(var(--hairline)_/_0.10)]",
                    widthClass
                  )
                : "bottom-0 left-0 right-0 h-[78vh] rounded-t-2xl border-t border-[rgb(var(--hairline)_/_0.10)]"
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[rgb(var(--hairline)_/_0.10)] px-5 py-4">
              <div>
                <h3 className="display text-[20px] leading-tight">{title}</h3>
                {description && (
                  <p className="mt-1 text-[13px] text-muted-fg">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-auto px-5 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
