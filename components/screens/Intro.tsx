"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { FlagBar } from "@/components/FlagBar";

const SLIDES = [
  {
    emoji: "🇧🇯",
    title: "Avril 2026",
    text: "Vous venez d'être élu(e) Président(e) de la République du Bénin. Sept ans vous attendent.",
  },
  {
    emoji: "🧭",
    title: "Quatre jauges, un destin",
    text: "Peuple, Trésor, Armée, Pouvoir. Chacune peut vous sauver ou vous trahir. Elles n'ont pas de chiffres : gouvernez à l'instinct.",
  },
  {
    emoji: "🃏",
    title: "Des choix, pas des bonnes réponses",
    text: "À chaque événement, deux options. Aucune n'est parfaite. Tout choix a un prix.",
  },
  {
    emoji: "⚠️",
    title: "Si une jauge tombe à zéro…",
    text: "Révolution. Faillite. Coup d'État. Exil. Sept chutes possibles. Un seul mandat réussi.",
  },
  {
    emoji: "🗳️",
    title: "Votre nom dans l'histoire",
    text: "Tenez 7 ans. Laissez un pays plus fort qu'à votre arrivée. Le Bénin s'en souviendra.",
  },
];

export function IntroScreen() {
  const [i, setI] = useState(0);
  const setScreen = useGame((s) => s.setScreen);
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;

  const next = () => {
    if (last) setScreen("register");
    else setI(i + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <FlagBar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-md"
          >
            <div className="text-8xl mb-6" aria-hidden>
              {slide.emoji}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gold mb-4">
              {slide.title}
            </h2>
            <p className="text-ink-dim leading-relaxed text-lg">
              {slide.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex gap-2 mt-10">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={
                idx === i
                  ? "w-6 h-1.5 rounded-full bg-gold transition-all"
                  : "w-1.5 h-1.5 rounded-full bg-white/20 transition-all"
              }
            />
          ))}
        </div>

        <button onClick={next} className="btn-primary mt-10 min-w-[200px]">
          {last ? "COMMENCER" : "SUIVANT"}
        </button>

        {!last && (
          <button
            onClick={() => setScreen("register")}
            className="btn-ghost mt-3 text-sm"
          >
            Passer →
          </button>
        )}
      </div>
    </div>
  );
}
