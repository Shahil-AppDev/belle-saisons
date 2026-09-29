import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "Un interlocuteur unique",
    description:
      "Belle Saisons coordonne l'ensemble des intervenants (ménage, maintenance, accueil) : vous n'avez qu'un seul contact.",
  },
  {
    title: "Une mise en valeur soignée",
    description:
      "Votre logement est présenté avec l'exigence d'une conciergerie premium, pensée pour donner envie de réserver.",
  },
  {
    title: "Une tarification pilotée",
    description:
      "Le prix de votre bien est ajusté à la saisonnalité et à la demande locale, sans intervention de votre part.",
  },
  {
    title: "Une tranquillité réelle",
    description:
      "Accueil des voyageurs, ménage et suivi de l'état du bien sont pris en charge, y compris si vous n'habitez pas sur place.",
  },
];

export function OwnerBenefits() {
  return (
    <section className="bg-blanc-casse py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Pourquoi Belle Saisons"
          title="Ce que change une conciergerie dédiée"
          description="Une gestion complète pensée pour vous libérer du quotidien, sans jamais perdre la visibilité sur votre bien."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 80}>
              <div className="flex flex-col gap-2 border-t border-anthracite/10 pt-5">
                <h2 className="font-serif text-lg text-anthracite">
                  {benefit.title}
                </h2>
                <p className="text-sm leading-relaxed text-brun">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
