import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";

export function ServicesOverview() {
  return (
    <section className="bg-ivoire py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Nos services"
            title="Une prestation pensée pour chaque étape de la location"
            description="Belle Saisons intervient sur l'ensemble des besoins liés à l'exploitation de votre logement, en location courte et moyenne durée."
          />
          <Button href="/services" variant="secondary" className="shrink-0">
            Tous nos services
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-anthracite/10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 90}>
              <Link
                href="/services"
                className="group flex h-full flex-col gap-3 bg-blanc-casse p-8 transition-colors hover:bg-sable/40"
              >
                <h3 className="font-serif text-xl text-anthracite">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-brun">
                  {service.shortDescription}
                </p>
                <span className="mt-2 text-xs uppercase tracking-[0.2em] text-champagne transition-transform group-hover:translate-x-1">
                  En savoir plus →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
