"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { Gauges } from "@/components/Gauges";
import { EventCard } from "@/components/EventCard";
import { FlagBar } from "@/components/FlagBar";

export function PlayScreen() {
  const gauges = useGame((s) => s.gauges);
  const year = useGame((s) => s.year);
  const decisionsCount = useGame((s) => s.decisionsCount);
  const getCurrentEvent = useGame((s) => s.getCurrentEvent);
  const resolve = useGame((s) => s.resolveChoice);
  const playerName = useGame((s) => s.playerName);
  const currentEvent = getCurrentEvent();

  const totalDecisionsInYear = 4;
  const decInYear = decisionsCount % totalDecisionsInYear;
  const yearProgress = (decInYear / totalDecisionsInYear) * 100;

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />

      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest text-ink-faint uppercase">
              Président(e)
            </span>
            <span className="font-display text-lg text-ink leading-tight">
              {playerName || "Anonyme"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] tracking-widest text-ink-faint uppercase">
              Année
            </span>
            <div className="font-mono text-gold text-xl leading-tight">
              {year} / 7
            </div>
          </div>
        </div>

        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            initial={false}
            animate={{ width: `${yearProgress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="mt-5">
          <Gauges values={gauges} size={62} />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-5 py-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {currentEvent && (
              <EventCard
                key={currentEvent.id}
                event={currentEvent}
                onChoice={resolve}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex items-center justify-between text-[10px] text-ink-faint">
        <span className="tracking-widest uppercase">
          Décision {decisionsCount + 1}
        </span>
        <span className="font-mono">🇧🇯 {2025 + year}</span>
      </div>
    </div>
  );
}
