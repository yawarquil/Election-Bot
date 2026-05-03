import { describe, expect, it } from "vitest";
import { answerFor } from "../lib/data/assistant";
import { checklistFor } from "../lib/data/checklist";
import { getRegion } from "../lib/data/regions";

describe("assistant intent handling", () => {
  it("matches age requirement variations", () => {
    const answer = answerFor("What's the minimum age requirement to vote?");

    expect(answer).not.toBeNull();
    expect(answer?.quick).toContain("18");
  });

  it("resolves glossary aliases like polling station", () => {
    const answer = answerFor("What does polling station mean?");

    expect(answer).not.toBeNull();
    expect(answer?.source).toBe("definition");
    expect(answer?.beginner.toLowerCase()).toContain("vote");
  });

  it("returns roll verification guidance for electoral roll questions", () => {
    const answer = answerFor("How do I check if I am on the electoral roll?");

    expect(answer).not.toBeNull();
    expect(answer?.beginner.toLowerCase()).toContain("official electoral roll search");
  });
});

describe("checklist selection", () => {
  it("returns scenario-specific items for first-time voters", () => {
    const items = checklistFor("first-time");

    expect(items.length).toBeGreaterThan(0);
    expect(items.some((item) => item.id === "register-new")).toBe(true);
  });

  it("returns move-related tasks for moved voters", () => {
    const items = checklistFor("moved");

    expect(items.some((item) => item.id === "update-address")).toBe(true);
    expect(items.some((item) => item.id === "find-station")).toBe(true);
  });
});

describe("region lookup", () => {
  it("returns the requested region when it exists", () => {
    expect(getRegion("in").country).toBe("India");
  });

  it("falls back to the generic learning region when unknown", () => {
    expect(getRegion("does-not-exist").id).toBe("global");
  });
});
