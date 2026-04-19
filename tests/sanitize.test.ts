import { describe, expect, it } from "vitest";
import {
  sanitizePlayerName,
  isValidPlayerName,
} from "@/lib/sanitize";

describe("sanitizePlayerName", () => {
  it("trims whitespace", () => {
    expect(sanitizePlayerName("  Koffi  ")).toBe("Koffi");
  });
  it("removes emojis", () => {
    expect(sanitizePlayerName("Koffi 🇧🇯")).toBe("Koffi");
  });
  it("removes HTML / script", () => {
    expect(sanitizePlayerName("<script>alert(1)</script>")).toBe("scriptalert1script");
  });
  it("allows accents and apostrophes", () => {
    expect(sanitizePlayerName("Adjovi O'Brien")).toBe("Adjovi O'Brien");
  });
  it("truncates to 30 chars", () => {
    expect(sanitizePlayerName("A".repeat(50)).length).toBe(30);
  });
});

describe("isValidPlayerName", () => {
  it("rejects empty", () => {
    expect(isValidPlayerName("").ok).toBe(false);
  });
  it("accepts normal", () => {
    expect(isValidPlayerName("Fréjuste Agboton").ok).toBe(true);
  });
  it("rejects blacklisted", () => {
    expect(isValidPlayerName("fuck you").ok).toBe(false);
  });
});
