/**
 * Informations légales de Conciergerie Belle Saisons.
 *
 * Source unique pour la page /mentions-legales. Un champ à `null` est une
 * information non communiquée à ce jour : NE JAMAIS la deviner ou
 * l'inventer. La page ne rend que les champs renseignés ; les TODO
 * ci-dessous documentent ce qui reste à fournir avant mise en production.
 */
export const COMPANY = {
  commercialName: "Conciergerie Belle Saisons",
  legalForm: "Entrepreneur individuel",
  siren: "109 301 796",
  siretHeadOffice: "109 301 796 00016",
  vatNumber: "FR04109301796",
  creationDate: "2026-09-01",

  // TODO(legal): nom et prénom de l'entrepreneure individuelle — non
  // communiqués. Obligatoire sur les mentions légales d'une EI (la
  // "raison sociale" d'un EI est son nom civil). Ne pas inventer.
  legalRepresentativeName: null as string | null,

  // TODO(legal): adresse du siège — non communiquée.
  registeredAddress: null as string | null,

  // TODO(legal): email de contact — contact@belle-saisons.fr circule en
  // interne mais n'a pas été confirmé comme boîte active. Ne pas
  // l'afficher comme coordonnée légale tant qu'il n'est pas validé.
  contactEmail: null as string | null,

  // TODO(legal): aucun numéro de téléphone communiqué — ne pas inventer.
  contactPhone: null as string | null,

  // TODO(legal): hébergeur — à renseigner une fois l'hébergement de
  // production choisi (raison sociale, adresse, contact de l'hébergeur).
  hostingProvider: null as {
    name: string;
    address: string;
    contact?: string;
  } | null,

  // TODO(legal): à confirmer une fois l'activité de conciergerie
  // effectivement déclarée/étendue au registre. L'activité actuellement
  // enregistrée au RNE est "Nettoyage courant des bâtiments" — c'est
  // pourquoi le site évite tout vocabulaire de gestion immobilière
  // réglementée (mandat de gestion, encaissement de loyers...).
  professionalInsurance: null as string | null,
  consumerMediator: null as string | null,
  professionalLicense: null as string | null,
  financialGuarantee: null as string | null,
} as const;
