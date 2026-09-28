import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FullManagement } from "@/components/sections/FullManagement";
import { OwnersSection } from "@/components/sections/OwnersSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AreaCoverage } from "@/components/sections/AreaCoverage";
import { TravelerExperience } from "@/components/sections/TravelerExperience";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { JsonLd } from "@/components/ui/JsonLd";
import { HOME_FAQ } from "@/data/faq";
import { localBusinessJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conciergerie haut de gamme à Caen et sur la Côte de Nacre",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesOverview />
      <FullManagement />
      <OwnersSection />
      <HowItWorks />
      <AreaCoverage />
      <TravelerExperience />
      <FaqSection items={HOME_FAQ} />
      <CtaFinal />
      <JsonLd
        data={localBusinessJsonLd({
          name: siteConfig.name,
          description: siteConfig.description,
          path: "/",
          areaServed: [...siteConfig.areaServed],
        })}
      />
    </>
  );
}
