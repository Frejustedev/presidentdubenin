import { describe, expect, it } from "vitest";
import { TITLES, checkUnlockedTitles } from "@/lib/titles";
import type { GameResult } from "@/lib/types";

function makeResult(overrides: Partial<GameResult> = {}): GameResult {
  return {
    playerName: "Test",
    score: 60,
    ending: "PAISIBLE",
    yearReached: 7,
    decisionsCount: 18,
    durationSeconds: 300,
    finalGauges: { peuple: 60, tresor: 60, armee: 60, pouvoir: 60 },
    playedAt: Date.now(),
    keyMoments: [],
    tags: [],
    ...overrides,
  };
}

describe("TITLES", () => {
  it("has at least 16 titles", () => {
    expect(TITLES.length).toBeGreaterThanOrEqual(16);
  });
  it("all ids are unique", () => {
    const ids = TITLES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("checkUnlockedTitles", () => {
  it("unlocks first_term after first game", () => {
    const result = makeResult();
    const unlocked = checkUnlockedTitles({ result, allResults: [result] });
    expect(unlocked.find((t) => t.id === "first_term")).toBeDefined();
  });
  it("unlocks legend on LÉGENDE ending", () => {
    const result = makeResult({ ending: "LÉGENDE" });
    const unlocked = checkUnlockedTitles({ result, allResults: [result] });
    expect(unlocked.find((t) => t.id === "legend")).toBeDefined();
  });
  it("unlocks speedrun_loss on fast revolution", () => {
    const result = makeResult({
      ending: "RÉVOLUTION",
      decisionsCount: 6,
      yearReached: 2,
    });
    const unlocked = checkUnlockedTitles({ result, allResults: [result] });
    expect(unlocked.find((t) => t.id === "speedrun_loss")).toBeDefined();
  });
  it("unlocks iron_fist with 3 autoritaire tags", () => {
    const result = makeResult({
      tags: ["autoritaire", "repression", "fraude"],
    });
    const unlocked = checkUnlockedTitles({ result, allResults: [result] });
    expect(unlocked.find((t) => t.id === "iron_fist")).toBeDefined();
  });
});
