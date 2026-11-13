import type { Transition, Variants } from "framer-motion";

/** Shared easing — a long, soft "expo out" used across the site. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
};

/** Parent that staggers its children's reveal. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Word that slides up from behind a mask (pair with overflow-hidden parent). */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

/** Default viewport config for scroll-triggered reveals. */
export const inViewOnce = { once: true, amount: 0.25 } as const;
