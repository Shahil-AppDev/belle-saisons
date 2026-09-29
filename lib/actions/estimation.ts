"use server";

import { headers } from "next/headers";
import { estimationSchema } from "@/lib/validation/estimation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendOwnerConfirmationEmail, sendOwnerLeadEmail } from "@/lib/mail";
import { zodIssuesToFieldErrors, getRequestIp } from "@/lib/actions/zod-errors";
import type { FormState } from "@/lib/actions/types";

export async function submitEstimation(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = estimationSchema.safeParse({
    propertyType: formData.get("propertyType"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    bedrooms: formData.get("bedrooms"),
    sleeps: formData.get("sleeps"),
    surface: formData.get("surface"),
    alreadyRented: formData.get("alreadyRented"),
    needs: formData.getAll("needs"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message") ?? "",
    consent: formData.get("consent"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Merci de vérifier les informations du formulaire.",
      fieldErrors: zodIssuesToFieldErrors(parsed.error),
    };
  }

  // Honeypot rempli par un bot : on répond succès sans rien traiter,
  // pour ne pas révéler la détection anti-spam.
  if (parsed.data.company) {
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const ip = getRequestIp(requestHeaders);
  const { allowed } = checkRateLimit(`estimation:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return {
      status: "error",
      message:
        "Trop de tentatives depuis cette connexion. Merci de réessayer dans quelques minutes.",
    };
  }

  const { data } = parsed;

  const leadResult = await sendOwnerLeadEmail(data);

  if (leadResult === "failed") {
    // Resend est configuré mais l'envoi a réellement échoué : le lead
    // risque de ne jamais atteindre l'équipe. On le signale proprement
    // plutôt que d'afficher un faux succès — sans jamais exposer de
    // détail technique au visiteur.
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de la transmission de votre demande. Merci de réessayer dans quelques instants ou de nous écrire directement.",
    };
  }

  // "not_configured" (dev/staging sans Resend) est un succès du point de
  // vue de l'utilisateur : sa demande a été validée et journalisée.
  if (leadResult === "sent") {
    await sendOwnerConfirmationEmail(data);
  }

  return { status: "success" };
}
