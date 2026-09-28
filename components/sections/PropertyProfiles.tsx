import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const PROFILES = [
  {
    title: "Résidences secondaires",
    description:
      "Un bien occupé une partie de l'année, à rentabiliser le reste du temps sans en assumer la gestion à distance.",
  },
  {
    title: "Appartements et maisons en ville",
    description:
      "Des logements adaptés à une clientèle mixte, entre séjours touristiques et déplacements professionnels.",
  },
  {
    title: "Biens déjà loués en courte durée",
    description:
      "Une annonce Airbnb ou Booking.com déjà active, dont vous souhaitez professionnaliser la gestion au quotidien.",
  },
  {
    title: "Villas et logements de standing",
    description:
      "Des biens qui demandent une mise en valeur et un accueil à la hauteur de leur qualité.",
  },
];

export function PropertyProfiles() {
  return (
    <section className="bg-ivoire py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Profils accompagnés"
          title="Des logements variés, une même exigence de service"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILES.map((profile, index) => (
            <Reveal key={profile.title} delay={index * 80}>
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h2 className="font-serif text-lg text-anthracite">
                  {profile.title}
                </h2>
                <p className="text-sm leading-relaxed text-brun">
                  {profile.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
