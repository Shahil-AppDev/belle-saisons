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
  api/dev/test-email/             Route de test email contrôlé (jamais active en production)
components/
  analytics/PlausibleScript.tsx    Chargement conditionnel de Plausible
  analytics/AttributionCapture.tsx Capture ponctuelle des paramètres utm_*/referrer (sessionStorage)
  brand/BrandLogo.tsx              Composant d'affichage du logo officiel
  layout/                          Header, Footer, CTA sticky mobile
  sections/                        Sections de page réutilisables (Hero, FAQ, CTA, formulaires...)
  ui/                              Primitives (Button, Container, Reveal, JsonLd, SubmitButton...)
data/                          Contenu structuré (services, villes, FAQ, articles, entreprise, NAP)
lib/
  actions/                       Server Actions (estimation, contact) + gestion d'erreurs
  mail/                          Client Resend, gabarit HTML, templates d'emails
  validation/                    Schémas Zod + constantes d'options UI (séparées pour ne pas
                                  embarquer Zod dans le bundle client)
  attribution.ts                 Capture/lecture des paramètres utm_*/referrer (client, sessionStorage)
  site.ts                        Configuration centralisée (nom, URL, zone géo...)
  seo.ts                         Helpers metadata + JSON-LD
  analytics.ts                   Abstraction trackEvent()
  rate-limit.ts                  Limiteur de débit (interface swappable vers Redis/Upstash)
public/brand/                  Logo officiel et déclinaisons (favicon, OG image)
docs/                          Guides de lancement (Resend, Search Console, Bing, Google
                                Business Profile, backlinks locaux, roadmap éditoriale, checklist
                                juridique) — voir la section "Guides de lancement" ci-dessous
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
`contact_form_submit`, `cta_confier_mon_bien`, `cta_services`,
`local_page_cta_click` (bas de page locale), `blog_to_owner_cta` (bas
d'article de blog). Aucune donnée personnelle (nom, email, téléphone,
message) n'est jamais transmise dans les propriétés d'un événement.

## Attribution des leads (UTM)

`lib/attribution.ts` capture, une seule fois par session navigateur et
uniquement si présents dans l'URL, les paramètres `utm_source`,
`utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, ainsi que la page
d'atterrissage et le `referrer` d'entrée (`components/analytics/AttributionCapture.tsx`,
monté dans `app/layout.tsx`). Ces valeurs sont stockées dans
`sessionStorage` (jamais envoyées à un service tiers), puis relues par
`components/sections/AttributionFields.tsx` pour être transmises comme
champs cachés des formulaires `/confier-mon-bien` et `/contact`.

Ces champs :

- ne sont **jamais affichés** dans l'interface ;
- ne sont **jamais transmis à l'analytics** (`trackEvent`) ;
- ne sont **jamais inclus dans l'email de confirmation** envoyé au
  prospect ;
- apparaissent uniquement dans l'**email interne** de lead (section
  "Source du lead" ajoutée par `lib/mail/templates.ts`), avec une
  `lead_source` calculée automatiquement (`utm_source`, à défaut le nom
  de domaine du referrer, à défaut "Direct").

Il n'y a pas de base de données de leads : l'email interne constitue le
registre de suivi, ce qui évite de construire un CRM complet pour un
volume de demandes encore faible. Si le volume le justifie un jour,
`lib/attribution.ts` et les schémas Zod (`lib/validation/attribution.ts`)
sont déjà la source structurée à brancher sur un futur stockage.

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
| `EMAIL_TEST_MODE` | Non | Route `/api/dev/test-email` désactivée (404) |

## Déploiement production

Le projet est un site Next.js 16 standard (App Router, Server Actions) :
il ne dépend d'aucune API propriétaire d'un hébergeur particulier et peut
être déployé sur Vercel ou sur tout hébergement Node compatible.

### Option A — Vercel (recommandée, sans configuration)

1. Importer le dépôt GitHub dans Vercel.
2. Vercel détecte Next.js automatiquement :
   - **Install command** : `npm install`
   - **Build command** : `npm run build`
   - **Output** : géré nativement par l'adaptateur Next.js de Vercel
     (pas de configuration `next.config.ts` supplémentaire requise).
3. Renseigner les variables d'environnement (tableau ci-dessus) dans
   **Project Settings → Environment Variables**, séparément pour
   Production et Preview si des valeurs diffèrent (ex. un
   `NEXT_PUBLIC_SITE_URL` de preview différent du domaine définitif).
4. **Domaine personnalisé** : Project Settings → Domains → ajouter le
   domaine définitif, puis suivre les instructions DNS de Vercel (CNAME
   ou enregistrements A/ALIAS selon le registrar).
5. **HTTPS** : certificat émis et renouvelé automatiquement par Vercel dès
   que le DNS pointe correctement — aucune action manuelle.
6. **Cache** : Vercel gère le cache des assets statiques et de l'ISR
   automatiquement ; ce projet n'utilise pas de revalidation ISR
   spécifique à ce stade (pages majoritairement statiques ou dynamiques
   via Server Actions).
7. **Logs** : consultables dans l'onglet **Logs** du projet Vercel
   (Runtime Logs pour les Server Actions/API routes) — rappel : le code
   ne journalise jamais de PII (voir section Sécurité ci-dessous).
8. **Rollback** : chaque déploiement Vercel est immuable et horodaté ;
   revenir en arrière se fait en un clic depuis l'onglet **Deployments**
   ("Promote to Production" sur un déploiement précédent), sans réintégrer
   de commit.

### Option B — hébergement Node générique

Pour un hébergement Node "classique" (VPS, PaaS générique type Render/
Railway, conteneur) :

1. **Install** : `npm ci` (ou `npm install`).
2. **Build** : `npm run build`.
3. **Runtime** : `npm run start` (démarre `next start`), sur un Node ≥ 20.
   Prévoir un reverse proxy (Nginx, Caddy...) devant, en charge du
   **HTTPS** (Let's Encrypt) et des **redirections** HTTP → HTTPS et
   apex → `www` (ou l'inverse selon le domaine choisi) — Next.js gère les
   redirections applicatives (`next.config.ts`) mais pas cette couche
   réseau.
4. **Domaine personnalisé** : pointer le DNS (A/AAAA ou CNAME selon
   l'hébergeur) vers l'adresse du serveur ou du load balancer.
5. **Cache** : le reverse proxy peut mettre en cache les assets statiques
   (`/_next/static/...`, immuables et versionnés) ; ne jamais mettre en
   cache les réponses des Server Actions.
6. **Logs** : `next start` écrit sur stdout/stderr — les rediriger vers le
   système de logs de l'hébergeur (journald, un agrégateur de logs...).
   Mêmes garanties d'absence de PII que sur Vercel.
7. **Rollback** : garder les artefacts de build (`.next/`) ou l'image de
   conteneur des déploiements précédents pour pouvoir revenir en arrière
   rapidement en cas de régression.

### Variables d'environnement à définir sur la plateforme choisie

Toutes celles du tableau ci-dessus, en particulier `NEXT_PUBLIC_SITE_URL`
avec le **domaine définitif** (jamais `localhost` — un garde-fou dans
`lib/site.ts` retombe automatiquement sur le domaine par défaut si une
valeur `localhost` est détectée avec `NODE_ENV=production`, mais autant ne
pas s'y fier et renseigner la vraie valeur).

## Sécurité

- **En-têtes HTTP** (`next.config.ts`) : `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY` (anti-clickjacking), `Referrer-Policy:
  strict-origin-when-cross-origin`, `Permissions-Policy` désactivant
  caméra/micro/géolocalisation. Volontairement **pas de
  Content-Security-Policy** : une CSP mal calibrée casse facilement
  `next/script`, `next/font` et les scripts inline (JSON-LD, Plausible) —
  à construire précisément si un besoin se présente plutôt que d'imposer
  une politique générique risquée.
- **HSTS** : non défini dans le code, car c'est la responsabilité de
  l'hébergeur une fois le HTTPS actif sur le domaine définitif (Vercel
  l'ajoute automatiquement) — l'ajouter manuellement avant que le HTTPS ne
  soit garanti forcerait des visiteurs vers un site indisponible.
- **Formulaires** : validation Zod stricte + limites de longueur,
  honeypot anti-bot, rate limiting par IP (`lib/rate-limit.ts`, en
  mémoire — interface prête pour un store partagé type Upstash Redis si
  le volume de spam le justifie un jour), échappement HTML systématique
  dans les emails (`lib/mail/escape-html.ts`).
- **Logs de production** : jamais de PII. Les échecs Resend ne
  journalisent que `{ name, message }` de l'erreur (jamais le contenu de
  l'email ni les coordonnées du prospect) ; `app/error.tsx` ne journalise
  que le `digest` Next.js, jamais le message ou la stack brute ; aucune
  route ne journalise de clé API.
- **Monitoring d'erreurs** : aucun outil (Sentry ou équivalent) n'est
  installé à ce stade — pas de dépendance ajoutée sans besoin avéré.
  `app/error.tsx` (erreurs de rendu) et les blocs `try/catch` de
  `lib/mail/client.ts` sont les points d'intégration naturels le jour où
  un outil de monitoring est choisi : il suffirait d'y ajouter l'appel
  d'instrumentation, sans changer la structure existante.

## Guides de lancement (`docs/`)

- `docs/resend-activation-checklist.md` — compte, domaine, DNS (SPF/DKIM),
  clé API, test réel.
- `docs/search-console-launch.md` — propriété, validation, sitemap,
  inspection des pages prioritaires.
- `docs/bing-webmaster-launch.md` — équivalent Bing Webmaster Tools.
- `docs/google-business-profile.md` — préparation de la fiche Google
  Business Profile (NAP, catégorie, services, photos).
- `docs/local-directories.md` — priorisation des annuaires locaux.
- `docs/local-backlinks.md` — sources de backlinks locaux légitimes (et
  pratiques à proscrire).
- `docs/seo-local-roadmap.md` — priorisation des pages locales, intentions
  de recherche regroupées, plan de maillage interne.
- `docs/content-roadmap-6-months.md` — 12 sujets de blog sur 6 mois.
- `docs/legal-launch-checklist.md` — informations juridiques manquantes à
  fournir avant le lancement public.

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
- [ ] Propriété validée dans Google Search Console (`GOOGLE_SITE_VERIFICATION`) — voir `docs/search-console-launch.md`
- [ ] Propriété validée dans Bing Webmaster Tools (`BING_SITE_VERIFICATION`) — voir `docs/bing-webmaster-launch.md`
- [ ] Favicon et OG image contrôlés sur le domaine définitif
- [ ] QA mobile (Header, formulaire multi-étapes, CTA sticky) sur un vrai appareil
- [ ] `npm run build` exécuté sans erreur sur l'environnement de déploiement
- [ ] Test email réel effectué via `/api/dev/test-email` (voir `docs/resend-activation-checklist.md`)
- [ ] Fiche Google Business Profile préparée/créée (`docs/google-business-profile.md`), avec NAP cohérent (`data/business.ts`)
- [ ] Checklist juridique revue (`docs/legal-launch-checklist.md`)
- [ ] `EMAIL_TEST_MODE` laissé à `false` (ou absent) sur l'environnement de production

## Points restant à compléter (non inventés)

- **Mentions légales** (`data/company.ts`) : nom et prénom de
  l'entrepreneure individuelle, adresse du siège, hébergeur, assurance
  professionnelle — chaque champ est un `null` documenté (TODO) tant que
  l'information n'est pas communiquée, et n'est pas rendu publiquement.
  Détail complet : `docs/legal-launch-checklist.md`.
- **NAP** (`data/business.ts`) : adresse professionnelle publique et
  téléphone dédié non communiqués — nécessaires avant de créer la fiche
  Google Business Profile (`docs/google-business-profile.md`).
- **Contact** : aucun email ni téléphone public n'est affiché tant qu'une
  adresse n'est pas confirmée comme active (voir `lib/site.ts`).
- **Photographies** : le hero et les sections utilisent une composition
  éditoriale (dégradés, typographie) en l'absence de photographies réelles
  des logements gérés.
