import { describe, expect, it } from "vitest";
import { checklistFor, checklistLibrary } from "../lib/data/checklist";

describe("checklist library", () => {
  it("has unique item ids", () => {
    const ids = checklistLibrary.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tags every item with at least one scenario", () => {
    for (const item of checklistLibrary) {
      expect(item.scenarios.length).toBeGreaterThan(0);
    }
  });

  it("uses only known urgency tiers", () => {
    const allowed = new Set(["now", "soon", "later", "info"]);
    for (const item of checklistLibrary) {
      expect(allowed.has(item.urgency)).toBe(true);
    }
  });

  it("returns an array (never undefined) for every scenario", () => {
    const scenarios = [
      "first-time",
      "registered",
      "moved",
      "correction",
      "polling-info",
      "learning",
    ] as const;
    for (const scenario of scenarios) {
      expect(Array.isArray(checklistFor(scenario))).toBe(true);
    }
  });

  it("the correction scenario surfaces the correction task", () => {
    const items = checklistFor("correction");
    expect(items.some((item) => item.id === "file-correction")).toBe(true);
  });

  it("polling-info surfaces ID and station tasks", () => {
    const items = checklistFor("polling-info");
    expect(items.some((item) => item.id === "id-list")).toBe(true);
    expect(items.some((item) => item.id === "find-station")).toBe(true);
  });
});
