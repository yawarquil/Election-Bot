/**
 * Zero-dependency input validation helpers.
 *
 * These small primitives keep validation explicit and centralised without
 * pulling a runtime library into the client bundle. They are used for
 * assistant questions, checklist actions, and API-layer guards.
 */

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export interface StringFieldOptions {
  min?: number;
  max?: number;
  field?: string;
  pattern?: RegExp;
}

/**
 * Validates a string with defensive limits. Returns a normalised value
 * or a descriptive error message suitable for logs and UI messaging.
 */
export function validateString(
  input: unknown,
  options: StringFieldOptions = {}
): ValidationResult<string> {
  const field = options.field ?? "value";

  if (typeof input !== "string") {
    return { ok: false, error: `${field} must be a string` };
  }

  const trimmed = input.replace(/\s+/g, " ").trim();

  if (options.min !== undefined && trimmed.length < options.min) {
    return {
      ok: false,
      error: `${field} must be at least ${options.min} characters`,
    };
  }

  if (options.max !== undefined && trimmed.length > options.max) {
    return {
      ok: false,
      error: `${field} must be at most ${options.max} characters`,
    };
  }

  if (options.pattern && !options.pattern.test(trimmed)) {
    return { ok: false, error: `${field} has an unsupported format` };
  }

  return { ok: true, value: trimmed };
}

/**
 * Validates that a value is one of a fixed set of literal strings.
 */
export function validateEnum<T extends string>(
  input: unknown,
  allowed: readonly T[],
  field = "value"
): ValidationResult<T> {
  if (typeof input !== "string" || !allowed.includes(input as T)) {
    return {
      ok: false,
      error: `${field} must be one of: ${allowed.join(", ")}`,
    };
  }
  return { ok: true, value: input as T };
}

/**
 * Assistant question validator. Used both in the UI and before any
 * future server-side handling, so the shape is consistent across tiers.
 */
export const ASSISTANT_QUESTION_LIMITS = {
  min: 2,
  max: 280,
} as const;

export function validateQuestion(input: unknown): ValidationResult<string> {
  return validateString(input, {
    ...ASSISTANT_QUESTION_LIMITS,
    field: "question",
  });
}

/**
 * Very small sanitizer that strips script-tag-looking payloads. Content
 * is still rendered through React's escaping so this is a defence in
 * depth, not a replacement for proper escaping.
 */
export function sanitizeFreeText(input: string): string {
  return input
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}
