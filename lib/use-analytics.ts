"use client";

import { useEffect } from "react";

export function useAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    // Hook for future analytics provider.
    // eslint-disable-next-line no-console
    console.info("[analytics] pageview", { path: window.location.pathname });
  }, []);
}
