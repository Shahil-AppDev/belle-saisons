import { z } from "zod";
import { CONTACT_SUBJECTS } from "@/lib/validation/contact-options";

const subjectValues = CONTACT_SUBJECTS.map((option) => option.value) as [
  string,
  ...string[],
];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Nom requis.").max(120, "Nom trop long."),
  email: z.string().trim().min(1, "Email requis.").max(200).email("Adresse email invalide."),
  phone: z.string().trim().max(20, "Numéro trop long.").optional().or(z.literal("")),
  subject: z.enum(subjectValues, { message: "Sélectionnez un sujet." }),
  message: z.string().trim().min(1, "Message requis.").max(2000, "Message trop long (2000 caractères maximum)."),
  consent: z.literal("on", {
    message: "Le consentement au traitement des données est requis.",
  }),
  // Anti-spam : ce champ doit rester vide (honeypot).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
