# Real estate photography portfolio

One-page portfolio built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, Framer Motion and Lucide.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (page is prerendered statically)
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/mockCms.ts` | **All content**: copy, photos, before/after pairs, services, contact details. Edit this first. |
| `src/lib/cms.ts` | Service layer. Components call `getHomePageData()`; swap the `mockAdapter` for a Sanity adapter later (instructions inside). |
| `src/lib/types.ts` | Content model, mirrors future CMS schemas. |
| `src/components/` | `Navbar`, `Hero`, `Gallery`, `BeforeAfterSlider`, `BeforeAfterSection`, `Services`, `Contact`, `SectionHeading`, `Reveal`, `AbstractBackground` |
| `src/app/globals.css` | Design tokens (colours, fonts, easing) and smooth scrolling. |

## Using your own photos

- Put files in `public/` (e.g. `public/work/villa.jpg`) and set `src: "/work/villa.jpg"`, or
- use any remote host after adding it to `images.remotePatterns` in `next.config.ts`.

Before/after demo pairs currently fake the RAW look with Unsplash image parameters — replace them with your real ungraded and graded exports.
