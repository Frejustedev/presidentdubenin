"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistry() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }
    navigator.serviceWorker
      .register("/sw.js")
      .catch((e) => console.warn("[septennat] SW register failed:", e));
  }, []);
  return null;
}
