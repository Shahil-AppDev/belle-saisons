export const siteConfig = {
  name: "Conciergerie Belle Saisons",
  shortName: "Belle Saisons",
  baseline: "Votre temps, notre expertise",
  description:
    "Conciergerie haut de gamme à Caen et sur la Côte de Nacre. Belle Saisons gère l'intégralité de votre bien en location courte et moyenne durée : annonces, tarification, accueil voyageurs, ménage et maintenance.",
  url: "https://www.belle-saisons.fr",
  locale: "fr_FR",
  phone: "",
  email: "contact@belle-saisons.fr",
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

export const NAV_LINKS = [
  { label: "Conciergerie", href: "/conciergerie" },
  { label: "Services", href: "/services" },
  { label: "Gestion locative", href: "/gestion-locative" },
  { label: "Propriétaires", href: "/proprietaires" },
  { label: "Notre conciergerie", href: "/notre-conciergerie" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { label: "Gestion locative complète", href: "/gestion-locative" },
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
