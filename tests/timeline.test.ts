import { describe, expect, it } from "vitest";
import { getPhase, timelinePhases } from "../lib/data/timeline";

describe("timeline phases", () => {
  it("has seven canonical phases", () => {
    expect(timelinePhases.length).toBe(7);
  });

  it("uses sequential indices starting at zero", () => {
    timelinePhases.forEach((phase, i) => {
      expect(phase.index).toBe(i);
    });
  });

  it("has unique phase keys", () => {
    const keys = timelinePhases.map((phase) => phase.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("ensures every phase lists who is involved", () => {
    for (const phase of timelinePhases) {
      expect(phase.whoIsInvolved.length).toBeGreaterThan(0);
      expect(phase.citizenActions.length).toBeGreaterThan(0);
    }
  });

  it("getPhase returns the phase for a valid key", () => {
    expect(getPhase("registration").label).toContain("Registration");
    expect(getPhase("polling").shortLabel).toBe("Polling");
  });

  it("checkpoint tones stay within the allowed set", () => {
    const allowed = new Set(["info", "warn", "ok"]);
    for (const phase of timelinePhases) {
      for (const checkpoint of phase.checkpoints) {
        expect(allowed.has(checkpoint.tone)).toBe(true);
      }
    }
  });

  it("has a counting phase that describes the returning officer", () => {
    const meaning = getPhase("counting").meaning.toLowerCase();
    expect(meaning).toContain("returning officer");
  });
});
