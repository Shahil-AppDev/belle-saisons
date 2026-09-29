import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FullManagement } from "@/components/sections/FullManagement";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { PRIMARY_CTA, siteConfig } from "@/lib/site";
import type { CityContent } from "@/data/cities";
import { CITIES } from "@/data/cities";

export function CityPageTemplate({
  city,
  hubCommunes,
}: {
  city: CityContent;
  /** Réservé à /conciergerie-cote-de-nacre : transforme la page en hub régional listant ses communes. */
  hubCommunes?: string[];
}) {
  const relatedCities = city.related
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c): c is CityContent => Boolean(c));

  const hubCities = (hubCommunes ?? [])
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

      {hubCities.length > 0 && (
        <section className="bg-blanc-casse py-20 lg:py-24">
          <Container>
            <SectionHeading
              eyebrow="Communes du littoral"
              title="Les villages de la Côte de Nacre"
              description="Chaque commune a son identité propre. Belle Saisons adapte la gestion de votre bien à ce profil local plutôt que d'appliquer une méthode unique."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hubCities.map((commune, index) => (
                <Reveal key={commune.slug} delay={index * 70}>
                  <Link
                    href={`/${commune.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-sm border border-anthracite/10 bg-ivoire p-6 transition-colors hover:border-champagne"
                  >
                    <h3 className="font-serif text-lg text-anthracite">
                      {commune.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-brun">
                      {commune.identity}
                    </p>
                    <span className="mt-auto text-xs uppercase tracking-[0.18em] text-champagne-ink transition-transform group-hover:translate-x-1">
                      Découvrir →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

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
                  className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne-ink"
                >
                  {related.name}
                </Link>
              ))}
              <Link
                href="/services"
                className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne-ink"
              >
                Nos services
              </Link>
              <Link
                href="/proprietaires"
                className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne-ink"
              >
                Espace propriétaires
              </Link>
              <Link
                href={PRIMARY_CTA.href}
                className="rounded-full border border-champagne bg-champagne/10 px-5 py-2 text-sm text-champagne-ink transition-colors hover:bg-champagne/20"
              >
                {PRIMARY_CTA.label}
              </Link>
            </div>
          </Container>
        </section>
      )}

      <CtaFinal
        title={`Confiez votre bien à ${city.name}`}
        description="Échangeons sur votre logement : nous vous proposons une gestion adaptée à votre secteur."
        trackingEvent="local_page_cta_click"
        trackingProps={{ page: city.slug }}
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
