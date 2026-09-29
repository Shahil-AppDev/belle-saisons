import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TravelerExperience } from "@/components/sections/TravelerExperience";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Location courte durée à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Belle Saisons accompagne les propriétaires souhaitant louer leur bien en courte durée : séjours de quelques nuits, clientèle touristique et professionnelle, gestion complète.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/location-courte-duree",
});

export default function LocationCourteDureePage() {
  return (
    <>
      <PageHero
        eyebrow="Location courte durée"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Location courte durée", path: "/location-courte-duree" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-anthracite">
              Une demande portée par le tourisme et les affaires
            </h2>
            <p className="text-brun leading-relaxed">
              À Caen et sur la Côte de Nacre, la location courte durée
              répond à des profils de voyageurs variés : touristes venus
              découvrir le littoral et les plages du Débarquement, voyageurs
              d&apos;affaires de passage, familles en séjour de quelques
              jours ou visiteurs en transit vers l&apos;Angleterre via le
              port de Ouistreham.
            </p>
            <p className="text-brun leading-relaxed">
              Cette diversité constitue une opportunité pour un propriétaire,
              à condition d&apos;adapter la présentation, la tarification et
              la disponibilité du bien à chaque type de demande.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-anthracite">
              Ce que Belle Saisons prend en charge
            </h2>
            <p className="text-brun leading-relaxed">
              Diffusion de l&apos;annonce, gestion du calendrier,
              tarification adaptée aux séjours courts, accueil des
              voyageurs et remise en état du logement entre chaque
              réservation : l&apos;ensemble des opérations propres à la
              location courte durée est géré par notre équipe.
            </p>
          </div>
        </Container>
      </section>

      <TravelerExperience />
      <CtaFinal />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Location courte durée", path: "/location-courte-duree" },
        ])}
      />
    </>
  );
}
