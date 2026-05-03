import { describe, expect, it } from "vitest";
import { votingDayGroups, votingDayItems } from "../lib/data/votingDay";

describe("voting day guide", () => {
  it("has unique item ids", () => {
    const ids = votingDayItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("groups cover every item", () => {
    const groupIds = new Set(votingDayGroups.map((g) => g.id));
    for (const item of votingDayItems) {
      expect(groupIds.has(item.group)).toBe(true);
    }
  });

  it("lists accessibility items", () => {
    const accessibility = votingDayItems.filter((i) => i.group === "accessibility");
    expect(accessibility.length).toBeGreaterThanOrEqual(1);
  });

  it("always explains what to carry first in the group list", () => {
    expect(votingDayGroups[0].id).toBe("carry");
  });

  it("every item has a title and body", () => {
    for (const item of votingDayItems) {
      expect(item.title.length).toBeGreaterThan(5);
      expect(item.body.length).toBeGreaterThan(10);
    }
  });
});
