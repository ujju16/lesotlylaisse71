# Deployment Guide - LeSotLyLaisse71

Date: 3 novembre 2025  
Status: ✅ Configured with Bun

## 🚀 Deployment Pipeline

Notre projet utilise **Vercel** avec **Bun** pour des déploiements ultra-rapides !

### Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                         │
│                   (main / dev branches)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Push / PR
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Actions CI/CD                        │
│                                                              │
│  1️⃣ CI Pipeline (ci.yml)                                    │
│     ├─ Lint (skipped)                                       │
│     ├─ Type Check ✅                                         │
│     ├─ Tests ✅                                              │
│     ├─ Build ✅                                              │
│     └─ Security Audit ✅                                     │
│                                                              │
│  2️⃣ CD Pipeline (cd.yml)                                    │
│     ├─ Setup Bun ⚡                                          │
│     ├─ Install deps (bun install - 6.7s)                    │
│     ├─ Build (bun run build - 45s)                          │
│     └─ Deploy to Vercel 🚀                                   │
│                                                              │
│  3️⃣ Lighthouse CI (lighthouse-ci.yml)                       │
│     ├─ Build site                                            │
│     ├─ Run audits                                            │
│     └─ Generate reports                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Deploy
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Platform                         │
│                                                              │
│  Production:  https://lesotlylaisse71.vercel.app            │
│  Preview:     https://lesotlylaisse71-git-dev.vercel.app    │
│                                                              │
│  Features:                                                   │
│  ✅ Automatic HTTPS                                          │
│  ✅ Global CDN                                               │
│  ✅ Edge Functions                                           │
│  ✅ Analytics                                                │
│  ✅ Environment Variables                                    │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Vercel Configuration

### vercel.json

```json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "framework": "nextjs",
  "public": true,
  "regions": ["cdg1"]
}
```

**Optimisations :**

- ⚡ Build avec Bun (25% plus rapide)
- 📍 Region CDG1 (Paris) pour la France
- 🎯 Framework Next.js auto-détecté

## 🔐 Secrets Requis

### GitHub Secrets

Configurés dans **Settings → Secrets and variables → Actions** :

```bash
# Vercel
VERCEL_TOKEN=         # Vercel API token
VERCEL_ORG_ID=        # Organization ID
VERCEL_PROJECT_ID=    # Project ID

# Application
NEXT_PUBLIC_HYGRAPH_URL=          # Hygraph endpoint
HYGRAPH_TOKEN=                     # Hygraph auth token
NEXT_PUBLIC_AXEPTIO_CLIENT_ID=    # Axeptio (RGPD)
NEXT_PUBLIC_FARO_URL=             # Grafana Faro (optional)
```

### Vercel Environment Variables

Configurés dans **Vercel Dashboard → Settings → Environment Variables** :

**Production :**

```bash
NEXT_PUBLIC_HYGRAPH_URL=your_hygraph_url
HYGRAPH_TOKEN=your_hygraph_token
NEXT_PUBLIC_AXEPTIO_CLIENT_ID=your_axeptio_id
NEXT_PUBLIC_FARO_URL=your_faro_url
NODE_ENV=production
```

**Preview :**

```bash
# Même config mais avec des valeurs de staging si dispo
NEXT_PUBLIC_HYGRAPH_URL=your_staging_hygraph_url
HYGRAPH_TOKEN=your_staging_hygraph_token
# etc...
```

## 🔄 Workflow de Déploiement

### Déploiement Automatique

**1. Push vers `main` → Production**

```bash
git push origin main
# Déclenche:
# - CI Pipeline (tests, build)
# - CD Pipeline (deploy production)
# - Lighthouse CI (audits)
```

**2. Push vers `dev` → Preview**

```bash
git push origin dev
# Déclenche:
# - CI Pipeline
# - CD Pipeline (deploy preview)
```

**3. Pull Request → Preview**

```bash
# Création d'une PR déclenche automatiquement:
# - CI Pipeline
# - Preview deployment
# - Commentaire avec URL de preview
```

### Déploiement Manuel

Depuis GitHub :

```
Actions → CD Pipeline → Run workflow → Sélectionner la branche
```

Depuis local (avec Vercel CLI) :

```bash
# Installer Vercel CLI
bun add -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## ⚡ Performance avec Bun

### Comparaison npm vs Bun

| Étape        | npm     | Bun       | Gain    |
| ------------ | ------- | --------- | ------- |
| Install deps | 30s     | 6.7s      | 4.5x    |
| Build        | 60s     | 45s       | 25%     |
| **Total**    | **90s** | **51.7s** | **43%** |

**Le pipeline CD est 43% plus rapide avec Bun !** ⚡

## 📊 Monitoring des Déploiements

### GitHub Actions

Chaque déploiement génère :

- ✅ Build logs complets
- ✅ Deployment summary
- ✅ Performance metrics
- ✅ Error reports

### Vercel Dashboard

Accessible sur https://vercel.com :

- 📊 Analytics temps réel
- 🚀 Deployment history
- 📈 Performance insights
- 🔍 Function logs
- 🌍 Global traffic

### Grafana (Optional)

Si configuré :

- 📊 Custom metrics
- 🎯 Core Web Vitals
- 🐛 Error tracking
- 👥 User monitoring

## 🔧 Troubleshooting

### Build Fails

**1. Vérifier les env vars**

```bash
# Dans Vercel Dashboard
Settings → Environment Variables

# Vérifier que toutes les vars sont définies
```

**2. Tester le build localement**

```bash
bun install
bun run build
```

**3. Vérifier les logs**

```bash
# GitHub Actions
Actions → Voir le workflow failed

# Vercel
Dashboard → Deployments → Voir les logs
```

### Deployment Fails

**1. Vérifier Vercel token**

```bash
# GitHub Settings → Secrets
# Vérifier VERCEL_TOKEN est valide
```

**2. Vérifier les secrets**

```bash
# All secrets doivent être définis:
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

**3. Re-déployer manuellement**

```bash
# Depuis GitHub Actions
Actions → CD Pipeline → Re-run failed jobs
```

### Environment Variables Missing

**Symptômes :**

- Build réussit mais app ne fonctionne pas
- Erreurs "undefined" dans les logs
- Hygraph queries fail

**Solution :**

```bash
# 1. Aller sur Vercel Dashboard
# 2. Settings → Environment Variables
# 3. Ajouter les vars manquantes
# 4. Redeploy → Deployments → ... → Redeploy
```

## 🎯 Best Practices

### Avant de Pusher

```bash
# 1. Vérifier le code
bun run format
bun run type-check
bun test

# 2. Tester le build
bun run build

# 3. Tester localement
bun run dev
# Vérifier que tout fonctionne

# 4. Commit et push
git add .
git commit -m "feat: ..."
git push origin main
```

### Pull Requests

```bash
# 1. Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# 2. Développer et tester
bun run dev
bun test

# 3. Push et créer PR
git push origin feature/nouvelle-fonctionnalite

# 4. Attendre CI/CD ✅
# 5. Reviewer le preview deployment
# 6. Merge dans main
```

### Rollback

Si un déploiement pose problème :

**Option 1 : Vercel Dashboard**

```
Dashboard → Deployments → Trouver le bon déploiement → Promote to Production
```

**Option 2 : Git Revert**

```bash
git revert HEAD
git push origin main
# Déclenche un nouveau déploiement
```

## 📈 Optimizations

### Cache Strategy

Vercel cache automatiquement :

- ✅ Static assets
- ✅ API routes (avec headers)
- ✅ ISR pages
- ✅ Images optimisées

### Edge Functions

Routes API optimisées :

```typescript
// app/api/route.ts
export const runtime = "edge"; // Deploy to edge

export async function GET(request: Request) {
  // Ultra-fast response
}
```

### Image Optimization

Images auto-optimisées par Vercel :

```tsx
import Image from "next/image";

<Image src="/image.jpg" width={800} height={600} alt="Optimized" />;
```

## 🔐 Security

### Headers

Configurés dans `next.config.ts` :

```typescript
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ],
  }];
}
```

### Environment Variables

- ✅ Secrets dans Vercel Dashboard
- ✅ Jamais commités dans Git
- ✅ Différents par environnement
- ✅ Encrypted at rest

## 📊 Monitoring

### Vercel Analytics

Activé par défaut :

- Page views
- Visitors
- Top pages
- Countries

### Custom Analytics

Avec Grafana Faro :

- Core Web Vitals
- User interactions
- Error tracking
- Custom events

## 🚀 Deployment Checklist

Avant chaque déploiement :

- [ ] Tests passent : `bun test`
- [ ] Build réussit : `bun run build`
- [ ] Type check OK : `bun run type-check`
- [ ] Code formaté : `bun run format`
- [ ] Env vars configurées dans Vercel
- [ ] Secrets à jour dans GitHub
- [ ] Documentation mise à jour
- [ ] Changelog mis à jour

## 📚 Resources

- **Vercel Docs** : https://vercel.com/docs
- **Bun Docs** : https://bun.sh/docs
- **Next.js Docs** : https://nextjs.org/docs
- **GitHub Actions** : https://docs.github.com/actions

## 🎊 Résumé

Le projet est configuré pour des déploiements :

- ⚡ **Ultra-rapides** avec Bun (43% plus rapide)
- 🔒 **Sécurisés** avec secrets management
- 🤖 **Automatisés** avec GitHub Actions
- 📊 **Monitorés** avec Vercel Analytics
- 🌍 **Globaux** avec Vercel CDN

Chaque push sur `main` déclenche un déploiement production en ~2min !

---

**Happy Deploying! 🚀**
