import { describe, expect, it } from "vitest";
import { faqs, mythsAndFacts } from "../lib/data/faq";

describe("faqs", () => {
  it("has unique ids", () => {
    const ids = faqs.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a common-question category on every entry", () => {
    for (const faq of faqs) {
      expect(faq.category).toBe("common-question");
      expect(faq.question.length).toBeGreaterThan(5);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it("covers the missing-name scenario", () => {
    const missing = faqs.find((f) => f.id === "name-missing");
    expect(missing).toBeDefined();
    expect(missing?.answer.toLowerCase()).toContain("supplementary");
  });

  it("contains secret-ballot guidance", () => {
    const secret = faqs.find((f) => f.id === "secret-ballot");
    expect(secret?.answer.toLowerCase()).toContain("secrecy");
  });
});

describe("mythsAndFacts", () => {
  it("has at least five myths", () => {
    expect(mythsAndFacts.length).toBeGreaterThanOrEqual(5);
  });

  it("requires myth, fact, and why on every entry", () => {
    for (const item of mythsAndFacts) {
      expect(item.myth).toBeTruthy();
      expect(item.fact).toBeTruthy();
      expect(item.why).toBeTruthy();
    }
  });

  it("uses unique ids", () => {
    const ids = mythsAndFacts.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
