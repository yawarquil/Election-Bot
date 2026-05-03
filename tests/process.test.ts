import { describe, expect, it } from "vitest";
import { processSteps } from "../lib/data/process";

describe("process steps", () => {
  it("has a canonical six-step flow", () => {
    expect(processSteps.length).toBe(6);
  });

  it("starts with a before-election step and ends with an outcome step", () => {
    expect(processSteps[0].id).toBe("before");
    expect(processSteps[processSteps.length - 1].id).toBe("outcome");
  });

  it("uses a glyph from the allowed set", () => {
    const allowed = new Set(["before", "register", "verify", "vote", "count", "outcome"]);
    for (const step of processSteps) {
      expect(allowed.has(step.glyph)).toBe(true);
    }
  });

  it("provides a detail, caption, and who for every step", () => {
    for (const step of processSteps) {
      expect(step.detail.length).toBeGreaterThan(10);
      expect(step.caption.length).toBeGreaterThan(3);
      expect(step.who.length).toBeGreaterThanOrEqual(3);
    }
  });
});
