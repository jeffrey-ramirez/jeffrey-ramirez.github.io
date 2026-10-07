"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { buttonClasses, type Size, type Variant } from "./buttonStyles";

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

const press = { whileHover: { y: -1 }, whileTap: { scale: 0.97 } };

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps &
  Omit<
    ComponentPropsWithoutRef<"a">,
    keyof CommonProps | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  >) {
  return (
    <motion.a {...press} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </motion.a>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps &
  Omit<
    ComponentPropsWithoutRef<"button">,
    keyof CommonProps | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  >) {
  return (
    <motion.button {...press} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </motion.button>
  );
}
