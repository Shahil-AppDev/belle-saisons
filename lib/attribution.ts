/**
 * Attribution de lead minimale, côté client uniquement.
 *
 * Capture les paramètres utm_* et le referrer UNIQUEMENT s'ils sont déjà
 * présents dans l'URL ou le navigateur — jamais de fingerprinting, jamais
 * d'appel à un service tiers. La capture a lieu une seule fois par session
 * (sessionStorage) au premier chargement de page, pour que la page
 * d'atterrissage réelle et les paramètres de campagne survivent jusqu'au
 * formulaire même si le visiteur navigue avant de le soumettre.
 *
 * Ces champs ne sont jamais affichés dans l'interface, jamais transmis à
 * l'email de confirmation prospect, et jamais envoyés à l'analytics
 * (lib/analytics.ts) : ils ne circulent que dans l'email interne de lead,
 * via des champs cachés de formulaire (voir components/sections/
 * AttributionFields.tsx).
 */
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
};

const STORAGE_KEY = "bs_attribution";
const MAX_LENGTH = 200;

function truncate(value: string): string {
  return value.slice(0, MAX_LENGTH);
}

function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {};

    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term");
    const utmContent = params.get("utm_content");

    if (utmSource) attribution.utm_source = truncate(utmSource);
    if (utmMedium) attribution.utm_medium = truncate(utmMedium);
    if (utmCampaign) attribution.utm_campaign = truncate(utmCampaign);
    if (utmTerm) attribution.utm_term = truncate(utmTerm);
    if (utmContent) attribution.utm_content = truncate(utmContent);

    attribution.landing_page = truncate(window.location.pathname);
    if (document.referrer) attribution.referrer = truncate(document.referrer);

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage indisponible (navigation privée, cookies bloqués...) :
    // l'attribution est une donnée secondaire, jamais bloquante pour la
    // navigation ou l'envoi du formulaire.
  }
}

function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}

const EMPTY_ATTRIBUTION: Attribution = {};

// L'attribution est capturée une fois (captureAttribution) puis ne change
// plus pendant la session : mise en cache pour que useSyncExternalStore
// (voir AttributionFields.tsx) reçoive toujours la même référence tant
// que rien n'a changé, plutôt que de recréer un objet à chaque lecture.
let cachedSnapshot: Attribution | null = null;

export function getAttributionSnapshot(): Attribution {
  cachedSnapshot ??= readAttribution();
  return cachedSnapshot;
}

export function getServerAttributionSnapshot(): Attribution {
  return EMPTY_ATTRIBUTION;
}

function noopSubscribe(): () => void {
  return () => {};
}

export const attributionStore = {
  subscribe: noopSubscribe,
  getSnapshot: getAttributionSnapshot,
  getServerSnapshot: getServerAttributionSnapshot,
};

// Capture exécutée une seule fois, à l'évaluation du module (avant tout
// rendu de composant) plutôt que dans un effet : ceci garantit que
// AttributionFields lit une valeur déjà à jour dès son premier rendu,
// sans dépendre de l'ordre de montage entre composants. captureAttribution()
// est elle-même protégée par sessionStorage (ne s'exécute qu'une fois par
// session) et par la vérification `typeof window`.
if (typeof window !== "undefined") {
  captureAttribution();
}
