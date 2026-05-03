import { describe, expect, it } from "vitest";
import {
  answerFor,
  assistantAnswers,
  assistantSuggestions,
} from "../lib/data/assistant";

describe("assistantSuggestions", () => {
  it("has unique suggestion ids", () => {
    const ids = assistantSuggestions.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("provides at least four starter prompts", () => {
    expect(assistantSuggestions.length).toBeGreaterThanOrEqual(4);
  });

  it("only anchors to known section ids", () => {
    const validAnchors = new Set([
      "eligibility",
      "checklist",
      "voting-day",
      "timeline",
      "process",
      "glossary",
      "assistant",
    ]);
    for (const suggestion of assistantSuggestions) {
      if (suggestion.anchor) {
        expect(validAnchors.has(suggestion.anchor)).toBe(true);
      }
    }
  });
});

describe("answerFor edge cases", () => {
  it("returns null for empty queries", () => {
    expect(answerFor("")).toBeNull();
    expect(answerFor("    ")).toBeNull();
  });

  it("returns null for nonsense queries", () => {
    expect(answerFor("xyzzy plugh frobnicate")).toBeNull();
  });

  it("matches the canonical question key verbatim", () => {
    const answer = answerFor("Am I eligible?");
    expect(answer).toBe(assistantAnswers["am i eligible"]);
  });

  it("matches the registration intent from varied phrasings", () => {
    const phrases = [
      "how do I register to vote",
      "voter registration form",
      "registration process",
    ];
    for (const phrase of phrases) {
      const answer = answerFor(phrase);
      expect(answer).not.toBeNull();
      expect(answer?.quick.toLowerCase()).toContain("form");
    }
  });

  it("matches polling day intent", () => {
    const answer = answerFor("tell me about election day");
    expect(answer).not.toBeNull();
    expect(answer?.detailed.toLowerCase()).toContain("polling");
  });

  it("resolves glossary aliases for 'voter card'", () => {
    const answer = answerFor("what is a voter card");
    expect(answer).not.toBeNull();
    expect(answer?.source).toBe("definition");
  });

  it("exposes every depth for each canonical answer", () => {
    for (const answer of Object.values(assistantAnswers)) {
      expect(answer.quick).toBeTruthy();
      expect(answer.beginner).toBeTruthy();
      expect(answer.student).toBeTruthy();
      expect(answer.detailed).toBeTruthy();
    }
  });

  it("does not leak internal helpers through assistantAnswers", () => {
    expect(assistantAnswers["am i eligible"]).toBeDefined();
    expect(assistantAnswers.xyz).toBeUndefined();
  });

  it("matches timeline intent through stage synonyms", () => {
    const phrases = ["what are the phases", "election stages", "timeline please"];
    for (const phrase of phrases) {
      const answer = answerFor(phrase);
      expect(answer).not.toBeNull();
      expect(answer?.detailed.toLowerCase()).toContain("phase");
    }
  });
});
