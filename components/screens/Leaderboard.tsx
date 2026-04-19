"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { ENDINGS } from "@/lib/endings";
import { loadResults } from "@/lib/storage";
import type { GameResult } from "@/lib/types";

export function LeaderboardScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    setResults(loadResults());
  }, []);

  const sorted = [...results].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen flex flex-col">
      <FlagBar />

      <div className="px-5 py-6 max-w-md w-full mx-auto flex-1">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setScreen("title")}
            className="btn-ghost"
          >
            ← Retour
          </button>
          <h2 className="font-display text-2xl font-bold text-gold">
            🏆 Classement
          </h2>
          <div className="w-12" />
        </div>

        {sorted.length === 0 ? (
          <div className="text-center text-ink-dim mt-20">
            <div className="text-6xl mb-4">🗳️</div>
            <p>Aucune partie enregistrée.</p>
            <p className="text-sm mt-2">Commencez votre premier mandat !</p>
            <button
              onClick={() => setScreen("intro")}
              className="btn-primary mt-8"
            >
              JOUER
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((r, idx) => {
              const ending = ENDINGS[r.ending];
              const medal =
                idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
              return (
                <motion.div
                  key={r.playedAt}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="panel p-3 flex items-center gap-3"
                >
                  <div className="w-8 text-center">
                    {medal ?? (
                      <span className="text-ink-faint font-mono text-sm">
                        #{idx + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ink font-medium truncate">
                      {r.playerName}
                    </div>
                    <div className="text-xs text-ink-dim flex items-center gap-1">
                      <span style={{ color: ending.color }}>
                        {ending.emoji} {ending.type}
                      </span>
                      <span>· an {r.yearReached}</span>
                    </div>
                  </div>
                  <div className="font-mono text-gold font-bold text-lg">
                    {r.score}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
