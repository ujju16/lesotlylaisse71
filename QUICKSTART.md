# 🚀 QUICKSTART - LeSotLyLaisse71 Admin

## ⚡ Démarrage Rapide (2 min)

### 1. Clone & Install

```bash
git clone <repo>
cd lesotlylaisse71
git checkout feature/admin-crud
npm install
```

### 2. Configuration Hygraph

Créer `.env.local` à la racine :

```env
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=<ton_token_avec_permissions_CRUD>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Lancer le serveur

```bash
npm run dev
```

✅ Serveur démarre sur **http://localhost:3000**

---

## 🎯 URLs Importantes

| Page                 | URL                                    | Status |
| -------------------- | -------------------------------------- | ------ |
| **Site Public**      | http://localhost:3000                  | ✅     |
| **Admin Categories** | http://localhost:3000/admin/categories | ✅     |
| **Admin Dishes**     | http://localhost:3000/admin/dishes     | ⏳     |
| **Admin Menus**      | http://localhost:3000/admin/menus      | ⏳     |
| **Admin QR Code**    | http://localhost:3000/admin            | ⏳     |

---

## 📦 API Routes Disponibles

### Categories

```bash
# Liste
GET /api/categories

# Créer
POST /api/categories
{
  "name": "Entrées",
  "slug": "entrees",
  "order": 1,
  "icon": "🥗",
  "description": "Description optionnelle"
}

# Modifier
PUT /api/categories/[id]

# Supprimer
DELETE /api/categories/[id]
```

### Dishes

```bash
# Liste
GET /api/dishes

# Créer
POST /api/dishes
{
  "name": "Tartare de saumon",
  "slug": "tartare-saumon",
  "description": "Saumon frais...",
  "price": 15.90,
  "categoryId": "...",
  "available": true
}
```

### Menus

```bash
# Liste
GET /api/menus

# Créer
POST /api/menus
{
  "name": "Menu du jour",
  "slug": "menu-jour",
  "description": "...",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "dishIds": ["id1", "id2"]
}

# Activer
POST /api/menus/[id]/activate
```

### Upload

```bash
# Upload image
POST /api/upload
Content-Type: multipart/form-data
file: <image.jpg>

# Retourne
{
  "success": true,
  "data": {
    "id": "...",
    "url": "https://media.graphassets.com/..."
  }
}
```

---

## 🛠️ Commandes Utiles

### Développement

```bash
npm run dev          # Serveur dev
npm run build        # Build production
npm run start        # Start production
```

### Qualité

```bash
npm run format       # Formater le code
npm run lint         # Linter
npm run lint:fix     # Fix auto
npm run type-check   # Check TypeScript
npm run quality      # Format + Lint + Types
```

---

## 🎨 Hygraph - Configuration Requise

### Modèles (Models)

#### Category

```graphql
type Category {
  id: ID!
  name: String!
  slug: String! @unique
  description: String
  order: Int!
  icon: String
  image: Asset
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### Dish

```graphql
type Dish {
  id: ID!
  name: String!
  slug: String! @unique
  description: String
  price: Float!
  category: Category
  available: Boolean!
  image: Asset
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### Menu

```graphql
type Menu {
  id: ID!
  name: String!
  slug: String! @unique
  description: String
  active: Boolean!
  startDate: Date
  endDate: Date
  dishes: [Dish]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Permissions

**Public API** (Read only) :

- ✅ Read Categories
- ✅ Read Dishes
- ✅ Read Menus (active only)

**Token API** (Full CRUD) :

- ✅ Create/Read/Update/Delete Categories
- ✅ Create/Read/Update/Delete Dishes
- ✅ Create/Read/Update/Delete Menus
- ✅ Publish (auto-publish après mutations)
- ✅ Upload Assets

---

## 🐛 Troubleshooting

### Port déjà utilisé

```bash
# Changer le port
PORT=3001 npm run dev
```

### Erreur Hygraph "Unauthorized"

- Vérifier `HYGRAPH_TOKEN` dans `.env.local`
- Vérifier permissions du token dans Hygraph

### Erreur build CSS

```bash
# Nettoyer cache
rm -rf .next node_modules/.cache
npm run dev
```

### TypeScript errors

```bash
# Réinstaller types
npm install -D @types/react @types/node typescript
```

---

## 📚 Documentation

- `README.md` → Vue d'ensemble
- `CODE_QUALITY.md` → Outils qualité
- `PLAN-ADMIN-CRUD.md` → Roadmap admin
- `PROGRESS.md` → État d'avancement
- `RESUME-SESSION.md` → Résumé session

---

## 🎯 Features Disponibles

### ✅ Fonctionnel

- Backend API complet (8 routes)
- Page Admin Categories CRUD
- Upload d'images vers Hygraph
- Toast notifications
- Material Design UI
- TypeScript strict
- Code quality tools

### ⏳ En développement

- Page Admin Dishes
- Page Admin Menus
- QR Code dynamique
- Page Admin principale

---

## 💪 Stack Technique

**Frontend**

- Next.js 15 (App Router)
- React 19
- TypeScript 5.9
- Tailwind CSS 3.4
- DaisyUI 5.3

**Backend**

- Next.js API Routes
- GraphQL (graphql-request)
- Hygraph CMS

**Dev Tools**

- Prettier (formatage)
- ESLint (linting)
- TypeScript (type checking)

---

## 🚀 Prochaines Étapes

1. Tester page Categories : http://localhost:3000/admin/categories
2. Créer quelques catégories avec images
3. Préparer pour développement pages Dishes & Menus

---

**Besoin d'aide ? Voir les docs ci-dessus ! 🎉**
