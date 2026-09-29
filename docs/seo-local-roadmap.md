# Roadmap SEO local — Caen + Côte de Nacre

Ce document priorise l'effort SEO local (contenu, maillage, suivi) sans
créer de nouvelles pages : les 9 pages locales et les pages commerciales
existent déjà (`data/cities.ts`, `app/conciergerie-*`). L'objectif est de
concentrer l'attention (contenu, backlinks, suivi Search Console) là où
l'impact commercial est le plus direct.

## Priorisation des pages

### Priorité 1 — cœur commercial

- `/confier-mon-bien` — page de conversion principale, destination finale
  de tous les parcours.
- `/services` — présente l'offre complète, alimente aussi la FAQ
  services.
- `/conciergerie-caen` — plus gros bassin de population et de biens
  potentiels (ville + périphérie).
- `/conciergerie-cote-de-nacre` — hub régional qui distribue vers les
  communes du littoral (voir `components/sections/CityPageTemplate.tsx`,
  prop `hubCommunes`).

### Priorité 2 — communes à fort potentiel touristique

- `/conciergerie-ouistreham` — flux ferry + plage, le plus diversifié des
  communes littorales.
- `/conciergerie-courseulles-sur-mer` — port ostréicole + Juno Beach,
  bonne diversité de demande.
- `/conciergerie-luc-sur-mer` — station la plus animée de la Côte de
  Nacre, forte densité d'offre locative donc fort volume de recherche.
- `/conciergerie-lion-sur-mer` — profil résidentiel distinct, bon
  complément éditorial aux communes plus animées.

### Priorité 3 — communes de niche / longue traîne

- `/conciergerie-hermanville-sur-mer` — tourisme de mémoire (Sword Beach),
  audience plus internationale et de niche.
- `/conciergerie-saint-aubin-sur-mer` — profil familial déjà bien couvert
  par Luc-sur-Mer et Courseulles-sur-Mer voisins.
- `/conciergerie-normandie` — page d'extension géographique, utile pour
  capter une longue traîne régionale sans diluer le positionnement local.

Cette priorisation ne signifie pas d'abandonner les pages P2/P3 : elles
restent indexées et maillées, mais les futurs efforts (nouveaux contenus,
backlinks, suivi rapproché Search Console) se concentrent sur P1 puis P2.

## Intentions de recherche regroupées

Plutôt que de créer une page par variante, chaque page absorbe plusieurs
intentions proches :

| Page | Intentions couvertes |
| --- | --- |
| `/conciergerie-caen` | conciergerie Caen · conciergerie Airbnb Caen · gestion Airbnb Caen · conciergerie propriétaire Caen |
| `/conciergerie-cote-de-nacre` | conciergerie Côte de Nacre · conciergerie location saisonnière Caen (zone élargie) · intendance location saisonnière |
| `/conciergerie-ouistreham` | conciergerie Ouistreham · gestion Airbnb Ouistreham |
| `/services` | intendance location saisonnière · ce que fait une conciergerie |
| `/confier-mon-bien` | confier son bien à une conciergerie · estimation conciergerie Caen |

Règle : une nouvelle intention proche d'une page existante s'intègre au
contenu de cette page (paragraphe, FAQ) plutôt que de déclencher la
création d'une nouvelle URL.

## Maillage interne (plan de référence)

```
Accueil (/)
 → /conciergerie-caen
 → /conciergerie-cote-de-nacre
 → /services
 → /confier-mon-bien

/conciergerie-caen
 → /services
 → /confier-mon-bien
 → articles de blog catégorie "caen"
 → communes liées (related : cote-de-nacre, ouistreham, normandie)

/conciergerie-cote-de-nacre (hub)
 → toutes les communes du littoral (hubCommunes)
 → /services
 → /confier-mon-bien
 → articles de blog catégorie "cote-de-nacre"

Chaque commune du littoral
 → /conciergerie-cote-de-nacre (retour au hub)
 → 2-3 communes voisines (related, déjà défini dans data/cities.ts)
 → /services, /proprietaires, /confier-mon-bien

Articles de blog
 → page commerciale principale correspondant à leur catégorie
   (voir data/blog.ts → getCategoryLabel + CtaFinal de fin d'article)
```

Ce maillage est déjà en place dans le code (`CityPageTemplate.tsx`,
`data/cities.ts` champ `related`, `CtaFinal` en bas de chaque page et
article). Ce document sert de référence pour ne pas le dégrader
involontairement (ex. en ajoutant une page sans la relier au reste du
cluster) et pour guider l'ajout de futurs liens contextuels dans le corps
des articles de blog.

Volontairement exclu : un bloc de liens massif en footer listant toutes
les combinaisons ville × service — le footer actuel (`FOOTER_ZONES_LINKS`
dans `lib/site.ts`) reste une liste simple des zones, sans sur-optimisation.

## Titles & meta — points de vigilance

Les titles/meta actuels (homepage, Caen, Côte de Nacre, services, confier
mon bien) respectent déjà : ville visible quand pertinent, marque présente
une seule fois, pas de répétition ni de bourrage de mots-clés (vérifié
lors de l'audit Mission 4, voir `lib/seo.ts` et `data/cities.ts`). Points
à recontrôler à chaque nouvelle page ou modification de contenu :
- Longueur title ≈ 50-60 caractères, description ≈ 140-160 caractères.
- Un seul niveau de ville/quartier par title (ne jamais empiler
  "Caen · Côte de Nacre · Normandie" dans un title de page locale
  spécifique).
