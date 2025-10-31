# 🎯 Code Quality Tools

## 📦 Outils Installés

### 1. **Prettier** - Formatage automatique

```bash
# Formater tout le code
npm run format

# Vérifier le formatage
npm run format:check
```

### 2. **ESLint** - Analyse statique

```bash
# Linter le code
npm run lint

# Fix automatique
npm run lint:fix
```

### 3. **TypeScript** - Vérification des types

```bash
# Vérifier les types
npm run type-check
```

### 4. **Tout en une fois** ✨

```bash
# Format + Lint + Type check
npm run quality
```

---

## 🔧 Configuration

### Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### ESLint (`eslint.config.mjs`)

- TypeScript strict
- Next.js rules
- React hooks
- Prettier integration
- Custom rules (warnings au lieu d'errors)

---

## 🎨 Règles Principales

### TypeScript

- ⚠️ `no-explicit-any` → Warning (pas bloquant)
- ⚠️ `no-unused-vars` → Warning (sauf `_` prefix)

### React

- ⚠️ `no-img-element` → Warning (utiliser `<Image />` de Next.js)
- ⚠️ `exhaustive-deps` → Warning (hooks dependencies)

### Général

- ⚠️ `no-console` → Warning (sauf `console.warn/error`)

---

## 🚀 Utilisation

### Pendant le développement

```bash
# Formater un fichier
npm run format -- app/admin/categories/page.tsx

# Linter un dossier
npm run lint -- app/api
```

### Avant commit

```bash
# Vérifier la qualité complète
npm run quality
```

### Auto-format dans VSCode

Installer extension: **Prettier - Code formatter**

`.vscode/settings.json` :

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 📊 Standards de Code

### Nommage

- **Composants** : PascalCase (`Modal.tsx`)
- **Hooks** : camelCase avec `use` (`useCategories.ts`)
- **Utilities** : camelCase (`formatDate.ts`)
- **Constants** : UPPER_SNAKE_CASE (`API_URL`)

### Structure fichier

```tsx
// 1. Imports externes
import { useState } from 'react';

// 2. Imports internes
import Modal from '@/components/Modal';

// 3. Types/Interfaces
interface Props { ... }

// 4. Composant
export default function Component({ ... }: Props) {
  // Hooks
  // Handlers
  // Render
}
```

### Commentaires

```tsx
// ❌ Éviter
// This function does something
function doSomething() { ... }

// ✅ Préférer
// Uploads image to Hygraph and returns asset ID
async function uploadImage(file: File): Promise<string> { ... }
```

---

## 🔍 Commandes Utiles

### Analyse

```bash
# Stats du code
npm run build -- --analyze

# Taille des bundles
npm run build && ls -lh .next/static/chunks
```

### Debug

```bash
# Build avec logs détaillés
npm run build -- --debug

# Dev avec logs
npm run dev -- --show-all
```

---

## ✅ Checklist Avant Commit

- [ ] `npm run format` → Code formaté
- [ ] `npm run lint:fix` → Pas d'erreurs ESLint
- [ ] `npm run type-check` → Pas d'erreurs TypeScript
- [ ] `npm run build` → Build successful
- [ ] Tests manuels → Fonctionnalités OK

Ou simplement :

```bash
npm run quality && npm run build
```

---

## 🎯 Métriques Qualité

### Objectifs

- ✅ 0 erreurs TypeScript
- ✅ 0 erreurs ESLint
- ⚠️ < 10 warnings
- ✅ 100% code formaté
- ✅ Build < 15s

### État Actuel

```
TypeScript: ✅ 0 errors
ESLint: ✅ 0 warnings
Format: ✅ OK
Build: ✅ ~7s (Turbopack)
```

---

## 🐛 Problèmes Résolus

### DaisyUI v5.3.x Bug (Turbopack)

**Erreur** : `'picker' is not recognized as a valid pseudo-element`  
**Cause** : DaisyUI 5.3.x génère du CSS invalide avec `::picker(select)`  
**Solution** : Downgrade à DaisyUI v4.12.14 (version stable)

```bash
npm install daisyui@4.12.14 --save-exact
```

### Next.js 15 + Webpack + PostCSS

**Erreur** : `Module parse failed: Unexpected character '@'`  
**Cause** : package.json `"type": "module"` nécessite `.cjs` extension  
**Solution** :

```bash
mv postcss.config.js postcss.config.cjs
mv tailwind.config.js tailwind.config.cjs
```

### Dev Server

**Recommandation** : Turbopack est maintenant activé par défaut

```bash
npm run dev         # ✅ Utiliser par défaut (Turbopack)
npm run dev:legacy  # ⚠️ Webpack mode (plus lent)
```

---

## 🔄 CI/CD (Future)

GitHub Actions à créer :

```yaml
# .github/workflows/quality.yml
- Run: npm run quality
- Run: npm run build
- Upload: coverage reports
```

---

## 📚 Ressources

- [Prettier Docs](https://prettier.io/docs)
- [ESLint Rules](https://eslint.org/docs/rules)
- [TypeScript Config](https://www.typescriptlang.org/tsconfig)
- [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint)
