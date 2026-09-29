# Google Search Console — préparation du lancement

Le site est techniquement prêt (sitemap, robots, canonical, metadata,
JSON-LD). Cette checklist couvre uniquement les actions à faire dans la
console Google, une fois le domaine définitif en ligne.

## 1. Créer la propriété

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console).
2. Créer une propriété de type **Domaine** (recommandée, couvre http/https
   et tous les sous-domaines) plutôt qu'une propriété "Préfixe d'URL".

## 2. Valider la propriété

3. Google fournit un enregistrement DNS TXT à ajouter chez le registrar du
   domaine. Alternative déjà prévue dans le code : une balise
   `<meta name="google-site-verification" ...>` générée automatiquement
   dès que la variable d'environnement `GOOGLE_SITE_VERIFICATION` est
   définie sur la plateforme de déploiement (voir `app/layout.tsx` et
   `.env.example`) — **ne jamais inventer cette valeur**, la copier
   exactement depuis Search Console.
4. Choisir une seule méthode de validation (DNS ou balise HTML), pas les
   deux, pour éviter toute confusion lors d'un futur transfert de domaine.

## 3. Sitemap et robots

5. Une fois la propriété validée, dans **Sitemaps**, soumettre :
   `https://<domaine-définitif>/sitemap.xml`
6. Vérifier `https://<domaine-définitif>/robots.txt` : la propriété doit
   afficher "Autorisé" pour les pages publiques et "Robots.txt lu avec
   succès" sans erreur.

## 4. Inspection des pages prioritaires

7. Utiliser l'outil **Inspection de l'URL** pour vérifier individuellement
   (statut d'indexation, rendu mobile, erreurs éventuelles) :
   - la page d'accueil (`/`)
   - `/conciergerie-caen`
   - `/conciergerie-cote-de-nacre`
   - `/confier-mon-bien`
   - `/services`
8. Pour chacune, si le statut est "URL non indexée sur Google" (normal
   juste après le lancement), cliquer sur **Demander une indexation**.

## 5. Suivi dans la durée

9. **Couverture / Pages** : contrôler chaque semaine dans le premier mois
   qu'aucune page publique n'est exclue par erreur (`noindex`,
   `canonical` divergent, erreur 4xx/5xx), et qu'aucune page technique
   (`/api/...`) n'apparaît indexée.
10. **Performances** : suivre l'évolution des impressions/clics par
    requête, en particulier sur les intentions documentées dans
    `docs/seo-local-roadmap.md` (conciergerie Caen, conciergerie Côte de
    Nacre, conciergerie Airbnb Caen...).
11. **Expérience sur la page** (Core Web Vitals) : à surveiller après
    quelques semaines de trafic réel, une fois que Google a suffisamment
    de données terrain.

## Ne jamais faire

- Ne jamais inventer ou deviner un jeton `GOOGLE_SITE_VERIFICATION`.
- Ne jamais soumettre un sitemap avec des URLs `localhost` (le garde-fou
  de `lib/site.ts` l'empêche déjà en production, mais vérifier
  visuellement `/sitemap.xml` sur le domaine réel après déploiement).
