"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface Q {
  id: string;
  prompt: string;
  hint?: string;
}

const questions: Q[] = [
  { id: "citizen", prompt: "Are you a citizen of the country where you'd vote?" },
  { id: "age", prompt: "Will you be 18 or older on or before the qualifying date?" },
  { id: "resident", prompt: "Is the address you'll register at where you actually live?" },
  {
    id: "disqual",
    prompt: "Are you free of any current legal disqualification that bars voting?",
    hint: "Most jurisdictions list a small set of disqualifications. If unsure, mark yes and verify with your authority.",
  },
];

interface Props {
  onContinue: (id: string) => void;
}

export function Eligibility({ onContinue }: Props) {
  const [answers, setAnswers] = React.useState<Record<string, "y" | "n" | undefined>>({});
  const total = questions.length;
  const answered = Object.values(answers).filter(Boolean).length;
  const allYes = total === answered && questions.every((q) => answers[q.id] === "y");
  const anyNo = questions.some((q) => answers[q.id] === "n");

  return (
    <section
      id="eligibility"
      aria-labelledby="el-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-12 sm:py-16"
    >
      <SectionHeader
        index="/ 02b"
        eyebrow="Eligibility"
        title="A 30-second self-check"
        lede="A quick yes/no walk-through. Nothing is sent anywhere — this is for your own clarity."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="ink-card lg:col-span-8">
          <ul>
            {questions.map((q, i) => {
              const ans = answers[q.id];
              return (
                <li
                  key={q.id}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4",
                    i !== questions.length - 1 && "border-b border-[rgb(var(--hairline)_/_0.08)]"
                  )}
                >
                  <span className="font-mono text-[10.5px] tabular-nums tracking-[0.16em] text-muted-fg">
                    Q{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14.5px] font-medium tracking-tightish text-ink">
                      {q.prompt}
                    </div>
                    {q.hint && (
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-fg">
                        {q.hint}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <YesNoButton
                      kind="y"
                      active={ans === "y"}
                      onClick={() => setAnswers({ ...answers, [q.id]: "y" })}
                    />
                    <YesNoButton
                      kind="n"
                      active={ans === "n"}
                      onClick={() => setAnswers({ ...answers, [q.id]: "n" })}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${allYes}-${anyNo}-${answered}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "ink-card flex h-full flex-col p-5",
                allYes && "border-[rgb(var(--ok)_/_0.30)] bg-[rgb(var(--ok)_/_0.06)]",
                anyNo && "border-[rgb(var(--warn)_/_0.30)] bg-[rgb(var(--warn)_/_0.06)]"
              )}
            >
              <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
                Result
              </div>
              {answered === 0 && (
                <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">
                  Answer the four questions to see your likely eligibility.
                </p>
              )}
              {anyNo && (
                <>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink">
                    You may not be eligible for this election based on your answers.
                    A &lsquo;no&rsquo; on any of these usually means voting isn&rsquo;t possible this
                    cycle — but rules vary by jurisdiction.
                  </p>
                  <p className="mt-2 text-[12.5px] text-muted-fg">
                    Confirm with your election authority before assuming.
                  </p>
                </>
              )}
              {allYes && (
                <>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink">
                    You&rsquo;re likely eligible. Next step: check that your name is on
                    the electoral roll for your address.
                  </p>
                  <Button
                    className="mt-4"
                    variant="ink"
                    size="sm"
                    onClick={() => onContinue("checklist")}
                  >
                    Build my checklist
                  </Button>
                </>
              )}
              {answered > 0 && answered < total && !anyNo && (
                <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">
                  Keep going — {total - answered} to go.
                </p>
              )}
              <p className="mt-auto pt-4 text-[11px] text-muted-fg">
                <AlertCircle size={11} className="-mt-0.5 mr-1 inline" />
                Educational only. Always confirm with the official authority.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function YesNoButton({
  kind,
  active,
  onClick,
}: {
  kind: "y" | "n";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "btn-press inline-flex h-9 min-w-[44px] items-center justify-center gap-1 rounded-full border px-3 text-[12.5px] font-medium",
        active
          ? kind === "y"
            ? "border-[rgb(var(--ok))] bg-[rgb(var(--ok)_/_0.14)] text-[rgb(var(--ok))]"
            : "border-[rgb(var(--warn))] bg-[rgb(var(--warn)_/_0.14)] text-[rgb(var(--warn))]"
          : "border-[rgb(var(--hairline)_/_0.16)] bg-surface text-muted-fg hover:text-ink"
      )}
    >
      {kind === "y" ? (
        <>
          <Check size={13} /> Yes
        </>
      ) : (
        <>
          <X size={13} /> No
        </>
      )}
    </button>
  );
}
