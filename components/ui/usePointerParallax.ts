"use client";

import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";
import { useEffect } from "react";

/**
 * Pointer position across the viewport, normalized to -0.5…0.5 and smoothed with a spring.
 * Stays at 0 on touch devices and when the visitor prefers reduced motion.
 */
export function usePointerParallax(): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function onMove(e: PointerEvent) {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    }
    function onLeave() {
      rawX.set(0);
      rawY.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, rawX, rawY]);

  return { x, y };
}
