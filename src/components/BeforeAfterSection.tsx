"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { BeforeAfterItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Showcase for raw vs. graded frames, with tabs to switch between pairs. */
export function BeforeAfterSection({ items }: { items: BeforeAfterItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  if (!active) return null;

  return (
    <section
      id="before-after"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          index="02"
          eyebrow="Before / After"
          title="From flat RAW to finished frame."
          description="Every image is bracketed on location, then blended, retouched and colour-graded in DaVinci Resolve. Drag the handle to compare."
        />

        <Reveal>
          <LayoutGroup id="ba-tabs">
            <div
              role="tablist"
              aria-label="Choose comparison"
              className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface/90 p-1"
            >
              {items.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-muted hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="ba-tab-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-2 shadow-[0_30px_80px_rgba(18,18,16,0.08)] sm:p-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              <BeforeAfterSlider before={active.before} after={active.after} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted"
        >
          <span className="font-medium text-ink">{active.title} — </span>
          {active.description}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}
