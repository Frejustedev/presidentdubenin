"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { ADVISORS_LIST, advisorForCategory } from "@/lib/advisors";

export function AdvisorBar() {
  const cooldowns = useGame((s) => s.cooldowns);
  const loyalties = useGame((s) => s.loyalties);
  const consult = useGame((s) => s.consultAdvisor);
  const getEv = useGame((s) => s.getCurrentEvent);
  const ev = getEv();
  if (!ev) return null;

  const suggested = advisorForCategory(ev.cat);

  return (
    <div className="flex items-center gap-2 justify-between">
      {ADVISORS_LIST.map((a) => {
        const cd = cooldowns[a.id];
        const loy = loyalties[a.id];
        const isSuggested = a.id === suggested;
        return (
          <button
            key={a.id}
            onClick={() => consult(a.id)}
            disabled={cd > 0 || loy <= 0}
            className={clsx(
              "relative flex-1 flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl border transition",
              cd > 0 || loy <= 0
                ? "opacity-40 cursor-not-allowed border-white/5 bg-bg-panel/40"
                : "border-white/10 bg-bg-panel/60 hover:border-gold/40 active:scale-[0.98]",
              isSuggested && cd === 0 && loy > 0 && "ring-1 ring-gold/50"
            )}
            style={
              cd === 0 && loy > 0 && isSuggested
                ? {
                    boxShadow: `inset 0 0 0 1px ${a.accentColor}33, 0 0 10px ${a.accentColor}22`,
                  }
                : {}
            }
            title={
              loy <= 0
                ? `${a.name} a démissionné`
                : cd > 0
                ? `Disponible dans ${cd} tour${cd > 1 ? "s" : ""}`
                : `Consulter ${a.name}`
            }
          >
            <span className="text-xl">{a.emoji}</span>
            <span className="text-[9px] uppercase tracking-wider text-ink-dim truncate max-w-full">
              {a.name.split(" ")[0]}
            </span>
            {cd > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-bg-deep border border-gold/40 text-[10px] grid place-items-center text-gold font-mono"
              >
                {cd}
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}
