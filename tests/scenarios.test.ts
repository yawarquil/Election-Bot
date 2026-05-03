import { describe, expect, it } from "vitest";
import { scenarios } from "../lib/data/scenarios";
import { checklistFor } from "../lib/data/checklist";

describe("scenarios", () => {
  it("covers every scenario with checklist items", () => {
    for (const scenario of scenarios) {
      const items = checklistFor(scenario.id);
      expect(items.length).toBeGreaterThan(0);
    }
  });

  it("uses unique ids", () => {
    const ids = scenarios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("provides a blurb for every scenario", () => {
    for (const scenario of scenarios) {
      expect(scenario.title.length).toBeGreaterThan(3);
      expect(scenario.blurb.length).toBeGreaterThan(10);
    }
  });
});
