# 🎯 Phase 2 - Implémentation Interface Admin

## ✅ État Actuel (FAIT)

### Pages Admin

#### 1. Dashboard (`/admin`)

- ✅ Statistiques en temps réel (Categories, Plats, Menus)
- ✅ Cards de navigation rapide
- ✅ Design avec DaisyUI

#### 2. Gestion Catégories (`/admin/categories`)

- ✅ Liste en grille avec images
- ✅ Modal création/édition
- ✅ Upload d'images avec preview
- ✅ Génération automatique de slug
- ✅ Drag & drop images
- ✅ Confirmation de suppression
- ✅ Toast notifications

#### 3. Gestion Plats (`/admin/dishes`)

- ✅ Liste en grille avec filtres
- ✅ Modal création/édition complète
- ✅ Upload d'images
- ✅ Sélection catégorie
- ✅ Badges végétarien/vegan/sans gluten
- ✅ Prix avec formatage €
- ✅ Gestion disponibilité
- ✅ Gestion allergènes

#### 4. Gestion Menus (`/admin/menus`)

- ✅ Liste des menus avec badge actif
- ✅ Modal création/édition
- ✅ Gestion dates (début/fin)
- ✅ Modal sélection plats avec checkboxes
- ✅ Compteur de plats sélectionnés
- ✅ Activation/Désactivation automatique
- ✅ Aperçu des plats dans le menu

### Composants Réutilisables

#### UI Components

- ✅ `Modal.tsx` - Modal générique
- ✅ `ConfirmDialog.tsx` - Dialog de confirmation
- ✅ `ToastProvider.tsx` - Système de notifications

#### Hooks Custom

- ✅ `useCategories.ts` - CRUD catégories
- ✅ `useDishes.ts` - CRUD plats
- ✅ `useMenus.ts` - CRUD menus
- ✅ `useUpload.ts` - Upload images Hygraph

### Routes API (Backend)

- ✅ `/api/categories` (GET, POST)
- ✅ `/api/categories/[id]` (PUT, DELETE)
- ✅ `/api/dishes` (GET, POST)
- ✅ `/api/dishes/[id]` (PUT, DELETE)
- ✅ `/api/menus` (GET, POST)
- ✅ `/api/menus/[id]` (PUT, DELETE)
- ✅ `/api/menus/[id]/activate` (POST)
- ✅ `/api/upload` (POST)

---

## 🚀 Améliorations Phase 2 (À FAIRE)

### 1. Accessibilité ARIA

- [ ] Ajouter `aria-label` sur tous les boutons icônes
- [ ] `role="dialog"` sur les modals
- [ ] `aria-live` sur les toasts
- [ ] Navigation clavier complète
- [ ] Focus trap dans les modals
- [ ] `aria-describedby` pour les champs de formulaire

### 2. Optimisations UX

#### A. Gestion des Plats

- [ ] Filtre par catégorie (dropdown)
- [ ] Recherche par nom
- [ ] Tri (nom, prix, date création)
- [ ] Pagination si > 20 plats
- [ ] Bouton "Dupliquer" un plat

#### B. Gestion des Menus

- [ ] Drag & drop pour réorganiser les plats
- [ ] Prévisualisation du menu en temps réel
- [ ] Export PDF du menu
- [ ] Statistiques du menu (nb plats par catégorie)

#### C. Dashboard

- [ ] Graphiques (Chart.js ou Recharts)
- [ ] Dernières modifications
- [ ] Activité récente
- [ ] Statistiques avancées (plats les plus populaires)

### 3. Composants Manquants

#### A. FormInput Components

```typescript
// components/admin/ui/FormInput.tsx
-TextInput -
  NumberInput -
  TextArea -
  Select -
  DatePicker -
  Toggle / Switch -
  FileUpload;
```

#### B. ImageUpload Amélioré

```typescript
// components/admin/ui/ImageUpload.tsx
- [ ] Drag & drop zone visuellement clair
- [ ] Compression automatique avant upload
- [ ] Preview avec zoom
- [ ] Crop image
- [ ] Support multi-upload
```

#### C. DataTable Component

```typescript
// components/admin/ui/DataTable.tsx
- [ ] Tri par colonne
- [ ] Filtres
- [ ] Pagination
- [ ] Actions bulk
- [ ] Export CSV
```

### 4. Validation & Sécurité

#### A. Validation Formulaires

- [ ] Intégrer Zod schemas
- [ ] Validation en temps réel
- [ ] Messages d'erreur contextuels
- [ ] Validation côté serveur renforcée

#### B. Authentification Admin

- [ ] Page `/admin/login`
- [ ] Middleware protection routes
- [ ] Session management (cookies httpOnly)
- [ ] Rate limiting tentatives login
- [ ] 2FA optionnel

### 5. Performance

#### A. Caching

- [ ] SWR pour cache côté client
- [ ] Revalidation automatique
- [ ] Optimistic updates
- [ ] Cache Hygraph côté serveur

#### B. Optimisation Images

- [ ] Next.js Image avec blur placeholder
- [ ] Lazy loading
- [ ] Responsive images (srcset)
- [ ] WebP/AVIF auto

### 6. Fonctionnalités Avancées

#### A. QR Code Generator

- [ ] Page dédiée `/admin/qrcode`
- [ ] Sélection du menu
- [ ] Personnalisation QR (couleurs, logo)
- [ ] Téléchargement PNG/SVG
- [ ] Historique des QR codes générés

#### B. Gestion Réservations

- [ ] Page `/admin/reservations`
- [ ] Tableau avec filtres (date, statut)
- [ ] Changement de statut
- [ ] Notifications par email
- [ ] Export CSV

#### C. Analytics

- [ ] Statistiques de consultation menu
- [ ] Plats les plus vus
- [ ] Taux de conversion réservations
- [ ] Dashboard analytics

---

## 📋 Plan d'Action Immédiat

### Priorité 1 (Cette semaine)

1. **ARIA & Accessibilité** - Passer Lighthouse à 100%
2. **Validation Zod** - Sécuriser tous les formulaires
3. **Authentification** - Protéger l'admin
4. **QR Code Generator** - Compléter la fonctionnalité

### Priorité 2 (Semaine prochaine)

1. **Filtres & Recherche** - Améliorer UX plats/menus
2. **Drag & Drop** - Réorganiser plats dans menus
3. **Export PDF** - Générer PDF des menus
4. **Gestion Réservations** - Interface complète

### Priorité 3 (Future)

1. **Analytics Dashboard** - Statistiques avancées
2. **Multi-langue** - i18n admin
3. **Dark Mode** - Toggle thème
4. **Notifications Push** - Réservations en temps réel

---

## 🎨 Composants à Créer

### 1. FormInput Component

```tsx
// app/components/admin/ui/FormInput.tsx
interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

export function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
        {props.required && <span className="text-error">*</span>}
      </label>
      <input
        className={`input input-bordered ${error ? "input-error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.name}-error` : undefined}
        {...props}
      />
      {error && (
        <label className="label">
          <span
            className="label-text-alt text-error"
            id={`${props.name}-error`}
          >
            {error}
          </span>
        </label>
      )}
    </div>
  );
}
```

### 2. ImageUpload Component

```tsx
// app/components/admin/ui/ImageUpload.tsx
interface ImageUploadProps {
  value?: string;
  onChange: (file: File) => Promise<void>;
  loading?: boolean;
  accept?: string;
  maxSize?: number; // MB
}

export function ImageUpload({ value, onChange, loading }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Drag & drop handlers
  // Compression avec browser-image-compression
  // Preview avec zoom
  // ...
}
```

### 3. DataTable Component

```tsx
// app/components/admin/ui/DataTable.tsx
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: keyof T) => void;
  onFilter?: (filters: Partial<T>) => void;
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T>({ data, columns, actions }: DataTableProps<T>) {
  // Table avec tri, filtres, pagination
  // ...
}
```

---

## 🔐 Authentification Admin

### 1. Variables d'environnement

```env
ADMIN_PASSWORD=VotreMotDePasseSecretTresLong123!
ADMIN_SESSION_SECRET=random-secret-key-32-chars-min
```

### 2. Middleware Protection

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin-session");

    if (!session && request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
```

### 3. Page Login

```tsx
// app/admin/login/page.tsx
"use client";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      // Show error
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="card bg-base-100 w-96 shadow-xl">
        {/* Login form */}
      </form>
    </div>
  );
}
```

---

## 🧪 Tests à Ajouter

### 1. Tests Unitaires

```typescript
// __tests__/admin/useCategories.test.tsx
describe("useCategories", () => {
  test("fetches categories", async () => {
    // Test fetch
  });

  test("creates category", async () => {
    // Test create
  });
});
```

### 2. Tests E2E

```typescript
// e2e/admin.spec.ts
test("admin can create category", async ({ page }) => {
  await page.goto("/admin/categories");
  await page.click("text=Nouvelle Catégorie");
  // ...
});
```

---

## 📊 Métriques de Succès

### Performance

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90

### Qualité Code

- [ ] 0 erreurs ESLint
- [ ] 0 erreurs TypeScript
- [ ] Coverage tests > 80%
- [ ] Bundle size < 200KB

### UX

- [ ] Temps de chargement initial < 2s
- [ ] Temps de réponse formulaire < 500ms
- [ ] Upload image < 3s
- [ ] Navigation fluide (60 FPS)

---

## 🎯 Conclusion Phase 2

La Phase 2 est **fonctionnelle** mais peut être **améliorée** sur :

1. Accessibilité ARIA
2. Validation formulaires
3. Authentification
4. UX (filtres, recherche, drag & drop)
5. Fonctionnalités avancées (QR, Analytics)

**Estimation pour compléter Phase 2 : 10-15h**

Priorité : **ARIA + Authentification + QR Code** = **5h**
