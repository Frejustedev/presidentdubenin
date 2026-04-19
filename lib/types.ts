export type GaugeKey = "peuple" | "tresor" | "armee" | "pouvoir";

export type Gauges = Record<GaugeKey, number>;

export type Effect = Partial<Gauges>;

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export type Category = "PEUPLE" | "ÉCONOMIE" | "SÉCURITÉ" | "POUVOIR";

export interface Choice {
  label: string;
  fx: Effect;
  tags?: string[];
  nextChain?: string | null;
}

export interface HiddenChoice extends Choice {
  unlockTags?: string[];
  unlockLoyalty?: { advisor: "peuple" | "tresor" | "armee" | "pouvoir"; min: number };
  unlockTrait?: string;
}

export interface GameEvent {
  id: number;
  title: string;
  desc: string;
  icon: string;
  cat: Category;
  year?: number;
  minYear?: number;
  maxYear?: number;
  rarity: Rarity;
  requireTags?: string[];
  forbidTags?: string[];
  chainId?: string | null;
  a: Choice;
  b: Choice;
  c?: HiddenChoice;
}

export type EndingType =
  | "LÉGENDE"
  | "PAISIBLE"
  | "IMPOPULAIRE"
  | "RÉVOLUTION"
  | "FAILLITE"
  | "COUP D'ÉTAT"
  | "TYRANNIE"
  | "EXIL"
  | "TRANSITION";

export interface Ending {
  type: EndingType;
  emoji: string;
  color: string;
  subtitle: string;
  narrative: string;
}

export interface PlayedEvent {
  eventId: number;
  choice: "a" | "b" | "c";
  year: number;
  gaugesBefore: Gauges;
  gaugesAfter: Gauges;
  impact: number;
}

export interface GameResult {
  playerName: string;
  score: number;
  ending: EndingType;
  yearReached: number;
  decisionsCount: number;
  durationSeconds: number;
  finalGauges: Gauges;
  playedAt: number;
  keyMoments: PlayedEvent[];
  tags: string[];
  isDailyChallenge?: boolean;
  dailySeed?: string;
  activeTraits?: string[];
}

export type TraitId =
  | "charisme"
  | "rigueur"
  | "strategie"
  | "animal_politique"
  | "vieux_routier"
  | "visionnaire";
