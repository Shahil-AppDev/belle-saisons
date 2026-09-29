import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/client";
import {
  buildContactConfirmationEmail,
  buildContactLeadEmail,
  buildOwnerConfirmationEmail,
  buildOwnerLeadEmail,
} from "@/lib/mail/templates";

/**
 * Route de test email contrôlé — jamais active en production.
 *
 * Double condition requise : NODE_ENV !== "production" ET
 * EMAIL_TEST_MODE=true (voir .env.example). Sans ces deux conditions,
 * répond 404 comme si la route n'existait pas.
 *
 * Objectif : vérifier en conditions réelles les 4 gabarits d'email
 * (lead propriétaire, confirmation propriétaire, lead contact,
 * confirmation contact) — rendu HTML, échappement anti-injection,
 * Reply-To — via le même code que la production (lib/mail/*), avec un
 * vrai envoi Resend si les identifiants sont configurés, ou un état
 * "not_configured" explicite sinon. Ne renvoie jamais un faux succès :
 * le statut retourné par sendMail() pour chaque gabarit est répercuté tel
 * quel.
 *
 * Usage : GET /api/dev/test-email?to=vous@exemple.fr (en dev, avec
 * EMAIL_TEST_MODE=true dans .env.local).
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production" || process.env.EMAIL_TEST_MODE !== "true") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to") ?? process.env.CONTACT_EMAIL_TO;

  if (!to) {
    return NextResponse.json(
      {
        error:
          "Destinataire manquant : ajoutez ?to=vous@exemple.fr à l'URL ou définissez CONTACT_EMAIL_TO.",
      },
      { status: 400 }
    );
  }

  // Charge utile volontairement piégée pour vérifier l'échappement HTML
  // dans les emails (voir lib/mail/escape-html.ts).
  const xssProbe = `<script>alert('xss')</script> & "citation" 'simple'`;

  const ownerLead = buildOwnerLeadEmail({
    propertyType: "appartement",
    city: "Caen",
    postalCode: "14000",
    bedrooms: 2,
    sleeps: 4,
    surface: 55,
    alreadyRented: "non",
    needs: ["gestion-complete"],
    firstName: "Test",
    lastName: "Envoi",
    email: "test-envoi@example.com",
    phone: "0600000000",
    message: xssProbe,
    consent: "on",
    company: "",
  });
  const ownerConfirmation = buildOwnerConfirmationEmail({ firstName: "Test" });
  const contactLead = buildContactLeadEmail({
    name: "Test Contact",
    email: "test-contact@example.com",
    phone: "",
    subject: "autre",
    message: xssProbe,
    consent: "on",
    company: "",
  });
  const contactConfirmation = buildContactConfirmationEmail({ name: "Test Contact" });

  const results = {
    ownerLead: await sendMail({ ...ownerLead, to, replyTo: "test-reply@example.com" }),
    ownerConfirmation: await sendMail({ ...ownerConfirmation, to }),
    contactLead: await sendMail({ ...contactLead, to, replyTo: "test-reply@example.com" }),
    contactConfirmation: await sendMail({ ...contactConfirmation, to }),
  };

  const escapingOk =
    ownerLead.html.includes("&lt;script&gt;") && !ownerLead.html.includes("<script>alert");

  return NextResponse.json({
    results,
    escapingOk,
    note: "results indique sent / not_configured / failed pour chaque gabarit — jamais un faux succès.",
  });
}
