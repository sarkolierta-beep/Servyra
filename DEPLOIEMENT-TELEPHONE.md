# SERVYRA — mise en ligne depuis téléphone

1. Créer/importer le dépôt GitHub `servyra`.
2. Importer le contenu du ZIP sans `node_modules`, `.next`, ni fichier `.env` réel.
3. Sur Netlify : **Add new project → Import an existing project** puis choisir GitHub.
4. Build command : `npm run build`.
5. Ajouter les variables du fichier `.env.example` dans **Project configuration → Environment variables**.
6. Configurer une vraie base PostgreSQL et exécuter `db/schema.sql`.
7. Configurer l'authentification et protéger `/admin` avec un rôle propriétaire côté serveur. Ne jamais protéger l'admin uniquement avec du JavaScript côté navigateur.
8. Configurer Stripe, son webhook signé et les règles de commission SERVYRA.
9. Ajouter le domaine et vérifier HTTPS.
10. Avant ouverture publique : tester inscription → demande → matching → paiement → commission → notification.