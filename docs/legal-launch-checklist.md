# Checklist juridique avant lancement

Liste explicite des informations manquantes, conservées comme des `TODO`
documentés dans le code (`data/company.ts`, `data/business.ts`) plutôt que
devinées ou inventées. Rien ci-dessous n'est bloquant pour un build ou un
déploiement technique — mais chaque ligne est bloquante pour une mise en
ligne publique conforme.

## Mentions légales (`data/company.ts`)

- [ ] **Nom civil** (nom et prénom) de l'entrepreneure individuelle —
      obligatoire sur les mentions légales d'une EI, où la "raison
      sociale" est le nom civil. Champ : `legalRepresentativeName`.
- [ ] **Adresse du siège** de l'activité. Champ : `registeredAddress`.
- [ ] **Hébergeur** du site une fois la plateforme de déploiement choisie
      (raison sociale, adresse, contact). Champ : `hostingProvider`.
      Voir la section "Déploiement production" du `README.md` pour le
      choix de l'hébergeur.
- [ ] **Assurance professionnelle**, si l'activité en nécessite une une
      fois son périmètre exact confirmé. Champ : `professionalInsurance`.
- [ ] **Médiateur de la consommation**, si l'activité y est soumise
      (obligatoire pour toute entreprise proposant des services à des
      consommateurs, sous conditions à vérifier avec un professionnel du
      droit). Champ : `consumerMediator`.
- [ ] **Téléphone professionnel** dédié à l'activité. Champ :
      `contactPhone` (`data/company.ts`) / `phone` (`data/business.ts`).
- [ ] **Email professionnel confirmé** comme boîte active et surveillée
      (l'adresse `contact@belle-saisons.fr` circule en interne mais n'est
      pas confirmée active). Champ : `contactEmail`.

## Cohérence de l'activité déclarée

- [ ] Confirmer que l'activité enregistrée au RNE couvre bien
      l'ensemble des prestations proposées sur le site (conciergerie,
      intendance, accueil voyageurs...). L'activité actuellement
      enregistrée ("Nettoyage courant des bâtiments") a déjà motivé le
      renommage de `/gestion-locative` en `/gestion-complete` (voir
      `next.config.ts`) pour éviter tout vocabulaire de gestion
      immobilière réglementée (mandat de gestion, encaissement de
      loyers) que l'activité déclarée ne couvre pas. Réévaluer ce point
      si l'activité déclarée évolue.
- [ ] Vérifier si une garantie financière ou une licence professionnelle
      spécifique est requise selon le périmètre définitif de l'activité
      (champ `financialGuarantee` / `professionalLicense`).

## Avant de lever chaque TODO

Pour chaque champ ci-dessus : mettre à jour uniquement `data/company.ts`
et/ou `data/business.ts` avec l'information réelle et confirmée. Le reste
du site (mentions légales, footer, schema `LocalBusiness`) est déjà câblé
pour afficher ces champs automatiquement une fois renseignés — aucune
autre modification de code n'est nécessaire.

## Ne jamais faire

- Ne jamais remplacer un `null` par une valeur plausible "en attendant".
- Ne jamais publier une adresse, un numéro de téléphone ou un nom civil
  qui n'a pas été explicitement confirmé par le porteur du projet.
