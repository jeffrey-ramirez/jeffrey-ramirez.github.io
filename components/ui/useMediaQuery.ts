"use client";

import { useSyncExternalStore } from "react";

/** Whether a CSS media query currently matches. False during server rendering. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Large screens, where scroll-driven parallax has room to move without colliding with content. */
export const WIDE_SCREEN = "(min-width: 1024px)";
