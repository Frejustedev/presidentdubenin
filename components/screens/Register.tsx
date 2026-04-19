"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { loadProfile, saveProfile } from "@/lib/storage";
import { isValidPlayerName, sanitizePlayerName } from "@/lib/sanitize";

export function RegisterScreen() {
  const [name, setName] = useState("");
  const setPlayerName = useGame((s) => s.setPlayerName);
  const startGame = useGame((s) => s.startGame);

  useEffect(() => {
    const p = loadProfile();
    if (p?.name) setName(p.name);
  }, []);

  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const clean = sanitizePlayerName(name);
    const check = isValidPlayerName(clean);
    if (!check.ok) {
      setError(check.reason ?? "Nom invalide.");
      return;
    }
    setError(null);
    setPlayerName(clean);
    const existing = loadProfile();
    saveProfile({
      name: clean,
      totalGames: existing?.totalGames ?? 0,
      bestScore: existing?.bestScore ?? 0,
      createdAt: existing?.createdAt ?? Date.now(),
    });
    startGame();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <FlagBar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-6xl mb-4">🇧🇯</div>
          <h2 className="font-display text-3xl font-bold mb-2">
            Votre nom, Président(e) ?
          </h2>
          <p className="text-ink-dim text-sm mb-8">
            Sous ce nom, les générations futures vous jugeront.
          </p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Votre nom présidentiel"
            maxLength={30}
            autoFocus
            className="w-full bg-bg-panel border border-white/10 focus:border-gold/60 rounded-2xl px-5 py-4 text-center font-display text-2xl text-ink placeholder-ink-faint outline-none transition"
          />

          {error && (
            <div className="mt-3 text-sm text-benin-red" role="alert">
              {error}
            </div>
          )}
          <button
            onClick={submit}
            disabled={!name.trim()}
            aria-label="Prêter serment et commencer la partie"
            className="btn-primary w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            PRÊTER SERMENT
          </button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: name.trim() ? 0.8 : 0 }}
            className="mt-6 italic text-sm text-ink-dim"
          >
            « Je jure de servir fidèlement la République… »
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
