-- Anti-triche et rate limiting
-- Contrainte de cohérence : score maximum plausible en fonction des décisions
-- Formule gameplay : jauges/4 + year*4 + decisions*0.3 + multiplier<=1.35
-- Bound tres genereux : 10 + decisions*6 + year*5 = ~155 max
ALTER TABLE public.septennat_game_results
  DROP CONSTRAINT IF EXISTS septennat_score_coherence;
ALTER TABLE public.septennat_game_results
  ADD CONSTRAINT septennat_score_coherence
  CHECK (score <= 10 + (decisions_count * 6) + (year_reached * 5));

-- Fonction de rate limit : max 8 inserts par heure par client_uuid
CREATE OR REPLACE FUNCTION public.septennat_rate_limit()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  IF NEW.client_uuid IS NULL THEN
    RETURN NEW;
  END IF;
  SELECT count(*) INTO recent_count
  FROM public.septennat_game_results
  WHERE client_uuid = NEW.client_uuid
    AND created_at > now() - interval '1 hour';
  IF recent_count >= 8 THEN
    RAISE EXCEPTION 'rate_limit_exceeded'
      USING HINT = 'Trop de soumissions depuis ce client ; réessayez plus tard.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS septennat_rate_limit_trigger
  ON public.septennat_game_results;
CREATE TRIGGER septennat_rate_limit_trigger
  BEFORE INSERT ON public.septennat_game_results
  FOR EACH ROW EXECUTE FUNCTION public.septennat_rate_limit();

-- Vue pour calculer le rang global d'un score (utilise par le profil)
CREATE OR REPLACE FUNCTION public.septennat_global_rank(p_score INTEGER)
RETURNS INTEGER LANGUAGE sql STABLE AS $$
  SELECT count(*) + 1
  FROM public.septennat_game_results
  WHERE score > p_score
    AND is_daily_challenge = false;
$$;

GRANT EXECUTE ON FUNCTION public.septennat_global_rank(INTEGER)
  TO anon, authenticated;

-- Vue du total de parties publiees
CREATE OR REPLACE VIEW public.septennat_stats AS
SELECT
  count(*) FILTER (WHERE is_daily_challenge = false) AS total_games,
  count(*) FILTER (WHERE is_daily_challenge = true
    AND daily_seed = to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD'))
    AS daily_games_today,
  round(avg(score) FILTER (WHERE is_daily_challenge = false)) AS avg_score,
  max(score) FILTER (WHERE is_daily_challenge = false) AS max_score
FROM public.septennat_game_results;

GRANT SELECT ON public.septennat_stats TO anon, authenticated;
