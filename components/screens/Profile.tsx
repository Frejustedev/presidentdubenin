"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { ENDINGS } from "@/lib/endings";
import { TITLES } from "@/lib/titles";
import { loadProfile, loadResults, loadTitles } from "@/lib/storage";
import { loadStreak } from "@/lib/daily";
import type { GameResult } from "@/lib/types";

export function ProfileScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const [profile, setProfile] = useState<ReturnType<typeof loadProfile>>(null);
  const [results, setResults] = useState<GameResult[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setProfile(loadProfile());
    setResults(loadResults());
    setTitles(loadTitles());
    setStreak(loadStreak().count);
  }, []);

  const totalGames = results.length;
  const bestScore = results.reduce((a, r) => Math.max(a, r.score), 0);
  const topEnding = (() => {
    const counts: Record<string, number> = {};
    results.forEach((r) => (counts[r.ending] = (counts[r.ending] ?? 0) + 1));
    return (
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"
    );
  })();
  const totalMinutes = Math.round(
    results.reduce((a, r) => a + (r.durationSeconds ?? 0), 0) / 60
  );

  return (
    <div className="min-h-screen flex flex-col">
      <FlagBar />

      <div className="flex-1 px-5 py-6 max-w-md w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setScreen("title")} className="btn-ghost">
            ← Retour
          </button>
          <h2 className="font-display text-2xl font-bold text-gold">
            Profil
          </h2>
          <div className="w-12" />
        </div>

        <div className="panel p-5 text-center mb-6">
          <div className="text-5xl mb-2">🎖️</div>
          <div className="font-display text-xl text-ink">
            {profile?.name ?? "Anonyme"}
          </div>
          <div className="text-xs text-ink-dim italic">
            Depuis {profile ? new Date(profile.createdAt).toLocaleDateString("fr-FR") : "—"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard label="Parties" value={totalGames.toString()} />
          <StatCard
            label="Meilleur score"
            value={bestScore.toString()}
            accent
          />
          <StatCard label="Fin fréquente" value={topEnding} />
          <StatCard label="Temps joué" value={`${totalMinutes} min`} />
          <StatCard label="Défi streak" value={`🔥 ${streak}`} />
          <StatCard
            label="Titres"
            value={`${titles.length} / ${TITLES.length}`}
          />
        </div>

        <div className="mb-6">
          <div className="text-[10px] tracking-widest text-ink-faint uppercase mb-3">
            Collection de titres
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TITLES.map((t) => {
              const unlocked = titles.includes(t.id);
              const hidden = t.secret && !unlocked;
              return (
                <motion.div
                  key={t.id}
                  whileTap={{ scale: 0.96 }}
                  className={`aspect-square panel p-2 flex flex-col items-center justify-center text-center ${
                    unlocked
                      ? "border-gold/30"
                      : "opacity-30 grayscale"
                  }`}
                  title={unlocked ? `${t.name} — ${t.description}` : "🔒 Secret"}
                >
                  <div className="text-2xl">{hidden ? "❓" : t.icon}</div>
                  <div className="text-[9px] text-ink-dim mt-1 line-clamp-2">
                    {hidden ? "???" : t.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-widest text-ink-faint uppercase mb-3">
            Dernières parties
          </div>
          {results.length === 0 ? (
            <div className="text-center text-ink-dim text-sm">
              Aucune partie encore.
            </div>
          ) : (
            <div className="space-y-2">
              {results.slice(0, 10).map((r) => {
                const e = ENDINGS[r.ending];
                return (
                  <div
                    key={r.playedAt}
                    className="panel p-3 flex items-center gap-3"
                  >
                    <span className="text-2xl">{e.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-ink">{e.type}</div>
                      <div className="text-[10px] text-ink-dim">
                        {new Date(r.playedAt).toLocaleDateString("fr-FR")} · an{" "}
                        {r.yearReached}
                        {r.isDailyChallenge && " · 📅 Défi"}
                      </div>
                    </div>
                    <div className="font-mono text-gold font-bold">
                      {r.score}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="panel p-3">
      <div className="text-[9px] tracking-widest text-ink-faint uppercase">
        {label}
      </div>
      <div
        className={`font-mono mt-1 ${
          accent ? "text-gold text-2xl" : "text-ink text-lg"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
