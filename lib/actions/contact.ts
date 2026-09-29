"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactConfirmationEmail, sendContactLeadEmail } from "@/lib/mail";
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
    subject: formData.get("subject"),
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

  const leadResult = await sendContactLeadEmail(data);

  if (leadResult === "failed") {
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de la transmission de votre message. Merci de réessayer dans quelques instants ou de nous écrire directement.",
    };
  }

  if (leadResult === "sent") {
    await sendContactConfirmationEmail(data);
  }

  return { status: "success" };
}
