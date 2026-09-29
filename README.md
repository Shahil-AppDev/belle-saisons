# Conciergerie Belle Saisons

Site officiel de Belle Saisons, conciergerie premium dédiée à la gestion
complète de biens en location courte et moyenne durée à Caen et sur la
Côte de Nacre (Calvados, Normandie).

## Stack technique

- [Next.js 16](https://nextjs.org) — App Router, Server Components, Server Actions
- [React 19](https://react.dev) / TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — design system basé sur la palette de marque
- [Zod](https://zod.dev) — validation serveur des formulaires
- [Resend](https://resend.com) — envoi transactionnel des emails de leads
- `next/font` (Playfair Display + Inter), `next/image`
- Métadonnées SEO natives Next.js (Metadata API, `sitemap.ts`, `robots.ts`, `manifest.ts`) + JSON-LD (schema.org)

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les vraies valeurs
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

```bash
npm run lint   # ESLint
npm run build  # build de production (vérifie aussi les types)
```

## Architecture

```
app/                          Routes (App Router)
  conciergerie-*/               Pages SEO locales (Caen, Côte de Nacre, communes littorales)
  confier-mon-bien/             Landing page propriétaires + formulaire d'estimation
  blog/[slug]/                   Articles de blog
  not-found.tsx, error.tsx        Pages d'erreur (404 / erreur serveur)
  sitemap.ts, robots.ts, manifest.ts   SEO technique
components/
  analytics/PlausibleScript.tsx    Chargement conditionnel de Plausible
  brand/BrandLogo.tsx              Composant d'affichage du logo officiel
  layout/                          Header, Footer, CTA sticky mobile
  sections/                        Sections de page réutilisables (Hero, FAQ, CTA, formulaires...)
  ui/                              Primitives (Button, Container, Reveal, JsonLd, SubmitButton...)
data/                          Contenu structuré (services, villes, FAQ, articles, entreprise)
lib/
  actions/                       Server Actions (estimation, contact) + gestion d'erreurs
  mail/                          Client Resend, gabarit HTML, templates d'emails
  validation/                    Schémas Zod + constantes d'options UI (séparées pour ne pas
                                  embarquer Zod dans le bundle client)
  site.ts                        Configuration centralisée (nom, URL, zone géo...)
  seo.ts                         Helpers metadata + JSON-LD
  analytics.ts                   Abstraction trackEvent()
  rate-limit.ts                  Limiteur de débit (interface swappable vers Redis/Upstash)
public/brand/                  Logo officiel et déclinaisons (favicon, OG image)
```

## Identité de marque

Le logo officiel (`public/brand/logo.png`) est la source unique utilisée dans
tout le site (header, footer, favicon, Open Graph) via le composant
`components/brand/BrandLogo.tsx`. Il ne doit jamais être redessiné, recadré
ou recoloré.

## Emails transactionnels

Les formulaires (`/contact`, `/confier-mon-bien`) envoient deux emails via
Resend à chaque soumission valide :

1. Un email interne à l'équipe (`CONTACT_EMAIL_TO`) avec tous les champs
   transmis, et `replyTo` positionné sur l'adresse du prospect.
2. Un email de confirmation au prospect, envoyé uniquement si l'email
   interne a bien été délivré (jamais de fausse confirmation).

Tant que `RESEND_API_KEY` / `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` ne
sont pas configurés, les formulaires valident et journalisent la demande
côté serveur mais n'envoient aucun email — voir `lib/mail/client.ts`.

## Analytics

`lib/analytics.ts` expose `trackEvent()`, une abstraction qui ne charge
aucun outil par défaut. En définissant `NEXT_PUBLIC_ANALYTICS_DOMAIN`,
[Plausible](https://plausible.io) (sans cookie, sans donnée personnelle)
est chargé et reçoit les événements `owner_form_start`,
`owner_form_step_2`, `owner_form_step_3`, `owner_form_submit`,
`contact_form_submit`, `cta_confier_mon_bien`, `cta_services`. Aucune
donnée personnelle (nom, email, téléphone, message) n'est jamais transmise
dans les propriétés d'un événement.

## Variables d'environnement

Voir `.env.example` pour le détail. Résumé :

| Variable | Obligatoire | Effet si absente |
| --- | --- | --- |
| `RESEND_API_KEY` | Pour l'envoi d'emails | Formulaires en mode "journalisation seule" |
| `CONTACT_EMAIL_TO` | Pour l'envoi d'emails | idem |
| `CONTACT_EMAIL_FROM` | Pour l'envoi d'emails | idem |
| `NEXT_PUBLIC_SITE_URL` | Recommandée | Retombe sur `https://www.belle-saisons.fr` |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Non | Aucun analytics chargé (comportement par défaut) |
| `GOOGLE_SITE_VERIFICATION` | Non | Balise de vérification absente |
| `BING_SITE_VERIFICATION` | Non | Balise de vérification absente |

## Checklist de mise en production

- [ ] Domaine définitif configuré et `NEXT_PUBLIC_SITE_URL` renseigné
- [ ] DNS pointés vers l'hébergeur choisi
- [ ] HTTPS actif (certificat valide)
- [ ] Variables d'environnement renseignées sur la plateforme de déploiement
- [ ] Domaine expéditeur vérifié dans Resend (SPF/DKIM)
- [ ] `CONTACT_EMAIL_FROM` vérifié dans Resend
- [ ] `CONTACT_EMAIL_TO` confirmé comme boîte active et surveillée
- [ ] Mentions légales complétées (`data/company.ts` : nom civil, adresse, hébergeur)
- [ ] Politique de confidentialité relue (durée de conservation, DPO si applicable)
- [ ] Formulaires testés de bout en bout (contact + confier-mon-bien) avec un vrai envoi
- [ ] Analytics configuré si décidé (`NEXT_PUBLIC_ANALYTICS_DOMAIN`)
- [ ] Sitemap vérifié (`/sitemap.xml`) après déploiement sur le domaine définitif
- [ ] Robots vérifié (`/robots.txt`)
- [ ] Propriété validée dans Google Search Console (`GOOGLE_SITE_VERIFICATION`)
- [ ] Propriété validée dans Bing Webmaster Tools (`BING_SITE_VERIFICATION`)
- [ ] Favicon et OG image contrôlés sur le domaine définitif
- [ ] QA mobile (Header, formulaire multi-étapes, CTA sticky) sur un vrai appareil
- [ ] `npm run build` exécuté sans erreur sur l'environnement de déploiement

## Points restant à compléter (non inventés)

- **Mentions légales** (`data/company.ts`) : nom et prénom de
  l'entrepreneure individuelle, adresse du siège, hébergeur, assurance
  professionnelle — chaque champ est un `null` documenté (TODO) tant que
  l'information n'est pas communiquée, et n'est pas rendu publiquement.
- **Contact** : aucun email ni téléphone public n'est affiché tant qu'une
  adresse n'est pas confirmée comme active (voir `lib/site.ts`).
- **Photographies** : le hero et les sections utilisent une composition
  éditoriale (dégradés, typographie) en l'absence de photographies réelles
  des logements gérés.
