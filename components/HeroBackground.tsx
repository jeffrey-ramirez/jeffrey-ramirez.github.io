"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Nodes of a small "system" graph, positioned in a 600×520 viewBox. */
const nodes = [
  { id: "next", label: "Next.js", x: 300, y: 70 },
  { id: "react", label: "React", x: 120, y: 170 },
  { id: "mfe", label: "Microfrontends", x: 480, y: 175 },
  { id: "api", label: "REST API", x: 300, y: 270 },
  { id: "django", label: "Django", x: 130, y: 380 },
  { id: "node", label: "Node.js", x: 470, y: 375 },
  { id: "pg", label: "PostgreSQL", x: 300, y: 465 },
] as const;

const edges: [string, string][] = [
  ["next", "react"],
  ["next", "mfe"],
  ["react", "api"],
  ["mfe", "api"],
  ["api", "django"],
  ["api", "node"],
  ["django", "pg"],
  ["node", "pg"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export function HeroBackground() {
  const reduce = useReducedMotion();
  // Layers drift at different speeds as the page scrolls, so the hero reads as having depth.
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 900], [0, 180]);
  const glowY = useTransform(scrollY, [0, 900], [0, 320]);
  const glow2Y = useTransform(scrollY, [0, 900], [0, 120]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid, faded at the edges */}
      <motion.div
        style={reduce ? undefined : { y: gridY }}
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />

      {/* Soft color fields */}
      <motion.div style={reduce ? undefined : { y: glowY }} className="absolute -top-40 left-1/2 -translate-x-1/2">
        <div className="h-[520px] w-[820px] rounded-full bg-accent/15 blur-[120px]" />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: glow2Y }}
        className="absolute top-40 -right-40 h-[360px] w-[360px] rounded-full bg-accent-2/10 blur-[110px]"
      />

      {/* Light beams travelling along grid lines */}
      {!reduce && (
        <>
          <span className="absolute top-[168px] left-0 h-px w-40 [animation:beam-x_9s_linear_infinite] bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <span className="absolute top-[392px] left-0 h-px w-56 [animation:beam-x_13s_linear_3s_infinite] bg-gradient-to-r from-transparent via-accent-2/60 to-transparent" />
          <span className="absolute top-0 left-[calc(50%+168px)] h-40 w-px [animation:beam-y_11s_linear_1s_infinite] bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
        </>
      )}

      {/* Bottom fade into the page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

/** Animated system graph shown beside the hero copy on large screens. */
export function HeroGraph() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none">
      {/* Architecture graph */}
      <svg viewBox="0 0 600 520" className="w-full" fill="none">
        {edges.map(([a, b], i) => {
          const from = byId[a];
          const to = byId[b];
          return (
            <g key={`${a}-${b}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="var(--border-strong)" strokeWidth={1} />
              {!reduce && (
                <motion.line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--accent)"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  strokeDasharray="6 220"
                  initial={{ strokeDashoffset: 226 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: i * 0.45 }}
                />
              )}
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <rect
              x={n.x - (n.label.length * 3.6 + 18)}
              y={n.y - 15}
              width={n.label.length * 7.2 + 36}
              height={30}
              rx={8}
              fill="var(--surface)"
              stroke="var(--border-strong)"
            />
            <circle cx={n.x - (n.label.length * 3.6 + 6)} cy={n.y} r={2.5} fill="var(--accent-2)" />
            <text
              x={n.x + 6}
              y={n.y + 4}
              textAnchor="middle"
              fill="var(--muted)"
              style={{ font: "500 11.5px var(--font-geist-mono)" }}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
