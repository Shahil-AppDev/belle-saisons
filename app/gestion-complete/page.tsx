import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Gestion complète de votre conciergerie à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Belle Saisons pilote l'exploitation opérationnelle de votre bien en location courte et moyenne durée : mise en valeur, coordination des séjours et suivi, sans que vous ayez à intervenir.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/gestion-complete",
});

const AXES = [
  {
    title: "Stratégie de mise en location",
    description:
      "Analyse du bien, positionnement tarifaire et choix des plateformes les plus adaptées à sa localisation et à sa typologie.",
  },
  {
    title: "Exploitation quotidienne",
    description:
      "Calendrier, relation voyageurs, arrivées et départs, ménage et linge : l'ensemble des opérations liées à la location courte durée.",
  },
  {
    title: "Entretien du bien",
    description:
      "Suivi de l'état du logement, coordination des interventions de maintenance et gestion des incidents éventuels.",
  },
  {
    title: "Suivi et reporting",
    description:
      "Un point régulier sur l'activité de votre logement, sans que vous ayez à solliciter d'informations.",
  },
];

export default function GestionCompletePage() {
  return (
    <>
      <PageHero
        eyebrow="Gestion complète"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Gestion complète", path: "/gestion-complete" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {AXES.map((axis, index) => (
              <Reveal key={axis.title} delay={index * 80}>
                <div className="flex flex-col gap-3 rounded-sm border border-anthracite/10 bg-blanc-casse p-8">
                  <h2 className="font-serif text-xl text-anthracite">
                    {axis.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-brun">
                    {axis.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sable/30 py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl text-anthracite">
              Location courte ou moyenne durée
            </h2>
            <p className="text-brun leading-relaxed">
              Selon la nature de votre bien et vos objectifs, Belle Saisons
              construit une stratégie de location courte durée (quelques
              nuits) ou moyenne durée (plusieurs semaines), voire une
              combinaison des deux selon les périodes de l&apos;année.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl text-anthracite">
              Une gestion qui reste la vôtre
            </h2>
            <p className="text-brun leading-relaxed">
              Vous gardez la visibilité complète sur votre bien : périodes
              d&apos;occupation personnelle, orientations tarifaires et
              décisions importantes restent entre vos mains. Belle Saisons
              assure la coordination opérationnelle au quotidien, sans
              jamais se substituer à vous dans vos décisions.
            </p>
          </div>
        </Container>
      </section>

      <HowItWorks />
      <CtaFinal />
    </>
  );
}
