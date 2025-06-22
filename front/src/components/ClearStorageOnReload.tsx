"use client";

import { useEffect } from "react";

export function ClearStorageOnReload() {
  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const isReload = navEntry?.type === "reload";

    if (isReload) {
      localStorage.removeItem("token");
      localStorage.removeItem("clienteKey");
    }
  }, []);

  return null;
}
