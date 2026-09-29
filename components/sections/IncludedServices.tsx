import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";

export function IncludedServices() {
  return (
    <section className="bg-sable/30 py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services inclus"
            title="Une gestion complète, du premier voyageur au suivi continu"
          />
          <Button href="/services" variant="secondary" className="shrink-0">
            Voir le détail des services
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 70}>
              <div className="flex items-start gap-3 rounded-sm bg-blanc-casse p-5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                <div>
                  <p className="text-sm font-medium text-anthracite">
                    {service.title}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
