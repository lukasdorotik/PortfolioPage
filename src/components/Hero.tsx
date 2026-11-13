"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { EASE_OUT_EXPO, fadeUp, maskUp, staggerContainer } from "@/lib/motion";
import type { SiteSettings } from "@/lib/types";

type HeroProps = SiteSettings["hero"];

/**
 * Opening section: staggered headline, value proposition and CTAs on the
 * left; a large photograph on the right that is revealed with an expanding
 * clip-path and then drifts with a gentle parallax as the page scrolls.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image,
  badge,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const words = title.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-28"
    >
      {/* Copy */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.08, 0.3)}
        className="relative z-10 flex flex-col gap-8"
      >
        <motion.p
          variants={fadeUp}
          className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={staggerContainer(0.07)}
          aria-label={title}
          className="text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`} aria-hidden>
              <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-lg text-base leading-relaxed text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <a
            href={primaryCta.href}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(18,18,16,0.18)] transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">{primaryCta.label}</span>
            <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-7 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink/25 hover:bg-white"
          >
            {secondaryCta.label}
          </a>
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div style={{ y: frameY }} className="relative">
        {/* Offset outline frame */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, x: 24, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.9 }}
          className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-[2rem] border border-ink/10 sm:block"
        />

        <motion.div
          initial={{ clipPath: "inset(12% 12% 12% 12% round 2rem)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-line sm:aspect-[5/4] lg:aspect-[4/5]"
        >
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Floating glass badge */}
        <motion.div
          style={{ y: badgeY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.2 }}
          className="absolute -left-4 bottom-10 flex items-center gap-4 rounded-2xl border border-white/70 bg-white/85 py-4 pl-4 pr-6 shadow-[0_20px_50px_rgba(18,18,16,0.12)] sm:-left-10"
        >
          <span className="flex size-12 items-center justify-center rounded-xl bg-ink font-mono text-sm font-medium text-white">
            {badge.value}
          </span>
          <span className="text-sm font-medium leading-tight tracking-tight">
            {badge.label}
            <span className="block text-xs font-normal text-muted">
              {badge.caption}
            </span>
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#portfolio"
        aria-label="Scroll to portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink lg:flex"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5" />
        </motion.span>
        Scroll
      </motion.a>
    </section>
  );
}
