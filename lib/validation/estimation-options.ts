/**
 * Constantes d'options UI, séparées du schéma Zod (estimation.ts).
 *
 * EstimationForm.tsx (Client Component) n'importe que ce fichier pour
 * peupler ses champs : il ne dépend jamais de zod, qui reste ainsi
 * cantonné au bundle serveur (Server Actions) et n'alourdit pas le
 * JavaScript envoyé au navigateur.
 */
export const PROPERTY_TYPES = [
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "villa", label: "Villa" },
  { value: "autre", label: "Autre" },
] as const;

export const NEEDS_OPTIONS = [
  { value: "gestion-complete", label: "Gestion complète de conciergerie" },
  { value: "accueil-voyageurs", label: "Accueil voyageurs" },
  { value: "menage-linge", label: "Ménage / linge" },
  { value: "optimisation-annonce", label: "Optimisation de l'annonce" },
  { value: "accompagnement-personnalise", label: "Accompagnement personnalisé" },
  { value: "autre", label: "Autre" },
] as const;
