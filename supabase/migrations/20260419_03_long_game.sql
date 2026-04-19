-- v3.0 : 12 decisions par annee (mois calendaire) x 7 ans = 84 decisions
ALTER TABLE public.septennat_game_results
  DROP CONSTRAINT IF EXISTS septennat_game_results_decisions_count_check;
ALTER TABLE public.septennat_game_results
  ADD CONSTRAINT septennat_game_results_decisions_count_check
  CHECK (decisions_count BETWEEN 1 AND 90);
