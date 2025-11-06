# 🔐 Questions sur les Tokens - Réponses

## ❓ Questions Posées

> **"Est-ce que je dois mettre le HYGRAPH_TOKEN dans les secrets sur Vercel et GitHub ?"**

**Réponse : ✅ OUI, c'est déjà fait !**

---

## ✅ Ce qui est DÉJÀ Configuré

### 1. GitHub Secrets ✅

```
✅ HYGRAPH_TOKEN (mis à jour il y a 11 minutes)
✅ NEXT_PUBLIC_HYGRAPH_URL (configuré)
✅ CODECOV_TOKEN
✅ VERCEL_TOKEN + IDs
```

**Utilisé par** : Workflows CI/CD (build, tests, Lighthouse)

### 2. Vercel Environment Variables ✅

```
✅ HYGRAPH_TOKEN (Production)
✅ NEXT_PUBLIC_HYGRAPH_URL (Production, Preview, Development)
```

**Utilisé par** : Déploiements Vercel (build et runtime)

### 3. Local .env.local ✅

```bash
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/...
HYGRAPH_TOKEN=eyJhbGci...
CODECOV_TOKEN=24e1e82f...
```

**Utilisé par** : Développement local (`bun run dev`)

**⚠️ Important** : Le fichier `.env.local` n'est PAS commité (dans .gitignore)

---

## ❓ "Les dishes et leon ne les utilisent pas ?"

**Je pense que vous parlez des plats (dishes) et du menu (menu).**

### Réponse :

**Les ROUTES API utilisent déjà HYGRAPH_TOKEN** ✅

Voici les routes qui utilisent le token Hygraph :

```typescript
// Ces routes API existent déjà et utilisent HYGRAPH_TOKEN
✅ /api/categories     → CRUD catégories (utilise Hygraph)
✅ /api/dishes         → CRUD plats (utilise Hygraph)
✅ /api/menus          → CRUD menus (utilise Hygraph)
✅ /api/upload         → Upload images (utilise Hygraph Assets API)
```

### Comment ça fonctionne ?

1. **Dans le code** (`lib/hygraph.ts` par exemple) :

```typescript
import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL!, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});
```

2. **Les routes API** utilisent ce client pour faire des mutations :

```typescript
// Exemple: créer un plat
await hygraph.request(mutation, variables);
```

3. **Le token est automatiquement injecté** depuis les variables d'environnement

---

## 🎯 Ce qu'il faut comprendre

### Token HYGRAPH_TOKEN

- **But** : Permet de faire des mutations (Create, Update, Delete) sur Hygraph
- **Où** : GitHub Secrets + Vercel + .env.local
- **Utilisé par** : Routes API, Build process, CI/CD

### URL NEXT_PUBLIC_HYGRAPH_URL

- **But** : L'endpoint GraphQL de votre projet Hygraph
- **Où** : GitHub Secrets + Vercel + .env.local
- **Pourquoi PUBLIC** : Peut être exposé côté client (pour les queries READ)

### Token CODECOV_TOKEN

- **But** : Envoyer les rapports de coverage de tests
- **Où** : GitHub Secrets + .env.local
- **Utilisé par** : CI/CD workflows uniquement

---

## ⚠️ IMPORTANT : Prochaine Étape

**Les routes API existent et sont configurées, MAIS...**

❌ **Les SCHÉMAS n'existent pas encore sur Hygraph !**

### Vous devez créer manuellement sur Hygraph :

1. **Schéma Category** (catégories de plats)
2. **Schéma MenuItem** (plats individuels - "dishes")
3. **Schéma Menu** (menus composés - "menus")

**Guide complet** : `docs/dev/guides/HYGRAPH_CONFIGURATION.md`

### Sans ces schémas :

- ❌ Les routes API vont retourner des erreurs (champs introuvables)
- ❌ On ne pourra pas créer/modifier de plats ou menus
- ❌ L'interface admin ne fonctionnera pas

### Avec ces schémas :

- ✅ Les routes API fonctionneront immédiatement
- ✅ On pourra développer l'interface admin
- ✅ Le système CRUD sera opérationnel

---

## 📋 Checklist Sécurité

- [x] HYGRAPH_TOKEN dans GitHub Secrets
- [x] HYGRAPH_TOKEN dans Vercel (Production)
- [x] NEXT_PUBLIC_HYGRAPH_URL partout
- [x] .env.local dans .gitignore
- [x] Aucun token dans le code
- [x] GitGuardian actif pour scan
- [ ] **Schémas Hygraph à créer** ← PROCHAINE ÉTAPE

---

## 🎯 En Résumé

### Tokens ✅ Déjà Configurés

- HYGRAPH_TOKEN : ✅ GitHub + Vercel + Local
- NEXT_PUBLIC_HYGRAPH_URL : ✅ GitHub + Vercel + Local
- CODECOV_TOKEN : ✅ GitHub + Local

### Routes API ✅ Créées

- /api/categories (CRUD)
- /api/dishes (CRUD)
- /api/menus (CRUD)
- /api/upload (Assets)

### Hygraph Schémas ❌ À Créer

- Category (catégories)
- MenuItem (plats/dishes)
- Menu (menus)

**→ Suivre le guide : `docs/dev/guides/HYGRAPH_CONFIGURATION.md`**

---

## 💡 Note sur les Noms

**"dishes"** = plats individuels (MenuItem dans Hygraph)  
**"menu"** = menu composé de plusieurs plats (Menu dans Hygraph)  
**"leon"** = ? (peut-être une confusion ? Si c'est pour "menu", voir ci-dessus)

Les routes API utilisent bien Hygraph pour gérer les plats (dishes) et menus !

---

**Questions ?** Consultez :

- Guide Hygraph : `docs/dev/guides/HYGRAPH_CONFIGURATION.md`
- Guide Admin : `docs/dev/admin/README.md`
- Résumé rapide : `QUICK_STATUS.md`
