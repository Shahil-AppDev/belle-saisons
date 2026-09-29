import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { COMPANY } from "@/data/company";

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
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brun">
            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Données collectées
              </h2>
              <p className="mb-3">
                {siteConfig.name} collecte les données que vous transmettez
                volontairement via nos formulaires :
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Formulaire de contact : nom, email, téléphone (facultatif),
                  sujet, message.
                </li>
                <li>
                  Formulaire d&apos;étude de bien (« Confier mon bien ») :
                  type de bien, commune, code postal, nombre de chambres et
                  de couchages, surface, statut locatif actuel, besoins
                  exprimés, prénom, nom, email, téléphone, message
                  facultatif.
                </li>
              </ul>
              <p className="mt-3">
                Aucune donnée n&apos;est collectée à votre insu : pas de
                cookie de suivi, pas de champ caché autre que la protection
                anti-spam technique (un champ invisible qui doit rester
                vide).
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Finalité du traitement
              </h2>
              <p>
                Ces données sont utilisées exclusivement pour traiter votre
                demande : étudier votre bien, répondre à votre message, et
                le cas échéant vous recontacter dans le cadre de cet
                échange. Elles ne sont jamais utilisées à des fins de
                prospection non sollicitée.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Base légale
              </h2>
              <p>
                Le traitement repose sur votre consentement explicite,
                recueilli via la case à cocher de chaque formulaire
                (article 6.1.a du RGPD). Vous pouvez retirer ce consentement
                à tout moment en nous contactant.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Durée de conservation
              </h2>
              <p>
                Vos données sont conservées le temps nécessaire au
                traitement de votre demande et aux échanges qui en découlent,
                puis supprimées ou anonymisées lorsqu&apos;elles ne sont
                plus utiles à cette finalité.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Destinataires et sous-traitants
              </h2>
              <p className="mb-3">
                Vos données sont destinées exclusivement à l&apos;équipe{" "}
                {siteConfig.name}. Le site ne conserve pas vos données dans
                une base de données : les formulaires transmettent
                directement un email à l&apos;équipe.
              </p>
              <p>
                Cet envoi passe par notre prestataire d&apos;emailing{" "}
                <a
                  href="https://resend.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-champagne-ink underline underline-offset-2"
                >
                  Resend
                </a>
                , qui agit en tant que sous-traitant au sens du RGPD pour la
                seule délivrance technique de l&apos;email. Vos données ne
                sont ni vendues, ni cédées à des fins publicitaires.
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
                Sécurité
              </h2>
              <p>
                Les formulaires sont protégés par une validation stricte
                côté serveur, une limitation du nombre d&apos;envois et un
                dispositif anti-spam invisible. Les échanges avec le site
                sont chiffrés (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Vos droits
              </h2>
              <p className="mb-3">
                Conformément au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d&apos;un droit
                d&apos;accès, de rectification, d&apos;effacement, de
                limitation et d&apos;opposition concernant vos données, ainsi
                que du droit d&apos;en demander la portabilité. Pour exercer
                ces droits, utilisez notre{" "}
                <a
                  href="/contact"
                  className="text-champagne-ink underline underline-offset-2"
                >
                  formulaire de contact
                </a>
                .
              </p>
              <p>
                Vous disposez également du droit d&apos;introduire une
                réclamation auprès de la Commission Nationale de
                l&apos;Informatique et des Libertés (CNIL) si vous estimez
                que le traitement de vos données n&apos;est pas conforme à
                la réglementation.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Cookies et mesure d&apos;audience
              </h2>
              <p>
                Ce site ne dépose aucun cookie de suivi publicitaire. Il
                peut utiliser Plausible Analytics, un outil de mesure
                d&apos;audience sans cookie qui ne collecte aucune donnée
                personnelle identifiable (adresse IP anonymisée, aucun
                profilage). Son activation, le cas échéant, est une
                décision explicite de l&apos;éditeur et ne dépend
                d&apos;aucun consentement préalable requis, cet outil
                n&apos;étant pas un traceur au sens de la recommandation
                CNIL sur les cookies.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
