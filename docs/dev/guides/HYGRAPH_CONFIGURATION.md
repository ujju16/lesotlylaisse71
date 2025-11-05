# 🎨 Configuration Hygraph - Guide Complet

## 📋 Informations de Connexion

- **Dashboard**: https://app.hygraph.com
- **Projet**: `lesotlylaisse71`
- **Région**: EU West 2
- **API Endpoint**: `https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master`

## 🔐 Configuration des Secrets

### Variables d'Environnement Requises

```env
# .env.local (local development)
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=<votre_token_permanent>
CODECOV_TOKEN=<votre_token_codecov>
```

### ⚠️ Sécurité Importante

1. **NE JAMAIS COMMITER** le fichier `.env.local`
2. **Ajouter les tokens dans Vercel** : Settings → Environment Variables
3. **Ajouter les tokens dans GitHub Secrets** : Settings → Secrets and Variables → Actions

### Configuration Vercel

```bash
# Via CLI Vercel
vercel env add HYGRAPH_TOKEN
vercel env add CODECOV_TOKEN
vercel env add NEXT_PUBLIC_HYGRAPH_URL
```

### Configuration GitHub Actions

Allez dans : `Settings → Secrets and variables → Actions`

Secrets à ajouter :

- `HYGRAPH_TOKEN`
- `CODECOV_TOKEN`
- `VERCEL_TOKEN` (pour le déploiement)

## 📦 Schémas Hygraph

### 1. Category (Catégorie)

```graphql
type Category {
  name: String! @unique
  slug: Slug! @unique
  description: String
  icon: String
  image: Asset
  order: Int! @default(value: 0)
  isActive: Boolean! @default(value: true)
  menuItems: [MenuItem!] @relation(name: "CategoryMenuItems")
}
```

### 2. MenuItem (Plat)

```graphql
type MenuItem {
  name: String! @unique
  slug: Slug! @unique
  description: String
  price: Float!
  image: Asset
  allergens: String
  order: Int! @default(value: 0)
  isAvailable: Boolean! @default(value: true)
  isVegetarian: Boolean! @default(value: false)
  isVegan: Boolean! @default(value: false)
  isGlutenFree: Boolean! @default(value: false)
  category: Category! @relation(name: "CategoryMenuItems")
  menus: [Menu!] @relation(name: "MenuDishes")
}
```

### 3. Menu

```graphql
type Menu {
  name: String! @unique
  slug: Slug! @unique
  description: String
  isActive: Boolean! @default(value: false)
  startDate: Date!
  endDate: Date
  dishes: [MenuItem!] @relation(name: "MenuDishes")
  qrcodes: [QRCode!] @relation(name: "MenuQRCodes")
}
```

### 4. QRCode (Optionnel)

```graphql
type QRCode {
  name: String!
  code: String! @unique
  activeMenu: Menu @relation(name: "MenuQRCodes")
}
```

## 🔗 Relations

1. **Category ←→ MenuItem** (One-to-Many)
   - Une catégorie peut avoir plusieurs plats
   - Un plat appartient à une catégorie

2. **Menu ←→ MenuItem** (Many-to-Many)
   - Un menu peut contenir plusieurs plats
   - Un plat peut être dans plusieurs menus

3. **QRCode → Menu** (Many-to-One)
   - Un QR code pointe vers un menu actif
   - Un menu peut avoir plusieurs QR codes

## 🎯 Permissions API

### Content API Permissions

Pour chaque modèle, configurer :

**Public Access (sans token):**

- ✅ Read

**Token Required:**

- ✅ Create
- ✅ Update
- ✅ Delete
- ✅ Publish
- ✅ Unpublish

### Asset Permissions

- ✅ Read: Public
- ✅ Create: Token Required
- ✅ Update: Token Required
- ✅ Delete: Token Required

## 🧪 Tests de Configuration

### Test 1: Lire les données (public)

```bash
curl -X POST https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master \
  -H "Content-Type: application/json" \
  -d '{"query": "{ categories { name slug } }"}'
```

### Test 2: Créer une catégorie (avec token)

```bash
curl -X POST https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"query": "mutation { createCategory(data: {name: \"Test\", slug: \"test\"}) { id name } }"}'
```

## 📚 Utilisation dans l'App

### Fichier de Configuration

`lib/hygraph.ts`:

```typescript
import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL!, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});
```

### Exemples de Queries

```typescript
// Lister les catégories
export async function getCategories() {
  const query = `
    query {
      categories(orderBy: order_ASC) {
        id
        name
        slug
        icon
        image { url }
      }
    }
  `;
  return hygraph.request(query);
}

// Créer un plat
export async function createDish(data: DishInput) {
  const mutation = `
    mutation CreateDish($name: String!, $price: Float!, $categoryId: ID!) {
      createMenuItem(
        data: {
          name: $name
          price: $price
          category: { connect: { id: $categoryId } }
        }
      ) {
        id
        name
      }
    }
  `;
  return hygraph.request(mutation, data);
}
```

## 🔧 Troubleshooting

### Erreur: "Not authorized"

→ Vérifier que le token est correct et a les bonnes permissions

### Erreur: "Field 'status' not found"

→ Hygraph interdit certains noms de champs, utiliser `isActive` à la place

### Erreur: "Unique constraint violation"

→ Le slug existe déjà, utiliser un autre nom

### Erreur: "Unable to upload asset"

→ Vérifier les permissions d'upload sur les Assets

## 📖 Ressources

- [Documentation Hygraph](https://hygraph.com/docs)
- [GraphQL API Reference](https://hygraph.com/docs/api-reference/content-api)
- [Asset Management](https://hygraph.com/docs/api-reference/content-api/assets)
