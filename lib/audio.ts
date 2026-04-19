"use client";

/**
 * Audio manager leger pour LE SEPTENNAT.
 * Utilise Web Audio API pour des sons generes (pas de fichiers externes).
 * Evite les coutes de bande passante et de stockage.
 */

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      (window as unknown as { AudioContext: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function setMuted(m: boolean) {
  muted = m;
  if (typeof window !== "undefined") {
    localStorage.setItem("septennat_muted", m ? "1" : "0");
  }
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("septennat_muted") === "1";
}

export function initAudio() {
  muted = isMuted();
  // Crée un geste utilisateur pour débloquer l'audio sur iOS
  const unlock = () => {
    const c = getCtx();
    if (c && c.state === "suspended") c.resume();
    document.removeEventListener("touchstart", unlock);
    document.removeEventListener("click", unlock);
  };
  if (typeof document !== "undefined") {
    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("click", unlock, { once: true });
  }
}

type ToneOptions = {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  attack?: number;
  release?: number;
  sweep?: number; // fréquence cible
};

function playTone(opts: ToneOptions) {
  if (muted) return;
  const c = getCtx();
  if (!c || c.state === "suspended") return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = opts.type ?? "sine";
  osc.frequency.setValueAtTime(opts.freq, c.currentTime);
  if (opts.sweep !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, opts.sweep),
      c.currentTime + opts.duration
    );
  }
  const gain = opts.gain ?? 0.15;
  const attack = opts.attack ?? 0.01;
  const release = opts.release ?? 0.1;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(gain, c.currentTime + attack);
  g.gain.linearRampToValueAtTime(
    0,
    c.currentTime + opts.duration - release
  );
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + opts.duration);
}

export function sfxCardAppear() {
  playTone({ freq: 240, duration: 0.2, type: "sine", gain: 0.08 });
}

export function sfxSwipeLeft() {
  playTone({
    freq: 300,
    duration: 0.3,
    type: "triangle",
    sweep: 120,
    gain: 0.12,
  });
}

export function sfxSwipeRight() {
  playTone({
    freq: 240,
    duration: 0.3,
    type: "triangle",
    sweep: 520,
    gain: 0.12,
  });
}

export function sfxGoodEffect() {
  playTone({ freq: 660, duration: 0.15, type: "sine", gain: 0.1 });
  setTimeout(
    () => playTone({ freq: 880, duration: 0.2, type: "sine", gain: 0.08 }),
    80
  );
}

export function sfxBadEffect() {
  playTone({
    freq: 180,
    duration: 0.35,
    type: "sawtooth",
    sweep: 70,
    gain: 0.12,
  });
}

export function sfxAdvisor() {
  playTone({ freq: 520, duration: 0.15, type: "sine", gain: 0.08 });
  setTimeout(() => playTone({ freq: 660, duration: 0.15, gain: 0.06 }), 90);
}

export function sfxPower() {
  playTone({ freq: 220, duration: 0.2, type: "square", gain: 0.08 });
  setTimeout(() => playTone({ freq: 440, duration: 0.3, type: "sine", gain: 0.1 }), 120);
}

export function sfxTitleUnlock() {
  // Fanfare
  [523, 659, 784, 1046].forEach((f, i) =>
    setTimeout(
      () => playTone({ freq: f, duration: 0.25, type: "triangle", gain: 0.1 }),
      i * 100
    )
  );
}

export function sfxEndingGood() {
  // Accord majeur triomphant
  [392, 494, 587, 784].forEach((f, i) =>
    setTimeout(
      () =>
        playTone({
          freq: f,
          duration: 1.2,
          type: "triangle",
          gain: 0.08,
          release: 1,
        }),
      i * 80
    )
  );
}

export function sfxEndingBad() {
  playTone({
    freq: 220,
    duration: 0.8,
    type: "sawtooth",
    sweep: 80,
    gain: 0.15,
    release: 0.5,
  });
  setTimeout(
    () =>
      playTone({
        freq: 110,
        duration: 1.2,
        type: "sine",
        sweep: 55,
        gain: 0.1,
        release: 1,
      }),
    300
  );
}

export function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  try {
    navigator.vibrate(pattern);
  } catch {}
}
