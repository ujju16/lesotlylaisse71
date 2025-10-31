# Configuration Hygraph - LeSotLyLaisse71

## 📋 Vue d'ensemble

Ce guide explique comment configurer et utiliser Hygraph comme CMS headless pour le projet LeSotLyLaisse71.

## 🔑 Variables d'environnement

Les variables suivantes sont déjà configurées dans `.env.local`:

```env
# URL de l'API Hygraph (publique)
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master

# Token d'authentification (privé - ne jamais exposer côté client)
HYGRAPH_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0...

# URL de base du site
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📊 Modèles de données

### Category (Catégorie)

- **Champs:**
  - `id`: ID unique (généré automatiquement)
  - `name`: Nom de la catégorie (String, requis)
  - `slug`: Slug pour URL (String, unique, requis)
  - `description`: Description (RichText)
  - `image`: Image de la catégorie (Asset)
  - `order`: Ordre d'affichage (Int)
  - `isActive`: Statut actif/inactif (Boolean)

### MenuItem (Élément de menu)

- **Champs:**
  - `id`: ID unique
  - `name`: Nom du plat (String, requis)
  - `slug`: Slug pour URL (String, unique)
  - `description`: Description (RichText)
  - `price`: Prix (Float, requis)
  - `category`: Relation vers Category (requis)
  - `image`: Image du plat (Asset)
  - `allergens`: Allergènes (String)
  - `isVegetarian`: Plat végétarien (Boolean)
  - `isVegan`: Plat vegan (Boolean)
  - `isGlutenFree`: Sans gluten (Boolean)
  - `isAvailable`: Disponible (Boolean)
  - `order`: Ordre dans la catégorie (Int)

### Menu

- **Champs:**
  - `id`: ID unique
  - `name`: Nom du menu (String, requis)
  - `slug`: Slug pour URL (String, unique)
  - `description`: Description (RichText)
  - `items`: Relation vers MenuItem[] (multiple)
  - `price`: Prix du menu complet (Float)
  - `isActive`: Menu actif (Boolean)
  - `validFrom`: Date de début (Date)
  - `validUntil`: Date de fin (Date)

### QRCode

- **Champs:**
  - `id`: ID unique
  - `name`: Nom du QR Code (String, requis)
  - `slug`: Slug unique (String, unique, requis)
  - `menu`: Relation vers Menu (requis)
  - `qrcodeUrl`: URL du QR Code généré (String)
  - `isActive`: QR Code actif (Boolean)
  - `description`: Description (String)

## 🔄 Changement important: "status" → "isActive"

⚠️ **Note importante:** Le champ `status` est un mot réservé dans Hygraph. Utilisez `isActive` (Boolean) à la place.

## 🚀 Utilisation dans le code

### Récupérer les catégories

```typescript
import { hygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

const query = gql`
  query GetCategories {
    categories(orderBy: order_ASC) {
      id
      name
      slug
      description {
        html
      }
      image {
        url
      }
      isActive
    }
  }
`;

const { categories } = await hygraphClient.request(query);
```

### Récupérer les items d'un menu

```typescript
const query = gql`
  query GetMenuItems($categorySlug: String!) {
    category(where: { slug: $categorySlug }) {
      name
      menuItems(orderBy: order_ASC, where: { isAvailable: true }) {
        id
        name
        description {
          html
        }
        price
        image {
          url
        }
        isVegetarian
        isVegan
        isGlutenFree
      }
    }
  }
`;

const data = await hygraphClient.request(query, { categorySlug: 'entrees' });
```

## 🔐 Sécurité

1. **Ne jamais exposer `HYGRAPH_TOKEN` côté client**
2. Utiliser uniquement `NEXT_PUBLIC_HYGRAPH_URL` pour les requêtes publiques
3. Les mutations (création/modification) doivent être faites côté serveur avec le token

## 📱 Interface d'administration

L'interface d'administration (`/admin`) permet de:

- ✅ Gérer les catégories (CRUD complet)
- ✅ Uploader des images
- ✅ Générer des QR codes
- ✅ Associer un QR code à différents menus
- ✅ Activer/désactiver des éléments

## 🎨 Material Design

L'interface admin utilise:

- DaisyUI 4.12.14 (framework CSS)
- Thème personnalisé avec couleurs Material Design
- Composants réutilisables dans `/app/components`

## 🔗 Liens utiles

- Dashboard Hygraph: https://app.hygraph.com
- Documentation API: https://hygraph.com/docs/api-reference
- GraphQL Playground: Disponible dans votre dashboard Hygraph

## 📝 Prochaines étapes

1. ✅ Configuration Hygraph terminée
2. ✅ Modèles de données créés
3. ✅ Interface admin avec Material Design
4. 🔄 Gestion des menus (en cours)
5. 🔄 Système QR Code dynamique (en cours)

---

**Dernière mise à jour:** 31 octobre 2025
