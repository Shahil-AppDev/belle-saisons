import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "À propos de Belle Saisons";
const DESCRIPTION =
  "Belle Saisons est une conciergerie premium implantée à Caen, dédiée à la gestion de biens en location courte et moyenne durée sur la Côte de Nacre.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-2xl text-anthracite">
                Une conciergerie ancrée en Normandie
              </h2>
              <p className="text-brun leading-relaxed">
                Belle Saisons est implantée à Caen et connaît intimement le
                territoire de la Côte de Nacre : ses communes, sa
                saisonnalité, ses événements et les attentes spécifiques de
                chaque profil de voyageur qui s&apos;y rend.
              </p>
              <p className="text-brun leading-relaxed">
                Cette connaissance du terrain est au cœur de notre approche :
                elle nous permet d&apos;accompagner chaque propriétaire avec
                une stratégie réellement adaptée à son bien et à sa
                localisation, plutôt qu&apos;une méthode standardisée.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-2xl text-anthracite">
                Notre engagement
              </h2>
              <p className="text-brun leading-relaxed">
                Nous construisons Belle Saisons pas à pas, avec l&apos;
                exigence d&apos;une conciergerie premium : chaque nouveau
                bien géré fait l&apos;objet de la même attention, dès la
                première mise en location.
              </p>
              <p className="text-brun leading-relaxed">
                Nous préférons une croissance maîtrisée, fondée sur la
                qualité du service rendu à chaque propriétaire, plutôt
                qu&apos;une expansion précipitée.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaFinal
        title="Faisons connaissance"
        description="Présentez-nous votre bien : nous serons heureux d'échanger sur vos objectifs."
        primaryLabel="Échanger avec notre équipe"
        primaryHref="/contact"
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ])}
      />
    </>
  );
}
