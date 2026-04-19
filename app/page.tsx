"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/lib/gameStore";
import { TitleScreen } from "@/components/screens/Title";
import { IntroScreen } from "@/components/screens/Intro";
import { RegisterScreen } from "@/components/screens/Register";
import { PlayScreen } from "@/components/screens/Play";
import { EndScreen } from "@/components/screens/End";
import { LeaderboardScreen } from "@/components/screens/Leaderboard";
import { TraitsScreen } from "@/components/screens/Traits";
import { ProfileScreen } from "@/components/screens/Profile";

const SCREENS = {
  title: TitleScreen,
  intro: IntroScreen,
  register: RegisterScreen,
  play: PlayScreen,
  end: EndScreen,
  leaderboard: LeaderboardScreen,
  traits: TraitsScreen,
  profile: ProfileScreen,
} as const;

export default function Home() {
  const screen = useGame((s) => s.screen);
  const Current = SCREENS[screen];

  return (
    <main className="min-h-[100dvh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Current />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
