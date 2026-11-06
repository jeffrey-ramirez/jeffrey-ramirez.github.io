"use client";

import { motion, useReducedMotion } from "framer-motion";

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

/** Animated system graph shown beside the name on large screens. */
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
