"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/lib/actions/contact";
import { INITIAL_FORM_STATE } from "@/lib/actions/types";
import { CONTACT_SUBJECTS } from "@/lib/validation/contact-options";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FormConfirmation } from "@/components/sections/FormConfirmation";
import { AttributionFields } from "@/components/sections/AttributionFields";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, INITIAL_FORM_STATE);
  const previousStatus = useRef(state.status);

  useEffect(() => {
    if (previousStatus.current === state.status) return;
    previousStatus.current = state.status;

    if (state.status === "success") {
      trackEvent("contact_form_submit");
    }
  }, [state.status, state.message]);

  if (state.status === "success") {
    return (
      <FormConfirmation
        title="Votre message a bien été transmis."
        description="Notre équipe vous répond personnellement dans les meilleurs délais."
      />
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-6 rounded-sm border border-anthracite/10 bg-blanc-casse p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nom complet" name="name" required maxLength={120} error={state.fieldErrors?.name} />
        <Field label="Email" name="email" type="email" required maxLength={200} error={state.fieldErrors?.email} />
        <Field label="Téléphone (facultatif)" name="phone" type="tel" maxLength={20} error={state.fieldErrors?.phone} />
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-xs uppercase tracking-[0.18em] text-brun">
            Sujet *
          </label>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            aria-invalid={Boolean(state.fieldErrors?.subject)}
            aria-describedby={state.fieldErrors?.subject ? "subject-error" : undefined}
            className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/40"
          >
            <option value="" disabled>
              Sélectionnez une option
            </option>
            {CONTACT_SUBJECTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {state.fieldErrors?.subject && (
            <p id="subject-error" className="text-xs text-red-700">
              {state.fieldErrors.subject}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-brun">
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          placeholder="Parlez-nous de votre bien et de vos objectifs…"
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/40"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="text-xs text-red-700">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-brun">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-champagne"
          aria-describedby={state.fieldErrors?.consent ? "contact-consent-error" : undefined}
        />
        <span>
          J&apos;accepte que les informations transmises soient utilisées
          pour répondre à ma demande, conformément à notre{" "}
          <a
            href="/politique-de-confidentialite"
            className="text-champagne-ink underline underline-offset-2"
          >
            politique de confidentialité
          </a>
          .
        </span>
      </label>
      {state.fieldErrors?.consent && (
        <p id="contact-consent-error" className="text-xs text-red-700">
          {state.fieldErrors.consent}
        </p>
      )}

      {/* Honeypot anti-spam : doit rester vide, invisible pour un humain */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Ne pas remplir ce champ</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <AttributionFields />

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <SubmitButton className="w-full sm:w-fit">Envoyer mon message</SubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  maxLength,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs uppercase tracking-[0.18em] text-brun">
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/40"
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
