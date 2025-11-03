# 🎨 Nouvelle Interface Admin - Guide Complet

## ✅ Ce qui a été fait

### 1. **Framework CSS : Tailwind CSS + DaisyUI** 🎨

- ✅ **Tailwind CSS v3.4.18** installé et configuré
- ✅ **DaisyUI v5.3.10** installé (composants Material Design)
- ✅ **Thème personnalisé** "lesotly" avec votre charte graphique :
  - Primary: `#795548` (Brun café)
  - Secondary: `#689F38` (Vert lime)
  - Accent: `#FFB300` (Ambre)

**Configuration :**

- `tailwind.config.js` : Configuration complète avec palette de couleurs
- `postcss.config.js` : Configuration PostCSS
- `app/globals.css` : Intégration Tailwind + Variables CSS

### 2. **Système de QR Code Dynamique** 📱

**Fonctionnalités :**

- ✅ Génération de QR code pour un menu spécifique
- ✅ QR code dynamique pointant vers le menu actif
- ✅ Un seul QR code à imprimer qui s'adapte automatiquement
- ✅ Changez le menu actif dans Hygraph → Le QR code affiche le nouveau menu

**Comment ça marche :**

```
1. Vous créez plusieurs menus dans Hygraph
2. Vous marquez UN menu comme "actif"
3. Vous générez le QR code dynamique (/menu)
4. Les clients scannent → Voient le menu actif
5. Vous changez le menu actif dans Hygraph
6. Les clients scannent → Voient le nouveau menu
   ➡️ Pas besoin de réimprimer le QR code !
```

### 3. **Nouveaux Modèles Hygraph** 📊

#### Modèle Category (Catégorie)

```
- name: String (Nom de la catégorie)
- slug: String (URL-friendly)
- description: Text (Description)
- order: Int (Ordre d'affichage)
- icon: String (Emoji ou icône)
- image: Asset (Image optionnelle)
```

#### Modèle Menu

```
- name: String (Nom du menu)
- slug: String (URL-friendly)
- description: Text (Description)
- active: Boolean (Menu actif ou non)
- startDate: Date (Date de début - optionnel)
- endDate: Date (Date de fin - optionnel)
- dishes: Reference[] (Plats du menu)
```

#### Modification Modèle Dish

```
+ category: Reference (Lien vers Category)
  → Remplace l'ancien champ category (String)
```

### 4. **Nouvelles Queries GraphQL** 🔄

Créé dans `lib/queries-admin.ts` :

- `getCategories()` : Liste des catégories
- `createCategory()` : Créer une catégorie
- `updateCategory()` : Modifier une catégorie
- `deleteCategory()` : Supprimer une catégorie
- `getMenus()` : Liste des menus
- `getActiveMenu()` : Menu actif
- `createMenu()` : Créer un menu
- `updateMenuStatus()` : Activer/désactiver un menu
- `getDishes()` : Liste des plats (avec catégorie)
- `getReservations()` : Liste des réservations

### 5. **Documentation Complète** 📚

- ✅ `HYGRAPH_SETUP.md` : Configuration Hygraph complète
- ✅ `HYGRAPH_NEW_MODELS.md` : Nouveaux modèles à créer
- ✅ `README-ADMIN.md` : Ce fichier

---

## 🚀 Prochaines Étapes

### Étape 1 : Réinstaller les dépendances

```bash
cd /home/korndev/dev/project/lesotlylaisse71
rm -rf node_modules package-lock.json
npm install
```

**Si Tailwind n'est pas installé après :**

```bash
npm install -D tailwindcss@3.4.18 postcss autoprefixer
```

### Étape 2 : Configurer les nouveaux modèles dans Hygraph

Suivez le guide : `HYGRAPH_NEW_MODELS.md`

1. **Créer le modèle Category**
   - Champs : name, slug, description, order, icon, image
2. **Créer le modèle Menu**
   - Champs : name, slug, description, active, startDate, endDate, dishes

3. **Modifier le modèle Dish**
   - Supprimer l'ancien champ `category` (String/Enumeration)
   - Ajouter nouveau champ `category` (Reference → Category)

4. **Créer des données de test**

   ```
   Catégories :
   - Entrées (ordre: 1, icon: 🥗)
   - Plats (ordre: 2, icon: 🍖)
   - Desserts (ordre: 3, icon: 🍰)
   - Boissons (ordre: 4, icon: 🍷)

   Menu :
   - Menu de la Semaine (active: true)
   - Ajoutez vos plats au menu
   ```

### Étape 3 : Créer la nouvelle page Admin

Une fois Tailwind fonctionnel, créez `app/admin/page.tsx` avec le code dans `app/admin/page.old.tsx`

**Fonctionnalités de la page Admin :**

- 📂 Gestion des catégories (lecture depuis Hygraph)
- 📋 Gestion des menus (lecture depuis Hygraph)
- 🍴 Gestion des plats (lecture depuis Hygraph)
- 📱 Générateur de QR Code (fonctionnel)
- 📅 Visualisation des réservations

### Étape 4 : Tester

```bash
npm run dev
```

Accédez à : `http://localhost:3000/admin`

---

## 🎯 Architecture du Système de QR Code

```
┌─────────────────────────────────────────────┐
│         QR Code Imprimé sur Table          │
│                                             │
│  URL: https://lesotly.../menu              │
│  (Pointe toujours vers le menu actif)      │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│            Page /menu (Next.js)             │
│  → Appelle getActiveMenu() depuis Hygraph   │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│              Hygraph CMS                    │
│  Menus :                                    │
│  • Menu Hiver 2025 (active: false)         │
│  • Menu Printemps 2025 (active: true) ✅   │
│  • Menu Été 2025 (active: false)           │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│          Client voit le menu actif          │
│        (Menu Printemps 2025)                │
└─────────────────────────────────────────────┘
```

**Changement de menu :**

1. Allez dans Hygraph
2. Menu Printemps → `active: false`
3. Menu Été → `active: true`
4. Publiez les changements
5. Les clients scannent → Voient le Menu Été !

---

## 🎨 Design System

### Composants DaisyUI Disponibles

```jsx
// Boutons
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>

// Cards
<div className="card bg-base-200 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Content</p>
  </div>
</div>

// Badges
<div className="badge badge-primary">Badge</div>
<div className="badge badge-success">Success</div>

// Alerts
<div className="alert alert-info">
  <span>Information</span>
</div>

// Tables
<table className="table table-zebra">
  <thead><tr><th>Column</th></tr></thead>
  <tbody><tr><td>Data</td></tr></tbody>
</table>

// Tabs
<div className="tabs tabs-boxed">
  <button className="tab tab-active">Tab 1</button>
  <button className="tab">Tab 2</button>
</div>

// Loading
<span className="loading loading-spinner loading-lg"></span>

// Toggle
<input type="checkbox" className="toggle toggle-success" />
```

### Couleurs Tailwind

```css
/* Primaire (Brun) */
bg-primary text-primary border-primary

/* Secondaire (Vert) */
bg-secondary text-secondary border-secondary

/* Accent (Ambre) */
bg-accent text-accent border-accent

/* Base */
bg-base-100 (Background principal)
bg-base-200 (Background secondaire)
bg-base-300 (Background tertiaire)
```

---

## 📱 Utilisation du QR Code

### Génération

**Dans la page Admin :**

1. Onglet "QR Code"
2. Cliquez sur "Générer QR Code Dynamique"
3. Téléchargez le PNG
4. Imprimez en 10x10 cm minimum (300 DPI)

### Placement

- 📍 Centre de chaque table
- 📍 Entrée du restaurant
- 📍 Comptoir de commande
- 📍 Menu physique (verso)

### Impression

**Recommandations :**

- Format : 10x10 cm minimum
- Résolution : 300 DPI
- Support : Plastique rigide ou acrylique
- Protection : Stratifié anti-rayures
- Ajoutez texte : "Scannez pour voir notre menu"

---

## 🔒 Sécurité

### Permissions Hygraph

**Public API (sans token) :**

- ✅ Category : Read
- ✅ Menu : Read
- ✅ Dish : Read
- ✅ Reservation : Create
- ✅ Asset : Read

**Token API (avec HYGRAPH_TOKEN) :**

- ✅ Toutes permissions : Create, Read, Update, Delete, Publish

### Variables d'Environnement

**`.env.local` (ne JAMAIS commiter) :**

```env
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/...
HYGRAPH_TOKEN=eyJ...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Vercel (Production) :**
Ajoutez les mêmes variables dans `Settings → Environment Variables`

---

## 🐛 Dépannage

### Tailwind ne fonctionne pas

```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Erreur "Cannot find module 'tailwindcss'"

```bash
npm install -D tailwindcss@3.4.18 postcss autoprefixer
```

### Hygraph : "Field 'category' not found"

Vous devez migrer les données :

1. Créer le nouveau modèle Category
2. Créer les catégories
3. Modifier chaque Dish pour lier à Category
4. Supprimer l'ancien champ category

### QR Code ne s'affiche pas

Vérifiez que la bibliothèque qrcode est installée :

```bash
npm install qrcode @types/qrcode
```

---

## 📞 Support

- 📖 Documentation Hygraph : https://hygraph.com/docs
- 🎨 Documentation DaisyUI : https://daisyui.com
- 🎨 Documentation Tailwind : https://tailwindcss.com
- ⚛️ Documentation Next.js : https://nextjs.org/docs

---

## ✨ Fonctionnalités Futures

- [ ] Upload d'images directement depuis l'admin
- [ ] Édition WYSIWYG des descriptions
- [ ] Drag & drop pour réorganiser les plats
- [ ] Statistiques des scans de QR code
- [ ] Mode hors-ligne pour le menu
- [ ] Multi-langues (FR/EN)
- [ ] Gestion des allergènes
- [ ] Système de promotions
- [ ] Notifications push pour les réservations

---

**Bon courage ! 🚀**

Si tu as des questions, n'hésite pas !
