"use client";

import * as React from "react";
import { Check, Globe2 } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Segmented } from "@/components/ui/Segmented";
import { regions } from "@/lib/data/regions";
import { useStore } from "@/lib/store";
import type { ElectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function RegionSheet({ open, onClose }: Props) {
  const regionId = useStore((s) => s.regionId);
  const electionType = useStore((s) => s.electionType);
  const setRegion = useStore((s) => s.setRegion);
  const setType = useStore((s) => s.setElectionType);
  const region = regions.find((r) => r.id === regionId) ?? regions[0];

  // Election types available for the chosen region
  const types: { value: ElectionType; label: string }[] = region.electionTypes.map((t) => ({
    value: t,
    label: t.charAt(0).toUpperCase() + t.slice(1),
  }));

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Region & election type"
      description="Tailor the guide to your country and the contest you're preparing for."
    >
      <div className="space-y-6">
        <section>
          <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Country / Region
          </h4>
          <ul className="mt-3 space-y-1.5">
            {regions.map((r) => {
              const active = r.id === regionId;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setRegion(r.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-[12px] border px-3.5 py-3 text-left",
                      active
                        ? "border-ember/40 bg-ember-soft/60"
                        : "border-[rgb(var(--hairline)_/_0.10)] bg-surface hover:border-[rgb(var(--hairline)_/_0.18)]"
                    )}
                  >
                    <span aria-hidden className="text-[20px] leading-none">
                      {r.flagEmoji}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-medium tracking-tightish text-ink">
                        {r.country}
                      </span>
                      <span className="block text-[12px] text-muted-fg">
                        {r.electionAuthority}
                      </span>
                    </span>
                    {active && (
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember text-paper">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Election type
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            <Segmented
              ariaLabel="Election type"
              options={types}
              value={electionType}
              onChange={(v) => setType(v)}
            />
          </div>
          {region.notes && (
            <p className="mt-3 text-[12.5px] leading-relaxed text-muted-fg">
              <Globe2 size={12} className="mr-1.5 inline -translate-y-px" />
              {region.notes}
            </p>
          )}
        </section>
      </div>
    </Sheet>
  );
}
