# Plan de développement Admin CRUD

## Phase 1: Configuration Hygraph ✅

### Schémas créés
- ✅ Categories (avec relations)
- ✅ Dishes (avec relations)
- ✅ Menus (avec relations)
- ✅ Asset (pour les images)

### Permissions configurées
- Token d'API créé
- Token ajouté à `.env.local`
- ⚠️ Permissions sur les images à vérifier

## Phase 2: Interface Admin - En cours

### Dashboard Admin ✅
- **Fichier**: `app/admin/page.tsx`
- Statistiques en temps réel
- Cards d'accès rapide
- Navigation vers les sections CRUD

### Auth Pages ✅
- **Fichiers**: `app/auth/login/`, `app/auth/register/`
- Material UI + Zod validation
- Formulaires avec React Hook Form
- Thème personnalisé restaurant

### Pages CRUD à développer

#### 1. Catégories (`/admin/categories`)
**Fonctionnalités**:
- Liste des catégories avec tri
- Formulaire création/édition
- Upload d'images
- Gestion de l'ordre d'affichage
- Soft delete

**API Routes**:
- ✅ GET /api/categories
- ✅ POST /api/categories
- ✅ GET /api/categories/[id]
- ✅ PUT /api/categories/[id]
- ✅ DELETE /api/categories/[id]

**Composants à créer**:
- `app/admin/categories/page.tsx` - Liste
- `app/admin/categories/new/page.tsx` - Création
- `app/admin/categories/[id]/edit/page.tsx` - Édition
- `components/admin/CategoryForm.tsx` - Formulaire
- `components/admin/CategoryList.tsx` - Liste avec actions

#### 2. Plats (`/admin/dishes`)
**Fonctionnalités**:
- Liste des plats par catégorie
- Formulaire avec:
  - Nom, description, prix
  - Catégorie (relation)
  - Allergènes
  - Images multiples
  - Disponibilité
- Filtrage et recherche
- Soft delete

**API Routes**:
- ✅ GET /api/dishes
- ✅ POST /api/dishes
- ✅ GET /api/dishes/[id]
- ✅ PUT /api/dishes/[id]
- ✅ DELETE /api/dishes/[id]

**Composants à créer**:
- `app/admin/dishes/page.tsx` - Liste
- `app/admin/dishes/new/page.tsx` - Création
- `app/admin/dishes/[id]/edit/page.tsx` - Édition
- `components/admin/DishForm.tsx` - Formulaire
- `components/admin/DishList.tsx` - Liste avec actions
- `components/admin/DishFilters.tsx` - Filtres

#### 3. Menus (`/admin/menus`)
**Fonctionnalités**:
- Composition de menus
- Sélection de plats (relation many-to-many)
- Prix du menu
- Activation/désactivation
- Gestion des disponibilités

**API Routes**:
- ✅ GET /api/menus
- ✅ POST /api/menus
- ✅ GET /api/menus/[id]
- ✅ PUT /api/menus/[id]
- ✅ DELETE /api/menus/[id]
- ✅ POST /api/menus/[id]/activate

**Composants à créer**:
- `app/admin/menus/page.tsx` - Liste
- `app/admin/menus/new/page.tsx` - Création
- `app/admin/menus/[id]/edit/page.tsx` - Édition
- `components/admin/MenuForm.tsx` - Formulaire
- `components/admin/MenuComposer.tsx` - Sélection plats
- `components/admin/MenuList.tsx` - Liste avec actions

#### 4. Upload d'images (`/admin/upload`)
**Fonctionnalités**:
- Upload vers Hygraph Assets
- Prévisualisation
- Compression d'images
- Gestion du cache

**API Routes**:
- ✅ POST /api/upload

**Composants à créer**:
- `components/admin/ImageUpload.tsx` - Upload widget
- `components/admin/ImagePreview.tsx` - Prévisualisation

## Phase 3: Validations & Schémas Zod

### Schémas à créer
```typescript
// lib/validations/category.ts
- createCategorySchema
- updateCategorySchema

// lib/validations/dish.ts
- createDishSchema
- updateDishSchema

// lib/validations/menu.ts
- createMenuSchema
- updateMenuSchema
```

## Phase 4: Tests

### Tests unitaires
- Composants de formulaires
- Logique de validation
- Utilitaires

### Tests d'intégration
- Routes API
- Flux CRUD complets

### Tests E2E
- Création d'une catégorie
- Création d'un plat
- Composition d'un menu

## Phase 5: Optimisations

### Performance
- Lazy loading des images
- Pagination des listes
- Cache des requêtes

### UX
- Loading states
- Messages de succès/erreur
- Confirmations de suppression
- Breadcrumbs
- Retour en arrière

### Accessibilité
- Labels ARIA sur tous les champs
- Navigation au clavier
- Focus management
- Contraste des couleurs

## Phase 6: Documentation

### À documenter
- Guide d'utilisation admin
- Schémas Hygraph
- Relations entre modèles
- API endpoints
- Composants réutilisables

## Priorités

1. **Urgent**: Fixer les permissions Hygraph sur le champ `image`
2. **Important**: Développer le CRUD Catégories (template pour les autres)
3. **Important**: Implémenter l'authentification réelle avec Hygraph
4. **Moyen**: CRUD Plats et Menus
5. **Moyen**: Tests et optimisations
6. **Faible**: Documentation complète

## Notes techniques

### Stack technologique
- **Framework**: Next.js 16 (App Router)
- **UI Library**: Material UI + DaisyUI
- **Forms**: React Hook Form + Zod
- **CMS**: Hygraph (GraphQL)
- **Animations**: Framer Motion
- **Runtime**: Bun

### Conventions
- Client components pour les formulaires
- Server components pour les listes
- API Routes pour toutes les mutations
- Validation côté client ET serveur
- Messages d'erreur en français
- ARIA sur tous les composants interactifs

## Prochaines actions

1. ✅ Merger PR #38 avec auth pages
2. 🔄 Créer branche `dev` principale
3. 🔄 Développer CRUD Catégories complet
4. 🔄 Implémenter authentification Hygraph
5. 🔄 Développer CRUD Plats
6. 🔄 Développer CRUD Menus
7. 🔄 Tests & optimisations
8. 🔄 Documentation
