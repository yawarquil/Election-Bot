"use client";

import * as React from "react";
import { Mark } from "@/components/shell/SideNav";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer
      aria-labelledby="ft-h"
      className="border-t border-[rgb(var(--hairline)_/_0.10)] bg-surface-2/30 px-4 sm:px-8 lg:px-12 py-12"
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <Mark />
            <div className="leading-tight">
              <div id="ft-h" className="text-[14px] font-semibold tracking-tightish text-ink">
                Election Guide Assistant
              </div>
              <div className="text-[12px] text-muted-fg">a civic-tech companion</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted-fg">
            Built to make voting feel less intimidating. Non-partisan, plain
            language, designed to point you to the official authority — not
            replace it.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Trust signals
          </div>
          <ul className="mt-3 space-y-2 text-[12.5px] text-ink">
            <li className="flex items-center gap-2">
              <Badge tone="sage">Neutral</Badge> Non-partisan content
            </li>
            <li className="flex items-center gap-2">
              <Badge tone="ember">Source-aware</Badge> Tagged categories
            </li>
            <li className="flex items-center gap-2">
              <Badge tone="warn">Verify</Badge> Final word: your authority
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Disclaimer
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted-fg">
            This guide is educational. Election rules and dates vary by region
            and update over time. For binding information, always consult your
            country&rsquo;s election commission, electoral office, or equivalent.
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-[rgb(var(--hairline)_/_0.10)] pt-6 sm:flex-row sm:items-center">
        <span className="font-mono text-[11px] tabular-nums text-muted-fg">
          © {new Date().getFullYear()} · Election Guide Assistant
        </span>
        <span className="text-[11px] text-muted-fg">
          A civic-tech project. Built with care.
        </span>
      </div>
    </footer>
  );
}
