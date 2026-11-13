import type {
  BeforeAfterItem,
  ImageAsset,
  PortfolioFilter,
  PortfolioItem,
  Service,
  SiteSettings,
} from "@/lib/types";

/**
 * Mock CMS content. Everything the page renders — copy, images, links —
 * lives here, never inside components. Replace the placeholder text and
 * Unsplash photos with your own work, or swap the whole file out for a real
 * CMS in `src/lib/cms.ts`.
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

function unsplash(
  id: string,
  alt: string,
  width = 2000,
  height = 1333,
  extraParams = "",
): ImageAsset {
  return {
    src: `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80${extraParams}`,
    alt,
    width,
    height,
  };
}

/**
 * Simulates an ungraded, flat log/RAW frame using Unsplash's image params.
 * Only used for the demo — your real before/after pairs will be two
 * separate uploads.
 */
const RAW_LOOK = "&sat=-45&con=-35&exp=-12&high=40&shad=-20&gam=10";

export const siteSettings: Omit<SiteSettings, "copyrightYear"> = {
  brandName: "Studio Lumen",
  nav: [
    { label: "Work", href: "#portfolio" },
    { label: "Before / After", href: "#before-after" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Real estate photography · Video · FPV",
    title: "Spaces, framed the way they feel.",
    subtitle:
      "Architectural photography, cinematic walkthroughs and FPV drone flights for agents, developers and architects — colour-graded in DaVinci Resolve and delivered in 24 hours.",
    primaryCta: { label: "View portfolio", href: "#portfolio" },
    secondaryCta: { label: "Book a shoot", href: "#contact" },
    image: unsplash(
      "1600585154340-be6161a56a0c",
      "Modern two-storey house at dusk with warm interior lights and a large tree",
      2400,
      1600,
    ),
    badge: {
      value: "24h",
      label: "Edited delivery",
      caption: "Colour-graded, web-ready",
    },
  },
  about: {
    eyebrow: "About",
    title: "A technical eye for spaces that sell.",
    bio: [
      "I shoot properties the way an architect would present them: straight verticals, honest light and compositions that explain how a space flows.",
      "Every frame is bracketed and blended by hand, then graded in DaVinci Resolve with a consistent colour pipeline — so a listing looks coherent from the first exterior to the last bathroom.",
    ],
    image: unsplash(
      "1600607687644-c7171b42498f",
      "Bright minimalist bedroom with floor-to-ceiling windows",
      1400,
      1750,
    ),
    stats: [
      { value: "650+", label: "Properties shot" },
      { value: "24h", label: "Turnaround" },
      { value: "4K", label: "HDR video" },
    ],
    approach: [
      {
        title: "Plan",
        description:
          "Sun-path planning and a shot list built around the property's best hours.",
      },
      {
        title: "Capture",
        description:
          "Bracketed exposures, tilt-shift correction and log video profiles.",
      },
      {
        title: "Grade",
        description:
          "Node-based colour grading and retouching in DaVinci Resolve.",
      },
    ],
  },
  contact: {
    title: "Let's frame your next listing.",
    subtitle:
      "Tell me about the property and the timeline — I usually reply within a few hours.",
    email: "hello@studiolumen.example",
    phone: "+420 000 000 000",
    location: "Prague, Czech Republic",
    socials: [
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://instagram.com/",
      },
      { platform: "youtube", label: "YouTube", href: "https://youtube.com/" },
      { platform: "vimeo", label: "Vimeo", href: "https://vimeo.com/" },
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/",
      },
    ],
  },
};

export const portfolioFilters: PortfolioFilter[] = [
  { value: "all", label: "All" },
  { value: "interiors", label: "Interiors" },
  { value: "exteriors", label: "Exteriors" },
  { value: "aerial", label: "Aerial / Drone" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "villa-azure",
    title: "Villa Azure",
    location: "Lake Como",
    category: "exteriors",
    layout: "wide",
    image: unsplash(
      "1613490493576-7fde63acd811",
      "White modernist villa with a long infinity pool",
    ),
  },
  {
    id: "loft-living",
    title: "Gallery Loft",
    location: "Prague 7",
    category: "interiors",
    layout: "tall",
    image: unsplash(
      "1600210492486-724fe5c67fb0",
      "Sunlit living room with leather sofa and framed photo wall",
      1400,
      1750,
    ),
  },
  {
    id: "suburb-grid",
    title: "Garden District",
    location: "Brno",
    category: "aerial",
    layout: "standard",
    image: unsplash(
      "1524813686514-a57563d77965",
      "Top-down drone view of a residential neighbourhood",
    ),
  },
  {
    id: "timber-house",
    title: "Timber House",
    location: "Šumava",
    category: "exteriors",
    layout: "standard",
    image: unsplash(
      "1600566753190-17f0baa2a6c3",
      "Contemporary timber and glass house with a gravel driveway",
    ),
  },
  {
    id: "white-kitchen",
    title: "Atelier Kitchen",
    location: "Vinohrady",
    category: "interiors",
    layout: "standard",
    image: unsplash(
      "1484154218962-a197022b5858",
      "Bright white kitchen with an island and pendant lights",
    ),
  },
  {
    id: "hillside-lodge",
    title: "Hillside Lodge",
    location: "Krkonoše",
    category: "aerial",
    layout: "tall",
    image: unsplash(
      "1558036117-15d82a90b9b1",
      "Elevated drone shot of a lodge on a hillside at golden hour",
      1400,
      1750,
    ),
  },
  {
    id: "glass-stair",
    title: "Glass Pavilion",
    location: "Mallorca",
    category: "interiors",
    layout: "standard",
    image: unsplash(
      "1600573472550-8090b5e0745e",
      "Open-plan interior with a floating staircase and glass walls",
    ),
  },
  {
    id: "dusk-pool",
    title: "Casa Crepúsculo",
    location: "Marbella",
    category: "exteriors",
    layout: "standard",
    image: unsplash(
      "1544984243-ec57ea16fe25",
      "Modern house with lit pool at dusk",
    ),
  },
  {
    id: "city-above",
    title: "Skyline Residences",
    location: "Downtown",
    category: "aerial",
    layout: "wide",
    image: unsplash(
      "1477959858617-67f85cf4f1df",
      "Aerial view of a dense city skyline at sunset",
    ),
  },
  {
    id: "wood-lounge",
    title: "Walnut Residence",
    location: "Karlín",
    category: "interiors",
    layout: "standard",
    image: unsplash(
      "1600607687939-ce8a6c25118c",
      "Living area with walnut wall panelling and grey sofa",
    ),
  },
  {
    id: "pool-terrace",
    title: "Terrace House",
    location: "Algarve",
    category: "exteriors",
    layout: "standard",
    image: unsplash(
      "1600596542815-ffad4c1539a9",
      "Two-storey white house with pool terrace and palms",
    ),
  },
  {
    id: "red-cabin",
    title: "Red Cabin",
    location: "Vysočina",
    category: "aerial",
    layout: "standard",
    image: unsplash(
      "1518780664697-55e3ad937233",
      "Small red cabin on a grassy hill under a pale sky",
    ),
  },
];

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: "ba-living",
    title: "Living room",
    description:
      "Window pull, white balance matched across bracketed frames, lifted shadows and a warm, natural grade.",
    before: unsplash(
      "1600210492486-724fe5c67fb0",
      "Living room — ungraded RAW frame",
      2000,
      1250,
      RAW_LOOK,
    ),
    after: unsplash(
      "1600210492486-724fe5c67fb0",
      "Living room — final colour-graded image",
      2000,
      1250,
    ),
  },
  {
    id: "ba-villa",
    title: "Pool villa",
    description:
      "Deep, polarised blues, highlights recovered on the white render and a clean, punchy contrast curve.",
    before: unsplash(
      "1613490493576-7fde63acd811",
      "Pool villa — ungraded RAW frame",
      2000,
      1250,
      RAW_LOOK,
    ),
    after: unsplash(
      "1613490493576-7fde63acd811",
      "Pool villa — final colour-graded image",
      2000,
      1250,
    ),
  },
  {
    id: "ba-twilight",
    title: "Twilight exterior",
    description:
      "Ambient and flash frames blended by hand, warm window glow and a cool blue-hour sky balanced in Resolve.",
    before: unsplash(
      "1600585154340-be6161a56a0c",
      "Twilight exterior — ungraded RAW frame",
      2000,
      1250,
      RAW_LOOK,
    ),
    after: unsplash(
      "1600585154340-be6161a56a0c",
      "Twilight exterior — final colour-graded image",
      2000,
      1250,
    ),
  },
];

export const services: Service[] = [
  {
    id: "photography",
    icon: "camera",
    title: "Photography",
    description:
      "Architectural stills with corrected verticals, hand-blended exposures and consistent colour across the whole listing.",
    features: [
      "Interiors & exteriors",
      "Twilight sessions",
      "Hand-blended HDR",
      "24h delivery",
    ],
  },
  {
    id: "video",
    icon: "video",
    title: "Video",
    description:
      "Cinematic walkthroughs shot on gimbal in log, cut to music and graded in DaVinci Resolve for web and social.",
    features: [
      "4K HDR walkthroughs",
      "Vertical cuts for Reels",
      "Agent intros",
      "Licensed music",
    ],
  },
  {
    id: "drone",
    icon: "drone",
    title: "FPV / Drone",
    description:
      "Aerial context and one-take FPV fly-throughs that glide from the street, through the door and across every room.",
    features: [
      "Licensed & insured pilot",
      "One-take FPV fly-throughs",
      "Aerial stills & plots",
      "Location & site context",
    ],
  },
];
