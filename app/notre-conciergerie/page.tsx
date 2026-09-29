import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Notre conciergerie : la méthode Belle Saisons";
const DESCRIPTION =
  "Découvrez la méthode de travail de Belle Saisons : discrétion, rigueur et exigence de service pour la gestion de votre bien à Caen et sur la Côte de Nacre.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/notre-conciergerie",
});

const VALUES = [
  {
    title: "Discrétion",
    description:
      "Une gestion qui reste invisible pour vous : nous nous occupons de tout, sans jamais vous solliciter inutilement.",
  },
  {
    title: "Rigueur",
    description:
      "Chaque étape — annonce, calendrier, ménage, maintenance — suit un standard de qualité constant, quel que soit le bien.",
  },
  {
    title: "Proximité",
    description:
      "Une équipe implantée à Caen et sur la Côte de Nacre, en mesure d'intervenir rapidement en cas de besoin.",
  },
  {
    title: "Transparence",
    description:
      "Un suivi régulier et honnête de l'activité de votre bien, sans chiffres exagérés ni promesses artificielles.",
  },
];

export default function NotreConciergeriePage() {
  return (
    <>
      <PageHero
        eyebrow="Notre conciergerie"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Notre conciergerie", path: "/notre-conciergerie" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-brun">
              Belle Saisons est née de la volonté d&apos;offrir aux
              propriétaires de Caen et de la Côte de Nacre une alternative
              aux services de conciergerie génériques : une gestion pensée
              comme celle d&apos;une maison d&apos;hôtes exigeante, appliquée
              à la location courte et moyenne durée.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-anthracite py-20 text-blanc-casse lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <div className="flex flex-col gap-3 border-t border-or-doux/30 pt-5">
                  <h2 className="font-serif text-xl text-or-doux">
                    {value.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-blanc-casse/80">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaFinal />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Notre conciergerie", path: "/notre-conciergerie" },
        ])}
      />
    </>
  );
}
