import { z } from "zod";
import { PROPERTY_TYPES, NEEDS_OPTIONS } from "@/lib/validation/estimation-options";

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
  city: z
    .string()
    .trim()
    .min(2, "Indiquez la commune de votre bien.")
    .max(80, "Nom de commune trop long."),
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

  // Étape 3 — au plus une fois chaque option, jamais plus que le nombre
  // d'options disponibles (défense en profondeur contre un payload forgé).
  needs: z
    .array(z.enum(needsValues))
    .min(1, "Sélectionnez au moins un besoin.")
    .max(needsValues.length)
    .refine((values) => new Set(values).size === values.length, {
      message: "Besoins en double.",
    }),

  // Étape 4
  firstName: z.string().trim().min(1, "Prénom requis.").max(80, "Prénom trop long."),
  lastName: z.string().trim().min(1, "Nom requis.").max(80, "Nom trop long."),
  email: z.string().trim().min(1, "Email requis.").max(200, "Email trop long.").email("Adresse email invalide."),
  phone: z
    .string()
    .trim()
    .min(6, "Numéro de téléphone invalide.")
    .max(20, "Numéro de téléphone invalide."),
  message: z.string().trim().max(2000, "Message trop long (2000 caractères maximum).").optional().or(z.literal("")),
  consent: z.literal("on", {
    message: "Le consentement au traitement des données est requis.",
  }),

  // Anti-spam : ce champ doit rester vide (honeypot).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EstimationInput = z.infer<typeof estimationSchema>;
