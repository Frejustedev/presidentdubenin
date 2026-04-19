"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { GameResult } from "./types";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!URL || !KEY) return null;
  if (!client) {
    client = createClient(URL, KEY, {
      auth: { persistSession: false },
    });
  }
  return client;
}

const CLIENT_UUID_KEY = "septennat_client_uuid";
function clientUuid(): string {
  if (typeof window === "undefined") return "ssr";
  let u = localStorage.getItem(CLIENT_UUID_KEY);
  if (!u) {
    u = crypto.randomUUID();
    localStorage.setItem(CLIENT_UUID_KEY, u);
  }
  return u;
}

export interface RemoteResult {
  player_name: string;
  score: number;
  ending_type: string;
  year_reached: number;
  decisions_count: number;
  final_peuple: number;
  final_tresor: number;
  final_armee: number;
  final_pouvoir: number;
  played_at: string;
}

/**
 * Envoie un score vers Supabase (best-effort).
 * Si l'env n'est pas configuré ou si ça échoue, on ne bloque pas.
 */
export async function submitScoreRemote(
  result: GameResult
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb.from("septennat_game_results").insert({
      player_name: result.playerName.slice(0, 30),
      score: Math.max(0, Math.min(150, result.score)),
      ending_type: result.ending,
      year_reached: result.yearReached,
      decisions_count: result.decisionsCount,
      duration_seconds: result.durationSeconds ?? 0,
      final_peuple: result.finalGauges.peuple,
      final_tresor: result.finalGauges.tresor,
      final_armee: result.finalGauges.armee,
      final_pouvoir: result.finalGauges.pouvoir,
      is_daily_challenge: result.isDailyChallenge ?? false,
      daily_seed: result.dailySeed ?? null,
      tags: result.tags,
      client_uuid: clientUuid(),
    });
    if (error) {
      console.warn("[septennat] submit failed:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[septennat] submit error:", e);
    return false;
  }
}

export async function fetchGlobalLeaderboard(): Promise<RemoteResult[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("septennat_leaderboard_global")
      .select(
        "player_name,score,ending_type,year_reached,decisions_count,final_peuple,final_tresor,final_armee,final_pouvoir,played_at"
      );
    if (error) throw error;
    return (data as RemoteResult[]) ?? [];
  } catch (e) {
    console.warn("[septennat] leaderboard fetch failed:", e);
    return [];
  }
}

export async function fetchDailyLeaderboard(): Promise<RemoteResult[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("septennat_leaderboard_today")
      .select(
        "player_name,score,ending_type,year_reached,decisions_count,final_peuple,final_tresor,final_armee,final_pouvoir,played_at"
      );
    if (error) throw error;
    return (data as RemoteResult[]) ?? [];
  } catch (e) {
    console.warn("[septennat] daily leaderboard fetch failed:", e);
    return [];
  }
}
