import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { siteConfig, PRIMARY_CTA } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Contact — Confiez votre bien à Belle Saisons";
const DESCRIPTION =
  "Présentez-nous votre bien à Caen ou sur la Côte de Nacre : notre équipe revient vers vous pour échanger sur la formule de gestion la plus adaptée.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-2xl text-anthracite">
              Parlons de votre bien
            </h2>
            <p className="text-brun leading-relaxed">
              Complétez le formulaire ci-contre avec les informations
              essentielles sur votre logement. Nous revenons vers vous pour
              échanger sur vos objectifs et vous proposer la formule de
              gestion la plus adaptée.
            </p>
            <div className="flex flex-col gap-1 text-sm text-brun">
              <span className="text-xs uppercase tracking-[0.2em] text-champagne-ink">
                Zone d&apos;intervention
              </span>
              <span>{siteConfig.region}</span>
            </div>
            <p className="text-sm text-brun">
              Vous avez un bien à confier en gestion complète ? Utilisez
              plutôt notre{" "}
              <a
                href={PRIMARY_CTA.href}
                className="text-champagne-ink underline underline-offset-2"
              >
                formulaire dédié aux propriétaires
              </a>
              .
            </p>
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
