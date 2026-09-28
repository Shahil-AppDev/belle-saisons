import type { Metadata } from "next";
import { ConfierHero } from "@/components/sections/ConfierHero";
import { OwnerBenefits } from "@/components/sections/OwnerBenefits";
import { IncludedServices } from "@/components/sections/IncludedServices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AreaCoverage } from "@/components/sections/AreaCoverage";
import { PropertyProfiles } from "@/components/sections/PropertyProfiles";
import { FaqSection } from "@/components/sections/FaqSection";
import { EstimationForm } from "@/components/sections/EstimationForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { ESTIMATION_FAQ } from "@/data/faq";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Confier mon bien — Étude gratuite pour propriétaires";
const DESCRIPTION =
  "Confiez votre bien à Belle Saisons : présentez votre logement à Caen ou sur la Côte de Nacre et recevez l'étude personnalisée de notre équipe de conciergerie.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/confier-mon-bien",
});

export default function ConfierMonBienPage() {
  return (
    <>
      <ConfierHero />
      <OwnerBenefits />
      <IncludedServices />
      <HowItWorks />
      <PropertyProfiles />
      <AreaCoverage />
      <FaqSection
        items={ESTIMATION_FAQ}
        eyebrow="FAQ propriétaires"
        title="Vos questions avant de nous confier votre bien"
      />

      <section id="etude-du-bien" className="bg-sable/30 py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Étude de votre bien"
            title="Parlons de votre logement"
            description="Quatre étapes rapides pour nous transmettre l'essentiel. Notre équipe étudie ensuite votre bien et revient vers vous personnellement."
          />
          <EstimationForm />
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Confier mon bien", path: "/confier-mon-bien" },
        ])}
      />
    </>
  );
}
