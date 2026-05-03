import { describe, expect, it } from "vitest";
import { getRegion, regions } from "../lib/data/regions";

describe("regions catalogue", () => {
  it("includes at least the core regions", () => {
    const ids = regions.map((r) => r.id);
    expect(ids).toContain("in");
    expect(ids).toContain("us");
    expect(ids).toContain("uk");
    expect(ids).toContain("global");
  });

  it("has valid ISO-3166 alpha-2 codes", () => {
    for (const region of regions) {
      expect(region.countryCode).toMatch(/^[A-Z]{2}$/);
    }
  });

  it("declares an election authority for every region", () => {
    for (const region of regions) {
      expect(region.electionAuthority.length).toBeGreaterThan(0);
      expect(region.authorityShort.length).toBeGreaterThan(0);
    }
  });

  it("getRegion falls back to the learning region for unknown ids", () => {
    expect(getRegion("unknown").id).toBe("global");
  });

  it("every region lists at least one election type", () => {
    for (const region of regions) {
      expect(region.electionTypes.length).toBeGreaterThan(0);
    }
  });
});
