"use server";

import { headers } from "next/headers";
import { estimationSchema, NEEDS_OPTIONS } from "@/lib/validation/estimation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/mail";
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
  const needsLabels = data.needs
    .map((value) => NEEDS_OPTIONS.find((option) => option.value === value)?.label ?? value)
    .join(", ");

  await sendLeadEmail({
    subject: `Nouvelle demande d'estimation — ${data.city} (${data.postalCode})`,
    text: [
      `Type de bien : ${data.propertyType}`,
      `Commune : ${data.city} (${data.postalCode})`,
      `Chambres : ${data.bedrooms} — Couchages : ${data.sleeps} — Surface : ${data.surface} m²`,
      `Bien déjà exploité en location saisonnière : ${data.alreadyRented}`,
      `Besoins exprimés : ${needsLabels}`,
      "",
      `Contact : ${data.firstName} ${data.lastName}`,
      `Email : ${data.email}`,
      `Téléphone : ${data.phone}`,
      data.message ? `Message : ${data.message}` : undefined,
    ]
      .filter(Boolean)
      .join("\n"),
    replyTo: data.email,
  });

  return { status: "success" };
}
