/* eslint-disable */
// Convertit SEPTENNAT_150_EVENTS_v2 (format economie/securite) vers le format
// interne (tresor/armee) et les conditions imbriquees en champs plats.
const fs = require("fs");
const path = require("path");

const INPUT = process.argv[2];
const OUTPUT = process.argv[3];

let src = fs.readFileSync(INPUT, "utf8");

// 1) Renommer les cles de jauges partout (field keys + valeurs "key:" dans les conditions)
src = src.replace(/\beconomie\b/g, "tresor");
src = src.replace(/\bsecurite\b/g, "armee");

// 2) Aplatir conditions:{requiredTags:[...]} -> requireTags:[...]
src = src.replace(
  /conditions:\{requiredTags:(\[[^\]]*\])\}/g,
  "requireTags:$1"
);

// 3) Aplatir conditions:{maxGauge:{...}} / minGauge
src = src.replace(
  /conditions:\{maxGauge:\{key:"(\w+)",value:(\d+)\}\}/g,
  'maxGauge:{key:"$1",value:$2}'
);
src = src.replace(
  /conditions:\{minGauge:\{key:"(\w+)",value:(\d+)\}\}/g,
  'minGauge:{key:"$1",value:$2}'
);

// 4) Cas combines (requiredTags + minGauge/maxGauge dans le meme conditions)
src = src.replace(
  /conditions:\{requiredTags:(\[[^\]]*\]),\s*maxGauge:\{key:"(\w+)",value:(\d+)\}\}/g,
  'requireTags:$1, maxGauge:{key:"$2",value:$3}'
);
src = src.replace(
  /conditions:\{requiredTags:(\[[^\]]*\]),\s*minGauge:\{key:"(\w+)",value:(\d+)\}\}/g,
  'requireTags:$1, minGauge:{key:"$2",value:$3}'
);

// 5) Remplacer l'interface et l'export par les imports / export du moteur
const header = `import type { GameEvent } from "@/lib/types";

/**
 * 150 evenements - LE SEPTENNAT v2.0
 * Source : SEPTENNAT_150_EVENTS_v2
 * Adapte au moteur (tresor/armee, conditions aplaties).
 */
export const EVENTS: GameEvent[] = [`;
const FOOTER = "];\n";

// Retirer tout jusqu'a l'ouverture du tableau, et retirer la fin
const ARR_OPEN = "const EVENTS: GameEvent[] = [";
const startIdx = src.indexOf(ARR_OPEN);
if (startIdx === -1) throw new Error("Cannot find EVENTS array start");
const afterOpen = startIdx + ARR_OPEN.length;
const endIdx = src.lastIndexOf("];");
if (endIdx === -1) throw new Error("Cannot find EVENTS array end");

const body = src.slice(afterOpen, endIdx);
const out = header + body + FOOTER;

fs.writeFileSync(OUTPUT, out);
console.log(
  `Converted ${
    (body.match(/\{ id:\d+/g) || []).length
  } events -> ${OUTPUT}`
);
