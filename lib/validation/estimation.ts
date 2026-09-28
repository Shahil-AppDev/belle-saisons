import { z } from "zod";

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

const propertyTypeValues = PROPERTY_TYPES.map((option) => option.value) as [
  string,
  ...string[],
];
const needsValues = NEEDS_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

export const estimationSchema = z.object({
  // Étape 1
  propertyType: z.enum(propertyTypeValues, {
    message: "Sélectionnez un type de bien.",
  }),
  city: z.string().trim().min(2, "Indiquez la commune de votre bien."),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Code postal invalide (5 chiffres)."),

  // Étape 2
  bedrooms: z.coerce
    .number({ message: "Indiquez un nombre de chambres." })
    .int()
    .min(0)
    .max(20),
  sleeps: z.coerce
    .number({ message: "Indiquez un nombre de couchages." })
    .int()
    .min(1)
    .max(40),
  surface: z.coerce
    .number({ message: "Indiquez une surface approximative." })
    .min(1)
    .max(2000),
  alreadyRented: z.enum(["oui", "non"], {
    message: "Précisez si le bien est déjà exploité.",
  }),

  // Étape 3
  needs: z
    .array(z.enum(needsValues))
    .min(1, "Sélectionnez au moins un besoin."),

  // Étape 4
  firstName: z.string().trim().min(1, "Prénom requis."),
  lastName: z.string().trim().min(1, "Nom requis."),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z
    .string()
    .trim()
    .min(6, "Numéro de téléphone invalide.")
    .max(20, "Numéro de téléphone invalide."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal("on", {
    message: "Le consentement au traitement des données est requis.",
  }),

  // Anti-spam : ce champ doit rester vide (honeypot).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EstimationInput = z.infer<typeof estimationSchema>;
