import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const VALUE_PROPS = [
  {
    title: "Gestion complète",
    description:
      "De la mise en ligne de l'annonce à l'entretien du logement, une seule conciergerie pour l'ensemble de la chaîne.",
  },
  {
    title: "Expertise locale",
    description:
      "Une connaissance fine de Caen et de la Côte de Nacre : saisonnalité, événements, profils de voyageurs.",
  },
  {
    title: "Interlocuteur unique",
    description:
      "Un suivi personnalisé et transparent, pour un propriétaire qui garde la visibilité sans la charge quotidienne.",
  },
  {
    title: "Exigence de service",
    description:
      "Un niveau de présentation et d'accueil pensé pour une clientèle premium, à l'image de votre bien.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-blanc-casse py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="flex flex-col gap-3 border-t border-anthracite/15 pt-6">
                <span className="font-serif text-2xl text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl text-anthracite">
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
