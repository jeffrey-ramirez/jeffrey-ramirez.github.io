"use client";

import { animate, AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import { SIGNATURE_DURATION, SignatureLogo } from "./SignatureLogo";

const ease = [0.76, 0, 0.24, 1] as const;

// Shared loader state so the page can follow along:
// "loading" while the signature is written, "revealing" while it flies to the navbar,
// "landed" once the navbar logo has taken over.
type Phase = "loading" | "revealing" | "landed";
let phase: Phase = "loading";
const listeners = new Set<() => void>();
function setPhase(next: Phase) {
  phase = next;
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function usePhase() {
  return useSyncExternalStore(
    subscribe,
    () => phase,
    (): Phase => "loading",
  );
}
/** True once the page starts revealing (the hero's entrance waits for this). */
export function usePreloaderDone() {
  return usePhase() !== "loading";
}
/** True once the loader's logo has landed in the navbar. */
export function usePreloaderLanded() {
  return usePhase() === "landed";
}

export function Preloader() {
  const reduce = useReducedMotion();
  const current = usePhase();
  const logo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Let the signature finish and hold it for a beat, and wait for the page itself to load.
    const minimum = reduce ? 250 : (SIGNATURE_DURATION + 0.45) * 1000;
    let waited = false;
    let loaded = document.readyState === "complete";
    let started = false;

    const reveal = () => {
      if (started) return;
      started = true;
      const target = document.querySelector("[data-logo-target]")?.getBoundingClientRect();
      const source = logo.current?.getBoundingClientRect();
      if (reduce || !target || !source || !target.width) {
        setPhase("landed");
        return;
      }
      // Fly the big signature onto the navbar logo: same artwork, so it lines up exactly.
      setPhase("revealing");
      void animate(
        logo.current!,
        { x: target.left - source.left, y: target.top - source.top, scale: target.width / source.width },
        { duration: 0.85, ease },
      ).then(() => setPhase("landed"));
    };
    const finish = () => waited && loaded && reveal();
    const onLoad = () => {
      loaded = true;
      finish();
    };
    window.addEventListener("load", onLoad);
    const timer = window.setTimeout(() => {
      waited = true;
      finish();
    }, minimum);
    // Never trap the visitor behind the loader on a slow network.
    const failsafe = window.setTimeout(reveal, 5000);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
    };
  }, [reduce]);

  useEffect(() => {
    document.documentElement.style.overflow = current === "loading" ? "hidden" : "";
  }, [current]);

  return (
    <AnimatePresence>
      {current !== "landed" && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className={`preloader fixed inset-0 z-[200] flex items-center justify-center ${
            current === "revealing" ? "pointer-events-none" : ""
          }`}
          exit={{ opacity: 0, transition: { duration: reduce ? 0.3 : 0.15 } }}
        >
          {/* The paper fades away underneath while the logo is in flight. */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={false}
            animate={{ opacity: current === "revealing" ? 0 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.div ref={logo} className="relative origin-top-left">
            <SignatureLogo
              delay={0.15}
              title={`${profile.name} signature`}
              className="block h-auto w-[min(42vw,220px)] text-foreground"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
