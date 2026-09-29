"use client";

import { useSyncExternalStore } from "react";
import { attributionStore } from "@/lib/attribution";

/**
 * Champs cachés d'attribution de lead, à inclure dans un formulaire.
 * Jamais visibles à l'écran, jamais requis : si aucun paramètre utm_* n'a
 * été capturé (visite directe, sessionStorage indisponible), les champs
 * sont simplement envoyés vides et ignorés côté serveur.
 *
 * useSyncExternalStore (plutôt qu'un useState + useEffect) lit la valeur
 * capturée côté client sans provoquer de mismatch d'hydratation : le
 * rendu serveur reçoit toujours un instantané vide (getServerSnapshot),
 * remplacé par la vraie valeur dès le premier rendu client.
 */
export function AttributionFields() {
  const attribution = useSyncExternalStore(
    attributionStore.subscribe,
    attributionStore.getSnapshot,
    attributionStore.getServerSnapshot
  );

  return (
    <div aria-hidden="true" className="hidden">
      <input type="hidden" name="utm_source" value={attribution.utm_source ?? ""} readOnly />
      <input type="hidden" name="utm_medium" value={attribution.utm_medium ?? ""} readOnly />
      <input type="hidden" name="utm_campaign" value={attribution.utm_campaign ?? ""} readOnly />
      <input type="hidden" name="utm_term" value={attribution.utm_term ?? ""} readOnly />
      <input type="hidden" name="utm_content" value={attribution.utm_content ?? ""} readOnly />
      <input type="hidden" name="landing_page" value={attribution.landing_page ?? ""} readOnly />
      <input type="hidden" name="referrer" value={attribution.referrer ?? ""} readOnly />
    </div>
  );
}
