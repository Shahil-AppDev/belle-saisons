import { Resend } from "resend";
import type { MailContent } from "@/lib/mail/templates";

export type SendResult = "sent" | "not_configured" | "failed";

/**
 * Envoie un email via Resend vers `to`. Tant que RESEND_API_KEY et
 * CONTACT_EMAIL_FROM ne sont pas définis (voir .env.example), retourne
 * "not_configured" sans lever d'erreur : c'est l'état attendu en
 * développement, la demande reste validée et journalisée côté serveur par
 * l'appelant.
 *
 * Journalisation volontairement minimale : jamais le contenu de l'email
 * (sujet, corps, destinataire) n'est écrit dans les logs, seulement des
 * métadonnées techniques (succès/échec, type d'erreur).
 */
export async function sendMail(
  content: MailContent & { to: string; replyTo?: string }
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(
      "[mail] Intégration Resend non configurée (RESEND_API_KEY / CONTACT_EMAIL_FROM manquants) — email non envoyé."
    );
    return "not_configured";
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      to: content.to,
      from,
      subject: content.subject,
      html: content.html,
      text: content.text,
      replyTo: content.replyTo,
    });

    if (error) {
      console.error("[mail] Échec d'envoi Resend", { name: error.name, message: error.message });
      return "failed";
    }

    return "sent";
  } catch (error) {
    console.error(
      "[mail] Erreur inattendue lors de l'envoi Resend",
      error instanceof Error ? { name: error.name, message: error.message } : error
    );
    return "failed";
  }
}

/**
 * Envoie un email "best effort" : son échec ne doit jamais bloquer la
 * réponse à l'utilisateur. Utilisé pour les confirmations prospect, dont
 * l'échec ne remet pas en cause le traitement du lead interne. On se
 * contente de journaliser.
 */
export async function sendMailBestEffort(
  content: MailContent & { to: string; replyTo?: string }
): Promise<void> {
  const result = await sendMail(content);
  if (result === "failed") {
    console.error("[mail] Email de confirmation non délivré (best effort).");
  }
}
