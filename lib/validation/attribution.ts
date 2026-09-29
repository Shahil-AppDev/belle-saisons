import { z } from "zod";

/**
 * Champs d'attribution de lead, communs aux deux formulaires (estimation
 * et contact). Tous facultatifs : un visiteur arrivé en direct n'a aucun
 * de ces champs, ce qui est un cas normal, pas une erreur de validation.
 */
export const attributionSchema = {
  utm_source: z.string().trim().max(200).optional().or(z.literal("")),
  utm_medium: z.string().trim().max(200).optional().or(z.literal("")),
  utm_campaign: z.string().trim().max(200).optional().or(z.literal("")),
  utm_term: z.string().trim().max(200).optional().or(z.literal("")),
  utm_content: z.string().trim().max(200).optional().or(z.literal("")),
  landing_page: z.string().trim().max(200).optional().or(z.literal("")),
  referrer: z.string().trim().max(300).optional().or(z.literal("")),
};

export type AttributionInput = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
};
