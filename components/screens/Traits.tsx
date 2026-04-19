"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import type { Difficulty } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { TRAITS } from "@/lib/traits";
import { loadProfile } from "@/lib/storage";
import type { TraitId } from "@/lib/types";

const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; emoji: string; desc: string }
> = {
  facile: {
    label: "Facile",
    emoji: "🌱",
    desc: "Jauges 60/65, zéro usure annuelle, effets négatifs atténués (−15%).",
  },
  normale: {
    label: "Normale",
    emoji: "🏛️",
    desc: "Jauges 50/55, −1 aléatoire par année, effets standards. Style Reigns.",
  },
  historique: {
    label: "Historique",
    emoji: "⚔️",
    desc: "Jauges 45/50, −2 aléatoire par année, effets négatifs amplifiés (+15%).",
  },
};

export function TraitsScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const setActiveTraits = useGame((s) => s.setActiveTraits);
  const setDifficulty = useGame((s) => s.setDifficulty);
  const activeTraits = useGame((s) => s.activeTraits);
  const difficulty = useGame((s) => s.difficulty);
  const [selected, setSelected] = useState<TraitId[]>(activeTraits);
  const [selDifficulty, setSelDifficulty] = useState<Difficulty>(difficulty);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const p = loadProfile();
    if (p) setXp(p.bestScore * 10 + (p.totalGames ?? 0) * 50);
  }, []);

  const toggle = (id: TraitId) => {
    setSelected((curr) =>
      curr.includes(id)
        ? curr.filter((t) => t !== id)
        : curr.length < 2
        ? [...curr, id]
        : curr
    );
  };

  const continueToRegister = () => {
    setActiveTraits(selected);
    setDifficulty(selDifficulty);
    setScreen("register");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <FlagBar />

      <div className="flex-1 px-5 py-6 max-w-md w-full mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen("intro")} className="btn-ghost">
            ← Retour
          </button>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-ink-faint">
              XP Acquis
            </div>
            <div className="font-mono text-gold">{xp}</div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="font-display text-2xl font-bold">Votre mandat</h2>
          <p className="text-sm text-ink-dim mt-1">
            Réglez la difficulté et choisissez jusqu'à 2 traits.
          </p>
        </div>

        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-widest text-ink-faint mb-2">
            Difficulté
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((d) => {
              const meta = DIFFICULTY_META[d];
              const active = selDifficulty === d;
              return (
                <button
                  key={d}
                  onClick={() => setSelDifficulty(d)}
                  className={`py-2 rounded-xl border text-center transition ${
                    active
                      ? "border-gold/80 bg-gold/10 text-ink"
                      : "border-white/10 bg-bg-panel/50 text-ink-dim hover:border-gold/40"
                  }`}
                >
                  <div className="text-lg">{meta.emoji}</div>
                  <div className="text-[11px] font-medium uppercase tracking-wider">
                    {meta.label}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-ink-dim italic text-center px-2">
            {DIFFICULTY_META[selDifficulty].desc}
          </div>
        </div>

        <div className="mt-4 mb-2">
          <div className="text-[10px] uppercase tracking-widest text-ink-faint">
            Traits (max 2)
          </div>
        </div>

        <div className="space-y-2">
          {TRAITS.map((t) => {
            const unlocked = xp >= t.costXP;
            const picked = selected.includes(t.id);
            return (
              <motion.button
                key={t.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => unlocked && toggle(t.id)}
                disabled={!unlocked}
                className={`w-full text-left panel p-3 border transition ${
                  picked
                    ? "border-gold/80 bg-gold/10"
                    : unlocked
                    ? "border-white/10 hover:border-gold/40"
                    : "border-white/5 opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{t.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-ink flex items-center gap-2">
                      {t.name}
                      {!unlocked && (
                        <span className="text-[10px] text-ink-faint">
                          🔒 {t.costXP} XP
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-ink-dim">
                      {t.description}
                    </div>
                  </div>
                  {picked && <span className="text-gold">✓</span>}
                </div>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={continueToRegister}
          className="btn-primary w-full mt-6"
        >
          CONTINUER
        </button>
      </div>
    </div>
  );
}
