# LeSotLyLaisse71 🍽️

Restaurant, bar et tabac au cœur de la Bourgogne - Site web moderne développé avec Next.js 15

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ujju16/lesotlylaisse71)

## 🚀 Technologies

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Material Design
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📋 Fonctionnalités

✅ Page d'accueil moderne avec hero plein écran  
✅ Carrousel d'images responsive  
✅ Sections structurées (Présentation, Services, CTA)  
✅ Navigation Material Design avec menu mobile  
✅ Footer complet avec informations de contact  
✅ Charte graphique Material Design  
✅ Responsive design (mobile, tablet, desktop)  
✅ Optimisation des images avec Next.js Image  
✅ Favicons générés automatiquement  
✅ PWA ready avec manifest  

## 🎨 Charte Graphique

### Couleurs Material Design

**Primaire - Brun Café**
- 50-900 nuances
- Base: `#795548`

**Secondaire - Vert Lime**
- 50-900 nuances
- Base: `#689F38`

**Accent - Ambre**
- 50-900 nuances
- Base: `#FFB300`

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/ujju16/lesotlylaisse71.git
cd lesotlylaisse71

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

## 📁 Structure du projet

```
lesotlylaisse71/
├── app/
│   ├── components/        # Composants réutilisables
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Carrousel.tsx
│   │   └── PageTemplate.tsx
│   ├── charte/           # Page charte graphique
│   ├── exemple/          # Page exemple
│   ├── globals.css       # Styles globaux + variables CSS
│   ├── charte-graphique.css  # Utilitaires Material Design
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── public/               # Assets statiques
│   ├── logo_soly.png     # Logo du restaurant
│   ├── photo*.jpg        # Photos carrousel
│   └── *.png            # Favicons
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── vercel.json          # Configuration Vercel
└── DEPLOYMENT.md        # Guide de déploiement
```

## 🚀 Déploiement

### Déploiement automatique (recommandé)

Le projet est configuré pour le déploiement automatique sur Vercel via GitHub Actions.

1. Configurez les secrets GitHub (voir [DEPLOYMENT.md](./DEPLOYMENT.md))
2. Push sur `main` → Déploiement en production
3. Push sur `development` → Déploiement en preview

### Déploiement manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails.

## 📜 Scripts disponibles

```bash
npm run dev          # Développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur production
npm run lint         # Vérification ESLint
```

## 🌐 Pages

- `/` - Page d'accueil
- `/charte` - Charte graphique Material Design
- `/exemple` - Template de page réutilisable
- `/qui-sommes-nous` - Présentation (à venir)
- `/menu` - Menu du restaurant (à venir)
- `/contact` - Contact et réservation (à venir)
- `/infos` - Informations pratiques (à venir)

## 🎯 Optimisations

- ✅ Images optimisées automatiquement (Next.js Image)
- ✅ Bundle splitting automatique
- ✅ CSS Modules pour éviter les conflits
- ✅ Lazy loading des composants
- ✅ Compression automatique
- ✅ Cache optimisé
- ✅ SEO friendly

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🧑‍💻 Développement

### Ajouter une nouvelle page

```typescript
// app/nouvelle-page/page.tsx
import PageTemplate from '../components/PageTemplate';

export default function NouvellePage() {
  return (
    <PageTemplate title="Titre" subtitle="Sous-titre">
      {/* Votre contenu */}
    </PageTemplate>
  );
}
```

### Utiliser la charte graphique

```jsx
// Boutons Material Design
<button className="btn-md-primary">Primary</button>
<button className="btn-md-secondary">Secondary</button>
<button className="btn-md-accent">Accent</button>
<button className="btn-md-outlined">Outlined</button>

// Cards
<div className="card-md">Content</div>

// Badges
<span className="badge-md">Badge</span>
<span className="badge-md-secondary">Badge</span>
<span className="badge-md-accent">Badge</span>

// Titres
<h2 className="title-md title-md-h2">Titre</h2>
```

## 👨‍💻 Auteur

**korndev**
- GitHub: [@korndev](https://github.com/korndev)

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

© 2025 LeSotLyLaisse71. Tous droits réservés.  
Conçu et développé par korndev
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
