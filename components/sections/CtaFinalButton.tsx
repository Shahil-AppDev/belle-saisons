"use client";

import { Button } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent, type AnalyticsProperties } from "@/lib/analytics";

/**
 * Bouton client isolé pour CtaFinal (Server Component) : seul ce fragment
 * a besoin de JS (le onClick de tracking), le reste de la section reste
 * statique pour la performance et le SEO.
 */
export function CtaFinalButton({
  href,
  label,
  event,
  eventProperties,
}: {
  href: string;
  label: string;
  event?: AnalyticsEvent;
  eventProperties?: AnalyticsProperties;
}) {
  return (
    <Button
      href={href}
      className="bg-or-doux! border-or-doux! text-noir hover:bg-champagne! hover:border-champagne!"
      onClick={event ? () => trackEvent(event, eventProperties) : undefined}
    >
      {label}
    </Button>
  );
}
