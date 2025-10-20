# Site Jamstack — Le Sot L'y Laisse 71

But : créer un site Jamstack pour le restaurant "Le Sot L'y Laisse 71" avec Next.js, Headless CMS (Hygraph recommandé / Strapi en alternative), CI avec GitHub Actions et déploiement sur Vercel.

Pages et fonctionnalités requises :
- Accueil : plat du jour, musique du jour, présentation du restaurant.
- Menu : affichage du menu, interface de gestion du menu dans le CMS, génération de QR codes pour sections ou plats.
- Contact : carte stylisée (dessin / style Astérix & Obélix) + coordonnées + formulaire.
- RGPD et mentions légales : page complète avec collecte des données, cookies, droits utilisateurs.

Architecture recommandée :
- Frontend : Next.js (App Router) — génération statique (SSG) + ISR pour contenu fréquemment mis à jour.
- CMS : Hygraph (GraphQL) recommandé. Alternative : Strapi si tu veux auto-héberger.
- Data fetching : graphql-request ou Apollo Client (Hygraph), fetch/axios pour Strapi.
- QR codes : package `qrcode` ou `qrcode.react`.
- Images : next/image + domaines du CMS.
- CI/CD : GitHub Actions pour tests/build, Vercel pour déploiement.

Variables d'environnement à configurer :
- HYGRAPH_ENDPOINT, HYGRAPH_TOKEN
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (si déploiement via CLI depuis CI)

Prochaines étapes :
1. Créer le projet Next.js (ou cloner ce repo).
2. Remplir les modèles dans Hygraph / Strapi.
3. Ajouter les variables d'environnement dans GitHub et Vercel.
4. Pousser la branche dev et ouvrir une PR vers main.
