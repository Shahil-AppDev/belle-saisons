/**
 * Structure NAP (Name / Address / Phone) centralisée pour Conciergerie
 * Belle Saisons.
 *
 * Objectif : une source unique à alimenter au fur et à mesure que les
 * informations réelles sont confirmées (adresse professionnelle, téléphone
 * dédié), pour garantir la cohérence entre le site, le schema.org
 * LocalBusiness, Google Business Profile et les annuaires locaux — plutôt
 * que de dupliquer ou d'inventer ces informations à plusieurs endroits.
 *
 * Règle stricte, identique à data/company.ts : un champ à `null` est une
 * information non communiquée à ce jour. NE JAMAIS le deviner, l'inventer,
 * ni le remplacer par un placeholder visible publiquement.
 */
export const BUSINESS = {
  name: "Conciergerie Belle Saisons",

  // TODO(nap): adresse professionnelle affichable publiquement (peut
  // différer de l'adresse du siège dans les mentions légales si un bureau
  // ou une adresse de correspondance est mis en place). Non communiquée.
  address: null as {
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
  } | null,

  // TODO(nap): numéro de téléphone professionnel dédié à l'activité,
  // distinct d'un numéro personnel. Non communiqué — ne pas inventer.
  phone: null as string | null,

  // Email public de contact : voir data/company.ts (contactEmail), non
  // confirmé comme boîte active à ce jour. Répété ici pour que le futur
  // remplissage de NAP se fasse au même endroit conceptuel.
  email: null as string | null,

  // Zone desservie, reprise de lib/site.ts (siteConfig.areaServed) pour
  // que Google Business Profile, les annuaires et le schema.org restent
  // alignés avec le site sans dupliquer la liste ailleurs.
  areaServed: [
    "Caen",
    "Côte de Nacre",
    "Ouistreham",
    "Hermanville-sur-Mer",
    "Lion-sur-Mer",
    "Luc-sur-Mer",
    "Saint-Aubin-sur-Mer",
    "Courseulles-sur-Mer",
    "Calvados",
    "Normandie",
  ],

  // TODO(nap): horaires réels de disponibilité de l'équipe (accueil
  // téléphonique / email), à confirmer avant publication sur Google
  // Business Profile. Ne pas inventer de créneaux.
  openingHours: null as string[] | null,
} as const;
