"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Page-wide decorative layer: soft colour fields, film grain and fine
 * geometric line work, each drifting at a different parallax speed. Sits
 * behind all content and never takes pointer events.
 *
 * Performance notes: the colour fields are radial gradients rather than
 * `filter: blur()` on large shapes, and only `transform` is animated, so each
 * layer is rasterised once and then just moved by the GPU while scrolling.
 */
export function AbstractBackground() {
  const { scrollYProgress } = useScroll();
  const slow = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fast = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft colour fields */}
      <motion.div
        style={{ y: slow }}
        className="absolute inset-x-0 top-0 h-[160vh] will-change-transform"
      >
        <div className="absolute -left-[20rem] -top-[20rem] size-[60rem] bg-[radial-gradient(closest-side,rgba(233,223,207,0.75),transparent)]" />
        <div className="absolute -right-[16rem] top-[18vh] size-[52rem] bg-[radial-gradient(closest-side,rgba(219,228,236,0.75),transparent)]" />
        <div className="absolute left-[15vw] top-[95vh] size-[46rem] bg-[radial-gradient(closest-side,rgba(236,230,240,0.65),transparent)]" />
      </motion.div>

      {/* Film grain — under the content so it never dulls the photos */}
      <div className="grain-texture absolute inset-0 opacity-[0.035]" />

      {/* Geometric line work */}
      <motion.svg
        style={{ y: fast, rotate }}
        className="absolute -right-48 top-24 size-[44rem] text-ink/[0.07] will-change-transform"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <circle cx="200" cy="200" r="199" />
        <circle cx="200" cy="200" r="140" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="80" />
        <line x1="0" y1="200" x2="400" y2="200" />
        <line x1="200" y1="0" x2="200" y2="400" />
      </motion.svg>

      <motion.svg
        style={{ y: slow }}
        className="absolute -left-24 top-[120vh] size-[28rem] text-ink/[0.06] will-change-transform"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <rect x="1" y="1" width="198" height="198" />
        <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
        <line x1="0" y1="0" x2="200" y2="200" strokeDasharray="2 5" />
      </motion.svg>

      {/* Hairline grid, fading out from the top */}
      <div className="absolute inset-x-0 top-0 h-[120vh] bg-[linear-gradient(to_right,rgba(18,18,16,0.045)_1px,transparent_1px)] bg-[size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    </div>
  );
}
