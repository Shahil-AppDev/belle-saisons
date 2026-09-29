import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    step: "01",
    title: "Échange initial",
    description:
      "Vous nous présentez votre bien, vos objectifs et vos contraintes via notre formulaire de contact.",
  },
  {
    step: "02",
    title: "Diagnostic & proposition",
    description:
      "Nous étudions votre logement et vous proposons une formule de gestion adaptée à votre situation.",
  },
  {
    step: "03",
    title: "Mise en valeur",
    description:
      "Préparation, photographie et création de l'annonce sur les plateformes les plus pertinentes.",
  },
  {
    step: "04",
    title: "Gestion continue",
    description:
      "Belle Saisons prend le relais au quotidien : calendrier, voyageurs, ménage, maintenance et suivi.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-blanc-casse py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Fonctionnement"
          title="Une prise en charge simple, en quatre étapes"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 90}>
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="font-serif text-3xl text-champagne-ink">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg text-anthracite">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-brun">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
