"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Container, Database, Layout, Server, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Layer = {
  id: string;
  label: string;
  icon: LucideIcon;
  tech: string[];
  detail: string;
};

const layers: Layer[] = [
  {
    id: "ui",
    label: "Interface",
    icon: Layout,
    tech: ["React", "Next.js", "Microfrontends"],
    detail: "Component architecture, rendering strategy, accessibility, and performance budgets. My home turf.",
  },
  {
    id: "api",
    label: "API",
    icon: Server,
    tech: ["Django REST", "Node.js", "REST"],
    detail: "Contract-first endpoints the UI can trust — designed with, or by, the person consuming them.",
  },
  {
    id: "data",
    label: "Data",
    icon: Database,
    tech: ["PostgreSQL", "Supabase", "MongoDB"],
    detail: "Schemas and queries shaped around how the product actually reads and writes data.",
  },
  {
    id: "infra",
    label: "Infrastructure",
    icon: Container,
    tech: ["Docker", "Makefile", "CI/CD"],
    detail: "Reproducible environments and one-command workflows so every developer ships the same way.",
  },
];

export function StackVisual() {
  const [active, setActive] = useState(layers[0].id);
  const current = layers.find((l) => l.id === active) ?? layers[0];

  return (
    <div className="relative rounded-2xl border border-border bg-surface/70 p-5 shadow-card sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-xs text-subtle">
          <span className="text-accent">~/</span>full-stack
        </p>
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
      </div>

      <div role="group" aria-label="Application layers" className="relative flex flex-col gap-2.5">
        {/* Vertical request path */}
        <span aria-hidden className="absolute top-6 bottom-6 left-[27px] w-px bg-border-strong" />
        <motion.span
          aria-hidden
          className="absolute left-[25px] size-[5px] rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
          animate={{ top: ["8%", "88%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />

        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = layer.id === active;
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={isActive}
              onMouseEnter={() => setActive(layer.id)}
              onFocus={() => setActive(layer.id)}
              onClick={() => setActive(layer.id)}
              className={`relative flex items-center gap-4 rounded-xl border px-3 py-3 text-left transition-colors duration-200 ${
                isActive ? "border-accent/40 bg-accent-soft" : "border-border bg-surface hover:border-border-strong"
              }`}
            >
              <span
                className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                  isActive ? "border-accent/50 bg-surface text-accent" : "border-border bg-surface-2 text-muted"
                }`}
              >
                <Icon size={16} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{layer.label}</span>
                <span className="block truncate font-mono text-[11px] text-subtle">{layer.tech.join(" · ")}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-5 min-h-[72px] rounded-xl border border-dashed border-border px-4 py-3.5">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-sm leading-relaxed text-muted"
          >
            <span className="font-mono text-xs text-accent">{current.label.toLowerCase()} →</span> {current.detail}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
