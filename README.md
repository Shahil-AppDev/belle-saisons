# Conciergerie Belle Saisons

Site officiel de Belle Saisons, conciergerie premium dédiée à la gestion
complète de biens en location courte et moyenne durée à Caen et sur la
Côte de Nacre (Calvados, Normandie).

## Stack technique

- [Next.js 16](https://nextjs.org) — App Router, Server Components
- [React 19](https://react.dev) / TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — design system basé sur la palette de marque
- `next/font` (Playfair Display + Inter), `next/image`
- Métadonnées SEO natives Next.js (Metadata API, `sitemap.ts`, `robots.ts`) + JSON-LD (schema.org)

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

```bash
npm run lint   # ESLint
npm run build  # build de production (vérifie aussi les types)
```

## Architecture

```
app/                      Routes (App Router)
  conciergerie-*/          Pages SEO locales (Caen, Côte de Nacre, communes littorales)
  blog/[slug]/              Articles de blog
  sitemap.ts, robots.ts      SEO technique
components/
  brand/BrandLogo.tsx        Composant d'affichage du logo officiel
  layout/                    Header, Footer
  sections/                  Sections de page réutilisables (Hero, FAQ, CTA, ...)
  ui/                         Primitives (Button, Container, Reveal, JsonLd, ...)
data/                      Contenu structuré (services, villes, FAQ, articles)
lib/                       Config du site (lib/site.ts) et helpers SEO (lib/seo.ts)
public/brand/              Logo officiel et déclinaisons (favicon, OG image)
```

## Identité de marque

Le logo officiel (`public/brand/logo.png`) est la source unique utilisée dans
tout le site (header, footer, favicon, Open Graph) via le composant
`components/brand/BrandLogo.tsx`. Il ne doit jamais être redessiné, recadré
ou recoloré.

## Points à compléter avant mise en production

- **Mentions légales / Politique de confidentialité** : les champs `[à
  compléter]` (SIRET, adresse, hébergeur, DPO) doivent être renseignés avec
  les informations officielles de la société.
- **Coordonnées de contact** : l'email `contact@belle-saisons.fr` dans
  `lib/site.ts` est un placeholder à remplacer par l'adresse réelle ; aucun
  numéro de téléphone n'a été inventé.
- **Formulaire de contact** : construit sur un envoi `mailto:` côté client
  (aucun service d'emailing n'étant configuré). À remplacer par une route
  API + service transactionnel (Resend, Sendgrid...) si un envoi direct est
  souhaité.
- **Photographies** : le hero et les sections utilisent une composition
  éditoriale (dégradés, typographie) en l'absence de photographies réelles
  du bien / des logements gérés. À remplacer par de vraies photos dès
  qu'elles seront disponibles.
