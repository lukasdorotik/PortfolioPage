import { AbstractBackground } from "@/components/AbstractBackground";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { Services } from "@/components/Services";
import { getHomePageData } from "@/lib/cms";

export default async function Home() {
  const { settings, portfolio, filters, beforeAfter, services } =
    await getHomePageData();

  return (
    <>
      <AbstractBackground />

      <Navbar
        brandName={settings.brandName}
        items={settings.nav}
        cta={settings.hero.secondaryCta}
      />

      <main>
        <Hero {...settings.hero} />

        <section
          id="portfolio"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
        >
          <SectionHeading
            index="01"
            eyebrow="Portfolio"
            title="Selected work."
            description="Interiors, exteriors and aerials from recent listings — each one shot, blended and graded with the same eye for light."
            className="mb-12"
          />
          <Gallery items={portfolio} filters={filters} />
        </section>

        <BeforeAfterSection items={beforeAfter} />

        <Services services={services} about={settings.about} />
      </main>

      <Contact
        contact={settings.contact}
        brandName={settings.brandName}
        copyrightYear={settings.copyrightYear}
      />
    </>
  );
}
