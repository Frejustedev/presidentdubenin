import { describe, expect, it } from "vitest";
import {
  currentDailySeed,
  msUntilNextDaily,
  formatCountdown,
  formatDailyLabel,
} from "@/lib/daily";

describe("daily", () => {
  it("currentDailySeed format YYYY-MM-DD", () => {
    expect(currentDailySeed()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it("msUntilNextDaily is positive and < 24h", () => {
    const ms = msUntilNextDaily();
    expect(ms).toBeGreaterThan(0);
    expect(ms).toBeLessThanOrEqual(86400_000);
  });
  it("formatCountdown HH:MM:SS", () => {
    expect(formatCountdown(3661000)).toBe("01:01:01");
    expect(formatCountdown(0)).toBe("00:00:00");
  });
  it("formatDailyLabel converts", () => {
    expect(formatDailyLabel("2026-04-19")).toBe("19/04/2026");
  });
});
