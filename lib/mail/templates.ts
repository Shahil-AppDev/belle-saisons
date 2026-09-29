import { siteConfig } from "@/lib/site";
import { escapeHtml } from "@/lib/mail/escape-html";
import { wrapEmailHtml } from "@/lib/mail/layout";
import { PROPERTY_TYPES, NEEDS_OPTIONS } from "@/lib/validation/estimation-options";
import type { EstimationInput } from "@/lib/validation/estimation";
import { CONTACT_SUBJECTS } from "@/lib/validation/contact-options";
import type { ContactInput } from "@/lib/validation/contact";

export type MailContent = {
  subject: string;
  html: string;
  text: string;
};

function formatRequestDate(): string {
  return new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });
}

function row(label: string, value: string): string {
  return `<p style="margin:0 0 10px;"><strong style="color:#7d5e28;">${escapeHtml(label)} :</strong> ${escapeHtml(value)}</p>`;
}

type AttributionFields = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
};

// Le "lead_source" n'est jamais saisi par le visiteur : c'est une lecture
// des paramètres déjà capturés (utm_source en priorité, sinon le domaine
// du referrer, sinon "Direct"), utile pour prioriser le suivi commercial
// sans construire de CRM.
function resolveLeadSource(data: AttributionFields): string {
  if (data.utm_source) return data.utm_source;
  if (data.referrer) {
    try {
      return new URL(data.referrer).hostname;
    } catch {
      return data.referrer;
    }
  }
  return "Direct (accès direct, favori ou app)";
}

function attributionRowsHtml(data: AttributionFields): string {
  const hasAttribution = Boolean(
    data.utm_source ||
      data.utm_medium ||
      data.utm_campaign ||
      data.utm_term ||
      data.utm_content ||
      data.landing_page ||
      data.referrer
  );
  if (!hasAttribution) return "";

  return [
    row("Source du lead", resolveLeadSource(data)),
    ...(data.landing_page ? [row("Page d'atterrissage", data.landing_page)] : []),
    ...(data.utm_medium ? [row("UTM medium", data.utm_medium)] : []),
    ...(data.utm_campaign ? [row("UTM campagne", data.utm_campaign)] : []),
    ...(data.utm_term ? [row("UTM terme", data.utm_term)] : []),
    ...(data.utm_content ? [row("UTM contenu", data.utm_content)] : []),
  ].join("");
}

function attributionLinesText(data: AttributionFields): string[] {
  const hasAttribution = Boolean(
    data.utm_source ||
      data.utm_medium ||
      data.utm_campaign ||
      data.utm_term ||
      data.utm_content ||
      data.landing_page ||
      data.referrer
  );
  if (!hasAttribution) return [];

  return [
    "",
    `Source du lead : ${resolveLeadSource(data)}`,
    data.landing_page ? `Page d'atterrissage : ${data.landing_page}` : undefined,
    data.utm_medium ? `UTM medium : ${data.utm_medium}` : undefined,
    data.utm_campaign ? `UTM campagne : ${data.utm_campaign}` : undefined,
    data.utm_term ? `UTM terme : ${data.utm_term}` : undefined,
    data.utm_content ? `UTM contenu : ${data.utm_content}` : undefined,
  ].filter((line): line is string => Boolean(line));
}

// ---------------------------------------------------------------------------
// Email interne — nouvelle demande d'estimation propriétaire
// ---------------------------------------------------------------------------
export function buildOwnerLeadEmail(data: EstimationInput): MailContent {
  const propertyTypeLabel =
    PROPERTY_TYPES.find((o) => o.value === data.propertyType)?.label ?? data.propertyType;
  const needsLabels = data.needs
    .map((value) => NEEDS_OPTIONS.find((option) => option.value === value)?.label ?? value)
    .join(", ");
  const requestDate = formatRequestDate();

  const rows = [
    row("Type de bien", propertyTypeLabel),
    row("Commune", `${data.city} (${data.postalCode})`),
    row("Chambres", String(data.bedrooms)),
    row("Couchages", String(data.sleeps)),
    row("Surface", `${data.surface} m²`),
    row("Déjà en location saisonnière", data.alreadyRented === "oui" ? "Oui" : "Non"),
    row("Besoins exprimés", needsLabels),
    row("Prénom", data.firstName),
    row("Nom", data.lastName),
    row("Email", data.email),
    row("Téléphone", data.phone),
    row("Reçue le", requestDate),
  ].join("");

  const messageHtml = data.message
    ? `<p style="margin:16px 0 0;"><strong style="color:#7d5e28;">Message :</strong><br />${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>`
    : "";

  const html = wrapEmailHtml({
    preheader: `Nouvelle demande d'estimation — ${data.city}`,
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:16px;">Nouvelle demande d'estimation propriétaire.</p>
      ${rows}
      ${messageHtml}
      ${attributionRowsHtml(data)}
    `,
  });

  const text = [
    `Nouvelle demande d'estimation — ${data.city} (${data.postalCode})`,
    "",
    `Type de bien : ${propertyTypeLabel}`,
    `Commune : ${data.city} (${data.postalCode})`,
    `Chambres : ${data.bedrooms} — Couchages : ${data.sleeps} — Surface : ${data.surface} m²`,
    `Déjà en location saisonnière : ${data.alreadyRented === "oui" ? "Oui" : "Non"}`,
    `Besoins exprimés : ${needsLabels}`,
    "",
    `Prénom : ${data.firstName}`,
    `Nom : ${data.lastName}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.phone}`,
    data.message ? `Message : ${data.message}` : undefined,
    "",
    `Reçue le ${requestDate}`,
    ...attributionLinesText(data),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Nouvelle demande d'estimation — ${data.city} (${data.postalCode})`,
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// Email de confirmation au propriétaire
// ---------------------------------------------------------------------------
export function buildOwnerConfirmationEmail(data: {
  firstName: string;
}): MailContent {
  const html = wrapEmailHtml({
    preheader: "Votre demande a bien été reçue.",
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:16px;">Bonjour ${escapeHtml(data.firstName)},</p>
      <p style="margin:0 0 16px;">
        Votre demande concernant votre bien a bien été reçue par Conciergerie
        Belle Saisons. Notre équipe va l'étudier et reviendra vers vous
        personnellement pour évoquer les prochaines étapes.
      </p>
      <p style="margin:0 0 16px;">
        Vous pouvez répondre directement à cet email si vous souhaitez
        compléter votre demande.
      </p>
      <p style="margin:24px 0 0;">À très bientôt,<br />L'équipe Belle Saisons</p>
    `,
  });

  const text = [
    `Bonjour ${data.firstName},`,
    "",
    "Votre demande concernant votre bien a bien été reçue par Conciergerie Belle Saisons.",
    "Notre équipe va l'étudier et reviendra vers vous personnellement pour évoquer les prochaines étapes.",
    "",
    "Vous pouvez répondre directement à cet email si vous souhaitez compléter votre demande.",
    "",
    "À très bientôt,",
    "L'équipe Belle Saisons",
    "",
    siteConfig.url,
  ].join("\n");

  return {
    subject: "Votre demande a bien été reçue — Conciergerie Belle Saisons",
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// Email interne — nouveau message de contact
// ---------------------------------------------------------------------------
export function buildContactLeadEmail(data: ContactInput): MailContent {
  const subjectLabel =
    CONTACT_SUBJECTS.find((o) => o.value === data.subject)?.label ?? data.subject;
  const requestDate = formatRequestDate();

  const rows = [
    row("Nom", data.name),
    row("Email", data.email),
    ...(data.phone ? [row("Téléphone", data.phone)] : []),
    row("Sujet", subjectLabel),
    row("Reçu le", requestDate),
  ].join("");

  const html = wrapEmailHtml({
    preheader: `Nouveau message de contact — ${data.name}`,
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:16px;">Nouveau message via le formulaire de contact.</p>
      ${rows}
      <p style="margin:16px 0 0;"><strong style="color:#7d5e28;">Message :</strong><br />${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
      ${attributionRowsHtml(data)}
    `,
  });

  const text = [
    `Nouveau message de contact — ${data.name}`,
    "",
    `Nom : ${data.name}`,
    `Email : ${data.email}`,
    data.phone ? `Téléphone : ${data.phone}` : undefined,
    `Sujet : ${subjectLabel}`,
    "",
    data.message,
    "",
    `Reçu le ${requestDate}`,
    ...attributionLinesText(data),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Nouveau message de contact — ${data.name}`,
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// Email de confirmation au contact
// ---------------------------------------------------------------------------
export function buildContactConfirmationEmail(data: { name: string }): MailContent {
  const firstNameOnly = data.name.trim().split(/\s+/)[0] ?? data.name;

  const html = wrapEmailHtml({
    preheader: "Votre message a bien été reçu.",
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:16px;">Bonjour ${escapeHtml(firstNameOnly)},</p>
      <p style="margin:0 0 16px;">
        Votre message a bien été reçu par Conciergerie Belle Saisons. Notre
        équipe vous répond personnellement dès que possible.
      </p>
      <p style="margin:24px 0 0;">À très bientôt,<br />L'équipe Belle Saisons</p>
    `,
  });

  const text = [
    `Bonjour ${firstNameOnly},`,
    "",
    "Votre message a bien été reçu par Conciergerie Belle Saisons. Notre équipe vous répond personnellement dès que possible.",
    "",
    "À très bientôt,",
    "L'équipe Belle Saisons",
    "",
    siteConfig.url,
  ].join("\n");

  return {
    subject: "Votre message a bien été reçu — Conciergerie Belle Saisons",
    html,
    text,
  };
}
