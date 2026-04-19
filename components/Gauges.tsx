"use client";

import { Gauge } from "./Gauge";
import type { Gauges as GaugeValues } from "@/lib/types";

interface Props {
  values: GaugeValues;
  size?: number;
  tooltips?: boolean;
}

const TIPS = {
  peuple: "Soutien populaire. Si 0 : révolution.",
  tresor: "Finances publiques. Si 0 : faillite.",
  armee: "Loyauté militaire. Si 0 : coup d'État.",
  pouvoir: "Légitimité institutionnelle. Si 0 : exil.",
};

export function Gauges({ values, size = 68, tooltips = false }: Props) {
  return (
    <div className="flex items-center justify-around w-full gap-2">
      <Gauge
        value={values.peuple}
        label="Peuple"
        emoji="👥"
        color="#22d3ee"
        size={size}
        tooltip={tooltips ? TIPS.peuple : undefined}
      />
      <Gauge
        value={values.tresor}
        label="Trésor"
        emoji="💰"
        color="#eab308"
        size={size}
        tooltip={tooltips ? TIPS.tresor : undefined}
      />
      <Gauge
        value={values.armee}
        label="Armée"
        emoji="🛡️"
        color="#ef4444"
        size={size}
        tooltip={tooltips ? TIPS.armee : undefined}
      />
      <Gauge
        value={values.pouvoir}
        label="Pouvoir"
        emoji="🏛️"
        color="#a855f7"
        size={size}
        tooltip={tooltips ? TIPS.pouvoir : undefined}
      />
    </div>
  );
}
