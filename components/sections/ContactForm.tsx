"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/lib/actions/contact";
import { INITIAL_FORM_STATE } from "@/lib/actions/types";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FormConfirmation } from "@/components/sections/FormConfirmation";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, INITIAL_FORM_STATE);
  const previousStatus = useRef(state.status);

  useEffect(() => {
    if (previousStatus.current === state.status) return;
    previousStatus.current = state.status;

    if (state.status === "success") {
      trackEvent("contact_form_submit_success");
    } else if (state.status === "error") {
      trackEvent("contact_form_submit_error", { message: state.message });
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
        <Field label="Nom complet" name="name" required error={state.fieldErrors?.name} />
        <Field label="Email" name="email" type="email" required error={state.fieldErrors?.email} />
        <Field label="Téléphone" name="phone" type="tel" error={state.fieldErrors?.phone} />
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
        />
        <span>
          J&apos;accepte que ces informations soient utilisées par Belle
          Saisons pour répondre à ma demande.
        </span>
      </label>
      {state.fieldErrors?.consent && (
        <p className="text-xs text-red-700">{state.fieldErrors.consent}</p>
      )}

      {/* Honeypot anti-spam : doit rester vide, invisible pour un humain */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Ne pas remplir ce champ</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
