import type { GameResult } from "./types";

const RESULTS_KEY = "septennat_results_v1";
const PROFILE_KEY = "septennat_profile_v1";
const TITLES_KEY = "septennat_titles_v1";

export interface Profile {
  name: string;
  totalGames: number;
  bestScore: number;
  createdAt: number;
}

export function loadResults(): GameResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveResult(result: GameResult): GameResult[] {
  if (typeof window === "undefined") return [];
  const results = loadResults();
  results.unshift(result);
  const trimmed = results.slice(0, 50);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));
  return trimmed;
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function loadTitles(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TITLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function unlockTitle(id: string): string[] {
  if (typeof window === "undefined") return [];
  const titles = loadTitles();
  if (!titles.includes(id)) {
    titles.push(id);
    localStorage.setItem(TITLES_KEY, JSON.stringify(titles));
  }
  return titles;
}
