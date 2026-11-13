/**
 * Content model. These types mirror the documents you would define in a
 * headless CMS (e.g. Sanity schemas), so components never depend on where
 * the data comes from.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional low-quality placeholder (Sanity provides `metadata.lqip`). */
  blurDataURL?: string;
}

export type PortfolioCategory = "interiors" | "exteriors" | "aerial";

/** Controls how much room an image takes in the gallery grid. */
export type GalleryLayout = "standard" | "tall" | "wide";

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: PortfolioCategory;
  layout: GalleryLayout;
  image: ImageAsset;
}

export interface PortfolioFilter {
  value: PortfolioCategory | "all";
  label: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  /** Short note on what was done in the grade / retouch. */
  description: string;
  before: ImageAsset;
  after: ImageAsset;
}

/** Icon keys are plain strings so they can be stored in a CMS field. */
export type ServiceIcon = "camera" | "video" | "drone";

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  features: string[];
}

export type SocialPlatform = "instagram" | "youtube" | "linkedin" | "vimeo";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SiteSettings {
  brandName: string;
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: ImageAsset;
    badge: Stat & { caption: string };
  };
  about: {
    eyebrow: string;
    title: string;
    bio: string[];
    image: ImageAsset;
    stats: Stat[];
    approach: { title: string; description: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    socials: SocialLink[];
  };
  copyrightYear: number;
}

export interface HomePageData {
  settings: SiteSettings;
  portfolio: PortfolioItem[];
  filters: PortfolioFilter[];
  beforeAfter: BeforeAfterItem[];
  services: Service[];
}
