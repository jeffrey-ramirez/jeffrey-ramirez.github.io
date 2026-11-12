"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMediaQuery, WIDE_SCREEN } from "./ui/useMediaQuery";
import { usePointerParallax } from "./ui/usePointerParallax";

/**
 * The full stack as three floating layers (interface, API, data) in an isometric view.
 * The stack tilts toward the pointer and pulls apart into an exploded view as the page scrolls.
 */
const layers = [
  {
    id: "ui",
    depth: 2,
    number: "03",
    name: "Interface",
    tech: "React · Next.js · TypeScript · Ionic · WordPress · Elementor · Liferay",
  },
  { id: "api", depth: 1, number: "02", name: "API", tech: "Python · Django REST · Node.js · REST APIs · Stripe" },
  { id: "data", depth: 0, number: "01", name: "Data", tech: "PostgreSQL · Supabase · MongoDB · MySQL · MSSQL" },
] as const;

const GAP = 82; // resting distance between layers, px (room for each label)
const SPREAD = 1.2; // how much further apart they drift at the end of the hero

type Tilt = { rotateX: MotionValue<number>; rotateZ: MotionValue<number> };

function Layer({ layer, spread, tilt }: { layer: (typeof layers)[number]; spread: MotionValue<number>; tilt: Tilt }) {
  // Spread around the middle layer, so the stack opens up evenly instead of climbing.
  const z = useTransform(spread, (s) => (layer.depth - 1) * GAP * (1 + s * SPREAD));
  // Undo the stack's tilt (in reverse order) so the label always faces the viewer, flat and readable.
  const faceViewer = useTransform(
    [tilt.rotateX, tilt.rotateZ],
    ([x, rz]: number[]) => `translateZ(1px) rotateZ(${-rz}deg) rotateX(${-x}deg)`,
  );

  return (
    <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ z }}>
      {layer.id === "ui" && <InterfacePlane />}
      {layer.id === "api" && <ApiPlane />}
      {layer.id === "data" && <DataPlane />}

      {/* Label pinned to the layer's right edge, turned to face the viewer. */}
      <motion.div
        className="absolute top-1/2 left-full flex origin-left items-center"
        style={{ transform: faceViewer }}
      >
        <span className="size-1.5 -translate-x-1/2 rounded-full bg-foreground" />
        <span className="h-px w-4 bg-border-strong sm:w-6" />
        <span className="rounded-[3px] border border-border bg-background/90 px-2.5 py-1.5 whitespace-nowrap shadow-sm backdrop-blur-sm">
          <span className="block text-sm leading-tight font-bold">
            <span className="mr-1.5 font-mono text-xs font-medium text-subtle">{layer.number}</span>
            {layer.name}
          </span>
          <span className="mt-0.5 hidden w-[210px] text-xs leading-snug text-pretty whitespace-normal text-muted sm:block">
            {layer.tech}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}

function InterfacePlane() {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-border-strong bg-surface shadow-[0_40px_60px_-30px_rgb(0_0_0/0.35)]">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="ml-3 h-1.5 w-24 rounded-full bg-surface-2" />
      </div>
      <div className="p-4">
        <div className="h-3 w-2/3 rounded-sm bg-foreground" />
        <div className="mt-2 h-2 w-1/2 rounded-sm bg-border-strong" />
        <div className="mt-4 inline-block rounded-[2px] bg-accent px-3 py-1.5">
          <div className="h-1.5 w-12 rounded-full bg-accent-foreground/80" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-sm bg-surface-2" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ApiPlane() {
  return (
    <div className="h-full w-full overflow-hidden rounded-md bg-foreground p-4 font-mono text-xs leading-relaxed text-background/70 shadow-[0_40px_60px_-30px_rgb(0_0_0/0.4)]">
      <p className="text-background">
        GET /api/projects <span className="opacity-60">200 · 38ms</span>
      </p>
      <p className="mt-2">{"{"}</p>
      <p className="pl-3">&quot;name&quot;: &quot;Case study&quot;,</p>
      <p className="pl-3">&quot;stack&quot;: [&quot;next&quot;, &quot;django&quot;],</p>
      <p className="pl-3">&quot;shipped&quot;: true</p>
      <p>{"}"}</p>
    </div>
  );
}

function DataPlane() {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-border-strong bg-surface-2 shadow-[0_40px_60px_-30px_rgb(0_0_0/0.3)]">
      <p className="border-b border-border-strong px-3 py-2 label text-muted">table · projects</p>
      <div className="grid grid-cols-[1fr_2fr_1fr]">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="border-r border-b border-border px-3 py-2.5 last:border-r-0 [&:nth-child(3n)]:border-r-0"
          >
            <div className={`h-1.5 rounded-full ${i < 3 ? "w-2/3 bg-muted/60" : "w-1/2 bg-border-strong"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LayerStack({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const pointer = usePointerParallax();
  const { scrollY } = useScroll();
  // 0 at the top of the page, 1 once the hero has scrolled most of the way out.
  const progress = useSpring(useTransform(scrollY, [0, 650], [0, 1], { clamp: true }), {
    stiffness: 90,
    damping: 24,
  });
  // With reduced motion the stack holds still, half pulled apart so each layer reads clearly.
  const still = useMotionValue(0.5);
  // On phones and tablets the stack sits above other content, so it holds still there too.
  const wide = useMediaQuery(WIDE_SCREEN);
  const moving = wide && !reduce;
  const spread = moving ? progress : still;
  const tiltX = useTransform(pointer.y, (v) => 56 - v * 14);
  const tiltZ = useTransform(pointer.x, (v) => -36 + v * 16);
  const stillX = useMotionValue(56);
  const stillZ = useMotionValue(-36);
  const rotateX = reduce ? stillX : tiltX;
  const rotateZ = reduce ? stillZ : tiltZ;
  // The stack lags behind the page as it scrolls, the classic parallax depth cue.
  const lift = useTransform(progress, [0, 1], [0, 90]);

  return (
    <div className={`[perspective:1600px] ${className}`} aria-hidden>
      <motion.div
        className="relative mx-auto aspect-[3/2] w-[58%] max-w-[290px] [transform-style:preserve-3d] lg:mr-auto lg:ml-0"
        style={moving ? { rotateX, rotateZ, y: lift } : { rotateX, rotateZ }}
      >
        {layers.map((layer) => (
          <Layer key={layer.id} layer={layer} spread={spread} tilt={{ rotateX, rotateZ }} />
        ))}
      </motion.div>
    </div>
  );
}
