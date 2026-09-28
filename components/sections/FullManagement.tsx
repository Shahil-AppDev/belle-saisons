import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const PILLARS = [
  {
    title: "Avant la location",
    items: [
      "Diagnostic et conseils de mise en valeur du logement",
      "Création et optimisation de l'annonce",
      "Photographie et présentation du bien",
      "Paramétrage des plateformes (Airbnb, Booking.com)",
    ],
  },
  {
    title: "Pendant la location",
    items: [
      "Optimisation tarifaire et gestion du calendrier",
      "Relation voyageurs et réponses aux demandes",
      "Check-in / check-out et gestion des arrivées",
      "Ménage, linge et contrôle qualité entre chaque séjour",
    ],
  },
  {
    title: "Au fil de l'année",
    items: [
      "Maintenance et gestion des incidents",
      "Suivi régulier du propriétaire",
      "Optimisation du taux d'occupation",
      "Ajustement de la stratégie selon la saisonnalité",
    ],
  },
];

export function FullManagement() {
  return (
    <section className="bg-anthracite py-20 text-blanc-casse lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Gestion complète"
          title="Votre bien mérite plus qu'une simple mise en ligne"
          description="Belle Saisons prend en charge chaque détail de son exploitation, de la stratégie tarifaire à l'accueil des voyageurs."
          tone="light"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 100}>
              <div className="flex flex-col gap-5 border-l border-or-doux/30 pl-6">
                <h3 className="font-serif text-xl text-or-doux">
                  {pillar.title}
                </h3>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed text-blanc-casse/80">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-or-doux" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
