import { sendMail, sendMailBestEffort, type SendResult } from "@/lib/mail/client";
import {
  buildContactConfirmationEmail,
  buildContactLeadEmail,
  buildOwnerConfirmationEmail,
  buildOwnerLeadEmail,
} from "@/lib/mail/templates";
import type { EstimationInput } from "@/lib/validation/estimation";
import type { ContactInput } from "@/lib/validation/contact";

export type { SendResult };

function teamInboxAddress(): string | undefined {
  return process.env.CONTACT_EMAIL_TO || undefined;
}

/** Email interne à l'équipe Belle Saisons : nouvelle demande d'estimation. */
export async function sendOwnerLeadEmail(data: EstimationInput): Promise<SendResult> {
  const to = teamInboxAddress();
  if (!to) {
    console.warn("[mail] CONTACT_EMAIL_TO manquant — email interne non envoyé.");
    return "not_configured";
  }
  const content = buildOwnerLeadEmail(data);
  return sendMail({ ...content, to, replyTo: data.email });
}

/** Email de confirmation envoyé au propriétaire après sa demande. */
export async function sendOwnerConfirmationEmail(data: EstimationInput): Promise<void> {
  const content = buildOwnerConfirmationEmail({ firstName: data.firstName });
  await sendMailBestEffort({ ...content, to: data.email, replyTo: teamInboxAddress() });
}

/** Email interne à l'équipe Belle Saisons : nouveau message de contact. */
export async function sendContactLeadEmail(data: ContactInput): Promise<SendResult> {
  const to = teamInboxAddress();
  if (!to) {
    console.warn("[mail] CONTACT_EMAIL_TO manquant — email interne non envoyé.");
    return "not_configured";
  }
  const content = buildContactLeadEmail(data);
  return sendMail({ ...content, to, replyTo: data.email });
}

/** Email de confirmation envoyé après un message de contact. */
export async function sendContactConfirmationEmail(data: ContactInput): Promise<void> {
  const content = buildContactConfirmationEmail({ name: data.name });
  await sendMailBestEffort({ ...content, to: data.email, replyTo: teamInboxAddress() });
}
