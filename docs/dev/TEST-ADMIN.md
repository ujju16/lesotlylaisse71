# ✅ TEST ADMIN - Guide de Test Complet

## 🎯 Serveur Dev Fonctionne !

```bash
npm run dev
# ✓ Ready in ~1.4s
# → http://localhost:3001
```

---

## 📋 Checklist Tests Page Categories

### 1. Accéder à la page

```
URL: http://localhost:3001/admin/categories
```

**Attendu :**

- ✅ Layout admin avec navigation
- ✅ Header "Catégories"
- ✅ Bouton "Nouvelle Catégorie"
- ✅ Grid vide ou avec catégories existantes

---

### 2. Créer une Catégorie

**Action :** Cliquer sur "Nouvelle Catégorie"

**Attendu :**

- ✅ Modal s'ouvre
- ✅ Formulaire avec tous les champs :
  - Nom
  - Description
  - Ordre
  - Icône
  - Image (drag & drop zone)

**Test 1 : Créer catégorie simple**

```
Nom: Entrées
Description: Nos délicieuses entrées
Ordre: 1
Icône: 🥗
```

**Attendu :**

- ✅ Toast de succès "Catégorie créée"
- ✅ Modal se ferme
- ✅ Nouvelle card apparaît dans la grille
- ✅ Slug auto-généré : "entrees"

---

### 3. Upload Image

**Action :** Créer catégorie avec image

**Test :**

1. Cliquer "Nouvelle Catégorie"
2. Remplir le formulaire
3. Drag & drop une image (ou cliquer pour parcourir)
4. Voir la preview
5. Sauvegarder

**Attendu :**

- ✅ Image uploadée vers Hygraph
- ✅ Preview affichée pendant upload
- ✅ Loader pendant compression
- ✅ Toast succès
- ✅ Image affichée sur la card

---

### 4. Modifier une Catégorie

**Action :** Cliquer sur une catégorie existante

**Attendu :**

- ✅ Modal s'ouvre avec données pré-remplies
- ✅ Champs éditables
- ✅ Image actuelle affichée (si existe)

**Test :**

1. Modifier le nom : "Entrées" → "Nos Entrées"
2. Changer l'icône : 🥗 → 🍽️
3. Sauvegarder

**Attendu :**

- ✅ Toast "Catégorie modifiée"
- ✅ Card mise à jour immédiatement
- ✅ Pas de rechargement de page

---

### 5. Supprimer une Catégorie

**Action :** Cliquer icône poubelle sur une card

**Attendu :**

- ✅ Dialog de confirmation s'affiche
- ✅ Message : "Êtes-vous sûr de vouloir supprimer..."

**Test Annulation :**

- Cliquer "Annuler"
- ✅ Dialog se ferme
- ✅ Catégorie toujours présente

**Test Confirmation :**

- Cliquer "Supprimer"
- ✅ Toast "Catégorie supprimée"
- ✅ Card disparaît immédiatement

---

### 6. Tests d'Erreur

**Test 1 : Champ vide**

```
Action: Créer catégorie sans nom
Attendu: Validation HTML5 ou message d'erreur
```

**Test 2 : Upload fichier trop gros**

```
Action: Upload image > 5MB
Attendu: Compression automatique
```

**Test 3 : Hygraph indisponible**

```
Action: Token invalide dans .env.local
Attendu: Toast d'erreur avec message explicite
```

---

## 🎨 Tests Visuels

### Layout & Responsive

**Desktop (>1024px) :**

- ✅ Grid 3 colonnes
- ✅ Cards espacées uniformément
- ✅ Navigation latérale visible

**Tablet (768-1023px) :**

- ✅ Grid 2 colonnes
- ✅ Navigation collapse

**Mobile (<768px) :**

- ✅ Grid 1 colonne
- ✅ Modal plein écran
- ✅ Boutons adaptés au touch

### Material Design

**Colors :**

- ✅ Primary: #795548 (brun)
- ✅ Secondary: #689F38 (vert)
- ✅ Accent: #FFB300 (ambre)

**Shadows :**

- ✅ Cards avec elevation
- ✅ Modal avec backdrop

**Animations :**

- ✅ Modal fade in/out
- ✅ Toast slide in/out
- ✅ Hover effects sur cards

---

## 🔍 Tests API

### GET /api/categories

```bash
curl http://localhost:3001/api/categories
```

**Attendu :**

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Entrées",
      "slug": "entrees",
      "order": 1,
      "icon": "🥗"
    }
  ]
}
```

### POST /api/categories

```bash
curl -X POST http://localhost:3001/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Desserts",
    "slug": "desserts",
    "order": 3,
    "icon": "🍰"
  }'
```

**Attendu :**

```json
{
  "success": true,
  "data": { "id": "...", "name": "Desserts" },
  "message": "Catégorie créée"
}
```

### PUT /api/categories/[id]

```bash
curl -X PUT http://localhost:3001/api/categories/[ID] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nos Desserts",
    "order": 4
  }'
```

### DELETE /api/categories/[id]

```bash
curl -X DELETE http://localhost:3001/api/categories/[ID]
```

---

## 📊 Tests Performance

### Build Time

```bash
npm run build
```

**Objectif :** < 15 secondes

### Dev Server Startup

```bash
npm run dev
```

**Objectif :** < 2 secondes

### Page Load

**Objectif :**

- First Contentful Paint: < 1s
- Time to Interactive: < 2s

---

## 🐛 Bugs Connus

### Résolu ✅

- ~~CSS picker pseudo-element~~ → DaisyUI 5.3.9
- ~~Top-level await~~ → Import standard
- ~~Next.js 15 params~~ → Promise<>

### À surveiller ⚠️

- Upload images > 10MB (compression)
- Hygraph rate limiting (si beaucoup de requêtes)

---

## ✅ Critères de Succès

**Must Have :**

- ✅ CRUD complet fonctionne
- ✅ Upload images vers Hygraph
- ✅ Toast notifications
- ✅ Confirmations suppression
- ✅ Responsive

**Nice to Have :**

- ✅ Auto-génération slug
- ✅ Compression images
- ✅ Material Design
- ✅ Loading states

---

## 🚀 Prochains Tests

Une fois Dishes & Menus créés :

1. **Test Dishes**
   - Sélection catégorie
   - Prix formaté €
   - Toggle disponibilité

2. **Test Menus**
   - Sélection multi-plats
   - Activation exclusive
   - Dates de validité

3. **Test Intégration**
   - QR code génération
   - Menu public avec QR
   - Admin complet

---

**🎯 Pour tester maintenant :**

```bash
npm run dev
# → http://localhost:3001/admin/categories
```

**Crée 2-3 catégories avec images pour valider !** ✅
