"use client";

import { motion } from "framer-motion";

import { fadeUp, inViewOnce, maskUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small label above the title, e.g. "Portfolio". */
  eyebrow: string;
  /** Optional index shown before the eyebrow, e.g. "01". */
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level; defaults to h2 for page sections. */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Animated section heading: the eyebrow fades in, then each word of the
 * title slides up from behind a mask, then the description follows.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const words = title.split(" ");
  const MotionTag = motion[Tag];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer(0.06)}
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted"
      >
        {index && <span className="font-mono text-accent">{index}</span>}
        <span className="h-px w-8 bg-ink/20" aria-hidden />
        {eyebrow}
      </motion.p>

      <MotionTag
        variants={staggerContainer(0.05)}
        aria-label={title}
        className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} aria-hidden>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={maskUp} className="inline-block">
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </MotionTag>

      {description && (
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
