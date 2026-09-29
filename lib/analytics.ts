/**
 * Abstraction analytics respectueuse de la vie privée.
 *
 * trackEvent() relaie vers Plausible (window.plausible, injecté par
 * components/analytics/PlausibleScript.tsx uniquement si
 * NEXT_PUBLIC_ANALYTICS_DOMAIN est défini) et journalise en local en
 * développement. Sans cette variable, aucun outil n'est chargé et cet
 * appel ne fait rien de plus que le log de dev : le traçage est
 * désactivé par défaut.
 *
 * Règle stricte : ne jamais passer de donnée personnelle en propriété
 * (nom, email, téléphone, adresse, message libre). Les propriétés
 * n'accueillent que des métadonnées non identifiantes (ex. un numéro
 * d'étape, un nom de page).
 */
export type AnalyticsEvent =
  | "owner_form_start"
  | "owner_form_step_2"
  | "owner_form_step_3"
  | "owner_form_submit"
  | "contact_form_submit"
  | "cta_confier_mon_bien"
  | "cta_services";

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProperties }) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, properties ?? {});
  }

  window.plausible?.(event, properties ? { props: properties } : undefined);
}
