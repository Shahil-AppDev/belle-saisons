# Bing Webmaster Tools — préparation du lancement

Même logique que Google Search Console, en plus léger. Aucune nouvelle
dépendance technique : le code est déjà prêt via
`BING_SITE_VERIFICATION` (voir `.env.example` et `app/layout.tsx`).

## 1. Créer la propriété

1. Aller sur [www.bing.com/webmasters](https://www.bing.com/webmasters).
2. Option la plus rapide si Google Search Console est déjà configurée :
   utiliser **Import from Google Search Console** (Bing importe le
   domaine et peut réutiliser la validation déjà faite côté Google dans
   certains cas). Sinon, ajouter le site manuellement.

## 2. Valider la propriété

3. Si une validation manuelle est nécessaire, Bing propose une balise
   meta équivalente à Google. Coller le jeton fourni dans la variable
   d'environnement `BING_SITE_VERIFICATION` de la plateforme de
   déploiement — jamais inventé, copié tel quel depuis Bing Webmaster
   Tools.

## 3. Sitemap

4. Dans **Sitemaps**, soumettre :
   `https://<domaine-définitif>/sitemap.xml`
5. Vérifier que Bing ne remonte aucune erreur de lecture du sitemap ou du
   `robots.txt`.

## 4. Indexation

6. Utiliser **URL Inspection** pour vérifier l'homepage et
   `/confier-mon-bien`, et soumettre ces URLs à l'indexation si Bing ne
   les a pas encore explorées.

## Ne jamais faire

- Ne pas ajouter de dépendance ou de script tiers pour Bing : la
  vérification par variable d'environnement suffit, comme pour Google.
- Ne pas inventer de jeton de vérification.
