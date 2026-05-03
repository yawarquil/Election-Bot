"use client";

import * as React from "react";
import { Sparkles, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { useStore } from "@/lib/store";
import { Segmented } from "@/components/ui/Segmented";
import type { Depth } from "@/lib/types";
import { cn } from "@/lib/cn";

interface Props {
  active: string; // current section id
  onAsk: (q: string) => void;
}

// Contextual side rail — desktop-only. Suggests prompts based on the current section.
export function ContextPanel({ active, onAsk }: Props) {
  const depth = useStore((s) => s.depth);
  const setDepth = useStore((s) => s.setDepth);
  const [collapsed, setCollapsed] = React.useState(false);

  const ctx = contextFor(active);

  return (
    <aside
      aria-label="Contextual assistant"
      className={cn(
        "hidden xl:flex sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 flex-col gap-3 border-l border-[rgb(var(--hairline)_/_0.10)] bg-paper paper-grain px-4 py-5 transition-[width] duration-300 ease-spring",
        collapsed ? "w-[64px] items-center" : "w-[300px]"
      )}
    >
      <div className={cn("flex items-center gap-2", collapsed ? "flex-col" : "")}>
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center rounded-md bg-ember-soft text-ember"
        >
          <Sparkles size={13} />
        </span>
        {!collapsed && (
          <div className="flex-1 leading-tight">
            <div className="text-[12.5px] font-semibold tracking-tightish text-ink">
              Ask about this
            </div>
            <div className="text-[11px] text-muted-fg">contextual prompts</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="grid h-7 w-7 place-items-center rounded-full text-muted-fg hover:bg-[rgb(var(--hairline)_/_0.06)] hover:text-ink"
          aria-label={collapsed ? "Expand context panel" : "Collapse context panel"}
        >
          {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="ink-card-2 p-3">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              Current section
            </div>
            <div className="mt-1 text-[13.5px] font-semibold tracking-tightish text-ink">
              {ctx.title}
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-fg">{ctx.lede}</p>
          </div>

          <div>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              Explanation depth
            </div>
            <div className="mt-2">
              <Segmented<Depth>
                ariaLabel="Explanation depth"
                size="sm"
                options={[
                  { value: "quick", label: "Quick" },
                  { value: "beginner", label: "Begin" },
                  { value: "student", label: "Student" },
                  { value: "detailed", label: "Detail" },
                ]}
                value={depth}
                onChange={setDepth}
              />
            </div>
          </div>

          <div>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-fg">
              Suggested prompts
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ctx.prompts.map((p) => (
                <Chip size="sm" key={p} onClick={() => onAsk(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <Button
              block
              size="sm"
              variant="ink"
              iconLeft={<MessageSquare />}
              onClick={() => {
                document
                  .getElementById("assistant")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Open assistant
            </Button>
            <Badge tone="warn" className="mt-3 w-full justify-center">
              Verify with your authority
            </Badge>
          </div>
        </>
      )}
    </aside>
  );
}

function contextFor(id: string) {
  switch (id) {
    case "process":
      return {
        title: "Process flow",
        lede: "The six universal steps from setup to outcome.",
        prompts: [
          "Explain this like I'm a first-time voter",
          "Compare national and local elections",
          "Where do I start?",
        ],
      };
    case "timeline":
      return {
        title: "Election timeline",
        lede: "The phases between announcement and results.",
        prompts: [
          "Show the full election timeline",
          "What happens during the silence period?",
          "When do nominations close?",
        ],
      };
    case "checklist":
      return {
        title: "Personal checklist",
        lede: "What's left, in order, for your scenario.",
        prompts: [
          "How do I register?",
          "What documents do I need?",
          "I just moved — what should I do?",
        ],
      };
    case "voting-day":
      return {
        title: "Voting day guide",
        lede: "Calm, in-order: what to carry and what happens.",
        prompts: [
          "What if my name is missing?",
          "Do I need a photo ID?",
          "What if the queue is long when polls close?",
        ],
      };
    case "faq":
      return {
        title: "FAQ & myth-vs-fact",
        lede: "The questions that come up everywhere.",
        prompts: [
          "Can I vote if I moved?",
          "Is registration automatic?",
          "Is my vote actually secret?",
        ],
      };
    case "glossary":
      return {
        title: "Glossary",
        lede: "Plain-language definitions for civic terms.",
        prompts: [
          "What does constituency mean?",
          "What's an electoral roll?",
          "What is a tendered ballot?",
        ],
      };
    case "assistant":
      return {
        title: "Assistant",
        lede: "Ask anything. Switch how it's explained.",
        prompts: [
          "Am I eligible?",
          "Show the full election timeline",
          "What documents do I need?",
        ],
      };
    case "eligibility":
      return {
        title: "Eligibility check",
        lede: "Four quick yes/no questions, just for you.",
        prompts: [
          "What if I'm not 18 yet?",
          "Do non-citizens ever vote?",
          "What disqualifies someone?",
        ],
      };
    default:
      return {
        title: "Overview",
        lede: "Where to go and what to do, calmly.",
        prompts: [
          "Am I eligible?",
          "How do I register?",
          "What happens on election day?",
        ],
      };
  }
}
