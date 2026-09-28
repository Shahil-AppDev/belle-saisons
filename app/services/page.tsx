import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { SERVICES } from "@/data/services";
import { SERVICES_FAQ } from "@/data/faq";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

const TITLE = "Nos services de conciergerie à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Découvrez l'ensemble des services de conciergerie proposés par Belle Saisons : annonces, tarification, calendrier, accueil voyageurs, ménage, maintenance et suivi propriétaire.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-16">
            {SERVICES.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 60}>
                <article
                  id={service.slug}
                  className="grid grid-cols-1 gap-6 border-t border-anthracite/10 pt-10 lg:grid-cols-[0.35fr_0.65fr]"
                >
                  <div>
                    <span className="font-serif text-3xl text-or-doux">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-serif text-2xl text-anthracite">
                      {service.title}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-brun leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-sm text-anthracite/80"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                <JsonLd
                  data={serviceJsonLd({
                    name: service.title,
                    description: service.description,
                    path: `/services#${service.slug}`,
                  })}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection
        items={SERVICES_FAQ}
        eyebrow="FAQ services"
        title="Questions fréquentes sur nos services"
      />

      <CtaFinal
        title="Une question sur nos services ?"
        description="Parlons de votre bien et des services les plus adaptés à sa localisation et à votre situation."
        primaryLabel="Échanger avec notre équipe"
        primaryHref="/contact"
      />
    </>
  );
}
