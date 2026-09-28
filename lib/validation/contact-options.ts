/**
 * Constantes d'options UI, séparées du schéma Zod (contact.ts) pour que
 * ContactForm.tsx (Client Component) n'entraîne jamais zod dans le bundle
 * navigateur. Voir estimation-options.ts pour le même principe.
 */
export const CONTACT_SUBJECTS = [
  { value: "proprietaire", label: "Je suis propriétaire" },
  { value: "voyageur", label: "Je suis voyageur" },
  { value: "partenariat", label: "Partenariat" },
  { value: "presse", label: "Presse" },
  { value: "autre", label: "Autre" },
] as const;
