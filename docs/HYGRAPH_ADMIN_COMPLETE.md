# 🚀 Guide Complet Hygraph Admin - LeSotLyLaisse71

## 📋 Vue d'ensemble

Ce guide centralise toutes les informations pour travailler avec Hygraph et développer l'interface admin.

---

## 🔐 Configuration Hygraph

### Variables d'environnement

```bash
# .env.local
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=eyJhbGci... (token complet dans .env.local)
```

### Accès Hygraph Dashboard

- URL: https://app.hygraph.com
- Projet: **lesotlylaisse71**
- Région: EU West 2

---

## 🎨 Schéma de Données

### Category (Catégorie de Menu)

```graphql
model Category {
  id: ID!
  name: String!
  slug: String! @unique
  description: String
  icon: String
  image: Asset
  order: Int! @default(0)
  isActive: Boolean! @default(true)
  menuItems: [MenuItem!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### MenuItem (Plat du Menu)

```graphql
model MenuItem {
  id: ID!
  name: String!
  slug: String! @unique
  description: String
  price: Float!
  image: Asset
  category: Category!
  allergens: String
  isAvailable: Boolean! @default(true)
  isVegetarian: Boolean! @default(false)
  order: Int! @default(0)
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Menu (Configuration de Menu)

```graphql
model Menu {
  id: ID!
  name: String!
  description: String
  isActive: Boolean! @default(false)
  categories: [Category!]
  validFrom: DateTime
  validUntil: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### QRCode (QR Code pour Menu)

```graphql
model QRCode {
  id: ID!
  name: String!
  code: String! @unique
  activeMenu: Menu
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

---

## 💻 Queries GraphQL

### Récupérer toutes les catégories

```graphql
query GetCategories {
  categories(orderBy: order_ASC) {
    id
    name
    slug
    description
    icon
    image {
      url
      width
      height
    }
    order
    isActive
    menuItems {
      id
      name
      price
    }
  }
}
```

### Récupérer le menu actif

```graphql
query GetActiveMenu {
  menus(where: { isActive: true }, first: 1) {
    id
    name
    description
    categories(orderBy: order_ASC) {
      id
      name
      slug
      icon
      image {
        url
      }
      menuItems(orderBy: order_ASC, where: { isAvailable: true }) {
        id
        name
        description
        price
        image {
          url
        }
        isVegetarian
        allergens
      }
    }
  }
}
```

### Créer une catégorie

```graphql
mutation CreateCategory(
  $name: String!
  $description: String
  $icon: String
  $order: Int!
) {
  createCategory(
    data: {
      name: $name
      description: $description
      icon: $icon
      order: $order
      isActive: true
    }
  ) {
    id
    name
    slug
  }
}
```

### Créer un plat

```graphql
mutation CreateMenuItem(
  $name: String!
  $description: String
  $price: Float!
  $categoryId: ID!
) {
  createMenuItem(
    data: {
      name: $name
      description: $description
      price: $price
      category: { connect: { id: $categoryId } }
      isAvailable: true
    }
  ) {
    id
    name
    slug
  }
}
```

---

## 🛠️ Routes API Admin

### Categories

```
POST   /api/admin/categories          → Créer catégorie
GET    /api/admin/categories          → Lister catégories
PUT    /api/admin/categories/[id]     → Modifier catégorie
DELETE /api/admin/categories/[id]     → Supprimer catégorie
POST   /api/admin/categories/[id]/publish → Publier
```

### Dishes (MenuItem)

```
POST   /api/admin/dishes              → Créer plat
GET    /api/admin/dishes              → Lister plats
PUT    /api/admin/dishes/[id]         → Modifier plat
DELETE /api/admin/dishes/[id]         → Supprimer plat
POST   /api/admin/dishes/[id]/publish → Publier
```

### Menus

```
POST   /api/admin/menus               → Créer menu
GET    /api/admin/menus               → Lister menus
PUT    /api/admin/menus/[id]          → Modifier menu
DELETE /api/admin/menus/[id]          → Supprimer menu
POST   /api/admin/menus/[id]/activate → Activer menu
```

### Upload

```
POST   /api/admin/upload              → Upload image
DELETE /api/admin/assets/[id]         → Supprimer asset
```

---

## 🎯 Structure Admin

```
app/admin/
├── layout.tsx              → Layout admin avec navigation
├── page.tsx                → Dashboard
├── categories/
│   ├── page.tsx            → Liste catégories
│   ├── new/page.tsx        → Créer catégorie
│   └── [id]/edit/page.tsx  → Modifier catégorie
├── dishes/
│   ├── page.tsx            → Liste plats
│   ├── new/page.tsx        → Créer plat
│   └── [id]/edit/page.tsx  → Modifier plat
├── menus/
│   ├── page.tsx            → Liste menus
│   ├── new/page.tsx        → Créer menu
│   └── [id]/edit/page.tsx  → Modifier menu
└── qrcode/
    └── page.tsx            → Générer QR code
```

---

## 🔧 Composants Réutilisables

### Formulaires

```typescript
// components/admin/forms/
- CategoryForm.tsx
- DishForm.tsx
- MenuForm.tsx
- ImageUpload.tsx
```

### UI Components

```typescript
// components/admin/ui/
- Modal.tsx
- ConfirmDialog.tsx
- Toast.tsx
- LoadingSpinner.tsx
- DataTable.tsx
```

### Hooks Custom

```typescript
// lib/hooks/
- useCategories.ts
- useDishes.ts
- useMenus.ts
- useUpload.ts
- useToast.ts
```

---

## 🚀 Développement Admin

### Phase 1: Backend API ✅

- [x] Routes API catégories
- [x] Routes API plats
- [x] Routes API menus
- [x] Upload d'images

### Phase 2: Composants UI 🚧

- [ ] Forms avec React Hook Form + Zod
- [ ] Upload images drag & drop
- [ ] Tables avec tri/filtre
- [ ] Modals et dialogs

### Phase 3: Pages Admin 🚧

- [ ] Dashboard avec stats
- [ ] CRUD Catégories
- [ ] CRUD Plats
- [ ] CRUD Menus
- [ ] Générateur QR Code

### Phase 4: Fonctionnalités Avancées 📋

- [ ] Drag & drop réorganisation
- [ ] Preview menu en temps réel
- [ ] Duplication de plats/menus
- [ ] Export PDF du menu
- [ ] Analytics et stats

---

## 🎨 Charte Graphique Admin

### Couleurs Material Design

```css
:root {
  --primary: #795548;     /* Marron - terre, bois */
  --secondary: #689f38;   /* Vert - nature, bio */
  --accent: #ffb300;      /* Jaune doré - chaleur */
  --error: #d32f2f;
  --success: #388e3c;
  --warning: #f57c00;
}
```

### Composants Material

- Cards avec élévation
- Boutons: Filled, Outlined, Text
- Inputs avec floating labels
- Snackbars pour notifications

---

## 🔐 Sécurité

### Authentification

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const auth = request.cookies.get('admin-auth');
    if (!auth) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
```

### Variables à ne PAS commiter

```bash
# ❌ Ne jamais commiter
HYGRAPH_TOKEN=...
ADMIN_PASSWORD=...
CODECOV_TOKEN=...

# ✅ Utiliser .env.local (gitignored)
```

---

## 📱 Système QR Code

### Concept

1. **Un QR code physique unique** au restaurant
2. **Plusieurs menus configurables** (hiver, été, spécial, etc.)
3. **Changement dynamique** via l'admin

### Workflow

```
Client scanne QR → /menu/[code] →
  → Récupère QR code →
    → Affiche activeMenu →
      → Client consulte le menu
```

### Changement de Menu

L'admin peut :

1. Créer un nouveau menu
2. Activer ce menu (désactive les autres automatiquement)
3. Le changement est immédiat pour tous les clients

---

## 📊 Tests et Qualité

### Commandes

```bash
# Développement
bun run dev

# Build production
bun run build

# Linting
bun run lint

# Formatage
bun run format

# Tests
bun test

# Quality complet
bun run quality
```

### Coverage Codecov

Badge intégré dans README.md avec token Codecov configuré.

---

## 🚀 Déploiement

### Vercel

```bash
# Production (main)
vercel --prod

# Preview (dev)
vercel
```

### Variables d'environnement Vercel

Configurer dans Vercel Dashboard :

- `NEXT_PUBLIC_HYGRAPH_URL`
- `HYGRAPH_TOKEN`
- `CODECOV_TOKEN`
- `ADMIN_PASSWORD` (pour auth)

---

## 📚 Ressources

- [Hygraph Documentation](https://hygraph.com/docs)
- [Next.js 15 App Router](https://nextjs.org/docs)
- [Material Design 3](https://m3.material.io/)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🆘 Troubleshooting

### Erreur: "Field 'status' not found"

**Solution**: Hygraph interdit `status`, utiliser `isActive`

### Erreur: "Unable to upload asset"

**Solution**: Vérifier `HYGRAPH_TOKEN` et permissions

### Erreur: "Rate limit exceeded"

**Solution**: Implémenter cache ou upgrade plan Hygraph

---

## ✅ Checklist avant Production

- [ ] Toutes les routes API testées
- [ ] Upload d'images fonctionnel
- [ ] Authentification admin sécurisée
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Tests E2E passent
- [ ] Lighthouse score > 90
- [ ] Documentation à jour
- [ ] Pas de tokens en dur dans le code
