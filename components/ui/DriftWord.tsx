"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  word: string;
  /** Direction and distance of the drift, as a share of the word's width. */
  drift?: number;
};

/**
 * An oversized outlined word that slides sideways behind a section as it scrolls past,
 * slower than the content in front of it, so the page reads in layers.
 */
export function DriftWord({ word, drift = -0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${drift * 100}%`]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-10 -z-10 overflow-hidden select-none"
    >
      <motion.p
        style={reduce ? undefined : { x }}
        className="pl-[6vw] text-[clamp(7rem,22vw,20rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap text-outline opacity-25"
      >
        {word}
      </motion.p>
    </div>
  );
}
