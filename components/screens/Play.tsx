"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { Gauges } from "@/components/Gauges";
import { EventCard } from "@/components/EventCard";
import { FlagBar } from "@/components/FlagBar";
import { AdvisorBar } from "@/components/AdvisorBar";
import { AdvisorPanel } from "@/components/AdvisorPanel";
import { PowersBar } from "@/components/PowersBar";

export function PlayScreen() {
  const gauges = useGame((s) => s.gauges);
  const year = useGame((s) => s.year);
  const decisionsCount = useGame((s) => s.decisionsCount);
  const getCurrentEvent = useGame((s) => s.getCurrentEvent);
  const resolve = useGame((s) => s.resolveChoice);
  const playerName = useGame((s) => s.playerName);
  const currentEvent = getCurrentEvent();

  const DECISIONS_PER_YEAR = 12;
  const decInYear = decisionsCount - (year - 1) * DECISIONS_PER_YEAR;
  const month = Math.min(12, Math.max(1, decInYear + 1));
  const yearProgress = Math.min(100, (decInYear / DECISIONS_PER_YEAR) * 100);
  const MOIS_LABELS = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];
  const moisLabel = MOIS_LABELS[Math.min(11, decInYear)] ?? "Jan";

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />

      <div className="px-5 pt-4 pb-2">
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
              {moisLabel} {2025 + year}
            </span>
            <div className="font-mono text-gold text-xl leading-tight">
              An {year}/7
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

        <div className="mt-4">
          <Gauges values={gauges} size={58} tooltips />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-2">
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

      <div className="px-4 pb-2">
        <div className="text-[9px] uppercase tracking-widest text-ink-faint mb-1 text-center">
          Conseillers
        </div>
        <AdvisorBar />
      </div>

      <div className="px-4 pb-2">
        <div className="text-[9px] uppercase tracking-widest text-ink-faint mb-1 text-center">
          Pouvoirs exceptionnels
        </div>
        <PowersBar />
      </div>

      <div className="px-5 pb-3 pt-1 flex items-center justify-between text-[10px] text-ink-faint">
        <span className="tracking-widest uppercase">
          Mois {month}/12 · Décision {decisionsCount + 1}/84
        </span>
        <span className="font-mono">🇧🇯 {moisLabel} {2025 + year}</span>
      </div>

      <AdvisorPanel />
    </div>
  );
}
