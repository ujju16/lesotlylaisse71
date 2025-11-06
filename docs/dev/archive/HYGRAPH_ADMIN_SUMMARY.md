# 🎯 Résumé - Admin Dashboard & Hygraph

## 📍 État Actuel du Projet

### ✅ APIs Backend Complètes

Toutes les routes API sont en place dans `/app/api/` :

- `/api/categories` - CRUD complet pour catégories
- `/api/dishes` - CRUD complet pour plats
- `/api/menus` - CRUD complet pour menus
- `/api/upload` - Upload d'images vers Hygraph

### 📁 Structure Admin

```
app/
├── admin.backup/        # Ancien admin à restaurer/améliorer
│   ├── categories/
│   ├── layout.tsx
│   └── page.old.tsx.bak
└── api/                 # ✅ APIs fonctionnelles
    ├── categories/
    ├── dishes/
    ├── menus/
    └── upload/
```

---

## 🎨 Modèles Hygraph

### Category

```typescript
{
  id: string
  name: string
  slug: string (unique)
  description?: string
  icon?: string
  image?: Asset
  order: number
  isActive: boolean
  menuItems: MenuItem[]
}
```

### MenuItem (Plat)

```typescript
{
  id: string
  name: string
  slug: string (unique)
  description?: string
  price: number
  image?: Asset
  category: Category
  allergens?: string
  isAvailable: boolean
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
}
```

### Menu

```typescript
{
  id: string
  name: string
  slug: string (unique)
  description?: string
  startDate: DateTime
  endDate?: DateTime
  isActive: boolean
  dishes: MenuItem[]
}
```

---

## 🚀 Prochaines Étapes

### Phase 1: Restaurer Admin Dashboard

1. Créer `/app/admin/` à partir de admin.backup
2. Créer layout admin moderne avec:
   - Navigation sidebar
   - Header avec user info
   - Breadcrumbs
   - Dark mode support

### Phase 2: Pages Admin CRUD

1. `/admin/categories` - Gestion catégories
2. `/admin/dishes` - Gestion plats
3. `/admin/menus` - Gestion menus
4. `/admin/reservations` - Voir réservations

### Phase 3: Components Réutilisables

- `DataTable` avec tri/filtre
- `FormModal` pour create/edit
- `ImageUploader` pour Hygraph
- `ConfirmDialog` pour delete
- `StatusBadge` pour états

---

## 🔐 Configuration Hygraph

**Variables d'environnement (.env.local):**

```bash
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=eyJhbGci...
```

**⚠️ Important:**

- Utiliser `isActive` au lieu de `status` (réservé par Hygraph)
- Toujours publier après création/modification
- Upload d'images via `/api/upload`

---

## 📚 Documentation Complète

Pour plus de détails, voir:

- `/docs/HYGRAPH_GUIDE.md` - Guide complet Hygraph
- `/docs/PLAN-ADMIN-CRUD.md` - Plan détaillé admin
- `/docs/README-ADMIN.md` - Instructions admin
