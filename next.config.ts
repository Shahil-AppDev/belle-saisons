import type { NextConfig } from "next";

// En-têtes de sécurité de base, volontairement limités : X-Frame-Options
// interdit l'affichage du site dans une frame tierce (protection
// clickjacking) sans dépendre d'une CSP frame-ancestors plus complexe à
// maintenir. Aucune Content-Security-Policy n'est définie ici : une CSP mal
// calibrée casse facilement next/script, next/font et les scripts inline
// (JSON-LD, Plausible) — à construire précisément si le besoin se présente,
// plutôt que d'imposer une politique générique. HSTS n'est pas géré ici :
// c'est la responsabilité de l'hébergeur une fois le HTTPS actif sur le
// domaine définitif (Vercel l'ajoute automatiquement), pour ne jamais
// envoyer cet en-tête sur un environnement encore servi en HTTP.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      // L'URL /gestion-locative évoquait une activité réglementée
      // d'administration de biens (mandat de gestion, encaissement des
      // loyers) que Belle Saisons n'exerce pas. Renommée en
      // /gestion-complete ; redirection permanente pour ne jamais casser
      // un lien déjà indexé ou partagé.
      {
        source: "/gestion-locative",
        destination: "/gestion-complete",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
