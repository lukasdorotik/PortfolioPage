Act as an expert frontend engineer, UX/UI designer, and creative developer. I want you to build a premium, highly interactive one-page portfolio website for my real estate photography business. 

Please scaffold and build the project step-by-step in this directory.

### 1. Tech Stack & Initialization
- Framework: Next.js (App Router) with TypeScript.
- Styling: Tailwind CSS.
- Animations & Interactivity: Framer Motion.
- Icons: Lucide React.
- State/CMS: Build a service layer in `src/lib/cms.ts` to mock data fetching initially, but structure it perfectly so I can plug in a Headless CMS (like Sanity.io) later.

Please run the necessary commands to initialize a Next.js project (if not already done) and install Framer Motion, Lucide React, and clsx/tailwind-merge.

### 2. Design System & "Vibe"
- Theme: Light mode, exceptionally clean, elegant, and modern. 
- Aesthetic: Use subtle abstract geometric shapes, soft blurred background gradients, or parallax elements to give it a high-end, abstract, yet professional look. The UI must not distract from the photos; it should frame them perfectly.
- Typography: Use a sophisticated sans-serif font (e.g., Inter or Geist) with tight, elegant tracking for headings.
- Interactivity: Everything should feel "alive" but smooth. Use staggered reveal animations on scroll, hover scaling for images, and smooth scrolling for navigation.

### 3. One-Page Architecture (Sections)
Structure the main page (`src/app/page.tsx`) with the following semantic sections:

1. **Header/Nav:** Floating, glassmorphism effect. Smooth scroll links to sections.
2. **Hero Section:** Abstract, impactful introduction. A striking real estate photo (placeholder) with a smooth Framer Motion reveal, a strong value proposition, and a CTA button.
3. **Portfolio (Gallery):** A masonry or stylized grid layout. Include a simple client-side filter (e.g., "All", "Interiors", "Exteriors", "Aerial/Drone"). Images must scale slightly on hover.
4. **Interactive Before/After:** A standout section featuring a custom Before/After image slider component. This will showcase my raw vs. DaVinci Resolve color-graded / retouched photos. The slider handle must be draggable.
5. **About/Services:** A clean, grid-based section detailing my services (Photography, Video, FPV/Drone) and a brief bio highlighting my technical approach to real estate media.
6. **Contact:** Minimalist footer section displaying my email, phone number, and social links with elegant hover effects. No complex forms needed for now.

### 4. Component Structure Requirements
Please create modular components in a `src/components/` directory:
- `Navbar.tsx` (Glassmorphism, fixed)
- `Hero.tsx` (Abstract background, intro)
- `Gallery.tsx` (With filtering logic and Framer Motion layout animations)
- `BeforeAfterSlider.tsx` (Interactive draggable slider comparing two images)
- `SectionHeading.tsx` (Reusable, animated headings)

### 5. Execution Steps for You (Claude):
1. Ask for my confirmation to run `npx create-next-app@latest .` if the directory is empty.
2. Install `framer-motion`, `lucide-react`, and any UI utilities.
3. Set up the Tailwind config and global CSS (including smooth scrolling).
4. Create the dummy data structure in a `src/data/mockCms.ts` file so images and text are separated from the UI components.
5. Build the components step-by-step, starting with the interactive Before/After slider and Gallery, as they are the most complex.
6. Assemble the one-pager in `page.tsx`.

Take a deep breath and start with step 1. Ask me to proceed when you are ready to execute commands.
