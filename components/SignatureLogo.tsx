"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";

// "jr." written as a single handwritten line: an upstroke into the j, down through its loop,
// back up into the r and out with a flick. The j's dot is the cobalt square from the hero,
// tapped on last, the way you'd dot a j after signing.
const PEN =
  "M6 46 C11 40 18 31 24.5 28 C22.5 36 19.5 48 16.5 60 C15.5 65 13.5 69 10.5 68 C7.5 67 8 62 12 59 C17 55 24 51 29 47 C32 41 34 34 36 28 C36.5 30.5 37 32 38.5 32 C40.5 29.5 43 28.5 45.5 30 C44.5 36 42.5 42 41.5 48 C43.5 46.5 47 44 52 42";

const WRITE = 1.15; // seconds for the pen stroke at speed 1
const LIFT = 0.12; // pen lift before the dot
const TAP = 0.28; // the dot landing

/** Total time the signature takes at speed 1, in seconds. */
export const SIGNATURE_DURATION = WRITE + LIFT + TAP;

type Props = {
  /** Start writing. Until then the mark stays hidden (unless reduced motion is on). */
  play?: boolean;
  /** Seconds to wait before the pen starts. */
  delay?: number;
  /** Values above 1 write faster. */
  speed?: number;
  className?: string;
  title?: string;
};

// Memoised so a parent re-rendering every frame (the preloader's counter) never touches it.
export const SignatureLogo = memo(function SignatureLogo({
  play = true,
  delay = 0,
  speed = 1,
  className,
  title,
}: Props) {
  const reduce = useReducedMotion();
  const animate = play && !reduce;
  const tapAt = delay + (WRITE + LIFT) / speed;

  return (
    <svg
      viewBox="3 14 52 58"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <motion.path
        className="sig-stroke"
        d={PEN}
        fill="none"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          // Quick to start, an even hand through the letters, easing off on the flick.
          pathLength: { duration: WRITE / speed, delay, ease: [0.35, 0.1, 0.25, 1] },
          // Hide the round cap's dot until the pen touches down.
          opacity: { duration: 0, delay },
        }}
      />
      <motion.rect
        className="sig-dot fill-accent"
        x="24.5"
        y="16.5"
        width="6"
        height="6"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{
          scale: { delay: tapAt, type: "spring", stiffness: 520, damping: 18 },
          opacity: { delay: tapAt, duration: 0.05 },
        }}
      />
    </svg>
  );
});
