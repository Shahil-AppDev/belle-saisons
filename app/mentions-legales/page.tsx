import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const TITLE = "Mentions légales";
const DESCRIPTION = `Mentions légales du site ${siteConfig.name}.`;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/mentions-legales",
});

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
        <Container className="prose-legal max-w-3xl">
          <div className="mb-8 rounded-sm border border-champagne/40 bg-sable/30 p-5 text-sm text-brun">
            Ce document est fourni à titre de structure. Les informations
            entre crochets doivent être complétées avec les données
            officielles de la société avant la mise en ligne du site.
          </div>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brun">
            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Éditeur du site
              </h2>
              <p>
                Le site {siteConfig.url} est édité par {siteConfig.name},
                [forme juridique à préciser], immatriculée sous le numéro
                SIRET [à compléter], dont le siège social est situé
                [adresse à compléter].
              </p>
              <p>Directeur de la publication : [nom à compléter].</p>
              <p>Contact : {siteConfig.email}</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Hébergement
              </h2>
              <p>
                Le site est hébergé par [nom de l&apos;hébergeur à
                compléter], [adresse de l&apos;hébergeur à compléter].
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes,
                logo, identité visuelle) est la propriété de {siteConfig.name}
                {" "}
                et ne peut être reproduit sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-xl text-anthracite">
                Activité
              </h2>
              <p>
                {siteConfig.name} exerce une activité de conciergerie et de
                gestion locative de biens en location courte et moyenne
                durée, principalement à Caen et sur la Côte de Nacre
                (Calvados, Normandie).
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
