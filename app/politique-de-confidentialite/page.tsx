import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const TITLE = "Politique de confidentialité";
const DESCRIPTION = `Politique de confidentialité et protection des données du site ${siteConfig.name}.`;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/politique-de-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Vos données"
        title={TITLE}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          {
            name: "Politique de confidentialité",
            path: "/politique-de-confidentialite",
          },
        ]}
      />

      <section className="bg-ivoire py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="mb-8 rounded-sm border border-champagne/40 bg-sable/30 p-5 text-sm text-brun">
            Ce document est fourni à titre de structure. Il devra être
            revu et complété (notamment le délégué à la protection des
            données et les durées de conservation) avant la mise en ligne
            du site.
          </div>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brun">
            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Données collectées
              </h2>
              <p>
                Dans le cadre du formulaire de contact, {siteConfig.name}
                {" "}
                collecte les données suivantes : nom, email, téléphone,
                commune et type de bien, ainsi que le contenu de votre
                message. Ces données sont utilisées uniquement pour traiter
                votre demande.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Utilisation des données
              </h2>
              <p>
                Les informations transmises via le formulaire de contact
                sont utilisées exclusivement pour répondre à votre demande
                concernant la gestion de votre bien. Elles ne sont ni
                cédées ni utilisées à des fins commerciales sans votre
                accord.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Vos droits
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d&apos;un droit d&apos;accès,
                de rectification et de suppression de vos données. Pour
                exercer ce droit, contactez-nous à {siteConfig.email}.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Cookies
              </h2>
              <p>
                Ce site n&apos;utilise pas, à ce stade, de cookies de suivi
                publicitaire. Cette politique sera mise à jour si des
                outils de mesure d&apos;audience venaient à être intégrés.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
