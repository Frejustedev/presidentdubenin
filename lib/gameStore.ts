"use client";

import { create } from "zustand";
import { EVENTS } from "@/data/events";
import type { GameEvent, Gauges, PlayedEvent } from "./types";
import { determineEnding, computeScore } from "./endings";

const START_GAUGES: Gauges = {
  peuple: 55,
  tresor: 55,
  armee: 55,
  pouvoir: 60,
};

const DECISIONS_PER_YEAR = 4;
const TOTAL_DECISIONS = DECISIONS_PER_YEAR * 7;

type Screen = "title" | "intro" | "register" | "play" | "end" | "leaderboard";

interface GameState {
  screen: Screen;
  playerName: string;
  gauges: Gauges;
  year: number;
  decisionsCount: number;
  currentEventId: number | null;
  history: PlayedEvent[];
  tags: string[];
  seenEventIds: number[];
  activeChain: string | null;
  startedAt: number | null;
  ending: ReturnType<typeof determineEnding> | null;
  score: number;

  setScreen: (s: Screen) => void;
  setPlayerName: (n: string) => void;
  startGame: () => void;
  resolveChoice: (choice: "a" | "b") => void;
  pickNextEvent: () => void;
  getCurrentEvent: () => GameEvent | null;
  resetGame: () => void;
}

function eligible(
  ev: GameEvent,
  year: number,
  tags: string[],
  seen: number[],
  activeChain: string | null
): boolean {
  if (seen.includes(ev.id)) return false;
  if (ev.year !== undefined && ev.year !== year) return false;
  if (ev.minYear !== undefined && year < ev.minYear) return false;
  if (ev.maxYear !== undefined && year > ev.maxYear) return false;
  if (ev.requireTags?.length) {
    if (!ev.requireTags.every((t) => tags.includes(t))) return false;
  }
  if (ev.forbidTags?.length) {
    if (ev.forbidTags.some((t) => tags.includes(t))) return false;
  }
  if (ev.chainId) {
    if (activeChain && ev.chainId === activeChain) return true;
    if (!ev.requireTags?.length) return false;
  }
  return true;
}

const RARITY_WEIGHT: Record<GameEvent["rarity"], number> = {
  common: 10,
  uncommon: 4,
  rare: 2,
  legendary: 1,
};

function weightedPick<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

export const useGame = create<GameState>((set, get) => ({
  screen: "title",
  playerName: "",
  gauges: { ...START_GAUGES },
  year: 1,
  decisionsCount: 0,
  currentEventId: null,
  history: [],
  tags: [],
  seenEventIds: [],
  activeChain: null,
  startedAt: null,
  ending: null,
  score: 0,

  setScreen: (s) => set({ screen: s }),
  setPlayerName: (n) => set({ playerName: n }),

  startGame: () => {
    set({
      screen: "play",
      gauges: { ...START_GAUGES },
      year: 1,
      decisionsCount: 0,
      currentEventId: null,
      history: [],
      tags: [],
      seenEventIds: [],
      activeChain: null,
      startedAt: Date.now(),
      ending: null,
      score: 0,
    });
    get().pickNextEvent();
  },

  pickNextEvent: () => {
    const { year, tags, seenEventIds, activeChain } = get();

    const chainEvents = activeChain
      ? EVENTS.filter(
          (e) =>
            e.chainId === activeChain &&
            eligible(e, year, tags, seenEventIds, activeChain)
        )
      : [];

    let candidates: GameEvent[] = [];
    if (chainEvents.length > 0) {
      candidates = chainEvents;
    } else {
      candidates = EVENTS.filter((e) =>
        eligible(e, year, tags, seenEventIds, null)
      );
    }

    if (candidates.length === 0) {
      const fallback = EVENTS.filter((e) => !seenEventIds.includes(e.id));
      if (fallback.length === 0) {
        set({ currentEventId: null });
        return;
      }
      candidates = fallback;
    }

    const weights = candidates.map((e) => RARITY_WEIGHT[e.rarity]);
    const picked = weightedPick(candidates, weights);
    set({ currentEventId: picked.id, activeChain: null });
  },

  getCurrentEvent: () => {
    const id = get().currentEventId;
    if (id === null) return null;
    return EVENTS.find((e) => e.id === id) ?? null;
  },

  resolveChoice: (choice) => {
    const state = get();
    const ev = state.getCurrentEvent();
    if (!ev) return;

    const c = choice === "a" ? ev.a : ev.b;
    const before = { ...state.gauges };
    const after: Gauges = {
      peuple: clamp(before.peuple + (c.fx.peuple ?? 0)),
      tresor: clamp(before.tresor + (c.fx.tresor ?? 0)),
      armee: clamp(before.armee + (c.fx.armee ?? 0)),
      pouvoir: clamp(before.pouvoir + (c.fx.pouvoir ?? 0)),
    };

    const impact = Math.abs(
      (c.fx.peuple ?? 0) +
        (c.fx.tresor ?? 0) +
        (c.fx.armee ?? 0) +
        (c.fx.pouvoir ?? 0)
    );

    const playedEvent: PlayedEvent = {
      eventId: ev.id,
      choice,
      year: state.year,
      gaugesBefore: before,
      gaugesAfter: after,
      impact,
    };

    const newTags = [...state.tags, ...(c.tags ?? [])];
    const newHistory = [...state.history, playedEvent];
    const newSeen = [...state.seenEventIds, ev.id];
    const newDecisions = state.decisionsCount + 1;
    const newYear = Math.min(
      7,
      Math.ceil(newDecisions / DECISIONS_PER_YEAR)
    );
    const activeChain = c.nextChain ?? null;

    // Vérifier fin de partie
    const anyZero =
      after.peuple <= 0 ||
      after.tresor <= 0 ||
      after.armee <= 0 ||
      after.pouvoir <= 0;

    const yearOver = newDecisions >= TOTAL_DECISIONS;

    if (anyZero || yearOver) {
      const ending = determineEnding(after, newYear, newTags);
      const score = computeScore(after, newYear, newDecisions, ending);
      set({
        gauges: after,
        year: newYear,
        decisionsCount: newDecisions,
        history: newHistory,
        tags: newTags,
        seenEventIds: newSeen,
        ending,
        score,
        screen: "end",
      });
      return;
    }

    set({
      gauges: after,
      year: newYear,
      decisionsCount: newDecisions,
      history: newHistory,
      tags: newTags,
      seenEventIds: newSeen,
      activeChain,
    });
    get().pickNextEvent();
  },

  resetGame: () => {
    set({
      screen: "title",
      gauges: { ...START_GAUGES },
      year: 1,
      decisionsCount: 0,
      currentEventId: null,
      history: [],
      tags: [],
      seenEventIds: [],
      activeChain: null,
      startedAt: null,
      ending: null,
      score: 0,
    });
  },
}));

function clamp(v: number): number {
  return Math.max(0, Math.min(100, v));
}
