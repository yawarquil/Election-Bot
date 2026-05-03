import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logger, severityForStatus } from "../lib/google-cloud/logger";

describe("severityForStatus", () => {
  it("maps 2xx responses to INFO", () => {
    expect(severityForStatus(200)).toBe("INFO");
    expect(severityForStatus(204)).toBe("INFO");
  });

  it("maps 3xx responses to NOTICE", () => {
    expect(severityForStatus(302)).toBe("NOTICE");
  });

  it("maps 4xx responses to WARNING", () => {
    expect(severityForStatus(400)).toBe("WARNING");
    expect(severityForStatus(404)).toBe("WARNING");
  });

  it("maps 5xx responses to ERROR", () => {
    expect(severityForStatus(500)).toBe("ERROR");
    expect(severityForStatus(503)).toBe("ERROR");
  });
});

describe("structured logger", () => {
  const spies: ReturnType<typeof vi.spyOn>[] = [];

  beforeEach(() => {
    spies.push(vi.spyOn(console, "log").mockImplementation(() => undefined));
    spies.push(vi.spyOn(console, "warn").mockImplementation(() => undefined));
    spies.push(vi.spyOn(console, "error").mockImplementation(() => undefined));
  });

  afterEach(() => {
    for (const spy of spies) spy.mockRestore();
    spies.length = 0;
  });

  it("emits a JSON line with severity=INFO for info()", () => {
    logger.info("hello", { requestId: "req-1", route: "/api/health" });
    const payload = (console.log as unknown as { mock: { calls: string[][] } })
      .mock.calls[0][0];
    const parsed = JSON.parse(payload);
    expect(parsed.severity).toBe("INFO");
    expect(parsed.message).toBe("hello");
    expect(parsed["logging.googleapis.com/labels"].requestId).toBe("req-1");
  });

  it("emits to console.error for error severity", () => {
    logger.error("boom", { requestId: "req-2" });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it("emits to console.warn for warn severity", () => {
    logger.warn("careful", { requestId: "req-3" });
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
