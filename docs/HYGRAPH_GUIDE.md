# 🚀 Guide Hygraph - LeSotLyLaisse71

## 📋 Configuration Complète

### 1. Credentials Hygraph

```bash
# Déjà configuré dans .env.local
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=eyJhbGci... (voir .env.local)
```

---

## 🎨 Modèles de Données

### Category (Catégorie de Menu)

```graphql
model Category {
  id: ID!
  name: String!           # Nom de la catégorie
  slug: String! @unique   # URL-friendly (auto-généré)
  description: String     # Description
  icon: String            # Emoji ou icône
  image: Asset            # Image (optionnelle)
  order: Int! @default(0) # Ordre d'affichage
  isActive: Boolean! @default(true)  # ⚠️ Utiliser isActive au lieu de status
  menuItems: [MenuItem!]  # Relation vers les plats
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

**⚠️ IMPORTANT** : Hygraph interdit le nom `status` - utiliser `isActive` à la place.

### MenuItem (Plat du Menu)

```graphql
model MenuItem {
  id: ID!
  name: String!
  slug: String! @unique
  description: String
  price: Float!
  image: Asset            # Image du plat
  category: Category!     # Relation vers Category
  allergens: String       # Liste des allergènes
  isAvailable: Boolean! @default(true)  # Disponibilité
  isVegetarian: Boolean! @default(false)
  order: Int! @default(0)
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### QRCode (QR Code pour Menu)

```graphql
model QRCode {
  id: ID!
  name: String!           # Ex: "QR Menu Principal"
  code: String! @unique   # Code unique généré
  activeMenu: Menu        # Menu actuellement actif
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Menu (Configuration de Menu)

```graphql
model Menu {
  id: ID!
  name: String!           # Ex: "Menu Hiver 2025"
  description: String
  isActive: Boolean! @default(false)
  categories: [Category!] # Catégories du menu
  qrCodes: [QRCode!]      # QR codes liés
  validFrom: DateTime
  validUntil: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

---

## 🔧 Configuration dans Hygraph

### Étape 1: Créer les Modèles

1. Aller sur [Hygraph Dashboard](https://app.hygraph.com)
2. Sélectionner votre projet: **lesotlylaisse71**
3. Schema → Create Model
4. Créer les 4 modèles ci-dessus dans cet ordre:
   - Category
   - MenuItem
   - QRCode
   - Menu

### Étape 2: Configurer les Relations

```
Category → MenuItem (One-to-Many)
Menu → Category (Many-to-Many)
Menu → QRCode (One-to-Many)
```

### Étape 3: Créer les Webhooks (optionnel)

Pour invalider le cache Next.js à chaque modification:

```
Webhook URL: https://votre-site.vercel.app/api/revalidate
Secret: [générer un secret]
Triggers: Publish, Unpublish, Update
```

---

## 💻 Utilisation dans le Code

### Queries GraphQL

#### Récupérer toutes les catégories

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
    }
    order
    isActive
    menuItems {
      id
      name
    }
  }
}
```

#### Récupérer le menu actif

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

#### Créer une catégorie

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

---

## 🎯 Interface Admin

### Page: `/admin/categories`

Fonctionnalités:

- ✅ Lister toutes les catégories
- ✅ Créer une nouvelle catégorie
- ✅ Modifier une catégorie
- ✅ Supprimer une catégorie
- ✅ Upload d'images
- ✅ Réorganiser l'ordre

### Page: `/admin/menu` (à venir)

Fonctionnalités:

- 📋 Gérer les plats par catégorie
- 🖼️ Upload d'images de plats
- 💰 Gestion des prix
- 🌱 Marquer végétarien/allergènes

### Page: `/admin/qrcode` (à venir)

Fonctionnalités:

- 📱 Générer un QR code unique
- 🔗 Lier un QR code à un menu
- 🔄 Changer le menu actif d'un QR code
- 📊 Statistiques de scans

---

## 🔐 Sécurité

### Permissions Hygraph

1. Public API:
   - Read: Categories (isActive: true)
   - Read: MenuItems (isAvailable: true)
   - Read: Menus (isActive: true)

2. Admin API (avec token):
   - Create/Update/Delete: All models
   - Manage: Assets

### Protection des Routes Admin

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Vérifier l'authentification
    const auth = request.cookies.get("admin-auth");
    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
```

---

## 🎨 Material Design Integration

### Composants Admin

Tous les composants admin utilisent Material Design 3:

- **Cards** : Élévation + ombres
- **Boutons** : Filled, Outlined, Text
- **Inputs** : Floating labels
- **Colors** : Palette Material (Primary, Secondary, Accent)

### Charte Graphique

```css
:root {
  --primary: #795548; /* Marron (terre, bois, tabac) */
  --secondary: #689f38; /* Vert (nature, produits locaux) */
  --accent: #ffb300; /* Jaune doré (chaleur, convivialité) */
}
```

---

## 🚀 Commandes Utiles

### Développement

```bash
# Démarrer le serveur de dev
npm run dev

# Build production
npm run build

# Linter
npm run lint

# Quality check complet
npm run quality
```

### Git

```bash
# Créer une branche feature
git checkout -b feature/nom-de-la-feature

# Commit
git add .
git commit -m "feat: description"

# Push
git push origin feature/nom-de-la-feature
```

---

## 📱 Système QR Code

### Concept

1. **Un seul QR code physique** au centre du restaurant
2. **Plusieurs menus différents** configurables
3. **Changement dynamique** via l'admin

### Workflow

```
Restaurant imprime QR → Client scanne →
  → Système détecte le QR code →
    → Affiche le menu actif lié →
      → Client consulte le menu
```

### Changement de Menu

Admin peut:

1. Créer un nouveau menu (ex: "Menu Printemps")
2. Changer le menu actif du QR code
3. Le changement est immédiat pour tous les clients

### Implémentation

```typescript
// app/menu/[qrcode]/page.tsx
export default async function MenuPage({ params }: { params: { qrcode: string } }) {
  const qrCode = await getQRCode(params.qrcode);
  const activeMenu = qrCode.activeMenu;

  return <MenuDisplay menu={activeMenu} />;
}
```

---

## 📊 Prochaines Étapes

### Phase 1: Catégories ✅

- [x] Modèle Category dans Hygraph
- [x] CRUD Catégories dans admin
- [x] Upload d'images

### Phase 2: Plats 🚧

- [ ] Modèle MenuItem dans Hygraph
- [ ] CRUD Plats dans admin
- [ ] Liaison Catégorie ↔ Plat

### Phase 3: QR Code 📋

- [ ] Modèle QRCode dans Hygraph
- [ ] Génération QR code unique
- [ ] Page d'affichage menu public

### Phase 4: Multi-Menus 📋

- [ ] Modèle Menu dans Hygraph
- [ ] Gestion des menus multiples
- [ ] Association QR ↔ Menu

---

## 🆘 Dépannage

### Erreur: "Field 'status' not found"

**Cause**: Hygraph interdit le nom `status`  
**Solution**: Utiliser `isActive` à la place

### Erreur: "Unable to upload asset"

**Cause**: Token API invalide ou permissions insuffisantes  
**Solution**: Vérifier HYGRAPH_TOKEN dans .env.local

### Erreur: "Rate limit exceeded"

**Cause**: Trop de requêtes API  
**Solution**: Implémenter un cache ou augmenter le plan Hygraph

---

## 📚 Ressources

- [Hygraph Documentation](https://hygraph.com/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Material Design 3](https://m3.material.io/)
- [Next.js 15 Docs](https://nextjs.org/docs)
