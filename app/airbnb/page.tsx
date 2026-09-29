import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PlatformContent } from "@/components/sections/PlatformContent";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Conciergerie Airbnb à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Belle Saisons gère votre annonce Airbnb de A à Z : création, optimisation, tarification dynamique, communication voyageurs et entretien du logement.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/airbnb",
});

export default function AirbnbPage() {
  return (
    <>
      <PageHero
        eyebrow="Conciergerie Airbnb"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Airbnb", path: "/airbnb" },
        ]}
      />

      <PlatformContent
        intro={[
          "Airbnb reste la plateforme de référence pour la location courte durée à Caen et sur la Côte de Nacre, avec une clientèle qui recherche autant l'expérience du logement que sa localisation.",
          "Belle Saisons optimise votre présence sur Airbnb pour qu'elle reflète la qualité de votre bien, tout en assurant la gestion opérationnelle qui suit chaque réservation.",
        ]}
        points={[
          {
            title: "Création et optimisation de l'annonce",
            description:
              "Rédaction, sélection des photos et paramétrage complet de votre annonce Airbnb.",
          },
          {
            title: "Tarification dynamique",
            description:
              "Ajustement du prix selon la saisonnalité, les événements locaux et la demande observée sur votre secteur.",
          },
          {
            title: "Communication avec les voyageurs",
            description:
              "Réponses aux demandes, informations pratiques et disponibilité tout au long du séjour.",
          },
          {
            title: "Gestion du calendrier Airbnb",
            description:
              "Synchronisation avec vos autres canaux de diffusion pour éviter tout risque de double réservation.",
          },
        ]}
      />

      <CtaFinal
        title="Confiez la gestion de votre annonce Airbnb"
        description="Belle Saisons prend en charge l'intégralité de votre présence Airbnb, à Caen comme sur la Côte de Nacre."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Airbnb", path: "/airbnb" },
        ])}
      />
    </>
  );
}
