# Guide de Configuration Hygraph - LeSotLyLaisse71

## 📋 Table des Matières
1. [Schémas et Modèles](#schémas-et-modèles)
2. [Relations](#relations)
3. [Permissions et API](#permissions-et-api)
4. [Queries GraphQL](#queries-graphql)
5. [Mutations](#mutations)

---

## 🗂️ Schémas et Modèles

### 1. Model: **Category**

Représente les catégories de plats (Entrées, Plats, Desserts, etc.)

#### Champs

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| `id` | ID | ✅ | ✅ | Identifiant unique |
| `name` | String | ✅ | ✅ | Nom de la catégorie |
| `slug` | String | ✅ | ✅ | URL-friendly identifier |
| `description` | String | ❌ | ❌ | Description détaillée |
| `order` | Int | ✅ | ❌ | Ordre d'affichage (0, 1, 2...) |
| `icon` | String | ❌ | ❌ | Nom de l'icône Material |
| `image` | Asset | ❌ | ❌ | Image représentative |
| `dishes` | [Dish] | ❌ | ❌ | Relation vers les plats |

#### Configuration Hygraph
```graphql
type Category @model {
  id: ID! @isUnique
  name: String! @isUnique
  slug: String! @isUnique
  description: String
  order: Int! @defaultValue(value: 0)
  icon: String
  image: Asset @relation(name: "CategoryImage")
  dishes: [Dish!]! @relation(name: "CategoryDishes")
  createdAt: DateTime!
  updatedAt: DateTime!
  publishedAt: DateTime
}
```

### 2. Model: **Dish**

Représente un plat individuel du menu.

#### Champs

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| `id` | ID | ✅ | ✅ | Identifiant unique |
| `name` | String | ✅ | ❌ | Nom du plat |
| `slug` | String | ✅ | ✅ | URL-friendly identifier |
| `description` | RichText | ✅ | ❌ | Description détaillée |
| `price` | Float | ✅ | ❌ | Prix en euros |
| `category` | Category | ✅ | ❌ | Catégorie parente |
| `available` | Boolean | ✅ | ❌ | Disponibilité (default: true) |
| `image` | Asset | ❌ | ❌ | Photo du plat |
| `allergens` | [String] | ❌ | ❌ | Liste des allergènes |
| `dietary` | [String] | ❌ | ❌ | Infos diététiques (végé, sans gluten...) |
| `order` | Int | ❌ | ❌ | Ordre dans la catégorie |

#### Configuration Hygraph
```graphql
type Dish @model {
  id: ID! @isUnique
  name: String! 
  slug: String! @isUnique
  description: RichText!
  price: Float!
  category: Category! @relation(name: "CategoryDishes")
  available: Boolean! @defaultValue(value: true)
  image: Asset @relation(name: "DishImage")
  allergens: [String!]
  dietary: [String!]
  order: Int
  createdAt: DateTime!
  updatedAt: DateTime!
  publishedAt: DateTime
}
```

### 3. Model: **Menu**

Représente un menu complet (menu du jour, menu dégustation, etc.)

#### Champs

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| `id` | ID | ✅ | ✅ | Identifiant unique |
| `name` | String | ✅ | ❌ | Nom du menu |
| `slug` | String | ✅ | ✅ | URL-friendly identifier |
| `description` | RichText | ❌ | ❌ | Description du menu |
| `price` | Float | ✅ | ❌ | Prix total du menu |
| `dishes` | [Dish] | ✅ | ❌ | Plats inclus dans le menu |
| `active` | Boolean | ✅ | ❌ | Menu actif/inactif |
| `validFrom` | DateTime | ❌ | ❌ | Date de début de validité |
| `validUntil` | DateTime | ❌ | ❌ | Date de fin de validité |

#### Configuration Hygraph
```graphql
type Menu @model {
  id: ID! @isUnique
  name: String!
  slug: String! @isUnique
  description: RichText
  price: Float!
  dishes: [Dish!]! @relation(name: "MenuDishes")
  active: Boolean! @defaultValue(value: false)
  validFrom: DateTime
  validUntil: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
  publishedAt: DateTime
}
```

### 4. Model: **Asset** (Built-in)

Gestion des images et fichiers.

#### Configuration Recommandée
- **Image transformations**: Activées
- **Formats supportés**: WebP, AVIF, JPG, PNG
- **Tailles optimales**:
  - Thumbnail: 200x200
  - Card: 400x300
  - Hero: 1200x600
- **Lazy loading**: Oui
- **CDN**: Activé par défaut

---

## 🔗 Relations

### Category ↔ Dish (One-to-Many)

```graphql
# Category side
dishes: [Dish!]! @relation(name: "CategoryDishes")

# Dish side  
category: Category! @relation(name: "CategoryDishes")
```

**Utilisation**:
- Une catégorie peut avoir plusieurs plats
- Un plat appartient à une seule catégorie
- Suppression en cascade optionnelle

### Menu ↔ Dish (Many-to-Many)

```graphql
# Menu side
dishes: [Dish!]! @relation(name: "MenuDishes")

# Dish side (optionnel)
menus: [Menu!]! @relation(name: "MenuDishes")
```

**Utilisation**:
- Un menu peut contenir plusieurs plats
- Un plat peut appartenir à plusieurs menus
- Relations flexibles pour composer des menus

### Category/Dish ↔ Asset (One-to-One)

```graphql
# Category/Dish side
image: Asset @relation(name: "CategoryImage" | "DishImage")
```

**Utilisation**:
- Image optionnelle pour catégories et plats
- Transformation automatique des images
- URLs optimisées avec CDN

---

## 🔐 Permissions et API

### 1. Créer un Token API Permanent

**Dans Hygraph Console**:
1. Aller dans **Settings** → **API Access**
2. Créer un **Permanent Auth Token**
3. Nom: `Production API Token`
4. Permissions:
   - ✅ Read (Published content)
   - ✅ Create
   - ✅ Update
   - ✅ Delete
   - ✅ Publish
   - ✅ Unpublish

### 2. Configuration dans .env.local

```bash
# Hygraph Configuration
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/YOUR_PROJECT_ID/master
HYGRAPH_TOKEN=your_permanent_token_here
```

**⚠️ Important**:
- Le token est **sensible** - ne jamais commit en public
- Utiliser différents tokens pour dev/staging/prod
- Le token `HYGRAPH_TOKEN` est server-side uniquement
- `NEXT_PUBLIC_HYGRAPH_URL` est public (queries read-only)

### 3. Permissions par Model

#### Public API (Sans Token)
```graphql
# Lecture seule du contenu publié
query PublicDishes {
  dishes(stage: PUBLISHED) {
    id
    name
    price
  }
}
```

#### Admin API (Avec Token)
```graphql
# CRUD complet
mutation CreateDish {
  createDish(data: {...}) {
    id
  }
}
```

### 4. Content Stages

Hygraph utilise un système de stages:
- **DRAFT**: Contenu en cours d'édition
- **PUBLISHED**: Contenu publié et visible

**Configuration recommandée**:
```typescript
// Pour admin
import { adminHygraphClient } from "@/lib/hygraph";

// Pour public
import { publicHygraphClient } from "@/lib/hygraph";
```

---

## 📝 Queries GraphQL

### Récupérer toutes les catégories

```graphql
query GetCategories {
  categories(orderBy: order_ASC, stage: PUBLISHED) {
    id
    name
    slug
    description
    order
    icon
    image {
      id
      url(
        transformation: {
          image: { resize: { width: 400, height: 300, fit: crop } }
        }
      )
    }
  }
}
```

### Récupérer tous les plats

```graphql
query GetDishes {
  dishes(orderBy: order_ASC, stage: PUBLISHED) {
    id
    name
    slug
    description {
      html
      text
    }
    price
    available
    category {
      id
      name
      slug
    }
    image {
      url(
        transformation: {
          image: { resize: { width: 600, height: 400, fit: crop } }
        }
      )
    }
    allergens
    dietary
  }
}
```

### Récupérer un plat par slug

```graphql
query GetDishBySlug($slug: String!) {
  dish(where: { slug: $slug }, stage: PUBLISHED) {
    id
    name
    slug
    description {
      html
    }
    price
    available
    category {
      name
      slug
    }
    image {
      url
      width
      height
    }
    allergens
    dietary
  }
}
```

### Récupérer les menus actifs

```graphql
query GetActiveMenus {
  menus(where: { active: true }, stage: PUBLISHED) {
    id
    name
    slug
    description {
      html
    }
    price
    dishes {
      id
      name
      category {
        name
      }
    }
    validFrom
    validUntil
  }
}
```

### Rechercher des plats

```graphql
query SearchDishes($search: String!) {
  dishes(
    where: {
      OR: [
        { name_contains: $search }
        { description_contains: $search }
      ]
    }
    stage: PUBLISHED
  ) {
    id
    name
    slug
    price
    category {
      name
    }
  }
}
```

---

## ✏️ Mutations

### Créer une catégorie

```graphql
mutation CreateCategory($data: CategoryCreateInput!) {
  createCategory(data: $data) {
    id
    name
    slug
    order
  }
  publishCategory(where: { id: $id }) {
    id
    publishedAt
  }
}
```

**Variables**:
```json
{
  "data": {
    "name": "Entrées",
    "slug": "entrees",
    "description": "Nos délicieuses entrées maison",
    "order": 0,
    "icon": "Restaurant"
  }
}
```

### Créer un plat

```graphql
mutation CreateDish($data: DishCreateInput!) {
  createDish(data: $data) {
    id
    name
    slug
    price
  }
  publishDish(where: { id: $id }) {
    id
    publishedAt
  }
}
```

**Variables**:
```json
{
  "data": {
    "name": "Tartare de bœuf",
    "slug": "tartare-de-boeuf",
    "description": {
      "html": "<p>Tartare de bœuf frais, assaisonnement maison</p>"
    },
    "price": 18.50,
    "category": {
      "connect": {
        "id": "category_id"
      }
    },
    "allergens": ["œufs", "moutarde"],
    "dietary": [],
    "available": true
  }
}
```

### Mettre à jour un plat

```graphql
mutation UpdateDish($id: ID!, $data: DishUpdateInput!) {
  updateDish(where: { id: $id }, data: $data) {
    id
    name
    price
    updatedAt
  }
  publishDish(where: { id: $id }) {
    id
  }
}
```

### Supprimer un plat

```graphql
mutation DeleteDish($id: ID!) {
  unpublishDish(where: { id: $id }) {
    id
  }
  deleteDish(where: { id: $id }) {
    id
  }
}
```

### Activer/Désactiver un menu

```graphql
mutation ToggleMenu($id: ID!, $active: Boolean!) {
  updateMenu(where: { id: $id }, data: { active: $active }) {
    id
    name
    active
  }
  publishMenu(where: { id: $id }) {
    id
  }
}
```

---

## 🔧 Configuration Avancée

### Webhooks

Configurer des webhooks pour être notifié des changements:

1. **Settings** → **Webhooks**
2. Créer un nouveau webhook
3. URL: `https://lesotlylaisse71.fr/api/webhooks/hygraph`
4. Events:
   - Content Published
   - Content Unpublished
   - Content Created
   - Content Updated
   - Content Deleted

### Localization (Optionnel)

Pour un site multilingue:

```graphql
type Dish @model @localized {
  name: String! @localized
  description: RichText! @localized
  # ...
}
```

### Image Optimization

Configuration recommandée dans Hygraph:

```typescript
// Transformation d'image automatique
const imageTransform = {
  image: {
    resize: {
      width: 800,
      height: 600,
      fit: "crop"
    }
  },
  document: {
    output: {
      format: "webp"
    }
  }
};
```

---

## 📚 Ressources

- [Hygraph Documentation](https://hygraph.com/docs)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Content Modeling Guide](https://hygraph.com/docs/guides/content-modeling)

---

**Maintenu par**: Équipe Dev LeSotLyLaisse71  
**Dernière mise à jour**: 2025-11-06  
**Version Hygraph**: v2
