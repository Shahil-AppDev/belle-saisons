# Google Business Profile — guide de préparation

Objectif : cohérence stricte entre le site, la fiche Google Business
Profile (GBP) et tout futur annuaire — jamais d'information inventée pour
« compléter » une fiche plus vite.

Source unique des informations NAP (Name / Address / Phone) : voir
`data/business.ts`. Tant qu'un champ y est `null`, il ne doit apparaître
nulle part — ni sur le site, ni sur GBP, ni dans un annuaire.

## 1. Éléments déjà connus et exploitables

| Champ | Valeur | Source |
| --- | --- | --- |
| Nom de l'établissement | Conciergerie Belle Saisons | `data/business.ts` |
| Zone desservie | Caen, Côte de Nacre, Ouistreham, Hermanville-sur-Mer, Lion-sur-Mer, Luc-sur-Mer, Saint-Aubin-sur-Mer, Courseulles-sur-Mer, Calvados, Normandie | `data/business.ts` (`areaServed`) |
| URL du site | Domaine définitif une fois configuré (`NEXT_PUBLIC_SITE_URL`) | `lib/site.ts` |
| Logo | `public/brand/logo.png` (ne jamais redessiner/recadrer/recolorer) | Identité de marque |
| Description courte | Peut réutiliser `siteConfig.description` (`lib/site.ts`) comme base, à adapter au format GBP (750 caractères max) | `lib/site.ts` |

## 2. Éléments à confirmer avant de créer la fiche

Ne pas créer la fiche GBP tant que ces points ne sont pas tranchés — une
fiche incomplète ou inexacte est pire qu'une fiche absente :

- **Adresse professionnelle affichable publiquement.** GBP exige en
  principe une adresse physique (ou une "zone de service" sans adresse
  visible si l'activité se déplace chez le client — option pertinente
  pour une conciergerie qui intervient sur plusieurs communes sans
  recevoir de public à une adresse fixe). À trancher avec le porteur du
  projet.
- **Téléphone professionnel dédié**, distinct d'un numéro personnel —
  actuellement non communiqué (`data/business.ts`, champ `phone: null`).
- **Catégorie principale.** Ne pas sélectionner arbitrairement une
  catégorie réglementée (ex. "Agence immobilière", "Property management
  company") tant que l'activité déclarée ne le permet pas — voir
  `data/company.ts` : l'activité actuellement enregistrée est "Nettoyage
  courant des bâtiments", ce qui influence directement quelle catégorie
  GBP est légalement défendable. Des catégories plus neutres à évaluer
  avec le porteur du projet : "Service de conciergerie", "Service de
  ménage", ou une catégorie liée à la gestion de locations de vacances
  selon ce que l'activité déclarée couvre réellement.
- **Horaires réels** de disponibilité de l'équipe (accueil téléphonique
  ou par email) — non communiqués à ce jour.

## 3. Contenu à préparer une fois les points ci-dessus tranchés

- **Services** à lister sur la fiche (cohérents avec `data/services.ts`
  et les pages `/services`, `/gestion-complete`) :
  - Conciergerie
  - Intendance
  - Accueil voyageurs
  - Ménage
  - Linge
  - Assistance propriétaire
  - Coordination opérationnelle
- **Description longue** : reprendre le positionnement du site
  (conciergerie premium, Caen + Côte de Nacre) sans dupliquer mot pour
  mot le contenu de la homepage.
- **Photos** : logo (obligatoire), et à terme des photos réelles de biens
  gérés ou de l'équipe — ne jamais utiliser de photos de stock présentées
  comme des biens réels.
- **Posts GBP** : possibilité de relayer les futurs articles de blog
  (voir `docs/content-roadmap-6-months.md`) sous forme de posts courts
  avec lien vers l'article.
- **Avis clients** : à solliciter naturellement auprès des premiers
  propriétaires accompagnés, une fois l'activité commerciale lancée —
  ne jamais acheter, simuler ou inciter de façon non conforme aux
  règles Google.

## 4. Cohérence NAP (Name / Address / Phone)

Une fois l'adresse et le téléphone confirmés dans `data/business.ts`,
vérifier qu'ils sont strictement identiques (même format, mêmes
abréviations) sur :

- Le site (footer, mentions légales, schema `LocalBusiness` — déjà câblé
  pour lire `data/business.ts` via `lib/seo.ts`, aucune modification de
  code nécessaire une fois les champs renseignés).
- La fiche Google Business Profile.
- Tout annuaire local (voir `docs/local-backlinks.md`).

Une incohérence NAP (adresse écrite différemment d'un endroit à l'autre)
nuit au référencement local : mieux vaut publier plus tard avec des
informations exactes et identiques partout que publier vite avec des
variantes.

## Ne jamais faire

- Ne jamais inventer d'adresse, de téléphone, d'horaires ou d'avis.
- Ne jamais choisir une catégorie GBP réglementée non couverte par
  l'activité réellement déclarée.
- Ne jamais publier de photos présentées comme réelles si elles ne le
  sont pas.
