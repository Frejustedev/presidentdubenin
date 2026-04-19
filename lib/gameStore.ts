"use client";

import { create } from "zustand";
import { EVENTS } from "@/data/events";
import type {
  GameEvent,
  Gauges,
  PlayedEvent,
  TraitId,
} from "./types";
import { determineEnding, computeScore } from "./endings";
import { applyTraitsToEffect } from "./traits";
import type { AdvisorId } from "./advisors";
import { advisorForCategory, ADVISORS } from "./advisors";
import type { PowerId } from "./powers";

const START_GAUGES: Gauges = {
  peuple: 55,
  tresor: 55,
  armee: 55,
  pouvoir: 60,
};

const DECISIONS_PER_YEAR = 4;
const TOTAL_DECISIONS = DECISIONS_PER_YEAR * 7;
const BASE_COOLDOWN = 3;
const START_LOYALTY = 60;

type Screen =
  | "title"
  | "intro"
  | "register"
  | "play"
  | "end"
  | "leaderboard"
  | "traits"
  | "profile";

type Loyalties = Record<AdvisorId, number>;
type Cooldowns = Record<AdvisorId, number>;

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

  // Conseillers
  loyalties: Loyalties;
  cooldowns: Cooldowns;
  advisorSaid: {
    advisor: AdvisorId;
    reco: "a" | "b" | "hesitant";
    text: string;
  } | null;

  // Pouvoirs
  powersUsed: PowerId[];
  revealNext: boolean;

  // Traits
  activeTraits: TraitId[];

  // Daily
  isDaily: boolean;
  dailySeed: string | null;

  setScreen: (s: Screen) => void;
  setPlayerName: (n: string) => void;
  setActiveTraits: (traits: TraitId[]) => void;
  startGame: (options?: { daily?: boolean; seed?: string | null }) => void;
  resolveChoice: (choice: "a" | "b" | "c") => void;
  pickNextEvent: () => void;
  getCurrentEvent: () => GameEvent | null;
  resetGame: () => void;
  consultAdvisor: (id: AdvisorId) => void;
  clearAdvisorSaid: () => void;
  usePower: (id: PowerId) => void;
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

function weightedPick<T>(items: T[], weights: number[], rng: () => number): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

// Mulberry32 PRNG pour daily challenge
function createRng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const initialLoyalties: Loyalties = {
  peuple: START_LOYALTY,
  tresor: START_LOYALTY,
  armee: START_LOYALTY,
  pouvoir: START_LOYALTY,
};
const zeroCooldowns: Cooldowns = {
  peuple: 0,
  tresor: 0,
  armee: 0,
  pouvoir: 0,
};

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
  loyalties: { ...initialLoyalties },
  cooldowns: { ...zeroCooldowns },
  advisorSaid: null,
  powersUsed: [],
  revealNext: false,
  activeTraits: [],
  isDaily: false,
  dailySeed: null,

  setScreen: (s) => set({ screen: s }),
  setPlayerName: (n) => set({ playerName: n }),
  setActiveTraits: (traits) => set({ activeTraits: traits.slice(0, 2) }),

  startGame: (options) => {
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
      loyalties: { ...initialLoyalties },
      cooldowns: { ...zeroCooldowns },
      advisorSaid: null,
      powersUsed: [],
      revealNext: false,
      isDaily: !!options?.daily,
      dailySeed: options?.seed ?? null,
    });
    get().pickNextEvent();
  },

  pickNextEvent: () => {
    const state = get();
    const { year, tags, seenEventIds, activeChain, isDaily, dailySeed } = state;

    const rng = isDaily && dailySeed
      ? createRng(hashSeed(dailySeed + ":" + state.decisionsCount))
      : Math.random;

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
    const picked = weightedPick(candidates, weights, rng);
    set({
      currentEventId: picked.id,
      activeChain: null,
      advisorSaid: null,
    });
  },

  getCurrentEvent: () => {
    const id = get().currentEventId;
    if (id === null) return null;
    return EVENTS.find((e) => e.id === id) ?? null;
  },

  consultAdvisor: (id) => {
    const state = get();
    if (state.cooldowns[id] > 0) return;
    const ev = state.getCurrentEvent();
    if (!ev) return;
    import("./advisors").then(({ advisorAdvice }) => {
      const advice = advisorAdvice(
        id,
        ev.a.fx,
        ev.b.fx,
        state.loyalties[id]
      );
      set((s) => ({
        advisorSaid: {
          advisor: id,
          reco: advice.recommends,
          text: advice.text,
        },
        cooldowns: {
          ...s.cooldowns,
          [id]:
            BASE_COOLDOWN -
            (s.activeTraits.includes("vieux_routier") ? 1 : 0),
        },
      }));
    });
  },

  clearAdvisorSaid: () => set({ advisorSaid: null }),

  usePower: (id) => {
    const state = get();
    if (state.powersUsed.includes(id)) return;

    if (id === "discours") {
      set({
        gauges: {
          peuple: clamp(state.gauges.peuple + 5),
          tresor: clamp(state.gauges.tresor + 5),
          armee: clamp(state.gauges.armee + 5),
          pouvoir: clamp(state.gauges.pouvoir + 5),
        },
        powersUsed: [...state.powersUsed, id],
      });
    } else if (id === "referendum") {
      const last = state.history[state.history.length - 1];
      if (!last) return;
      set({
        gauges: last.gaugesBefore,
        history: state.history.slice(0, -1),
        seenEventIds: state.seenEventIds.filter((i) => i !== last.eventId),
        decisionsCount: Math.max(0, state.decisionsCount - 1),
        year: Math.max(
          1,
          Math.min(7, Math.ceil((state.decisionsCount - 1) / DECISIONS_PER_YEAR))
        ),
        currentEventId: last.eventId,
        powersUsed: [...state.powersUsed, id],
      });
    } else if (id === "services") {
      set({
        revealNext: true,
        powersUsed: [...state.powersUsed, id],
      });
    } else if (id === "remaniement") {
      set({
        cooldowns: { ...zeroCooldowns },
        powersUsed: [...state.powersUsed, id],
      });
    }
  },

  resolveChoice: (choice) => {
    const state = get();
    const ev = state.getCurrentEvent();
    if (!ev) return;

    const c =
      choice === "c"
        ? ev.c ?? ev.a
        : choice === "a"
        ? ev.a
        : ev.b;

    const fx = applyTraitsToEffect(c.fx, state.activeTraits);

    const before = { ...state.gauges };
    const after: Gauges = {
      peuple: clamp(before.peuple + (fx.peuple ?? 0)),
      tresor: clamp(before.tresor + (fx.tresor ?? 0)),
      armee: clamp(before.armee + (fx.armee ?? 0)),
      pouvoir: clamp(before.pouvoir + (fx.pouvoir ?? 0)),
    };

    const impact = Math.abs(
      (fx.peuple ?? 0) +
        (fx.tresor ?? 0) +
        (fx.armee ?? 0) +
        (fx.pouvoir ?? 0)
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

    // Mise à jour loyautés : conseiller dont avis suivi = +4, ignoré = -2
    const newLoyalties = { ...state.loyalties };
    if (state.advisorSaid) {
      const { advisor, reco } = state.advisorSaid;
      if (reco === choice) newLoyalties[advisor] = Math.min(100, newLoyalties[advisor] + 4);
      else if (reco !== "hesitant") newLoyalties[advisor] = Math.max(0, newLoyalties[advisor] - 2);
    }

    // Décrémenter les cooldowns
    const newCooldowns: Cooldowns = {
      peuple: Math.max(0, state.cooldowns.peuple - 1),
      tresor: Math.max(0, state.cooldowns.tresor - 1),
      armee: Math.max(0, state.cooldowns.armee - 1),
      pouvoir: Math.max(0, state.cooldowns.pouvoir - 1),
    };

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
        loyalties: newLoyalties,
        cooldowns: newCooldowns,
        advisorSaid: null,
        revealNext: false,
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
      loyalties: newLoyalties,
      cooldowns: newCooldowns,
      advisorSaid: null,
      revealNext: false,
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
      loyalties: { ...initialLoyalties },
      cooldowns: { ...zeroCooldowns },
      advisorSaid: null,
      powersUsed: [],
      revealNext: false,
      isDaily: false,
      dailySeed: null,
    });
  },
}));

function clamp(v: number): number {
  return Math.max(0, Math.min(100, v));
}

export { ADVISORS };
