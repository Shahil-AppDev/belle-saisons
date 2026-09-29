# Checklist d'activation Resend

Le code applicatif est déjà prêt pour Resend (`lib/mail/`). Cette checklist
couvre uniquement la partie compte/DNS/vérification, qui ne peut pas être
faite depuis le dépôt.

## 1. Compte et domaine

1. Créer un compte sur [resend.com](https://resend.com).
2. Dans **Domains**, ajouter le domaine définitif du site (ex.
   `belle-saisons.fr`) — jamais un domaine générique (`gmail.com`,
   `outlook.com`...), qui ne peut pas être vérifié pour l'envoi
   transactionnel.
3. Configurer les enregistrements DNS demandés par Resend chez le
   registrar/hébergeur DNS du domaine :
   - **SPF** : enregistrement TXT autorisant les serveurs de Resend à
     envoyer au nom du domaine.
   - **DKIM** : enregistrement(s) TXT de signature cryptographique fournis
     par Resend.
   - Un enregistrement supplémentaire de vérification de propriété du
     domaine peut aussi être demandé.
4. Attendre la propagation DNS (quelques minutes à quelques heures selon
   le registrar) puis cliquer sur **Verify** dans Resend.
5. Vérifier dans Resend que le domaine affiche bien le statut **Verified**
   pour SPF et DKIM avant de passer à l'envoi réel — un domaine non
   vérifié dégrade fortement la délivrabilité (spam) ou bloque l'envoi.

## 2. Clé API

6. Dans **API Keys**, créer une clé avec la permission d'envoi (Sending
   access). Ne jamais réutiliser une clé de test dans l'environnement de
   production, ni la committer dans le dépôt.

## 3. Variables d'environnement

7. Définir sur la plateforme de déploiement (jamais dans un fichier
   committé) :
   - `RESEND_API_KEY` = la clé créée à l'étape 6.
   - `CONTACT_EMAIL_FROM` = une adresse du domaine vérifié à l'étape 1
     (ex. `contact@belle-saisons.fr`). Doit appartenir au domaine
     vérifié, sinon Resend refuse l'envoi.
8. Définir `CONTACT_EMAIL_TO` = la boîte de l'équipe qui doit recevoir les
   demandes (peut être une adresse sur un autre domaine, ex. Gmail
   professionnel — seul `CONTACT_EMAIL_FROM` doit appartenir au domaine
   vérifié dans Resend).

## 4. Test contrôlé avant mise en production

9. En local ou sur un environnement de preview (jamais en production),
   définir `EMAIL_TEST_MODE=true` dans `.env.local` en plus des variables
   ci-dessus, démarrer `npm run dev`, puis ouvrir :

   ```
   http://localhost:3000/api/dev/test-email?to=vous@exemple.fr
   ```

   Cette route (voir `app/api/dev/test-email/route.ts`) envoie réellement
   les 4 gabarits (lead propriétaire, confirmation propriétaire, lead
   contact, confirmation contact) à l'adresse fournie, avec un message
   piégé pour vérifier l'échappement HTML. Elle répond 404 dès que
   `NODE_ENV=production` ou que `EMAIL_TEST_MODE` n'est pas `true` :
   aucun risque de la laisser active par erreur en production.
10. Vérifier la réponse JSON : chaque gabarit doit indiquer `"sent"`
    (jamais `"not_configured"` ni `"failed"` si les identifiants sont
    censés être valides), et `escapingOk: true`.

## 5. Vérification manuelle de réception

11. Vérifier réellement la réception : l'email interne doit arriver sur
    `CONTACT_EMAIL_TO` avec tous les champs attendus, un `Reply-To` pointant
    vers l'adresse de test, et un rendu HTML propre (pas de balises
    brutes, pas de code cassé) dans au moins un client mail réel (pas
    seulement un aperçu de développement).
12. Vérifier la confirmation prospect : reçue à l'adresse de test, sujet
    "Votre demande a bien été reçue — Conciergerie Belle Saisons",
    contenu sobre, sans promesse de délai ni fausse signature commerciale.

Une fois ces 12 points validés, cocher les lignes correspondantes de la
checklist de mise en production dans le `README.md`.

## Ne jamais faire

- Ne jamais afficher une adresse d'expédition qui n'appartient pas au
  domaine vérifié (`CONTACT_EMAIL_FROM`) : Resend la refusera, ou pire,
  elle sera acceptée mais finira en spam.
- Ne jamais commiter `RESEND_API_KEY` ni aucune clé API dans le dépôt.
- Ne jamais laisser `EMAIL_TEST_MODE=true` sur l'environnement de
  production (la route reste de toute façon désactivée par le contrôle
  `NODE_ENV === "production"`, mais autant garder cette variable à
  `false` en production par hygiène).
