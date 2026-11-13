"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Check, Clapperboard, Drone, type LucideIcon } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { Service, ServiceIcon, SiteSettings } from "@/lib/types";

const icons: Record<ServiceIcon, LucideIcon> = {
  camera: Camera,
  video: Clapperboard,
  drone: Drone,
};

interface ServicesProps {
  services: Service[];
  about: SiteSettings["about"];
}

/** Services grid followed by a bio panel on the technical approach. */
export function Services({ services, about }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <SectionHeading
        index="03"
        eyebrow="Services"
        title="Stills, motion and the view from above."
        description="One shoot, one consistent look — photography, video and FPV delivered together so every channel of your listing matches."
      />

      <RevealGroup
        stagger={0.12}
        className="mt-14 grid gap-4 md:grid-cols-3"
      >
        {services.map((service, i) => {
          const Icon = icons[service.icon];
          return (
            <RevealItem key={service.id}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/90 p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(18,18,16,0.08)] sm:p-8"
              >
                {/* geometric accent */}
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 size-40 rounded-full border border-line transition-transform duration-700 ease-out-expo group-hover:scale-125"
                />
                <span
                  aria-hidden
                  className="absolute -right-4 -top-4 size-24 rounded-full border border-dashed border-line transition-transform duration-700 ease-out-expo group-hover:rotate-45"
                />

                <div className="relative flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-white transition-transform duration-500 ease-out-expo group-hover:rotate-[-6deg] group-hover:scale-105">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-10 text-2xl font-semibold tracking-[-0.03em]">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="relative mt-8 flex flex-col gap-2.5 border-t border-line pt-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-3.5 text-accent" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* About / bio */}
      <div
        id="about"
        className="mt-24 grid items-center gap-12 sm:mt-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
      >
        <Reveal className="relative">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-line">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-105"
            />
          </div>
          <div
            aria-hidden
            className="absolute -left-5 -top-5 -z-10 size-full rounded-[2rem] border border-ink/10"
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} as="h3" />

          <RevealGroup className="flex flex-col gap-4">
            {about.bio.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="grid grid-cols-3 gap-4 border-y border-line py-6">
            {about.stats.map((stat) => (
              <RevealItem key={stat.label}>
                <p className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="grid gap-3 sm:grid-cols-3">
            {about.approach.map((step, i) => (
              <RevealItem
                key={step.title}
                className="rounded-2xl border border-line bg-surface/80 p-5"
              >
                <p className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
