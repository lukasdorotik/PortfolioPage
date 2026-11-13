"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ImageAsset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  before: ImageAsset;
  after: ImageAsset;
  beforeLabel?: string;
  afterLabel?: string;
  /** Starting handle position, 0–100 (% from the left). */
  initial?: number;
  /** Plays a short left/right hint the first time the slider scrolls into view. */
  hint?: boolean;
  className?: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Draggable before/after comparison.
 *
 * The "after" image is the base layer; the "before" image sits on top and is
 * clipped to the left of the handle. Position lives in a motion value, so
 * dragging never re-renders React — only the clip-path and handle move.
 *
 * Input: pointer (mouse/touch/pen) anywhere on the image, or keyboard on the
 * handle (← → for 2 %, Shift + ← → for 10 %, Home / End).
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "RAW",
  afterLabel = "Graded",
  initial = 50,
  hint = true,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const reduceMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.6 });

  const position = useMotionValue(clamp(initial));
  const clipPath = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`);
  const handleLeft = useTransform(position, (p) => `${p}%`);
  const beforeLabelOpacity = useTransform(position, [0, 15, 30], [0, 0.4, 1]);
  const afterLabelOpacity = useTransform(position, [70, 85, 100], [1, 0.4, 0]);

  // Keep the ARIA value in sync without re-rendering on every frame.
  useMotionValueEvent(position, "change", (p) => {
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(p)));
  });

  // One-time "this is draggable" hint.
  useEffect(() => {
    if (!hint || !inView || reduceMotion || hasInteracted) return;
    const start = position.get();
    const controls = animate(position, [start, start - 18, start + 14, start], {
      duration: 1.8,
      ease: "easeInOut",
      delay: 0.4,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on first view
  }, [inView]);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      position.stop();
      position.set(clamp(((clientX - rect.left) / rect.width) * 100));
    },
    [position],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    setIsDragging(true);
    setHasInteracted(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) setFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const current = position.get();
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = current - step;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = current + step;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setHasInteracted(true);
    position.stop();
    animate(position, clamp(next), { duration: 0.18, ease: "easeOut" });
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "group relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl bg-line",
        // Allow vertical page scroll on touch, capture horizontal drags.
        "touch-pan-y",
        isDragging ? "cursor-grabbing" : "cursor-ew-resize",
        className,
      )}
    >
      {/* After (base layer) */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(min-width: 1280px) 1200px, 100vw"
        quality={90}
        draggable={false}
        className="pointer-events-none object-cover"
      />

      {/* Before (clipped overlay) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ clipPath }}
      >
        <Image
          src={before.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          quality={90}
          draggable={false}
          className="object-cover"
        />
      </motion.div>

      {/* Labels */}
      <motion.span
        style={{ opacity: beforeLabelOpacity }}
        className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white sm:left-6 sm:top-6"
      >
        {beforeLabel}
      </motion.span>
      <motion.span
        style={{ opacity: afterLabelOpacity }}
        className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink sm:right-6 sm:top-6"
      >
        {afterLabel}
      </motion.span>

      {/* Divider + handle */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2"
        style={{ left: handleLeft }}
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]" />
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${beforeLabel} and ${afterLabel} image`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clamp(initial))}
          aria-valuetext="Percentage of the before image shown"
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-white/70 bg-white/95 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.18)]",
            "transition-transform duration-300 ease-out-expo outline-none",
            "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            isDragging ? "scale-110" : "group-hover:scale-105",
          )}
        >
          <ChevronsLeftRight className="size-5" strokeWidth={1.75} />
        </div>
      </motion.div>
    </div>
  );
}
