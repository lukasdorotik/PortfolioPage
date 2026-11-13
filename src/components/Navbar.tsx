"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  brandName: string;
  items: NavItem[];
  cta: { label: string; href: string };
}

/**
 * Floating glass navbar. Tightens up once the page scrolls, highlights the
 * section currently in view, and collapses into a sheet on small screens.
 */
export function Navbar({ brandName, items, cta }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items.map((i) => i.href.slice(1)));

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close the mobile sheet with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          "relative flex w-full max-w-5xl items-center justify-between rounded-full border transition-all duration-500 ease-out-expo",
          "border-white/70 bg-white/55 shadow-[0_8px_32px_rgba(18,18,16,0.06)] backdrop-blur-md backdrop-saturate-150",
          scrolled ? "py-2 pl-5 pr-2" : "py-3 pl-6 pr-3",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <BrandMark />
          {brandName}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-ink/[0.06]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={cta.href}
            className="group hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] sm:flex"
          >
            {cta.label}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top rounded-3xl border border-white/70 bg-white/85 p-3 shadow-[0_16px_48px_rgba(18,18,16,0.1)] backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium tracking-tight transition-colors hover:bg-ink/5"
                    >
                      {item.label}
                      <ArrowUpRight className="size-4 text-muted" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl bg-ink px-4 py-3.5 text-sm font-medium text-white"
              >
                {cta.label}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

function BrandMark() {
  return (
    <span
      aria-hidden
      className="relative flex size-7 items-center justify-center rounded-full border border-ink/15"
    >
      <span className="size-2.5 rounded-full bg-ink" />
      <span className="absolute inset-[3px] rounded-full border border-dashed border-ink/20" />
    </span>
  );
}

/** Tracks which section id is currently in the middle band of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the screen decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
