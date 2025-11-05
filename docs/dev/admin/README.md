# 🎯 Admin Dashboard - Documentation

## 📋 Vue d'ensemble

Interface d'administration complète pour gérer le restaurant sans jamais toucher à Hygraph.

## 🗂️ Structure des Dossiers

```
docs/dev/admin/
├── README.md                    # Ce fichier
└── archive/
    ├── PLAN-ADMIN-CRUD.md      # Plan de développement original
    ├── README-ADMIN.md          # Ancienne documentation
    └── TEST-ADMIN.md            # Tests admin
```

## 🎯 Fonctionnalités Prévues

### Phase 1 : Routes API ✅ (Completed)
- ✅ Categories CRUD
- ✅ Dishes CRUD
- ✅ Menus CRUD
- ✅ Assets Upload
- ✅ Reservations Management

### Phase 2 : Interface Admin (En cours)
- [ ] Dashboard principal
- [ ] Gestion des catégories
- [ ] Gestion des plats
- [ ] Gestion des menus
- [ ] Générateur QR Code (✅ Déjà fait)
- [ ] Gestion des réservations

## 🚀 Démarrage

### Prérequis Hygraph

Avant de commencer, configurez Hygraph en suivant :
→ `docs/dev/guides/HYGRAPH_CONFIGURATION.md`

### Lancer l'Admin en Local

```bash
# Installer les dépendances
bun install

# Configurer .env.local
cp .env.example .env.local
# Ajouter votre HYGRAPH_TOKEN

# Lancer le dev server
bun run dev

# Accéder à l'admin
# http://localhost:3000/admin
```

## 📚 Routes API Disponibles

### Catégories
```
POST   /api/categories           - Créer
GET    /api/categories           - Lister
PUT    /api/categories/[id]      - Modifier
DELETE /api/categories/[id]      - Supprimer
POST   /api/categories/[id]/publish - Publier
```

### Plats
```
POST   /api/dishes               - Créer
GET    /api/dishes               - Lister
PUT    /api/dishes/[id]          - Modifier
DELETE /api/dishes/[id]          - Supprimer
POST   /api/dishes/[id]/publish  - Publier
```

### Menus
```
POST   /api/menus                - Créer
GET    /api/menus                - Lister
PUT    /api/menus/[id]           - Modifier
DELETE /api/menus/[id]           - Supprimer
POST   /api/menus/[id]/activate  - Activer
PUT    /api/menus/[id]/dishes    - Gérer les plats
```

### Assets
```
POST   /api/upload               - Upload image
DELETE /api/assets/[id]          - Supprimer asset
```

### Réservations
```
GET    /api/reservations         - Lister
PUT    /api/reservations/[id]    - Modifier statut
DELETE /api/reservations/[id]    - Supprimer
```

## 🔐 Authentification

### Phase 1 : Simple Password (Actuel)
```env
ADMIN_PASSWORD=votre_mot_de_passe
```

### Phase 2 : NextAuth (À venir)
- Multi-utilisateurs
- Rôles (admin, manager, serveur)
- 2FA optionnel

## 🎨 Stack Technique

**Backend**
- Next.js App Router API Routes
- Hygraph GraphQL API
- TypeScript

**Frontend**
- React 19
- Tailwind CSS + DaisyUI
- React Hook Form
- Zod (validation)

**Upload**
- Hygraph Asset API
- browser-image-compression

## 📖 Guides Liés

- [Configuration Hygraph](../guides/HYGRAPH_CONFIGURATION.md)
- [Plan Admin Complet](archive/PLAN-ADMIN-CRUD.md)

## ✅ Prochaines Étapes

1. **Configuration Hygraph**
   - Créer les schémas (Category, MenuItem, Menu)
   - Configurer les permissions
   - Tester les mutations

2. **Interface Admin**
   - Page dashboard principale
   - Composants UI réutilisables
   - Hooks custom (useCategories, useDishes, useMenus)

3. **Tests & Validation**
   - Tests des routes API
   - Tests d'intégration
   - Validation des formulaires

## 🐛 Support

Pour toute question ou problème :
1. Consultez la [documentation Hygraph](https://hygraph.com/docs)
2. Vérifiez les [archives](archive/) pour l'historique
3. Testez les routes API avec curl ou Postman

---

**Dernière mise à jour** : 6 Novembre 2025
