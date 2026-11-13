"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

/** Fades + lifts its children in when scrolled into view. */
export function Reveal({
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    />
  );
}

/** Staggers any `RevealItem` children as the group scrolls into view. */
export function RevealGroup({
  stagger = 0.08,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer(stagger, delay)}
      {...props}
    />
  );
}

export function RevealItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={fadeUp} {...props} />;
}
