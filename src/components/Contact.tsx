"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import type { SiteSettings } from "@/lib/types";

interface ContactProps {
  contact: SiteSettings["contact"];
  brandName: string;
  copyrightYear: number;
}

/** Minimal contact footer: big email link, phone, socials and a closing bar. */
export function Contact({ contact, brandName, copyrightYear }: ContactProps) {
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer id="contact" className="relative mt-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/70 bg-white/75 p-8 shadow-[0_30px_80px_rgba(18,18,16,0.06)] sm:p-12 lg:p-16">
          <SectionHeading
            index="04"
            eyebrow="Contact"
            title={contact.title}
            description={contact.subtitle}
          />

          {/* Email — the hero of the footer */}
          <Reveal className="mt-12">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex max-w-full items-center gap-4 text-xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl"
            >
              <span className="relative min-w-0 [overflow-wrap:anywhere]">
                {contact.email}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-ink group-hover:text-white sm:size-14">
                <ArrowUpRight className="size-5" />
              </span>
            </a>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-4 border-t border-line pt-10 sm:grid-cols-3">
            <RevealItem>
              <ContactLine icon={Mail} label="Email" href={`mailto:${contact.email}`}>
                {contact.email}
              </ContactLine>
            </RevealItem>
            <RevealItem>
              <ContactLine icon={Phone} label="Phone" href={telHref}>
                {contact.phone}
              </ContactLine>
            </RevealItem>
            <RevealItem>
              <ContactLine icon={MapPin} label="Based in">
                {contact.location}
              </ContactLine>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="mt-10 flex flex-wrap gap-2">
            {contact.socials.map((social) => (
              <RevealItem key={social.platform}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-2 pl-2 pr-4 text-sm font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-background text-ink transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                    <SocialIcon platform={social.platform} className="size-4" />
                  </span>
                  {social.label}
                </motion.a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {copyrightYear} {brandName}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-ink"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:-translate-y-1 group-hover:border-ink">
              <ArrowUp className="size-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized brand wordmark as a quiet closing graphic */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center text-[18vw] font-semibold leading-none tracking-[-0.06em] text-ink/[0.04]"
      >
        {brandName}
      </p>
    </footer>
  );
}

function ContactLine({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
        <span className="block truncate text-sm font-medium">{children}</span>
      </span>
    </>
  );

  return href ? (
    <a href={href} className="group flex items-center gap-3">
      {content}
    </a>
  ) : (
    <div className="group flex items-center gap-3">{content}</div>
  );
}
