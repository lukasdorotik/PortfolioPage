"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import type { PortfolioFilter, PortfolioItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GalleryProps {
  items: PortfolioItem[];
  filters: PortfolioFilter[];
}

type FilterValue = PortfolioFilter["value"];

const layoutClasses: Record<PortfolioItem["layout"], string> = {
  standard: "",
  tall: "row-span-2",
  wide: "sm:col-span-2",
};

const categoryLabel: Record<PortfolioItem["category"], string> = {
  interiors: "Interior",
  exteriors: "Exterior",
  aerial: "Aerial",
};

/**
 * Filterable portfolio grid. Filtering is fully client-side; Framer Motion's
 * `layout` animation lets the remaining tiles glide into their new spots
 * while removed tiles fade out. Clicking a tile opens a lightbox.
 */
export function Gallery({ items, filters }: GalleryProps) {
  const [active, setActive] = useState<FilterValue>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      active === "all" ? items : items.filter((i) => i.category === active),
    [items, active],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    for (const item of items) map[item.category] = (map[item.category] ?? 0) + 1;
    return map;
  }, [items]);

  return (
    <div className="flex flex-col gap-10">
      {/* Filters */}
      <LayoutGroup id="gallery-filters">
        <div
          role="tablist"
          aria-label="Filter portfolio"
          className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map((filter) => {
            const isActive = filter.value === active;
            return (
              <button
                key={filter.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter.value)}
                className={cn(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                  "outline-none focus-visible:ring-2 focus-visible:ring-ink/40",
                  isActive ? "text-white" : "text-muted hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {filter.label}
                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums transition-colors",
                      isActive ? "text-white/60" : "text-muted/60",
                    )}
                  >
                    {String(counts[filter.value] ?? 0).padStart(2, "0")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Grid */}
      <motion.ul
        layout
        className="grid grid-flow-dense auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-2 sm:gap-4 lg:auto-rows-[300px] lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{
                layout: { duration: 0.7, ease: EASE_OUT_EXPO },
                opacity: { duration: 0.4 },
                scale: { duration: 0.6, ease: EASE_OUT_EXPO },
              }}
              className={cn("relative", layoutClasses[item.layout])}
            >
              <GalleryTile
                item={item}
                index={i}
                onOpen={() => setLightboxIndex(i)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox
        items={visible}
        index={lightboxIndex}
        onChange={setLightboxIndex}
      />
    </div>
  );
}

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        ease: EASE_OUT_EXPO,
        delay: (index % 3) * 0.08,
      }}
      aria-label={`Open ${item.title}, ${item.location}`}
      className="group relative block size-full overflow-hidden rounded-2xl bg-line text-left outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={
          item.layout === "wide"
            ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
      />

      {/* Soft gradient for legibility, stronger on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div className="translate-y-1 transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
            {categoryLabel[item.category]} · {item.location}
          </p>
          <p className="mt-1 text-lg font-medium tracking-tight text-white">
            {item.title}
          </p>
        </div>
        <span className="flex size-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </motion.button>
  );
}

function Lightbox({
  items,
  index,
  onChange,
}: {
  items: PortfolioItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const isOpen = index !== null && items[index] !== undefined;
  const item = isOpen ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, go, onChange]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[70] flex flex-col bg-background/90 backdrop-blur-2xl"
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                {categoryLabel[item.category]} · {item.location}
              </p>
              <p className="text-lg font-medium tracking-tight">{item.title}</p>
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => onChange(null)}
              aria-label="Close"
              className="flex size-11 items-center justify-center rounded-full border border-line bg-surface transition-colors hover:bg-ink hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 px-4 pb-6 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="relative size-full"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <LightboxArrow side="left" onClick={() => go(-1)} />
                <LightboxArrow side="right" onClick={() => go(1)} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LightboxArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous image" : "Next image"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/80 backdrop-blur transition-colors hover:bg-ink hover:text-white",
        side === "left" ? "left-6 sm:left-6" : "right-6 sm:right-6",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
