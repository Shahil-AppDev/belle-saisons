import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { OwnersSection } from "@/components/sections/OwnersSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { OWNERS_FAQ } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Propriétaires : confiez la gestion de votre bien à Belle Saisons";
const DESCRIPTION =
  "Belle Saisons accompagne les propriétaires de Caen et de la Côte de Nacre dans la gestion complète de leur bien en location courte et moyenne durée.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/proprietaires",
});

const CONCERNS = [
  {
    title: "« Je n'ai pas le temps de gérer mon bien »",
    answer:
      "Belle Saisons prend en charge l'ensemble des opérations, de la diffusion de l'annonce à l'accueil des voyageurs. Vous restez informé sans avoir à intervenir au quotidien.",
  },
  {
    title: "« Je n'habite pas sur place »",
    answer:
      "Notre équipe est implantée localement, à Caen et sur la Côte de Nacre. La gestion à distance de votre bien ne dépend plus de votre présence physique.",
  },
  {
    title: "« Je veux garder la main sur mon bien »",
    answer:
      "Vos périodes d'occupation personnelle sont respectées et bloquées en priorité. Belle Saisons exécute votre stratégie, vous en gardez le contrôle.",
  },
  {
    title: "« Je crains pour l'état de mon logement »",
    answer:
      "Contrôle qualité après chaque séjour, ménage professionnel et suivi de maintenance font partie intégrante de notre gestion.",
  },
];

export default function ProprietairesPage() {
  return (
    <>
      <PageHero
        eyebrow="Propriétaires"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Propriétaires", path: "/proprietaires" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {CONCERNS.map((concern, index) => (
              <Reveal key={concern.title} delay={index * 80}>
                <div className="flex flex-col gap-2 rounded-sm border border-anthracite/10 bg-blanc-casse p-7">
                  <h2 className="font-serif text-lg text-anthracite">
                    {concern.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-brun">
                    {concern.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <OwnersSection />
      <HowItWorks />
      <FaqSection
        items={OWNERS_FAQ}
        eyebrow="FAQ propriétaires"
        title="Vos questions sur l'accompagnement"
      />
      <CtaFinal primaryLabel="Demander une estimation" />
    </>
  );
}
