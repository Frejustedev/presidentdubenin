"use client";

import { motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";
import { useEffect, useState } from "react";
import { initAudio, isMuted, setMuted } from "@/lib/audio";
import {
  currentDailySeed,
  hasPlayedTodayDaily,
  loadStreak,
  markDailyPlayed,
} from "@/lib/daily";
import { loadProfile } from "@/lib/storage";

export function TitleScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const setPlayerName = useGame((s) => s.setPlayerName);
  const startGame = useGame((s) => s.startGame);
  const [muted, setMutedState] = useState(false);
  const [canDaily, setCanDaily] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    initAudio();
    setMutedState(isMuted());
    setCanDaily(!hasPlayedTodayDaily());
    setStreak(loadStreak().count);
  }, []);

  const startDaily = () => {
    const profile = loadProfile();
    if (profile?.name) setPlayerName(profile.name);
    markDailyPlayed();
    startGame({ daily: true, seed: currentDailySeed() });
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <FlagBar />

      {/* Étoiles décoratives */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs tracking-[0.4em] text-gold/80 mb-3 font-mono">
            BÉNIN • 2026 — 2033
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-none">
            <span className="shimmer">LE SEPTENNAT</span>
          </h1>
          <p className="text-sm md:text-base text-ink-dim mt-4 italic max-w-xs mx-auto">
            Simulation Présidentielle.
            <br />
            Chaque décision compte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 flex flex-col items-stretch gap-3 w-full max-w-xs"
        >
          <button
            onClick={() => setScreen("intro")}
            className="btn-primary"
          >
            JOUER
          </button>
          <button
            onClick={startDaily}
            disabled={!canDaily}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            📅 Défi du jour {streak > 0 && <span className="ml-1 text-gold">🔥 {streak}</span>}
            {!canDaily && <span className="ml-2 text-xs">(déjà joué)</span>}
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setScreen("leaderboard")}
              className="btn-secondary"
            >
              🏆 Classement
            </button>
            <button
              onClick={() => setScreen("profile")}
              className="btn-secondary"
            >
              🎖️ Profil
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-20 flex gap-6 text-3xl"
        >
          {["👥", "💰", "🛡️", "🏛️"].map((emoji, i) => (
            <motion.span
              key={emoji}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 text-xl opacity-60 hover:opacity-100 transition"
        title={muted ? "Activer le son" : "Couper le son"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="py-4 text-center text-[10px] text-ink-faint tracking-widest uppercase">
        v1.0 • Simulation politique
      </div>
    </div>
  );
}
