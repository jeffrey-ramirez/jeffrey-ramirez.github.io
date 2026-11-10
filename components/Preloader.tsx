"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import { SIGNATURE_DURATION, SignatureLogo } from "./SignatureLogo";

const ease = [0.76, 0, 0.24, 1] as const;

// Tiny shared flag so other components (the hero) can wait for the curtain to lift.
let finished = false;
const listeners = new Set<() => void>();
function markFinished() {
  finished = true;
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export function usePreloaderDone() {
  return useSyncExternalStore(
    subscribe,
    () => finished,
    () => false,
  );
}

export function Preloader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Let the signature finish, then hold it for a beat before the curtain lifts.
    const duration = reduce ? 250 : (SIGNATURE_DURATION + 0.45) * 1000;
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      // Hold at 90 until the page has actually finished loading.
      setProgress(Math.min(Math.round(eased * 100), loaded ? 100 : 90));
      if (t === 1 && loaded) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Never trap the visitor behind the loader on a slow network.
    const failsafe = window.setTimeout(() => setDone(true), 5000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
    };
  }, [reduce]);

  useEffect(() => {
    const root = document.documentElement;
    if (done) {
      root.style.overflow = "";
      markFinished();
    } else {
      root.style.overflow = "hidden";
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading, ${progress}%`}
          className="preloader fixed inset-0 z-[200] flex flex-col bg-background text-foreground"
          exit={reduce ? { opacity: 0, transition: { duration: 0.3 } } : { y: "-100%", transition: { duration: 0.9, ease } }}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-6 pb-10 sm:px-8">
            <div className="label flex justify-between gap-6 text-muted">
              <p>{profile.name}</p>
              <p>{profile.title}</p>
            </div>

            <div className="flex flex-1 items-center justify-center py-8">
              <SignatureLogo
                delay={0.15}
                title={`${profile.name} signature`}
                className="h-auto w-[min(42vw,220px)] text-foreground"
              />
            </div>

            <div className="flex items-end justify-between gap-6">
              <p
                aria-hidden
                className="text-[clamp(5.5rem,22vw,15rem)] leading-[0.8] font-extrabold tracking-[-0.06em] tabular-nums"
              >
                {progress}
                <span className="ml-[0.04em] inline-block size-[0.14em] bg-accent" />
              </p>
              <p className="label mb-2 flex items-center gap-2.5 text-muted">
                <span className="size-2 animate-pulse rounded-full bg-accent" />
                Loading
              </p>
            </div>
          </div>

          <div className="h-1 w-full bg-surface-2">
            <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
