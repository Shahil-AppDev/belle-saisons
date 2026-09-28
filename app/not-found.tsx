import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PRIMARY_CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ivoire py-24">
      <Container className="flex flex-col items-center gap-8 text-center">
        <BrandLogo size="lg" priority />

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne-ink">
            Erreur 404
          </span>
          <h1 className="font-serif text-3xl text-anthracite sm:text-4xl">
            Cette page n&apos;existe pas ou plus
          </h1>
          <p className="max-w-md text-brun leading-relaxed">
            Le lien que vous avez suivi est peut-être incorrect, ou la page
            a été déplacée. Voici quelques pages utiles pour continuer votre
            visite.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/services" variant="secondary">
            Découvrir nos services
          </Button>
          <Button href={PRIMARY_CTA.href} variant="secondary">
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
