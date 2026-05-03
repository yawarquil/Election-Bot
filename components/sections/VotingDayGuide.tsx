"use client";

import * as React from "react";
import {
  AlertOctagon,
  Backpack,
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { votingDayGroups, votingDayItems } from "@/lib/data/votingDay";
import { cn } from "@/lib/cn";

const groupIcon = {
  carry: Backpack,
  verify: CheckCircle2,
  where: MapPin,
  inside: Building2,
  "if-issue": AlertOctagon,
  accessibility: HeartHandshake,
} as const;

interface Props {
  onAsk: (q: string) => void;
}

export function VotingDayGuide({ onAsk }: Props) {
  return (
    <section
      id="voting-day"
      aria-labelledby="vd-h"
      className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <SectionHeader
        index="/ 05"
        eyebrow="Voting day"
        title="Walk in calmly. Walk out done."
        lede="A reassuring, in-order companion. Read it the night before, glance at it in the queue."
        trailing={
          <Badge tone="ember" dot>
            Polling-day mode
          </Badge>
        }
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {votingDayGroups.map((g) => {
          const Icon = groupIcon[g.id];
          const items = votingDayItems.filter((i) => i.group === g.id);
          return (
            <div key={g.id} className="ink-card overflow-hidden">
              <header className="flex items-center justify-between gap-3 border-b border-[rgb(var(--hairline)_/_0.10)] bg-surface-2/40 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-paper">
                    <Icon size={14} strokeWidth={1.6} />
                  </span>
                  <h3 className="text-[14.5px] font-semibold tracking-tightish text-ink">
                    {g.label}
                  </h3>
                </div>
                <Badge tone="neutral">{g.tag}</Badge>
              </header>
              <ol className="divide-y divide-[rgb(var(--hairline)_/_0.08)]">
                {items.map((it, i) => (
                  <li key={it.id} className="px-5 py-3.5">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[10px] tabular-nums",
                          "border border-[rgb(var(--hairline)_/_0.16)] text-muted-fg"
                        )}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-medium tracking-tightish text-ink">
                          {it.title}
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-fg">
                          {it.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 rounded-[14px] border border-dashed border-[rgb(var(--hairline)_/_0.18)] p-5 sm:flex-row sm:items-center">
        <Badge tone="sage" dot>
          Stay calm
        </Badge>
        <p className="text-[13.5px] leading-relaxed text-muted-fg">
          If anything seems unclear, ask a polling officer. They are trained to
          help. You have the right to assistance, accessibility support, and to
          escalate to the presiding officer.
        </p>
        <button
          onClick={() => onAsk("What if my name is missing on polling day?")}
          className="ml-auto text-[12.5px] font-medium text-ember hover:underline"
        >
          Ask the assistant →
        </button>
      </div>
    </section>
  );
}
