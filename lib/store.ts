"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Depth, ElectionType, ScenarioId, UserState } from "./types";

interface Store extends UserState {
  setRegion: (id: string) => void;
  setElectionType: (t: ElectionType) => void;
  setScenario: (s: ScenarioId) => void;
  setDepth: (d: Depth) => void;
  toggleChecklist: (id: string) => void;
  resetChecklist: () => void;
  setLargeText: (v: boolean) => void;
  setHighContrast: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setTheme: (t: "light" | "dark" | "system") => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      regionId: "in",
      electionType: "national",
      scenario: "first-time",
      depth: "beginner",
      completedChecklist: [],
      largeText: false,
      highContrast: false,
      reducedMotion: false,
      theme: "system",
      setRegion: (id) => set({ regionId: id }),
      setElectionType: (t) => set({ electionType: t }),
      setScenario: (s) => set({ scenario: s }),
      setDepth: (d) => set({ depth: d }),
      toggleChecklist: (id) =>
        set((s) => ({
          completedChecklist: s.completedChecklist.includes(id)
            ? s.completedChecklist.filter((x) => x !== id)
            : [...s.completedChecklist, id],
        })),
      resetChecklist: () => set({ completedChecklist: [] }),
      setLargeText: (v) => set({ largeText: v }),
      setHighContrast: (v) => set({ highContrast: v }),
      setReducedMotion: (v) => set({ reducedMotion: v }),
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: "ega-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        regionId: s.regionId,
        electionType: s.electionType,
        scenario: s.scenario,
        depth: s.depth,
        completedChecklist: s.completedChecklist,
        largeText: s.largeText,
        highContrast: s.highContrast,
        reducedMotion: s.reducedMotion,
        theme: s.theme,
      }),
    }
  )
);
