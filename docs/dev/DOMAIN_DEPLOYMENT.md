# 🌐 Configuration du Domaine - lesotlylaisse71.fr

## ✅ État Actuel

Le domaine **lesotlylaisse71.fr** est correctement configuré et actif sur Vercel.

## 📋 Configuration Vercel

### Domaine Principal
- **URL**: https://lesotlylaisse71.fr
- **Registrar**: Third Party
- **Nameservers**: Vercel
- **Statut**: ✅ Actif

### URLs Disponibles
- **Production**: https://lesotlylaisse71.fr
- **Vercel (backup)**: https://lesotlylaisse71.vercel.app
- **Preview (dev)**: Auto-généré pour chaque commit sur dev

## 🔐 Variables d'Environnement

### GitHub Secrets (Configurés ✅)
```
CODECOV_TOKEN
HYGRAPH_TOKEN
NEXT_PUBLIC_HYGRAPH_URL
VERCEL_ORG_ID
VERCEL_PROJECT_ID
VERCEL_TOKEN
```

### Vercel Environment Variables (Configurés ✅)
```
HYGRAPH_TOKEN                     - Production
NEXT_PUBLIC_HYGRAPH_URL          - Production, Preview, Development
```

## 🚀 Déploiements

### Branches
- **main**: Déploiement en production sur lesotlylaisse71.fr
- **dev**: Preview deployments pour chaque commit

### Workflow CI/CD
- ✅ Lint
- ✅ Type-check
- ✅ Tests (avec Codecov)
- ✅ Build
- ✅ Security audit
- ✅ Lighthouse CI (sur PRs)

## 📊 Monitoring & Analytics

### Grafana Stack (Configuré)
- Dashboard Grafana
- Logs (Loki)
- Tracing (Tempo)
- Real User Monitoring (Faro)

**Accès**: `bun run monitoring:start`

### Codecov
- **Badge**: [![codecov](https://codecov.io/gh/ujju16/lesotlylaisse71/branch/main/graph/badge.svg?token=2XDGRWZ0UJ)](https://codecov.io/gh/ujju16/lesotlylaisse71)
- **Dashboard**: https://codecov.io/gh/ujju16/lesotlylaisse71

## 🔧 Configuration DNS (Chez votre registrar)

Si vous devez reconfigurer le DNS :

### Records à créer
```
Type    Name    Value                   TTL
A       @       76.76.21.21            Auto
CNAME   www     cname.vercel-dns.com.  Auto
```

## 📱 Vérifications

### Tests de Production
```bash
# Test homepage
curl -I https://lesotlylaisse71.fr

# Test API
curl https://lesotlylaisse71.fr/api/categories

# Test SSL
openssl s_client -connect lesotlylaisse71.fr:443 -servername lesotlylaisse71.fr
```

### Lighthouse Audit
```bash
# Via GitHub Actions (automatique sur PRs)
# Ou manuellement :
npx lighthouse https://lesotlylaisse71.fr --view
```

## 🎯 Déploiement Manuel (si nécessaire)

### Depuis main
```bash
git checkout main
git pull origin main
vercel --prod
```

### Depuis dev (Preview)
```bash
git checkout dev
git pull origin dev
vercel
```

## 📝 Checklist de Déploiement

- [x] Domaine configuré sur Vercel
- [x] DNS pointant vers Vercel
- [x] SSL/HTTPS actif
- [x] Variables d'environnement configurées
- [x] GitHub Secrets configurés
- [x] CI/CD workflows actifs
- [x] Codecov intégré
- [x] Grafana monitoring configuré
- [x] Lighthouse CI configuré
- [x] Dependabot actif

## 🔄 Processus de Déploiement Standard

1. **Développement sur dev**
   ```bash
   git checkout dev
   # faire vos modifications
   git add .
   git commit -m "feat: nouvelle fonctionnalité"
   git push origin dev
   ```
   → Preview deployment automatique

2. **Merge vers main (via PR)**
   ```bash
   gh pr create --base main --head dev
   # Attendre les checks CI/CD
   gh pr merge --squash
   ```
   → Déploiement en production automatique

3. **Hotfix direct sur main (urgent)**
   ```bash
   git checkout main
   # fix urgent
   git add .
   git commit -m "fix: correction critique"
   git push origin main
   ```
   → Déploiement immédiat en production

## 🆘 Troubleshooting

### Erreur: "Domain not found"
→ Vérifier dans Vercel Dashboard → Settings → Domains

### Erreur: "Build failed"
→ Vérifier les logs : `vercel logs <deployment-url>`

### Erreur: "Environment variable not found"
→ Vérifier : `vercel env ls`

### SSL/HTTPS non actif
→ Attendre jusqu'à 24h après configuration DNS
→ Forcer renouvellement : Vercel Dashboard → Settings → Domains → Refresh

## 📚 Ressources

- [Vercel Dashboard](https://vercel.com/ujju16s-projects/lesotlylaisse71)
- [GitHub Repository](https://github.com/ujju16/lesotlylaisse71)
- [Codecov Dashboard](https://codecov.io/gh/ujju16/lesotlylaisse71)
- [Documentation Vercel Domains](https://vercel.com/docs/concepts/projects/domains)

---

**Dernière vérification** : 6 Novembre 2025  
**Statut** : ✅ Tout fonctionne correctement
