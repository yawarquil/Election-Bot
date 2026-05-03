import { describe, expect, it } from "vitest";
import { glossary, findTerm } from "../lib/data/glossary";

describe("glossary data integrity", () => {
  it("has a stable, non-empty catalogue", () => {
    expect(glossary.length).toBeGreaterThan(10);
  });

  it("uses unique ids across all terms", () => {
    const ids = glossary.map((term) => term.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("requires every term to have plain-language copy", () => {
    for (const term of glossary) {
      expect(term.term).toBeTruthy();
      expect(term.short).toBeTruthy();
      expect(term.plain).toBeTruthy();
      expect(term.matters).toBeTruthy();
    }
  });

  it("only references existing related terms", () => {
    const ids = new Set(glossary.map((term) => term.id));
    for (const term of glossary) {
      for (const related of term.related) {
        expect(ids.has(related)).toBe(true);
      }
    }
  });

  it("findTerm returns the right entry for a known id", () => {
    const booth = findTerm("polling-booth");
    expect(booth?.term).toContain("Polling");
  });

  it("findTerm returns undefined for unknown ids", () => {
    expect(findTerm("does-not-exist")).toBeUndefined();
  });
});
