"use client";

import * as React from "react";
import { SideNav } from "@/components/shell/SideNav";
import { TopBar } from "@/components/shell/TopBar";
import { MobileNav } from "@/components/shell/MobileNav";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { RegionSheet } from "@/components/shell/RegionSheet";
import { SettingsSheet } from "@/components/shell/SettingsSheet";
import { ContextPanel } from "@/components/shell/ContextPanel";
import { Onboarding } from "@/components/shell/Onboarding";

import { Entry } from "@/components/sections/Entry";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { Eligibility } from "@/components/sections/Eligibility";
import { TimelineExplorer } from "@/components/sections/TimelineExplorer";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { VotingDayGuide } from "@/components/sections/VotingDayGuide";
import { FaqSection } from "@/components/sections/FaqSection";
import { GlossarySection } from "@/components/sections/GlossarySection";
import { AssistantSection, generateAnswer } from "@/components/sections/AssistantSection";
import { Footer } from "@/components/sections/Footer";

import { useStore } from "@/lib/store";

interface Turn {
  id: string;
  role: "user" | "assistant";
  text: string;
  notFound?: boolean;
  next?: string[];
}

const ALL_SECTIONS = [
  "entry",
  "process",
  "eligibility",
  "timeline",
  "checklist",
  "voting-day",
  "faq",
  "glossary",
  "assistant",
];

export default function Page() {
  const [active, setActive] = React.useState<string>("entry");
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [regionOpen, setRegionOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const [turns, setTurns] = React.useState<Turn[]>([]);
  const [loading, setLoading] = React.useState(false);
  const depth = useStore((s) => s.depth);

  // ⌘K / Ctrl+K opens palette
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll-spy: track which section is in view
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const onSee = (id: string) => setActive(id);

    ALL_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              onSee(id);
            }
          }
        },
        { threshold: [0.4, 0.6] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navigate = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ask = (q: string) => {
    if (!q.trim()) return;

    // ensure assistant is visible
    setTurns((cur) => [
      ...cur,
      { id: `u-${Date.now()}`, role: "user", text: q.trim() },
    ]);
    setLoading(true);

    // navigate to assistant section so user sees answer
    setTimeout(() => navigate("assistant"), 50);

    // simulate "thinking" for premium feel
    const delay = 360 + Math.random() * 320;
    window.setTimeout(() => {
      const r = generateAnswer(q.trim(), depth);
      setTurns((cur) => [
        ...cur,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: r.text,
          next: r.next,
          notFound: r.notFound,
        },
      ]);
      setLoading(false);
    }, delay);
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <TopBar
        onCommand={() => setPaletteOpen(true)}
        onRegion={() => setRegionOpen(true)}
        onSettings={() => setSettingsOpen(true)}
      />

      <div className="flex min-w-0 flex-1">
        <SideNav active={active} onNavigate={navigate} />
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <Entry onAsk={ask} onNavigate={navigate} />
          <ProcessFlow onNavigate={navigate} />
          <Eligibility onContinue={navigate} />
          <TimelineExplorer onAsk={ask} />
          <ChecklistSection />
          <VotingDayGuide onAsk={ask} />
          <FaqSection onAsk={ask} />
          <GlossarySection onAsk={ask} />
          <AssistantSection
            turns={turns}
            setTurns={setTurns}
            loading={loading}
            setLoading={setLoading}
            onSubmit={ask}
          />
          <Footer />
        </main>
        <ContextPanel active={active} onAsk={ask} />
      </div>

      <MobileNav active={active} onNavigate={navigate} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
        onAskAssistant={ask}
      />
      <RegionSheet open={regionOpen} onClose={() => setRegionOpen(false)} />
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Onboarding onAsk={ask} />
    </div>
  );
}
