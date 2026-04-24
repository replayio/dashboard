import { describe, it, expect } from "@jest/globals";
import { getRelativeDate, getStartOfDayUTC } from "@/utils/date";

describe("getRelativeDate", () => {
  it("should subtract days", () => {
    const now = Date.now();
    const result = getRelativeDate({ daysAgo: 1 });
    const diff = now - result.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;
    expect(diff).toBeGreaterThanOrEqual(oneDayMs - 100);
    expect(diff).toBeLessThanOrEqual(oneDayMs + 100);
  });

  it("should subtract hours", () => {
    const now = Date.now();
    const result = getRelativeDate({ hoursAgo: 2 });
    const diff = now - result.getTime();
    const twoHoursMs = 2 * 60 * 60 * 1000;
    expect(diff).toBeGreaterThanOrEqual(twoHoursMs - 100);
    expect(diff).toBeLessThanOrEqual(twoHoursMs + 100);
  });

  it("should subtract minutes", () => {
    const now = Date.now();
    const result = getRelativeDate({ minutesAgo: 30 });
    const diff = now - result.getTime();
    const thirtyMinMs = 30 * 60 * 1000;
    expect(diff).toBeGreaterThanOrEqual(thirtyMinMs - 100);
    expect(diff).toBeLessThanOrEqual(thirtyMinMs + 100);
  });

  it("should combine multiple units", () => {
    const now = Date.now();
    const result = getRelativeDate({ daysAgo: 1, hoursAgo: 2 });
    const diff = now - result.getTime();
    const expectedMs = (24 + 2) * 60 * 60 * 1000;
    expect(diff).toBeGreaterThanOrEqual(expectedMs - 100);
    expect(diff).toBeLessThanOrEqual(expectedMs + 100);
  });
});

describe("getStartOfDayUTC", () => {
  it("should return midnight UTC for a given date", () => {
    const date = new Date("2024-06-15T14:30:00Z");
    const result = getStartOfDayUTC(date);
    expect(result).toBe(Date.UTC(2024, 5, 15, 0, 0, 0, 0));
  });

  it("should handle year boundaries", () => {
    const date = new Date("2024-01-01T23:59:59Z");
    const result = getStartOfDayUTC(date);
    expect(result).toBe(Date.UTC(2024, 0, 1, 0, 0, 0, 0));
  });
});
