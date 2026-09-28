import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  {
    title: "Un accueil soigné",
    description:
      "Des informations claires avant l'arrivée et un accompagnement disponible pendant tout le séjour.",
  },
  {
    title: "Un logement irréprochable",
    description:
      "Ménage professionnel et linge de qualité entre chaque réservation, pour une expérience constante.",
  },
  {
    title: "Une connaissance du territoire",
    description:
      "Des recommandations sur Caen, la Côte de Nacre et le Calvados pour enrichir le séjour de chaque voyageur.",
  },
];

export function TravelerExperience() {
  return (
    <section className="bg-sable/30 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Expérience voyageurs"
          title="Un séjour à la hauteur de votre logement"
          description="La qualité de l'accueil profite directement à la performance de votre bien : avis positifs, fidélisation et meilleure visibilité sur les plateformes."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 90}>
              <div className="flex flex-col gap-3">
                <div className="bs-divider w-10" />
                <h3 className="font-serif text-lg text-anthracite">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-brun">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
