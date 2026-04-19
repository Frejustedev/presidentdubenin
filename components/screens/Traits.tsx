"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { TRAITS } from "@/lib/traits";
import { loadProfile } from "@/lib/storage";
import type { TraitId } from "@/lib/types";

export function TraitsScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const setActiveTraits = useGame((s) => s.setActiveTraits);
  const activeTraits = useGame((s) => s.activeTraits);
  const [selected, setSelected] = useState<TraitId[]>(activeTraits);
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

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold">Vos atouts</h2>
          <p className="text-sm text-ink-dim mt-1">
            Choisissez jusqu'à 2 traits avant votre serment.
          </p>
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
