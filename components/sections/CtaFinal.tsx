import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaFinalButton } from "@/components/sections/CtaFinalButton";
import { PRIMARY_CTA } from "@/lib/site";
import type { AnalyticsEvent, AnalyticsProperties } from "@/lib/analytics";

export function CtaFinal({
  title = "Prêt à confier votre bien à Belle Saisons ?",
  description = "Échangeons sur votre logement et vos objectifs : nous étudions votre bien pour vous proposer l'accompagnement le plus adapté.",
  primaryLabel = PRIMARY_CTA.label,
  primaryHref = PRIMARY_CTA.href,
  trackingEvent,
  trackingProps,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Événement analytics facultatif (ex. local_page_cta_click, blog_to_owner_cta) */
  trackingEvent?: AnalyticsEvent;
  trackingProps?: AnalyticsProperties;
}) {
  return (
    <section className="bg-anthracite py-20 text-blanc-casse lg:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-balance font-serif text-3xl sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-xl text-balance text-blanc-casse/75">
            {description}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="pt-2">
            <CtaFinalButton
              href={primaryHref}
              label={primaryLabel}
              event={trackingEvent}
              eventProperties={trackingProps}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
