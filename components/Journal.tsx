"use client";

import type { JournalEntry } from "@/lib/journal";

interface Props {
  entries: JournalEntry[];
}

export function Journal({ entries }: Props) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-3">
      {entries.map((e, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl border"
          style={{
            background: "linear-gradient(180deg, #efe3c7 0%, #e8d7a7 100%)",
            borderColor: "#b8925a",
            color: "#2a1d10",
            fontFamily: "Georgia, serif",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(184,146,90,0.3)",
          }}
        >
          <div className="flex items-center justify-between text-[9px] uppercase tracking-widest opacity-70 mb-2 border-b border-[#b8925a]/30 pb-1">
            <span className="font-bold">{e.newspaper.name}</span>
            <span>Année {e.year}</span>
          </div>
          <div className="font-bold text-lg leading-tight text-[#1a0f05]">
            {e.headline}
          </div>
          <div className="text-sm italic opacity-80 mt-1">
            {e.subheadline}
          </div>
        </div>
      ))}
    </div>
  );
}
