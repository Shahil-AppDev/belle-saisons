import Script from "next/script";

/**
 * Charge Plausible uniquement si NEXT_PUBLIC_ANALYTICS_DOMAIN est défini.
 * Aucun traceur n'est chargé par défaut (RGPD) : voir .env.example et
 * lib/analytics.ts. Plausible ne dépose pas de cookie et n'a donc pas
 * besoin d'un bandeau de consentement, mais reste opt-in ici par choix
 * de sobriété tant que la décision n'est pas prise explicitement.
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.outbound-links.js"
      strategy="afterInteractive"
    />
  );
}
