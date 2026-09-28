import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FullManagement } from "@/components/sections/FullManagement";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { CityContent } from "@/data/cities";
import { CITIES } from "@/data/cities";

export function CityPageTemplate({ city }: { city: CityContent }) {
  const relatedCities = city.related
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c): c is CityContent => Boolean(c));

  return (
    <>
      <PageHero
        eyebrow={city.heroKicker}
        title={city.h1}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: city.name, path: `/${city.slug}` },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            {city.intro.map((paragraph, index) => (
              <Reveal key={index} delay={index * 70}>
                <p className="text-brun leading-relaxed text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="flex flex-col gap-4 rounded-sm border border-anthracite/10 bg-blanc-casse p-8">
              <h2 className="font-serif text-lg text-anthracite">
                Spécificités locales
              </h2>
              <p className="text-sm leading-relaxed text-brun">
                {city.identity}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sable/30 py-20 lg:py-24">
        <Container>
          <h2 className="font-serif text-2xl text-anthracite">
            Les enjeux des propriétaires {city.slug === "conciergerie-normandie" ? "en Normandie" : `à ${city.name}`}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {city.ownerChallenges.map((challenge, index) => (
              <Reveal key={challenge} delay={index * 70}>
                <div className="flex gap-3 rounded-sm bg-blanc-casse p-5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                  <p className="text-sm leading-relaxed text-brun">
                    {challenge}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FullManagement />

      <FaqSection
        items={city.faq}
        title={`Questions fréquentes — ${city.name}`}
        eyebrow="FAQ locale"
        withJsonLd={false}
      />

      {relatedCities.length > 0 && (
        <section className="bg-blanc-casse py-16 lg:py-20">
          <Container>
            <h2 className="font-serif text-xl text-anthracite">
              Autres zones couvertes par Belle Saisons
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedCities.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${related.slug}`}
                  className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne"
                >
                  {related.name}
                </Link>
              ))}
              <Link
                href="/services"
                className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne"
              >
                Nos services
              </Link>
              <Link
                href="/proprietaires"
                className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne"
              >
                Espace propriétaires
              </Link>
            </div>
          </Container>
        </section>
      )}

      <CtaFinal
        title={`Confiez votre bien à ${city.name}`}
        description="Échangeons sur votre logement : nous vous proposons une gestion adaptée à votre secteur."
      />

      <JsonLd
        data={localBusinessJsonLd({
          name: `${siteConfig.name} — ${city.name}`,
          description: city.metaDescription,
          path: `/${city.slug}`,
          areaServed: [city.name],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: city.name, path: `/${city.slug}` },
        ])}
      />
    </>
  );
}
