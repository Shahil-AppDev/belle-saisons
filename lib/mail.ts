import { Resend } from "resend";

export type MailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Envoie un email via Resend si l'intégration est configurée
 * (RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM — voir
 * .env.example). Tant que ces variables ne sont pas définies, la demande
 * est simplement journalisée côté serveur : aucune donnée n'est perdue,
 * mais elle n'est pas non plus transmise. C'est documenté dans le README
 * pour ne jamais laisser croire qu'un email a été envoyé alors qu'il ne
 * l'a pas été.
 */
export async function sendLeadEmail(
  payload: MailPayload
): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.warn(
      "[mail] Intégration Resend non configurée (RESEND_API_KEY / CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM manquants) — demande journalisée uniquement, non envoyée par email.",
      payload
    );
    return { delivered: false };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      to,
      from,
      subject: payload.subject,
      text: payload.text,
      replyTo: payload.replyTo,
    });

    if (error) {
      console.error("[mail] Échec d'envoi Resend", error);
      return { delivered: false };
    }

    return { delivered: true };
  } catch (error) {
    console.error("[mail] Erreur inattendue lors de l'envoi Resend", error);
    return { delivered: false };
  }
}
