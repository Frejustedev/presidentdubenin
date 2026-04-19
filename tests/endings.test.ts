import { describe, expect, it } from "vitest";
import { determineEnding, computeScore } from "@/lib/endings";

describe("determineEnding", () => {
  const mid = { peuple: 65, tresor: 65, armee: 65, pouvoir: 65 };
  const stellar = { peuple: 90, tresor: 90, armee: 90, pouvoir: 90 };

  it("revolution when peuple <= 0", () => {
    expect(determineEnding({ ...mid, peuple: 0 }, 4, [])).toBe("RÉVOLUTION");
  });
  it("faillite when tresor <= 0", () => {
    expect(determineEnding({ ...mid, tresor: 0 }, 4, [])).toBe("FAILLITE");
  });
  it("coup when armee <= 0", () => {
    expect(determineEnding({ ...mid, armee: 0 }, 4, [])).toBe("COUP D'ÉTAT");
  });
  it("exil when pouvoir <= 0", () => {
    expect(determineEnding({ ...mid, pouvoir: 0 }, 4, [])).toBe("EXIL");
  });
  it("legende at year 7 with stellar gauges & no autoritaire", () => {
    expect(determineEnding(stellar, 7, [])).toBe("LÉGENDE");
  });
  it("paisible at year 7 with mid gauges (below legende threshold)", () => {
    expect(determineEnding(mid, 7, [])).toBe("PAISIBLE");
  });
  it("tyrannie at year 7 with autoritaire tags", () => {
    expect(
      determineEnding(stellar, 7, [
        "autoritaire",
        "repression",
        "fraude",
      ])
    ).toBe("TYRANNIE");
  });
  it("transition at year 7 if tag transition_propre", () => {
    expect(determineEnding(stellar, 7, ["transition_propre"])).toBe("TRANSITION");
  });
  it("paisible by default before year 7", () => {
    expect(determineEnding(stellar, 3, [])).toBe("PAISIBLE");
  });
});

describe("computeScore", () => {
  it("returns higher score for LÉGENDE than IMPOPULAIRE", () => {
    const g = { peuple: 60, tresor: 60, armee: 60, pouvoir: 60 };
    const legend = computeScore(g, 7, 18, "LÉGENDE");
    const impop = computeScore(g, 7, 18, "IMPOPULAIRE");
    expect(legend).toBeGreaterThan(impop);
  });
  it("caps decisions bonus at 15", () => {
    const g = { peuple: 0, tresor: 0, armee: 0, pouvoir: 0 };
    const short = computeScore(g, 1, 5, "PAISIBLE");
    const long = computeScore(g, 1, 1000, "PAISIBLE");
    expect(long - short).toBeLessThan(20);
  });
});
