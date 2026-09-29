import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PRIMARY_CTA } from "@/lib/site";

export function CtaFinal({
  title = "Prêt à confier votre bien à Belle Saisons ?",
  description = "Échangeons sur votre logement et vos objectifs : nous étudions votre bien pour vous proposer l'accompagnement le plus adapté.",
  primaryLabel = PRIMARY_CTA.label,
  primaryHref = PRIMARY_CTA.href,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-anthracite py-20 text-blanc-casse lg:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-balance font-serif text-3xl sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-xl text-balance text-blanc-casse/75">
            {description}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="pt-2">
            <Button
              href={primaryHref}
              className="bg-or-doux! border-or-doux! text-noir hover:bg-champagne! hover:border-champagne!"
            >
              {primaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
