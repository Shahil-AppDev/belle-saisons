import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { COMPANY } from "@/data/company";

const TITLE = "Mentions légales";
const DESCRIPTION = `Mentions légales du site ${siteConfig.name}.`;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/mentions-legales",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={TITLE}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ]}
      />

      <section className="bg-ivoire py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brun">
            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Éditeur du site
              </h2>
              <p>
                Le site {siteConfig.url} est édité par {COMPANY.commercialName},{" "}
                {COMPANY.legalForm}, immatriculée sous le numéro SIREN{" "}
                {COMPANY.siren} (SIRET {COMPANY.siretHeadOffice}), n°
                TVA intracommunautaire {COMPANY.vatNumber}, immatriculée
                depuis le {formatDate(COMPANY.creationDate)}.
              </p>
              {COMPANY.legalRepresentativeName && (
                <p>Directeur de la publication : {COMPANY.legalRepresentativeName}.</p>
              )}
              {COMPANY.registeredAddress && (
                <p>Siège social : {COMPANY.registeredAddress}.</p>
              )}
              {COMPANY.contactEmail && <p>Contact : {COMPANY.contactEmail}</p>}
              {COMPANY.contactPhone && <p>Téléphone : {COMPANY.contactPhone}</p>}
              <p>
                Pour toute question relative à ce site ou à ses contenus,
                utilisez notre{" "}
                <a href="/contact" className="text-champagne-ink underline underline-offset-2">
                  formulaire de contact
                </a>
                .
              </p>
            </section>

            {COMPANY.hostingProvider && (
              <section>
                <h2 className="mb-2 font-serif text-xl text-anthracite">
                  Hébergement
                </h2>
                <p>
                  Le site est hébergé par {COMPANY.hostingProvider.name},{" "}
                  {COMPANY.hostingProvider.address}
                  {COMPANY.hostingProvider.contact
                    ? ` (${COMPANY.hostingProvider.contact})`
                    : ""}
                  .
                </p>
              </section>
            )}

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Activité
              </h2>
              <p>
                {COMPANY.commercialName} présente sur ce site ses services de
                conciergerie pour des biens en location courte et moyenne
                durée, principalement à Caen et sur la Côte de Nacre
                (Calvados, Normandie) : mise en valeur du logement,
                coordination des séjours, accueil des voyageurs, ménage et
                suivi propriétaire.
              </p>
            </section>

            {(COMPANY.professionalInsurance ||
              COMPANY.consumerMediator ||
              COMPANY.professionalLicense ||
              COMPANY.financialGuarantee) && (
              <section>
                <h2 className="mb-2 font-serif text-xl text-anthracite">
                  Informations réglementaires
                </h2>
                {COMPANY.professionalLicense && (
                  <p>Carte professionnelle : {COMPANY.professionalLicense}</p>
                )}
                {COMPANY.financialGuarantee && (
                  <p>Garantie financière : {COMPANY.financialGuarantee}</p>
                )}
                {COMPANY.professionalInsurance && (
                  <p>Assurance professionnelle : {COMPANY.professionalInsurance}</p>
                )}
                {COMPANY.consumerMediator && (
                  <p>Médiateur de la consommation : {COMPANY.consumerMediator}</p>
                )}
              </section>
            )}

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes,
                logo, identité visuelle) est la propriété de{" "}
                {COMPANY.commercialName} et ne peut être reproduit sans
                autorisation préalable.
              </p>
            </section>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ])}
      />
    </>
  );
}
