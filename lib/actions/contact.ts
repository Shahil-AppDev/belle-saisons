"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/mail";
import { zodIssuesToFieldErrors, getRequestIp } from "@/lib/actions/zod-errors";
import type { FormState } from "@/lib/actions/types";

export async function submitContact(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    message: formData.get("message"),
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

  if (parsed.data.company) {
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const ip = getRequestIp(requestHeaders);
  const { allowed } = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return {
      status: "error",
      message:
        "Trop de tentatives depuis cette connexion. Merci de réessayer dans quelques minutes.",
    };
  }

  const { data } = parsed;

  await sendLeadEmail({
    subject: `Nouveau message de contact — ${data.name}`,
    text: [
      `Nom : ${data.name}`,
      `Email : ${data.email}`,
      data.phone ? `Téléphone : ${data.phone}` : undefined,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
    replyTo: data.email,
  });

  return { status: "success" };
}
