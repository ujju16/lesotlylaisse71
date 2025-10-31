# 🎯 Plan de Développement - Admin CRUD Complet

## 🔥 Objectif

Créer une interface admin complète où le client peut gérer TOUT sans jamais aller sur Hygraph.

---

## 📋 Phase 1 : Routes API Next.js (Backend)

### 1.1 Categories API

```
✅ POST   /api/categories          → Créer catégorie
✅ GET    /api/categories          → Lister catégories
✅ PUT    /api/categories/[id]     → Modifier catégorie
✅ DELETE /api/categories/[id]     → Supprimer catégorie
✅ POST   /api/categories/[id]/publish → Publier
```

### 1.2 Dishes API

```
✅ POST   /api/dishes              → Créer plat
✅ GET    /api/dishes              → Lister plats
✅ PUT    /api/dishes/[id]         → Modifier plat
✅ DELETE /api/dishes/[id]         → Supprimer plat
✅ POST   /api/dishes/[id]/publish → Publier
```

### 1.3 Menus API

```
✅ POST   /api/menus               → Créer menu
✅ GET    /api/menus               → Lister menus
✅ PUT    /api/menus/[id]          → Modifier menu
✅ DELETE /api/menus/[id]          → Supprimer menu
✅ POST   /api/menus/[id]/activate → Activer menu (désactive les autres)
✅ PUT    /api/menus/[id]/dishes   → Ajouter/Retirer plats du menu
```

### 1.4 Assets API (Upload Images)

```
✅ POST   /api/upload              → Upload image vers Hygraph
✅ DELETE /api/assets/[id]         → Supprimer asset
```

### 1.5 Reservations API

```
✅ GET    /api/reservations        → Lister réservations
✅ PUT    /api/reservations/[id]   → Modifier statut
✅ DELETE /api/reservations/[id]   → Supprimer réservation
```

---

## 📋 Phase 2 : Interface Admin (Frontend)

### 2.1 Gestion des Catégories

**Écran Liste :**

- ✅ Tableau avec toutes les catégories
- ✅ Bouton "Nouvelle Catégorie"
- ✅ Actions : Modifier, Supprimer

**Modal Création/Édition :**

```jsx
- Nom (input text)
- Slug (auto-généré)
- Description (textarea)
- Ordre (number)
- Icône (emoji picker ou input)
- Image (upload)
```

### 2.2 Gestion des Plats

**Écran Liste :**

- ✅ Tableau avec tous les plats
- ✅ Filtres par catégorie
- ✅ Bouton "Nouveau Plat"
- ✅ Actions : Modifier, Supprimer, Dupliquer

**Modal Création/Édition :**

```jsx
- Nom (input text)
- Slug (auto-généré)
- Description (textarea rich)
- Prix (number avec €)
- Catégorie (select dropdown)
- Disponible (toggle)
- Image (upload avec preview)
```

### 2.3 Gestion des Menus

**Écran Liste :**

- ✅ Cards avec tous les menus
- ✅ Badge "Actif" sur le menu actif
- ✅ Bouton "Nouveau Menu"
- ✅ Actions : Modifier, Activer, Supprimer

**Modal Création/Édition :**

```jsx
- Nom (input text)
- Slug (auto-généré)
- Description (textarea)
- Dates (date picker start/end - optionnel)
- Sélection des plats :
  * Liste de tous les plats
  * Drag & drop ou checkboxes
  * Aperçu du menu
```

### 2.4 Générateur QR Code (Déjà fait)

- ✅ Sélection du menu
- ✅ QR code dynamique
- ✅ Téléchargement

### 2.5 Gestion des Réservations

**Écran Liste :**

- ✅ Tableau avec filtres (date, statut)
- ✅ Badges de couleur selon statut
- ✅ Actions : Confirmer, Annuler, Supprimer

---

## 📋 Phase 3 : Composants Réutilisables

### 3.1 Composants UI

```
✅ Modal (base)
✅ FormInput (text, textarea, number)
✅ FormSelect (dropdown)
✅ FormToggle (switch)
✅ ImageUpload (drag & drop)
✅ EmojiPicker
✅ ConfirmDialog
✅ Toast/Notification
✅ LoadingSpinner
```

### 3.2 Hooks Custom

```
✅ useCategories() → CRUD catégories
✅ useDishes() → CRUD plats
✅ useMenus() → CRUD menus
✅ useUpload() → Upload images
✅ useToast() → Notifications
```

---

## 📋 Phase 4 : Fonctionnalités Avancées

### 4.1 Upload d'Images

- ✅ Drag & drop
- ✅ Preview avant upload
- ✅ Compression automatique
- ✅ Upload vers Hygraph Assets
- ✅ Gestion des erreurs

### 4.2 Validation

- ✅ Validation côté client (Zod/Yup)
- ✅ Validation côté serveur
- ✅ Messages d'erreur clairs

### 4.3 UX/UI

- ✅ Loading states
- ✅ Messages de succès/erreur (toasts)
- ✅ Confirmations avant suppression
- ✅ Animations fluides

### 4.4 Sécurité

- ✅ Authentification admin (simple password pour commencer)
- ✅ Protection des routes API
- ✅ Rate limiting sur uploads

---

## 🗓️ Planning Estimé

### Jour 1-2 : Backend (Routes API)

- ⏰ 4-6h : Toutes les routes API
- ⏰ 2h : Tests et debug

### Jour 3-4 : Frontend (Composants)

- ⏰ 4h : Composants UI réutilisables
- ⏰ 4h : Hooks custom

### Jour 5-6 : Frontend (Pages Admin)

- ⏰ 3h : Gestion catégories
- ⏰ 4h : Gestion plats
- ⏰ 3h : Gestion menus

### Jour 7 : Finitions

- ⏰ 2h : Upload images
- ⏰ 2h : Tests complets
- ⏰ 2h : Documentation

**Total : ~30-35h de dev**

---

## 🎯 Stack Technique

### Backend

- ✅ Next.js App Router API Routes
- ✅ Hygraph GraphQL API (mutations)
- ✅ Type-safe avec TypeScript

### Frontend

- ✅ React 19
- ✅ Tailwind CSS + DaisyUI
- ✅ React Hook Form (formulaires)
- ✅ Zod (validation)
- ✅ React Query ou SWR (cache)

### Upload

- ✅ Hygraph Asset API
- ✅ Browser File API
- ✅ Image compression (browser-image-compression)

---

## 🔐 Authentification Simple (Phase 1)

Pour commencer, une auth simple avec password :

```env
ADMIN_PASSWORD=votre_mot_de_passe_secret
```

Page `/admin/login` :

- Input password
- Session stockée dans cookie httpOnly
- Middleware pour protéger `/admin/*`

**Plus tard :**

- NextAuth.js pour multi-users
- Rôles (admin, manager, serveur)
- 2FA optionnel

---

## 📚 Documentation à Créer

```
✅ README-ADMIN-API.md → Documentation des routes API
✅ README-ADMIN-UI.md → Guide utilisation interface
✅ HYGRAPH-MUTATIONS.md → Liste des mutations Hygraph
✅ DEPLOYMENT-ADMIN.md → Déploiement avec auth
```

---

## ✅ Critères de Succès

Le client doit pouvoir :

1. ✅ Créer une catégorie avec icône et image
2. ✅ Créer un plat avec photo
3. ✅ Créer un menu et y ajouter des plats
4. ✅ Activer un menu (désactive les autres automatiquement)
5. ✅ Générer le QR code
6. ✅ Voir et gérer les réservations

**SANS JAMAIS aller sur Hygraph !**

---

## 🚀 On Démarre ?

Je te propose de commencer par :

1. Routes API (Backend) - Le plus critique
2. Upload d'images
3. Interface admin

Tu es d'accord avec ce plan ? Des modifications à apporter ?
