"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { ADVISORS } from "@/lib/advisors";

export function AdvisorPanel() {
  const said = useGame((s) => s.advisorSaid);
  const clear = useGame((s) => s.clearAdvisorSaid);

  const advisor = said ? ADVISORS[said.advisor] : null;

  return (
    <AnimatePresence>
      {said && advisor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={clear}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-end justify-center"
        >
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative panel max-w-md w-full m-4 p-5 border"
            style={{ borderColor: `${advisor.accentColor}44` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-14 h-14 rounded-full grid place-items-center text-3xl"
                style={{
                  background: `${advisor.accentColor}22`,
                  boxShadow: `0 0 20px ${advisor.accentColor}33`,
                }}
              >
                {advisor.emoji}
              </div>
              <div>
                <div className="font-display text-lg text-ink font-bold">
                  {advisor.name}
                </div>
                <div
                  className="text-xs uppercase tracking-widest"
                  style={{ color: advisor.accentColor }}
                >
                  {advisor.title}
                </div>
                <div className="text-[10px] text-ink-faint italic">
                  {advisor.archetype}
                </div>
              </div>
            </div>

            <div
              className="text-ink text-base leading-relaxed my-4 border-l-2 pl-4"
              style={{ borderColor: `${advisor.accentColor}88` }}
            >
              « {said.text} »
            </div>

            <button onClick={clear} className="btn-secondary w-full">
              Je comprends
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
