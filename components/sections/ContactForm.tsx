"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

const PROPERTY_TYPES = [
  "Appartement",
  "Maison",
  "Résidence secondaire",
  "Autre",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const propertyType = formData.get("propertyType");
    const city = formData.get("city");
    const message = formData.get("message");

    const subject = encodeURIComponent(
      `Demande de gestion — ${propertyType ?? "Bien"} à ${city ?? ""}`
    );
    const body = encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\nTéléphone : ${phone}\nType de bien : ${propertyType}\nCommune : ${city}\n\nMessage :\n${message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-sm border border-anthracite/10 bg-blanc-casse p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nom complet" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Téléphone" name="phone" type="tel" />
        <Field label="Commune du bien" name="city" placeholder="Caen, Ouistreham…" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.18em] text-brun">
          Type de bien
        </label>
        <select
          name="propertyType"
          className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Sélectionnez une option
          </option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.18em] text-brun">
          Votre message
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Parlez-nous de votre bien et de vos objectifs…"
          className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-sm bg-anthracite px-7 py-3.5 text-sm uppercase tracking-[0.08em] text-blanc-casse transition-colors hover:bg-noir sm:w-fit"
      >
        Envoyer ma demande
      </button>

      {status === "sent" && (
        <p className="text-sm text-champagne">
          Votre messagerie va s&apos;ouvrir pour finaliser l&apos;envoi de
          votre demande. À défaut, écrivez-nous directement à{" "}
          {siteConfig.email}.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        className="border border-anthracite/20 bg-blanc-casse px-4 py-3 text-sm text-anthracite focus:border-champagne focus:outline-none"
      />
    </div>
  );
}
