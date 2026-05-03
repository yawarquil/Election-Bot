import { describe, expect, it } from "vitest";
import {
  sanitizeFreeText,
  validateEnum,
  validateQuestion,
  validateString,
} from "../lib/validation";

describe("validateString", () => {
  it("rejects non-string input", () => {
    const result = validateString(42, { field: "age" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("age");
  });

  it("enforces minimum length", () => {
    const result = validateString("hi", { min: 5 });
    expect(result.ok).toBe(false);
  });

  it("enforces maximum length", () => {
    const result = validateString("hello world", { max: 5 });
    expect(result.ok).toBe(false);
  });

  it("trims and collapses whitespace", () => {
    const result = validateString("  hello   world  ");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("hello world");
  });

  it("rejects inputs that fail a pattern", () => {
    const result = validateString("abc123", { pattern: /^[a-z]+$/ });
    expect(result.ok).toBe(false);
  });
});

describe("validateEnum", () => {
  it("accepts a value within the allowed set", () => {
    const result = validateEnum("light", ["light", "dark", "system"] as const);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("light");
  });

  it("rejects values outside the allowed set", () => {
    const result = validateEnum("purple", ["light", "dark"] as const);
    expect(result.ok).toBe(false);
  });
});

describe("validateQuestion", () => {
  it("rejects very short inputs", () => {
    expect(validateQuestion("").ok).toBe(false);
    expect(validateQuestion("a").ok).toBe(false);
  });

  it("accepts a normal question", () => {
    const result = validateQuestion("How do I register?");
    expect(result.ok).toBe(true);
  });

  it("rejects extremely long questions", () => {
    const input = "a".repeat(400);
    const result = validateQuestion(input);
    expect(result.ok).toBe(false);
  });
});

describe("sanitizeFreeText", () => {
  it("strips script tags", () => {
    const cleaned = sanitizeFreeText("hello <script>evil()</script> world");
    expect(cleaned).not.toContain("<script>");
    expect(cleaned.toLowerCase()).not.toContain("evil");
  });

  it("neutralises javascript: URIs", () => {
    const cleaned = sanitizeFreeText("click javascript:alert(1) now");
    expect(cleaned.toLowerCase()).not.toContain("javascript:");
  });

  it("collapses whitespace", () => {
    expect(sanitizeFreeText("  a    b  ")).toBe("a b");
  });
});
