import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
