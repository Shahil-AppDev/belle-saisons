// Domaine définitif du site. Piloté par NEXT_PUBLIC_SITE_URL pour permettre
// des environnements de preview/staging sans jamais générer d'URL
// localhost en production ; retombe sur le domaine définitif si la
// variable n'est pas définie. Toujours sans slash final.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.belle-saisons.fr").replace(
  /\/+$/,
  ""
);

export const siteConfig = {
  name: "Conciergerie Belle Saisons",
  shortName: "Belle Saisons",
  baseline: "Votre temps, notre expertise",
  description:
    "Conciergerie haut de gamme à Caen et sur la Côte de Nacre. Belle Saisons gère l'intégralité de votre bien en location courte et moyenne durée : annonces, tarification, accueil voyageurs, ménage et maintenance.",
  url: SITE_URL,
  logoPath: "/brand/logo.png",
  socialImagePath: "/brand/og-image.png",
  locale: "fr_FR",
  // Aucun email ni téléphone public : l'adresse contact@belle-saisons.fr
  // circule en interne mais n'a pas été confirmée comme boîte active, et
  // aucun numéro n'a été communiqué. Tant que ces coordonnées ne sont pas
  // validées, le site s'appuie uniquement sur le formulaire de contact
  // (traité côté serveur, cf. lib/mail.ts) plutôt que de les afficher.
  region: "Calvados, Normandie",
  areaServed: [
    "Caen",
    "Côte de Nacre",
    "Ouistreham",
    "Lion-sur-Mer",
    "Luc-sur-Mer",
    "Hermanville-sur-Mer",
    "Saint-Aubin-sur-Mer",
    "Courseulles-sur-Mer",
    "Calvados",
    "Normandie",
  ],
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },
} as const;

export const PRIMARY_CTA = {
  label: "Confier mon bien",
  href: "/confier-mon-bien",
} as const;

export const NAV_LINKS = [
  { label: "Conciergerie", href: "/conciergerie" },
  { label: "Services", href: "/services" },
  { label: "Gestion complète", href: "/gestion-complete" },
  { label: "Propriétaires", href: "/proprietaires" },
  { label: "Notre conciergerie", href: "/notre-conciergerie" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { label: "Confier mon bien", href: "/confier-mon-bien" },
  { label: "Gestion complète de conciergerie", href: "/gestion-complete" },
  { label: "Location courte durée", href: "/location-courte-duree" },
  { label: "Conciergerie Airbnb", href: "/airbnb" },
  { label: "Conciergerie Booking.com", href: "/booking" },
  { label: "Tous nos services", href: "/services" },
] as const;

export const FOOTER_ZONES_LINKS = [
  { label: "Caen", href: "/conciergerie-caen" },
  { label: "Côte de Nacre", href: "/conciergerie-cote-de-nacre" },
  { label: "Ouistreham", href: "/conciergerie-ouistreham" },
  { label: "Lion-sur-Mer", href: "/conciergerie-lion-sur-mer" },
  { label: "Luc-sur-Mer", href: "/conciergerie-luc-sur-mer" },
  { label: "Hermanville-sur-Mer", href: "/conciergerie-hermanville-sur-mer" },
  { label: "Saint-Aubin-sur-Mer", href: "/conciergerie-saint-aubin-sur-mer" },
  { label: "Courseulles-sur-Mer", href: "/conciergerie-courseulles-sur-mer" },
  { label: "Normandie", href: "/conciergerie-normandie" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
] as const;
