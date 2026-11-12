"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** A little wall switch: flick it and the lights go off (or on). */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Theme is unknown during SSR; render the switch in a neutral state until hydrated.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border-strong bg-surface-2 px-0.5 transition-colors hover:border-foreground/40"
    >
      <Sun size={11} aria-hidden className="absolute left-1.5 text-subtle" />
      <Moon size={11} aria-hidden className="absolute right-1.5 text-subtle" />
      <motion.span
        aria-hidden
        className="relative z-10 flex size-[22px] items-center justify-center rounded-full bg-foreground text-background shadow-sm"
        initial={false}
        animate={{ x: isDark ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        whileTap={{ scale: 0.88 }}
      >
        {mounted ? isDark ? <Moon size={11} /> : <Sun size={11} /> : null}
      </motion.span>
    </button>
  );
}
