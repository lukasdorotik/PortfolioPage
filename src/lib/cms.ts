import { cacheLife, cacheTag } from "next/cache";

import * as mock from "@/data/mockCms";
import type {
  BeforeAfterItem,
  HomePageData,
  PortfolioFilter,
  PortfolioItem,
  Service,
  SiteSettings,
} from "@/lib/types";

/**
 * CMS service layer.
 *
 * Components only ever call the exported `get*` functions below. Where the
 * data actually comes from is decided by a single adapter, so moving to a
 * headless CMS means writing one new adapter — no component changes.
 *
 * ── Plugging in Sanity ────────────────────────────────────────────────────
 *   1. npm install next-sanity @sanity/image-url
 *   2. Create schemas matching the types in `src/lib/types.ts`.
 *   3. Implement `sanityAdapter` (sketch below) and set `adapter = sanityAdapter`.
 *   4. Call `revalidateTag("portfolio")` etc. from a Sanity webhook route to
 *      refresh content instantly after publishing.
 *
 *   const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: true });
 *   const sanityAdapter: CmsAdapter = {
 *     getSiteSettings: () => client.fetch(`*[_type == "siteSettings"][0]{ ... }`),
 *     getPortfolioItems: () => client.fetch(`*[_type == "portfolioItem"] | order(orderRank)`),
 *     ...
 *   };
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface CmsAdapter {
  getSiteSettings(): Promise<Omit<SiteSettings, "copyrightYear">>;
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioFilters(): Promise<PortfolioFilter[]>;
  getBeforeAfterItems(): Promise<BeforeAfterItem[]>;
  getServices(): Promise<Service[]>;
}

const mockAdapter: CmsAdapter = {
  getSiteSettings: async () => mock.siteSettings,
  getPortfolioItems: async () => mock.portfolioItems,
  getPortfolioFilters: async () => mock.portfolioFilters,
  getBeforeAfterItems: async () => mock.beforeAfterItems,
  getServices: async () => mock.services,
};

const adapter: CmsAdapter = mockAdapter;

/*
 * Each getter is cached with `use cache` and tagged, so the page is
 * prerendered statically and individual content types can be revalidated
 * on demand with `revalidateTag(tag)`.
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag("settings");
  const settings = await adapter.getSiteSettings();
  return { ...settings, copyrightYear: new Date().getFullYear() };
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio");
  return adapter.getPortfolioItems();
}

export async function getPortfolioFilters(): Promise<PortfolioFilter[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio");
  return adapter.getPortfolioFilters();
}

export async function getBeforeAfterItems(): Promise<BeforeAfterItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("before-after");
  return adapter.getBeforeAfterItems();
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("services");
  return adapter.getServices();
}

/** Everything the one-pager needs, fetched in parallel. */
export async function getHomePageData(): Promise<HomePageData> {
  const [settings, portfolio, filters, beforeAfter, services] =
    await Promise.all([
      getSiteSettings(),
      getPortfolioItems(),
      getPortfolioFilters(),
      getBeforeAfterItems(),
      getServices(),
    ]);

  return { settings, portfolio, filters, beforeAfter, services };
}
