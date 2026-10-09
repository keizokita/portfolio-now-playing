"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Revela o conteúdo quando entra na tela (uma vez). Estático com "reduzir movimento". */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
