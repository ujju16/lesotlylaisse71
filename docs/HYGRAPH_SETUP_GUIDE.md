# 🎨 Guide de Configuration Hygraph - LeSotLyLaisse71

## 📋 Vue d'ensemble

Ce guide vous accompagne pas à pas pour configurer tous les schémas et relations nécessaires dans Hygraph pour votre application de restaurant.

---

## 🔐 Accès Hygraph

1. **URL Dashboard**: https://app.hygraph.com
2. **Projet**: `lesotlylaisse71`
3. **Région**: EU West 2
4. **API Endpoint**: https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master

---

## 📦 Schémas à Créer

### 1. Catégorie (Category)

#### Création du Modèle
1. Aller dans **Schema** → **Create Model**
2. **Model name**: `Category`
3. **API ID**: `category` (auto-généré)
4. **Plural API ID**: `categories`

#### Champs à ajouter

| Nom | Type | Options |
|-----|------|---------|
| **name** | Single line text | Required |
| **slug** | Slug | Based on: name, Required, Unique |
| **description** | Multi line text | Optional |
| **icon** | Single line text | Optional (emoji) |
| **image** | Asset | Optional, Allow multiple values: NO |
| **order** | Integer | Required, Default: 0 |
| **isActive** | Boolean | Required, Default: true |

#### Configuration Slug
- Base field: `name`
- Format: lowercase
- ✅ Make unique
- ✅ Required

---

### 2. Plat (MenuItem)

#### Création du Modèle
1. **Schema** → **Create Model**
2. **Model name**: `MenuItem`
3. **API ID**: `menuItem`
4. **Plural API ID**: `menuItems`

#### Champs à ajouter

| Nom | Type | Options |
|-----|------|---------|
| **name** | Single line text | Required |
| **slug** | Slug | Based on: name, Required, Unique |
| **description** | Multi line text | Optional |
| **price** | Float | Required |
| **image** | Asset | Optional |
| **allergens** | Single line text | Optional |
| **order** | Integer | Required, Default: 0 |
| **isAvailable** | Boolean | Required, Default: true |
| **isVegetarian** | Boolean | Required, Default: false |
| **isVegan** | Boolean | Required, Default: false |
| **isGlutenFree** | Boolean | Required, Default: false |

---

### 3. Menu

#### Création du Modèle
1. **Schema** → **Create Model**
2. **Model name**: `Menu`
3. **API ID**: `menu`
4. **Plural API ID**: `menus`

#### Champs à ajouter

| Nom | Type | Options |
|-----|------|---------|
| **name** | Single line text | Required |
| **slug** | Slug | Based on: name, Required, Unique |
| **description** | Multi line text | Optional |
| **isActive** | Boolean | Required, Default: false |
| **startDate** | Date | Required |
| **endDate** | Date | Optional |

---

### 4. QRCode (Optionnel)

#### Création du Modèle
1. **Schema** → **Create Model**
2. **Model name**: `QRCode`
3. **API ID**: `qrcode`
4. **Plural API ID**: `qrcodes`

#### Champs à ajouter

| Nom | Type | Options |
|-----|------|---------|
| **name** | Single line text | Required |
| **code** | Single line text | Required, Unique |

---

## 🔗 Relations à Créer

### Relation 1 : Category ←→ MenuItem (One-to-Many)

#### Sur le modèle **MenuItem**
1. Ajouter un champ **Reference**
2. **Field name**: `category`
3. **Reference**: `Category`
4. **Relation type**: One-to-Many
5. ✅ Required
6. **Reverse field name**: `menuItems`

#### Résultat
- Un `MenuItem` appartient à UNE `Category`
- Une `Category` peut avoir PLUSIEURS `MenuItem`

---

### Relation 2 : Menu ←→ MenuItem (Many-to-Many)

#### Sur le modèle **Menu**
1. Ajouter un champ **Reference**
2. **Field name**: `dishes`
3. **Reference**: `MenuItem`
4. **Relation type**: Many-to-Many
5. ✅ Allow multiple values
6. **Reverse field name**: `menus` (sur MenuItem)

#### Résultat
- Un `Menu` peut avoir PLUSIEURS `MenuItem`
- Un `MenuItem` peut être dans PLUSIEURS `Menu`

---

### Relation 3 : QRCode → Menu (Many-to-One)

#### Sur le modèle **QRCode**
1. Ajouter un champ **Reference**
2. **Field name**: `activeMenu`
3. **Reference**: `Menu`
4. **Relation type**: Many-to-One
5. Optional
6. **Reverse field name**: `qrcodes` (sur Menu)

---

## 🔐 Permissions & API Access

### 1. Créer un Permanent Auth Token

1. **Settings** → **API Access** → **Permanent Auth Tokens**
2. **Create Token**
3. **Name**: `Admin API Token`
4. **Description**: `Full CRUD access for admin interface`

### 2. Permissions à Activer

Pour chaque modèle (`Category`, `MenuItem`, `Menu`, `QRCode`):

#### Content API
- ✅ **Read** - Public Access (ou Token)
- ✅ **Create** - Token Required
- ✅ **Update** - Token Required
- ✅ **Delete** - Token Required
- ✅ **Publish** - Token Required
- ✅ **Unpublish** - Token Required

#### Management API
- ✅ **Read** - Token Required

### 3. Asset Permissions

1. **Settings** → **API Access** → **Content API**
2. Aller dans **Assets**
3. Permissions:
   - ✅ **Read** - Public Access
   - ✅ **Create** - Token Required
   - ✅ **Update** - Token Required
   - ✅ **Delete** - Token Required

---

## 🧪 Test des Schémas

### 1. Créer une Catégorie Test

```graphql
mutation {
  createCategory(
    data: {
      name: "Entrées"
      slug: "entrees"
      description: "Les délicieuses entrées"
      icon: "🥗"
      order: 0
      isActive: true
    }
  ) {
    id
    name
    slug
  }
}
```

### 2. Publier la Catégorie

```graphql
mutation {
  publishCategory(where: { id: "CATEGORY_ID" }, to: PUBLISHED) {
    id
    stage
  }
}
```

### 3. Créer un Plat Test

```graphql
mutation {
  createMenuItem(
    data: {
      name: "Salade César"
      slug: "salade-cesar"
      description: "Salade romaine, poulet grillé, parmesan"
      price: 12.50
      category: { connect: { id: "CATEGORY_ID" } }
      isAvailable: true
      isVegetarian: false
    }
  ) {
    id
    name
    category {
      name
    }
  }
}
```

### 4. Créer un Menu Test

```graphql
mutation {
  createMenu(
    data: {
      name: "Menu Hiver 2025"
      slug: "menu-hiver-2025"
      description: "Notre sélection hivernale"
      startDate: "2025-11-01"
      isActive: true
      dishes: { connect: [{ id: "MENU_ITEM_ID" }] }
    }
  ) {
    id
    name
    dishes {
      name
      price
    }
  }
}
```

---

## ✅ Checklist de Vérification

### Modèles
- [ ] `Category` créé avec tous les champs
- [ ] `MenuItem` créé avec tous les champs
- [ ] `Menu` créé avec tous les champs
- [ ] `QRCode` créé (optionnel)

### Relations
- [ ] `MenuItem.category` → `Category` (Many-to-One)
- [ ] `Menu.dishes` → `MenuItem[]` (Many-to-Many)
- [ ] `QRCode.activeMenu` → `Menu` (Many-to-One)

### Permissions
- [ ] Token créé et copié dans `.env.local`
- [ ] Permissions CRUD activées sur tous les modèles
- [ ] Assets uploadables avec le token

### Tests
- [ ] Catégorie créée et publiée
- [ ] Plat créé et lié à la catégorie
- [ ] Menu créé avec des plats
- [ ] Queries fonctionnelles depuis l'app

---

## 🚀 Intégration avec l'App

### 1. Vérifier les Variables d'Environnement

```env
# .env.local
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=VOTRE_PERMANENT_TOKEN
```

### 2. Tester les Routes API

```bash
# Créer une catégorie
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Entrées","icon":"🥗","order":0}'

# Lister les catégories
curl http://localhost:3000/api/categories

# Créer un plat
curl -X POST http://localhost:3000/api/dishes \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Salade César",
    "price":12.50,
    "categoryId":"CATEGORY_ID"
  }'
```

### 3. Tester l'Interface Admin

1. Démarrer le serveur: `bun run dev`
2. Aller sur `http://localhost:3000/admin`
3. Tester chaque section:
   - Créer une catégorie
   - Uploader une image
   - Créer un plat
   - Créer un menu
   - Générer un QR code

---

## 🐛 Troubleshooting

### Erreur : "Field 'status' not found"
**Solution**: Hygraph interdit le mot `status`, utilisez `isActive` à la place.

### Erreur : "Unique constraint violation"
**Solution**: Le slug doit être unique. Vérifiez qu'il n'existe pas déjà.

### Erreur : "Not authorized"
**Solution**: Vérifiez que le `HYGRAPH_TOKEN` est correct et a les bonnes permissions.

### Erreur : "Unable to upload asset"
**Solution**: Activez les permissions d'upload sur les Assets dans Hygraph.

---

## 📚 Resources

- [Hygraph Documentation](https://hygraph.com/docs)
- [GraphQL Queries Guide](https://hygraph.com/docs/api-reference/content-api/queries)
- [Mutations Guide](https://hygraph.com/docs/api-reference/content-api/mutations)
- [Asset Upload](https://hygraph.com/docs/api-reference/content-api/assets)

---

## 🎯 Prochaines Étapes

Après la configuration Hygraph :

1. **Peupler le contenu**
   - Créer toutes les catégories
   - Ajouter les plats avec photos
   - Créer les menus

2. **Tests d'intégration**
   - Vérifier tous les CRUD
   - Tester l'upload d'images
   - Valider les relations

3. **Optimisations**
   - Cache des queries
   - Lazy loading des images
   - Error handling robuste

---

**Bonne configuration ! 🚀**

Si vous rencontrez des problèmes, consultez la documentation Hygraph ou le code source dans `/app/api/`.
