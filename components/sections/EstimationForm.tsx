"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitEstimation } from "@/lib/actions/estimation";
import { INITIAL_FORM_STATE } from "@/lib/actions/types";
import { PROPERTY_TYPES, NEEDS_OPTIONS } from "@/lib/validation/estimation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FormConfirmation } from "@/components/sections/FormConfirmation";
import { trackEvent } from "@/lib/analytics";

const STEPS = [
  { label: "Votre bien" },
  { label: "Caractéristiques" },
  { label: "Besoins" },
  { label: "Coordonnées" },
];

export function EstimationForm() {
  const [state, formAction] = useActionState(submitEstimation, INITIAL_FORM_STATE);
  const [step, setStep] = useState(1);
  const [needsError, setNeedsError] = useState<string | undefined>(undefined);
  const hasTrackedStart = useRef(false);
  const previousStatus = useRef(state.status);

  const step1Ref = useRef<HTMLFieldSetElement>(null);
  const step2Ref = useRef<HTMLFieldSetElement>(null);
  const step3Ref = useRef<HTMLFieldSetElement>(null);
  const stepRefs = [step1Ref, step2Ref, step3Ref];

  useEffect(() => {
    if (previousStatus.current === state.status) return;
    previousStatus.current = state.status;

    if (state.status === "success") {
      trackEvent("estimation_form_submit_success");
    } else if (state.status === "error") {
      trackEvent("estimation_form_submit_error", { message: state.message });
    }
  }, [state.status, state.message]);

  // Si une erreur de validation renvoie l'utilisateur à une étape déjà
  // passée (ex. rechargement du formulaire), on l'y ramène — ajustement
  // fait pendant le rendu (pas dans un effet), via un état plutôt qu'une
  // ref car les refs ne doivent pas être lues pendant le rendu.
  const [previousFieldErrors, setPreviousFieldErrors] = useState(state.fieldErrors);
  if (state.fieldErrors && state.fieldErrors !== previousFieldErrors) {
    setPreviousFieldErrors(state.fieldErrors);
    const erroredFields = Object.keys(state.fieldErrors);
    const stepOfField = (field: string) => {
      if (["propertyType", "city", "postalCode"].includes(field)) return 1;
      if (["bedrooms", "sleeps", "surface", "alreadyRented"].includes(field)) return 2;
      if (field === "needs") return 3;
      return 4;
    };
    const earliestStep = Math.min(...erroredFields.map(stepOfField));
    if (earliestStep !== step) {
      setStep(earliestStep);
    }
  }

  function markStarted() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("estimation_form_start");
    }
  }

  function goNext() {
    const currentRef = stepRefs[step - 1];
    if (currentRef?.current && !currentRef.current.reportValidity()) return;

    if (step === 3) {
      const checked = currentRef?.current?.querySelectorAll<HTMLInputElement>(
        'input[name="needs"]:checked'
      );
      if (!checked || checked.length === 0) {
        setNeedsError("Sélectionnez au moins un besoin.");
        return;
      }
      setNeedsError(undefined);
    }

    trackEvent("estimation_form_step_complete", { step });
    setStep((current) => Math.min(current + 1, STEPS.length));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  if (state.status === "success") {
    return (
      <FormConfirmation
        title="Votre demande a bien été transmise."
        description="Notre équipe étudie votre bien et revient vers vous personnellement pour évoquer les prochaines étapes."
      />
    );
  }

  return (
    <form
      action={formAction}
      onFocus={markStarted}
      noValidate
      className="flex flex-col gap-8 rounded-sm border border-anthracite/10 bg-blanc-casse p-8 lg:p-10"
    >
      <ol className="flex items-center gap-2" aria-label="Étapes du formulaire">
        {STEPS.map((s, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isDone = stepNumber < step;
          return (
            <li key={s.label} className="flex flex-1 items-center gap-2">
              <span
                aria-current={isActive ? "step" : undefined}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                  isDone
                    ? "bg-champagne text-blanc-casse"
                    : isActive
                      ? "border border-champagne text-champagne-ink"
                      : "border border-anthracite/20 text-brun/60"
                }`}
              >
                {stepNumber}
              </span>
              <span
                className={`hidden text-xs uppercase tracking-[0.12em] sm:block ${
                  isActive ? "text-anthracite" : "text-brun/50"
                }`}
              >
                {s.label}
              </span>
              {stepNumber < STEPS.length && (
                <span className="h-px flex-1 bg-anthracite/10" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>

      <fieldset
        ref={step1Ref}
        className={`flex flex-col gap-6 ${step === 1 ? "" : "hidden"}`}
      >
        <legend className="sr-only">Votre bien</legend>
        <RadioCards
          label="Type de bien"
          name="propertyType"
          options={PROPERTY_TYPES.map((o) => ({ value: o.value, label: o.label }))}
          error={state.fieldErrors?.propertyType}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField
            label="Commune"
            name="city"
            placeholder="Caen, Ouistreham…"
            required
            error={state.fieldErrors?.city}
          />
          <TextField
            label="Code postal"
            name="postalCode"
            placeholder="14000"
            inputMode="numeric"
            required
            error={state.fieldErrors?.postalCode}
          />
        </div>
      </fieldset>

      <fieldset
        ref={step2Ref}
        className={`flex flex-col gap-6 ${step === 2 ? "" : "hidden"}`}
      >
        <legend className="sr-only">Caractéristiques du bien</legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <TextField
            label="Chambres"
            name="bedrooms"
            type="number"
            min={0}
            max={20}
            required
            error={state.fieldErrors?.bedrooms}
          />
          <TextField
            label="Couchages"
            name="sleeps"
            type="number"
            min={1}
            max={40}
            required
            error={state.fieldErrors?.sleeps}
          />
          <TextField
            label="Surface (m²)"
            name="surface"
            type="number"
            min={1}
            max={2000}
            required
            error={state.fieldErrors?.surface}
          />
        </div>
        <RadioCards
          label="Bien déjà exploité en location saisonnière ?"
          name="alreadyRented"
          options={[
            { value: "oui", label: "Oui" },
            { value: "non", label: "Non" },
          ]}
          error={state.fieldErrors?.alreadyRented}
        />
      </fieldset>

      <fieldset
        ref={step3Ref}
        className={`flex flex-col gap-6 ${step === 3 ? "" : "hidden"}`}
      >
        <legend className="sr-only">Vos besoins</legend>
        <CheckboxCards
          label="De quoi avez-vous besoin ?"
          name="needs"
          options={NEEDS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          error={needsError ?? state.fieldErrors?.needs}
          onChange={() => setNeedsError(undefined)}
        />
      </fieldset>

      <fieldset
        className={`flex flex-col gap-6 ${step === 4 ? "" : "hidden"}`}
      >
        <legend className="sr-only">Vos coordonnées</legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField label="Prénom" name="firstName" required error={state.fieldErrors?.firstName} />
          <TextField label="Nom" name="lastName" required error={state.fieldErrors?.lastName} />
          <TextField label="Email" name="email" type="email" required error={state.fieldErrors?.email} />
          <TextField label="Téléphone" name="phone" type="tel" required error={state.fieldErrors?.phone} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-brun">
            Message (facultatif)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Une précision à nous transmettre ?"
            className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/40"
          />
        </div>
        <label className="flex items-start gap-3 text-sm text-brun">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-champagne"
            aria-describedby={state.fieldErrors?.consent ? "consent-error" : undefined}
          />
          <span>
            J&apos;accepte que ces informations soient utilisées par Belle
            Saisons pour étudier ma demande. Aucune donnée n&apos;est cédée
            à un tiers.
          </span>
        </label>
        {state.fieldErrors?.consent && (
          <p id="consent-error" className="text-xs text-red-700">
            {state.fieldErrors.consent}
          </p>
        )}
      </fieldset>

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

      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-sm uppercase tracking-[0.08em] text-brun underline underline-offset-4 hover:text-anthracite"
          >
            Précédent
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center rounded-sm bg-anthracite px-7 py-3.5 text-sm uppercase tracking-[0.08em] text-blanc-casse transition-colors hover:bg-noir"
          >
            Suivant
          </button>
        ) : (
          <SubmitButton>Envoyer ma demande</SubmitButton>
        )}
      </div>
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  min,
  max,
  inputMode,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  inputMode?: "numeric";
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
        min={min}
        max={max}
        inputMode={inputMode}
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

function RadioCards({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-brun">{label} *</span>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-sm border border-anthracite/20 px-5 py-2.5 text-sm text-anthracite transition-colors has-[:checked]:border-champagne has-[:checked]:bg-champagne/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-champagne"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  );
}

function CheckboxCards({
  label,
  name,
  options,
  error,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  onChange?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-brun">{label} *</span>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-sm border border-anthracite/20 px-5 py-2.5 text-sm text-anthracite transition-colors has-[:checked]:border-champagne has-[:checked]:bg-champagne/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-champagne"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              className="sr-only"
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  );
}
