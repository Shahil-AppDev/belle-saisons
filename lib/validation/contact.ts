import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Nom requis."),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message requis.").max(2000),
  consent: z.literal("on", {
    message: "Le consentement au traitement des données est requis.",
  }),
  // Anti-spam : ce champ doit rester vide (honeypot).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
