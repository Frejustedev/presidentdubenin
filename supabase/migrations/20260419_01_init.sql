-- LE SEPTENNAT — schéma initial (version committée)
-- Projet Supabase partagé : public.septennat_game_results
-- ATTENTION : les migrations deja appliquees sur le projet live (via MCP)
-- sont referencees ici pour permettre un setup from scratch reproductible.

CREATE TABLE IF NOT EXISTS public.septennat_game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL CHECK (char_length(player_name) BETWEEN 1 AND 30),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 150),
  ending_type TEXT NOT NULL CHECK (ending_type IN (
    'LÉGENDE','PAISIBLE','IMPOPULAIRE','RÉVOLUTION','FAILLITE',
    'COUP D''ÉTAT','TYRANNIE','EXIL','TRANSITION'
  )),
  year_reached INTEGER NOT NULL CHECK (year_reached BETWEEN 1 AND 7),
  decisions_count INTEGER NOT NULL CHECK (decisions_count BETWEEN 1 AND 30),
  duration_seconds INTEGER NOT NULL DEFAULT 0 CHECK (duration_seconds >= 0),
  final_peuple SMALLINT NOT NULL CHECK (final_peuple BETWEEN 0 AND 100),
  final_tresor SMALLINT NOT NULL CHECK (final_tresor BETWEEN 0 AND 100),
  final_armee SMALLINT NOT NULL CHECK (final_armee BETWEEN 0 AND 100),
  final_pouvoir SMALLINT NOT NULL CHECK (final_pouvoir BETWEEN 0 AND 100),
  is_daily_challenge BOOLEAN NOT NULL DEFAULT false,
  daily_seed TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  client_uuid TEXT,
  played_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_septennat_results_score
  ON public.septennat_game_results (score DESC);
CREATE INDEX IF NOT EXISTS idx_septennat_results_daily
  ON public.septennat_game_results (daily_seed, score DESC)
  WHERE is_daily_challenge = true;
CREATE INDEX IF NOT EXISTS idx_septennat_results_played_at
  ON public.septennat_game_results (played_at DESC);

CREATE OR REPLACE VIEW public.septennat_leaderboard_global AS
SELECT player_name, score, ending_type, year_reached, decisions_count,
       final_peuple, final_tresor, final_armee, final_pouvoir, played_at
FROM public.septennat_game_results
WHERE is_daily_challenge = false
ORDER BY score DESC, played_at DESC
LIMIT 100;

CREATE OR REPLACE VIEW public.septennat_leaderboard_today AS
SELECT player_name, score, ending_type, year_reached, decisions_count,
       final_peuple, final_tresor, final_armee, final_pouvoir, played_at
FROM public.septennat_game_results
WHERE is_daily_challenge = true
  AND daily_seed = to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD')
ORDER BY score DESC, played_at DESC
LIMIT 100;

ALTER TABLE public.septennat_game_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "septennat read all" ON public.septennat_game_results;
CREATE POLICY "septennat read all"
  ON public.septennat_game_results
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "septennat insert public" ON public.septennat_game_results;
CREATE POLICY "septennat insert public"
  ON public.septennat_game_results
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(player_name) BETWEEN 1 AND 30
    AND score BETWEEN 0 AND 150
    AND decisions_count BETWEEN 1 AND 30
  );
