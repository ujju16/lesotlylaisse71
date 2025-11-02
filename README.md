# LeSotLyLaisse71 🍽️

Restaurant, bar et tabac au cœur de la Bourgogne - Site web moderne développé avec Next.js 15

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ujju16/lesotlylaisse71)
[![CI Pipeline](https://github.com/ujju16/lesotlylaisse71/actions/workflows/ci.yml/badge.svg)](https://github.com/ujju16/lesotlylaisse71/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/ujju16/lesotlylaisse71/actions/workflows/cd.yml/badge.svg)](https://github.com/ujju16/lesotlylaisse71/actions/workflows/cd.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12.10-5A0EF8?logo=daisyui)](https://daisyui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-FF0080?logo=framer)](https://www.framer.com/motion/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?logo=jest)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?logo=prettier)](https://prettier.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## 🚀 Technologies

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5.9.3
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.17 + DaisyUI 4.12.10
- **Animations**: Framer Motion 12.23.24
- **Testing**: Jest 30.2.0 + React Testing Library
- **Code Quality**: ESLint 9.x + Prettier 3.6.2
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📋 Fonctionnalités

✅ Page d'accueil moderne avec hero plein écran  
✅ Carrousel d'images animé avec Framer Motion  
✅ Mode sombre/clair avec détection système  
✅ Animations fluides sur les cards et éléments  
✅ Navigation Material Design avec menu mobile  
✅ Footer complet avec informations de contact  
✅ Charte graphique Material Design  
✅ Responsive design (mobile, tablet, desktop)  
✅ Optimisation des images avec Next.js Image  
✅ Tests unitaires avec Jest  
✅ SEO optimisé avec metadata  
✅ Accessibilité (ARIA, semantic HTML)  
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
npm run lint:fix     # Correction automatique ESLint
npm run format       # Formatter le code avec Prettier
npm run type-check   # Vérification TypeScript
npm run test         # Lancer les tests
npm run test:watch   # Tests en mode watch
npm run test:coverage # Coverage des tests
npm run quality      # Tous les checks (format + lint + type-check + test)
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

**ujju16**

- GitHub: [@ujju16](https://github.com/ujju16)

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

© 2025 LeSotLyLaisse71. Tous droits réservés.  
Conçu et développé par ujju16
