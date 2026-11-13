import type { SocialPlatform } from "@/lib/types";

/**
 * Minimal line-style brand glyphs (lucide-react no longer ships brand
 * icons). Drawn at 24×24 with a 1.75 stroke to match the lucide set.
 */
export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[platform]}
    </svg>
  );
}

const paths: Record<SocialPlatform, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.75v.01M12 16v-5.5M12 13a2.5 2.5 0 0 1 5 0v3" />
    </>
  ),
  vimeo: (
    <path d="M3 8.5c1.6-1.3 2.9-2.8 4-2.6 1.6.3 1.3 4.6 2.6 7.4.8 1.7 1.6 1.4 3.3-.9 1.6-2.3 1.4-4-.6-3.4 1-3.2 6-4.2 5.6.2-.3 2.7-3.9 8.2-6.6 9.6-2.7 1.4-4-2.3-4.9-5.7-.7-2.5-1.1-4.6-2.3-3.6L3 8.5z" />
  ),
};
