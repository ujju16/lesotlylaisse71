# 🚀 Guide Rapide - Continuer le Développement Admin

## 🎯 État Actuel du Projet

### ✅ Ce qui Fonctionne

- Layout admin avec Material-UI (dark/light mode)
- Dashboard avec statistiques
- Navigation responsive
- CI/CD pipeline complet
- Déploiements Vercel automatiques

### ⚠️ Ce qui Nécessite une Action

1. **HYGRAPH_TOKEN** - Permissions insuffisantes pour champ `image`
2. **Domain** - lesotlylaisse71.fr non configuré
3. **Auth** - Page de connexion pas encore créée

## 🔧 Setup Rapide (Pour Nouvelle Session)

### 1. Démarrer le Serveur de Dev

```bash
# Nettoyer les processus existants
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Démarrer le serveur
bun run dev

# Ou avec legacy mode (sans Turbopack)
bun run dev:legacy
```

### 2. Accéder aux Pages

- **Homepage**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Catégories**: http://localhost:3000/admin/categories
- **Plats**: http://localhost:3000/admin/dishes
- **Menus**: http://localhost:3000/admin/menus
- **QR Code**: http://localhost:3000/admin/qrcode

### 3. Vérifier les Checks Quality

```bash
# Formatter le code
bun run format

# Linter
bun run lint

# Type checking
bun run type-check

# Tests
bun run test

# Tout en un
bun run quality
```

### 4. Créer une Nouvelle Feature

```bash
# Créer une branche depuis dev
git checkout dev
git pull origin dev
git checkout -b feature/nom-de-la-feature

# Développer...

# Commit et push
git add .
git commit -m "feat: description de la feature"
git push origin feature/nom-de-la-feature

# Créer une PR
gh pr create --base dev --head feature/nom-de-la-feature \
  --title "feat: Description" \
  --body "## Description\n\n- Point 1\n- Point 2"
```

## 📋 Prochaines Tâches Prioritaires

### 🔴 URGENT: Fix Hygraph Permissions

**Problème**: Erreur 403 sur champ `image` dans catégories

**Solution**:

1. Aller sur https://app.hygraph.com/
2. Project Settings → API Access → Permanent Auth Tokens
3. Éditer ou créer un token avec permissions:
   - ✅ Read: Content (ALL)
   - ✅ Read: Assets
   - ✅ Create/Update/Delete: Content
4. Copier le nouveau token
5. Mettre à jour:

   ```bash
   # Local
   echo "HYGRAPH_TOKEN=nouveau_token" >> .env.local

   # GitHub
   gh secret set HYGRAPH_TOKEN --body "nouveau_token"

   # Vercel (via dashboard ou CLI)
   vercel env add HYGRAPH_TOKEN
   # Coller le token quand demandé
   ```

### 🟡 Créer la Page d'Authentification

**Fichier**: `app/auth/login/page.tsx`

**Features**:

- Formulaire avec React Hook Form + Zod
- Design Material-UI moderne
- Dark mode support
- Animations d'entrée
- Validation en temps réel
- ARIA labels complets

**Template**:

```tsx
"use client";

import { Box, Card, CardContent, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    // TODO: Implémenter authentification
    console.log(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", m: 2 }}>
        <CardContent>{/* Formulaire ici */}</CardContent>
      </Card>
    </Box>
  );
}
```

### 🟢 CRUD Catégories - Liste

**Fichier**: `app/admin/categories/page.tsx`

**Features**:

- DataGrid Material-UI
- Bouton "Nouvelle Catégorie"
- Actions: Éditer, Supprimer
- Recherche et filtres
- Tri par colonnes
- Pagination

**API à utiliser**:

- GET `/api/categories` - Liste
- POST `/api/categories` - Créer
- PUT `/api/categories/[id]` - Modifier
- DELETE `/api/categories/[id]` - Supprimer

### 🟢 Modal Création Catégorie

**Component**: `components/admin/CategoryForm.tsx`

**Champs**:

- Nom (required)
- Slug (auto-généré)
- Description (optional)
- Ordre (number)
- Icône (select Material Icons)
- Image (upload vers Hygraph Assets)

**Validation Zod**:

```typescript
const categorySchema = z.object({
  name: z.string().min(1, "Nom requis").max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug invalide"),
  description: z.string().max(500).optional(),
  order: z.number().int().min(0),
  icon: z.string().optional(),
});
```

## 🎨 Design Patterns à Suivre

### 1. Structure des Composants Admin

```
components/admin/
├── forms/
│   ├── CategoryForm.tsx
│   ├── DishForm.tsx
│   └── MenuForm.tsx
├── lists/
│   ├── CategoryList.tsx
│   ├── DishList.tsx
│   └── MenuList.tsx
├── modals/
│   ├── CategoryModal.tsx
│   ├── DishModal.tsx
│   └── MenuModal.tsx
└── shared/
    ├── AdminTable.tsx
    ├── ConfirmDialog.tsx
    └── ToastNotification.tsx
```

### 2. Pattern Modal avec Material-UI

```tsx
<Dialog
  open={open}
  onClose={onClose}
  maxWidth="md"
  fullWidth
  aria-labelledby="modal-title"
>
  <DialogTitle id="modal-title">Titre</DialogTitle>
  <DialogContent>{/* Formulaire */}</DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Annuler</Button>
    <Button variant="contained" onClick={handleSubmit}>
      Enregistrer
    </Button>
  </DialogActions>
</Dialog>
```

### 3. Pattern API Route

```typescript
// app/api/categories/route.ts
export async function GET() {
  try {
    const data = await hygraphClient.request(query);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
```

### 4. Pattern Toast Notification

```typescript
// Utiliser le ToastProvider déjà en place
import { useToast } from "@/components/admin/ToastProvider";

const { showToast } = useToast();

showToast("Catégorie créée avec succès", "success");
showToast("Erreur lors de la création", "error");
```

## 🧪 Testing Strategy

### 1. Tests Unitaires (Jest + Testing Library)

```bash
# Créer un test
touch app/admin/__tests__/page.test.tsx

# Lancer les tests
bun run test

# Avec coverage
bun run test:coverage
```

### 2. Template Test Composant

```tsx
import { render, screen } from "@testing-library/react";
import AdminDashboard from "../AdminDashboard";

describe("AdminDashboard", () => {
  it("displays stats correctly", () => {
    render(<AdminDashboard stats={{ categories: 5, dishes: 10, menus: 2 }} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
```

## 📚 Ressources Utiles

### Documentation

- **Material-UI Components**: https://mui.com/material-ui/all-components/
- **React Hook Form**: https://react-hook-form.com/
- **Zod Validation**: https://zod.dev/
- **Next.js App Router**: https://nextjs.org/docs/app
- **Hygraph GraphQL**: https://hygraph.com/docs/api-reference/basics/queries

### Exemples de Code

- **Material-UI Templates**: https://mui.com/material-ui/getting-started/templates/
- **Dashboard Examples**: https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates

### Outils Dev

- **React DevTools**: Extension Chrome/Firefox
- **GraphQL Playground**: Pour tester queries Hygraph
- **Vercel CLI**: `vercel dev` pour tester en local

## 🔍 Debug Checklist

Si quelque chose ne fonctionne pas:

### Build Errors

```bash
# Nettoyer le cache
rm -rf .next
bun run build
```

### CSS ne s'applique pas

```bash
# Vérifier que ThemeProvider est au bon niveau
# Vérifier les conflits Tailwind/MUI
# Inspecter l'élément dans DevTools
```

### API ne répond pas

```bash
# Vérifier .env.local
cat .env.local | grep HYGRAPH

# Tester avec curl
curl -H "Authorization: Bearer $HYGRAPH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ categories { id name } }"}' \
  $NEXT_PUBLIC_HYGRAPH_URL
```

### TypeScript Errors

```bash
# Régénérer les types
bun run type-check

# Nettoyer le cache
rm -rf .next tsconfig.tsbuildinfo
```

## 💡 Tips & Tricks

### 1. Hot Reload Lent

```bash
# Utiliser Turbopack (déjà configuré)
bun run dev  # Utilise --turbopack automatiquement
```

### 2. Console Logs en Dev

```typescript
// Utiliser debugger; au lieu de console.log
if (process.env.NODE_ENV === "development") {
  debugger; // Breakpoint automatique
}
```

### 3. Validation Zod Réutilisable

```typescript
// lib/validations/admin.ts
export const categorySchema = z.object({...});
export const dishSchema = z.object({...});
export const menuSchema = z.object({...});
```

### 4. Mutations Hygraph avec Cache Invalidation

```typescript
// Après mutation, invalider le cache
await mutate();
router.refresh(); // Force re-fetch Server Components
```

## 🎯 Objectif de la Prochaine Session

1. ✅ Fix Hygraph token permissions
2. ✅ Créer page auth/login avec Material-UI
3. ✅ Implémenter CRUD catégories (liste + modal create)
4. ✅ Tests unitaires pour les nouveaux composants
5. ✅ Merge dans main via PR

**Temps estimé**: 3-4 heures

---

Bonne continuation! 🚀
