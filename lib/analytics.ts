/**
 * Abstraction analytics minimale, sans aucun outil chargé par défaut.
 *
 * Aujourd'hui, trackEvent() se contente de journaliser en local (utile en
 * développement) et d'exposer un point d'extension unique. Le jour où un
 * outil est choisi (Plausible, GA4, PostHog...), un seul fichier change :
 * celui-ci — aucun composant appelant trackEvent() n'a besoin d'être
 * modifié. Ne rien charger tant qu'aucune décision explicite n'a été
 * prise (RGPD : éviter tout traceur non nécessaire par défaut).
 */
export type AnalyticsEvent =
  | "cta_confier_mon_bien_click"
  | "estimation_form_start"
  | "estimation_form_step_complete"
  | "estimation_form_submit_success"
  | "estimation_form_submit_error"
  | "contact_form_submit_success"
  | "contact_form_submit_error"
  | "phone_click"
  | "email_click";

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, properties ?? {});
  }

  // Point d'extension : window.plausible?.(event, { props: properties })
  // ou l'appel équivalent GA4/PostHog, une fois l'outil choisi.
}
