"use client";

import { Gauge } from "./Gauge";
import type { Gauges as GaugeValues } from "@/lib/types";

interface Props {
  values: GaugeValues;
  size?: number;
}

export function Gauges({ values, size = 68 }: Props) {
  return (
    <div className="flex items-center justify-around w-full gap-2">
      <Gauge
        value={values.peuple}
        label="Peuple"
        emoji="👥"
        color="#22d3ee"
        size={size}
      />
      <Gauge
        value={values.tresor}
        label="Trésor"
        emoji="💰"
        color="#eab308"
        size={size}
      />
      <Gauge
        value={values.armee}
        label="Armée"
        emoji="🛡️"
        color="#ef4444"
        size={size}
      />
      <Gauge
        value={values.pouvoir}
        label="Pouvoir"
        emoji="🏛️"
        color="#a855f7"
        size={size}
      />
    </div>
  );
}
