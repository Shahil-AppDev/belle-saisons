"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Journalisation technique minimale (digest Next.js uniquement, sans
    // exposer la stack ni le message brut côté client).
    console.error("[app] Erreur non gérée", { digest: error.digest });
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center bg-ivoire py-24">
      <Container className="flex flex-col items-center gap-8 text-center">
        <BrandLogo size="lg" />

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne-ink">
            Une erreur est survenue
          </span>
          <h1 className="font-serif text-3xl text-anthracite sm:text-4xl">
            Ce n&apos;est pas vous, c&apos;est nous
          </h1>
          <p className="max-w-md text-brun leading-relaxed">
            Une erreur inattendue s&apos;est produite. Vous pouvez réessayer,
            ou revenir à l&apos;accueil.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button type="button" onClick={reset}>
            Réessayer
          </Button>
          <Button href="/" variant="secondary">
            Retour à l&apos;accueil
          </Button>
        </div>
      </Container>
    </section>
  );
}
