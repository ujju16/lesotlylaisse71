# 🚀 DÉPLOIEMENT - Guide Complet

## ✅ Checklist Avant Déploiement

### 1. Pull Latest Code
```bash
git checkout feature/admin-crud
git pull origin feature/admin-crud
```

### 2. Clean Install
```bash
# Supprimer tout le cache
rm -rf node_modules package-lock.json .next

# Réinstaller
npm install

# Vérifier version DaisyUI
npm list daisyui
# → daisyui@5.3.8 ✅
```

### 3. Configuration Environnement

Créer `.env.local` :
```env
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=<TON_TOKEN>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Test Local
```bash
# Dev server
npm run dev
# → http://localhost:3000

# Build test
npm run build
npm start
```

---

## 🐛 Problèmes Courants & Solutions

### Problème 1 : Bug DaisyUI Picker

**Symptôme :**
```
Error: 'picker' is not recognized as a valid pseudo-element
```

**Solution :**
```bash
# Vérifier version
npm list daisyui

# Si 5.3.9 ou 5.3.10:
npm install daisyui@5.3.8
rm -rf .next
npm run dev
```

**Versions :**
- ✅ 5.3.8 - Stable
- ❌ 5.3.9 - Bug picker
- ❌ 5.3.10 - Bug picker

---

### Problème 2 : Module Not Found

**Symptôme :**
```
Error: Cannot find module '@swc/helpers'
```

**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Problème 3 : TypeScript Manquant

**Symptôme :**
```
Installing devDependencies: typescript, @types/react
```

**Solution :** Normal ! Next.js installe automatiquement au premier lancement.

---

### Problème 4 : Port Déjà Utilisé

**Symptôme :**
```
Port 3000 is in use, using available port 3001
```

**Solutions :**
```bash
# Option 1: Tuer processus sur port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Utiliser autre port
PORT=3002 npm run dev
```

---

### Problème 5 : Hygraph Unauthorized

**Symptôme :**
```
API Error 401: Unauthorized
```

**Vérifier :**
1. Token valide dans `.env.local`
2. Permissions CRUD activées dans Hygraph
3. Token permanent (pas temporaire)

**Hygraph Permissions Requises :**
- ✅ Create
- ✅ Read
- ✅ Update
- ✅ Delete
- ✅ Publish
- ✅ Upload Assets

---

## 📦 Production Build

### Commandes
```bash
# Build production
npm run build

# Test production local
npm start

# Check bundle size
ls -lh .next/static/chunks
```

### Optimisations
```bash
# Analyser bundle
npm install -D @next/bundle-analyzer
npm run build -- --analyze
```

---

## 🌐 Déploiement Vercel

### 1. Préparer le Projet
```bash
# S'assurer que build fonctionne
npm run build

# Commit tout
git add -A
git commit -m "ready for deployment"
git push
```

### 2. Variables d'Environnement

Dans Vercel Dashboard :
```
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/...
HYGRAPH_TOKEN=<TOKEN_PROD>
NEXT_PUBLIC_BASE_URL=https://ton-domaine.vercel.app
```

### 3. Déployer
```bash
# Via Git (recommandé)
git push origin feature/admin-crud

# Via CLI
npm install -g vercel
vercel --prod
```

---

## 🔒 Sécurité Production

### 1. Variables Sensibles
❌ JAMAIS commit `.env.local`
✅ Utiliser Vercel Environment Variables

### 2. Token Hygraph
- Créer token séparé pour production
- Limiter permissions si possible
- Rotation régulière

### 3. CORS & API Routes
Next.js API Routes sont protégées par défaut.

---

## 📊 Monitoring

### Performance
```bash
# Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### Logs
```bash
# Production logs (Vercel)
vercel logs
```

---

## 🔄 Mise à Jour

```bash
# Pull latest
git pull origin feature/admin-crud

# Clean install
rm -rf node_modules .next
npm install

# Test
npm run build
npm run dev
```

---

## ✅ Checklist Finale

Avant push en production :

- [ ] `npm run build` → Success
- [ ] `npm run lint` → No errors
- [ ] `npm run type-check` → No errors
- [ ] Test page admin categories
- [ ] Test upload images
- [ ] Test API routes
- [ ] Variables env configurées
- [ ] DaisyUI 5.3.8 installé
- [ ] Documentation à jour

---

## 🆘 Support

Si problème persiste :

1. Vérifier `README-DAISYUI-BUG.md`
2. Vérifier `QUICKSTART.md`
3. Nettoyer cache complet
4. Réinstaller dépendances
5. Vérifier versions packages

---

## 📞 Commandes Debug

```bash
# Versions
node --version
npm --version
npm list next
npm list daisyui

# Cache
npm cache clean --force
rm -rf .next node_modules

# Build verbose
npm run build -- --debug

# Dev verbose
npm run dev -- --show-all
```

---

**🎯 Projet Stable avec DaisyUI 5.3.8 !**
