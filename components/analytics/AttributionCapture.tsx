"use client";

// L'import déclenche la capture ponctuelle (une fois par session) des
// paramètres utm_*/referrer au chargement du module côté client — voir
// lib/attribution.ts. Monté globalement dans app/layout.tsx pour que la
// capture ait lieu même si le visiteur atterrit sur une page qui n'a pas
// de formulaire.
import "@/lib/attribution";

export function AttributionCapture() {
  return null;
}
