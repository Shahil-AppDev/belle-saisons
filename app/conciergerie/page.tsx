import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FullManagement } from "@/components/sections/FullManagement";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Conciergerie premium à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Découvrez la conciergerie Belle Saisons : une gestion complète et personnalisée de votre bien en location courte et moyenne durée, pensée pour les propriétaires exigeants.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/conciergerie",
});

export default function ConciergeriePage() {
  return (
    <>
      <PageHero
        eyebrow="Conciergerie"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Conciergerie", path: "/conciergerie" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-anthracite">
              Une conciergerie, pas une simple gestion d&apos;annonces
            </h2>
            <p className="text-brun leading-relaxed">
              Belle Saisons n&apos;est pas un service de ménage Airbnb parmi
              d&apos;autres. C&apos;est une conciergerie qui prend en charge
              l&apos;exploitation complète de votre bien : de la stratégie
              commerciale à l&apos;accueil des voyageurs, en passant par
              l&apos;entretien et la maintenance du logement.
            </p>
            <p className="text-brun leading-relaxed">
              Notre approche s&apos;adresse aux propriétaires qui souhaitent
              confier leur bien en toute confiance, sans renoncer à la
              qualité de service qu&apos;ils attendraient pour eux-mêmes.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-anthracite">
              Pour qui ?
            </h2>
            <p className="text-brun leading-relaxed">
              Propriétaires de résidences secondaires sur la Côte de Nacre,
              investisseurs immobiliers à Caen, propriétaires déjà présents
              sur Airbnb ou Booking.com qui souhaitent professionnaliser leur
              gestion : Belle Saisons adapte son accompagnement à chaque
              situation.
            </p>
            <p className="text-brun leading-relaxed">
              Notre zone d&apos;intervention est construite en priorité
              autour de Caen, de la Côte de Nacre et du Calvados, avec une
              extension progressive en Normandie.
            </p>
          </div>
        </Container>
      </section>

      <FullManagement />
      <ServicesOverview />
      <CtaFinal />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Conciergerie", path: "/conciergerie" },
        ])}
      />
    </>
  );
}
