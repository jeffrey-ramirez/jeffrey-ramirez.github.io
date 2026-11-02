"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { HeroBackground, HeroGraph } from "./HeroBackground";
import { ButtonLink } from "./ui/Button";
import { usePointerParallax } from "./ui/usePointerParallax";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const highlightStack = ["React", "Next.js", "TypeScript", "Django REST", "PostgreSQL", "Docker"];

export function Hero() {
  const words = profile.hero.headline.split(" ");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Copy drifts up and fades slower than the page scrolls; the graph lags behind it for depth.
  const copyY = useTransform(scrollY, [0, 700], [0, 140]);
  const copyOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const graphY = useTransform(scrollY, [0, 700], [0, 60]);
  // The graph sits "in front", so it follows the pointer and tilts slightly toward it.
  const pointer = usePointerParallax();
  const graphPX = useTransform(pointer.x, (v) => v * 36);
  const graphPY = useTransform(pointer.y, (v) => v * 28);
  const graphRX = useTransform(pointer.y, (v) => v * -8);
  const graphRY = useTransform(pointer.x, (v) => v * 10);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-center pt-16"
    >
      <HeroBackground />

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border py-1.5 pr-3.5 pl-3 text-[13px] text-muted glass">
              <span className="relative flex size-2">
                <span className="absolute inset-0 [animation:pulse-ring_2s_ease-out_infinite] rounded-full bg-emerald-500" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-subtle">
              <MapPin size={13} aria-hidden />
              {profile.location}
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="mb-5 font-mono text-sm text-accent">
            {profile.name} — {profile.title}
          </motion.p>

          <h1
            id="hero-heading"
            className="max-w-[16ch] text-[clamp(2.6rem,6.4vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance lg:text-[clamp(3rem,5vw,4.75rem)]"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-gradient pb-[0.08em]"
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl"
          >
            {profile.hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#projects" size="lg">
              View My Work
              <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Let&apos;s Connect
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            aria-label="Core technologies"
            className="mt-16 flex max-w-xl flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-subtle"
          >
            {highlightStack.map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rounded-full bg-border-strong" />
                {tech}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div variants={fadeUp} className="hidden opacity-80 lg:block">
          <motion.div style={reduce ? undefined : { y: graphY }} className="[perspective:1200px]">
            <motion.div style={reduce ? undefined : { x: graphPX, y: graphPY, rotateX: graphRX, rotateY: graphRY }}>
              <HeroGraph />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-subtle transition-colors hover:text-foreground sm:block"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
