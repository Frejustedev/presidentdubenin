import Link from "next/link";
import { FlagBar } from "@/components/FlagBar";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <FlagBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl mb-4">🗺️</div>
        <h1 className="font-display text-4xl font-black text-gold mb-2">
          404
        </h1>
        <p className="text-ink-dim max-w-md mb-8">
          Cette page n&apos;existe pas dans le Palais. Peut-être un décret
          abrogé.
        </p>
        <Link href="/" className="btn-primary">
          Retour au Palais
        </Link>
      </div>
    </div>
  );
}
