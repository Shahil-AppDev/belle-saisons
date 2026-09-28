import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const REASONS = [
  {
    title: "Propriétaire d'une résidence secondaire",
    description:
      "Rentabilisez les périodes où vous n'occupez pas votre bien, sans en assumer la gestion à distance.",
  },
  {
    title: "Investisseur immobilier",
    description:
      "Confiez l'exploitation locative à une équipe dédiée pour vous concentrer sur la performance de votre patrimoine.",
  },
  {
    title: "Déjà présent sur Airbnb ou Booking",
    description:
      "Reprenez la main sereinement : Belle Saisons professionnalise la gestion d'une annonce déjà existante.",
  },
];

export function OwnersSection() {
  return (
    <section className="bg-sable/30 py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Propriétaires"
              title="Une solution pensée pour votre profil de propriétaire"
              description="Que vous possédiez une résidence secondaire, un bien locatif ou une annonce déjà active, Belle Saisons adapte son accompagnement à votre situation."
            />
            <div className="mt-8">
              <Button href="/proprietaires">Découvrir notre gestion</Button>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {REASONS.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 90}>
                <div className="rounded-sm border border-anthracite/10 bg-blanc-casse p-6">
                  <h3 className="font-serif text-lg text-anthracite">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brun">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
