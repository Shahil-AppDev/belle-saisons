import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function ConfierHero() {
  return (
    <section className="border-b border-anthracite/10 bg-anthracite pb-16 pt-32 text-blanc-casse lg:pb-20 lg:pt-40">
      <Container className="flex flex-col gap-6">
        <Breadcrumbs
          tone="light"
          items={[
            { name: "Accueil", path: "/" },
            { name: "Confier mon bien", path: "/confier-mon-bien" },
          ]}
        />
        <div className="flex max-w-2xl flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.3em] text-or-doux">
            Propriétaires
          </span>
          <h1 className="text-balance font-serif text-4xl leading-[1.12] sm:text-5xl">
            Confiez-nous votre bien
          </h1>
          <p className="text-balance text-lg leading-relaxed text-blanc-casse/80">
            Présentez-nous votre logement à Caen ou sur la Côte de Nacre :
            notre équipe l&apos;étudie et revient vers vous pour construire
            un accompagnement de conciergerie sur mesure.
          </p>
          <div className="pt-2">
            <Button
              href="#etude-du-bien"
              className="bg-or-doux! border-or-doux! text-noir hover:bg-champagne! hover:border-champagne!"
            >
              Démarrer l&apos;étude de mon bien
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
