# 🇧🇯 LE SEPTENNAT

> Simulation présidentielle du Bénin. 7 ans, 4 jauges, 150 événements, aucune bonne réponse.

**En ligne :** https://le-septennat.vercel.app

## Concept

Vous incarnez le/la Président(e) du Bénin en avril 2026. Pendant 7 ans, vous gouvernez à
travers des décisions sous forme de cartes. Quatre jauges cachées — **Peuple 👥, Trésor 💰,
Armée 🛡️, Pouvoir 🏛️** — dictent votre destin. Si l'une tombe à zéro : révolution,
faillite, coup d'État ou exil.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** + **Framer Motion** + **Zustand** (avec persist)
- **Supabase** (classement global, anti-triche SQL, rate-limit)
- **Vercel** (déploiement + Analytics + Edge Functions pour OG dynamique)
- **Web Audio API** (sons générés, zéro fichier externe)
- **Vitest** (tests unitaires)

## Développement

```bash
# 1. Installer
npm install

# 2. Copier les env vars
cp .env.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Lancer
npm run dev
```

### Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Dev server sur http://localhost:3000 |
| `npm run build` | Build de prod |
| `npm test` | Tests Vitest |
| `npm run test:coverage` | Tests + couverture HTML |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint via Next |
| `npm run convert-events` | Régénère `data/events.ts` depuis un fichier source |

## Architecture

```
app/
  page.tsx              — router client par state Zustand
  layout.tsx            — metadata, fonts next/font, Analytics
  result/page.tsx       — page de partage avec OG dynamique
  api/og-result/        — génération image 1080×1080 (Edge)
  opengraph-image.tsx   — image OG statique (1200×630)
  manifest.ts           — PWA manifest
  error.tsx, not-found.tsx
components/
  screens/              — Title, Intro, Register, Play, End, Leaderboard, Profile, Traits
  EventCard, Gauges, AdvisorBar, AdvisorPanel, PowersBar, Journal, ShareCard
lib/
  gameStore.ts          — Zustand store (avec persist)
  types.ts              — types partagés
  endings.ts            — détermination + calcul du score
  titles.ts             — 30 titres déblocables
  advisors.ts           — 4 conseillers archétypes
  powers.ts             — 4 pouvoirs exceptionnels
  traits.ts             — méta-progression
  daily.ts              — défi du jour (seed UTC)
  journal.ts            — revue de presse fictive
  storage.ts            — localStorage (résultats, profil)
  supabase.ts           — client + soumission de scores
  audio.ts              — Web Audio API
  sanitize.ts           — validation du nom de joueur
  share.ts              — intégration Web Share API
data/
  events.ts             — 150 événements v2.0
supabase/
  migrations/           — migrations SQL versionnées
scripts/
  convert_events.js     — adaptateur depuis un format externe
tests/                  — Vitest
```

## Base de données

Supabase (projet partagé `brvm-portfolio`) :

- `public.septennat_game_results` — scores avec contraintes CHECK de cohérence
- `public.septennat_leaderboard_global` — vue top 100 scores normaux
- `public.septennat_leaderboard_today` — vue du défi du jour
- `public.septennat_stats` — statistiques agrégées
- `public.septennat_global_rank(p_score)` — rang global d'un score
- Trigger `septennat_rate_limit_trigger` — max 8 inserts/h par client UUID

Migrations dans `supabase/migrations/`.

## Anti-triche

- Contrainte SQL : `score ≤ 10 + decisions_count × 6 + year_reached × 5`
- Rate-limit 8 soumissions/heure/UUID
- `player_name` sanitizé côté client (regex `[^\p{L}\p{N} .'-]`)
- RLS : lecture publique, insertion avec validation CHECK

## Fonctionnalités

- 🃏 **150 événements** (12 chaînes narratives + 40 prospectifs 2029-2033 + 4 filets de sécurité)
- 👥 **4 conseillers** (Maman Adjovi, Dr. Sènou, Colonel Baké, Maître Dossou) avec loyauté
- ⚡ **4 pouvoirs** exceptionnels (Discours, Référendum, Services Secrets, Remaniement)
- 🎯 **6 traits** méta-progression (débloqués par XP)
- 🏆 **30 titres** en 4 catégories (progression, style, fin, secret)
- 📅 **Défi du jour** avec seed UTC déterministe, streak, timer
- 🌍 **Classement global + quotidien** (Supabase) avec fallback local
- 📤 **Partage social** : `/result?...` avec image OG dynamique 1080×1080
- 📰 **Revue de presse** fin de partie (5 journaux à biais politique)
- 🎵 **Audio** généré Web Audio API (aucun fichier externe)
- 📱 **PWA installable** + mobile-first + safe area

## Crédits

Conçu et développé par **Dr. Fréjuste Agboton** — © 2026

## Licence

Tous droits réservés. Les noms de lieux et d'institutions sont réels ; aucun nom de
personne vivante n'est utilisé. Les événements sont des archétypes inspirés de
l'actualité et des tendances prospectives du Bénin 2026–2033.
