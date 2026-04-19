const STREAK_KEY = "septennat_streak_v1";
const LAST_DAILY_KEY = "septennat_last_daily_v1";

export function currentDailySeed(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`;
}

export interface StreakInfo {
  count: number;
  lastPlayedDate: string | null;
}

export function loadStreak(): StreakInfo {
  if (typeof window === "undefined") return { count: 0, lastPlayedDate: null };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastPlayedDate: null };
    return JSON.parse(raw);
  } catch {
    return { count: 0, lastPlayedDate: null };
  }
}

export function saveStreak(s: StreakInfo): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(s));
}

export function hasPlayedTodayDaily(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LAST_DAILY_KEY) === currentDailySeed();
}

export function markDailyPlayed(): void {
  if (typeof window === "undefined") return;
  const today = currentDailySeed();
  localStorage.setItem(LAST_DAILY_KEY, today);
  const s = loadStreak();
  const yesterday = yesterdayIso();
  if (s.lastPlayedDate === today) return;
  if (s.lastPlayedDate === yesterday) {
    saveStreak({ count: s.count + 1, lastPlayedDate: today });
  } else {
    saveStreak({ count: 1, lastPlayedDate: today });
  }
}

function yesterdayIso(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`;
}

export function msUntilNextDaily(): number {
  const now = new Date();
  const next = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0
    )
  );
  return next.getTime() - now.getTime();
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function formatDailyLabel(seed: string): string {
  const [y, m, d] = seed.split("-");
  return `${d}/${m}/${y}`;
}
