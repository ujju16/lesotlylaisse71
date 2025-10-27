# Vercel Deployment Guide

## 📋 Prérequis

1. Un compte Vercel (https://vercel.com)
2. Le projet connecté à GitHub
3. Les secrets GitHub configurés

## 🔧 Configuration des secrets GitHub

Allez dans votre repository GitHub : `Settings` → `Secrets and variables` → `Actions`

Ajoutez les secrets suivants :

### 1. VERCEL_TOKEN
- Allez sur https://vercel.com/account/tokens
- Créez un nouveau token
- Copiez le token et ajoutez-le comme secret `VERCEL_TOKEN`

### 2. VERCEL_ORG_ID
```bash
# Dans votre terminal local
vercel link
cat .vercel/project.json
```
Copiez la valeur de `"orgId"` et ajoutez-la comme secret `VERCEL_ORG_ID`

### 3. VERCEL_PROJECT_ID
```bash
# Dans le même fichier .vercel/project.json
cat .vercel/project.json
```
Copiez la valeur de `"projectId"` et ajoutez-la comme secret `VERCEL_PROJECT_ID`

## 🚀 Déploiement

### Déploiement automatique
Le déploiement se fait automatiquement via GitHub Actions :
- **Branch `main`** → Déploiement en production
- **Branch `development`** → Déploiement en preview
- **Pull Requests** → Déploiement en preview

### Déploiement manuel (local)
```bash
# Installation de Vercel CLI
npm i -g vercel

# Premier déploiement (configuration)
vercel

# Déploiement en production
vercel --prod
```

## 📁 Structure du projet

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Configuration GitHub Actions
├── vercel.json                 # Configuration Vercel
├── next.config.ts              # Configuration Next.js
└── package.json                # Dépendances
```

## ⚙️ Variables d'environnement (optionnel)

Si vous avez besoin de variables d'environnement :

1. Dans Vercel Dashboard → Project → Settings → Environment Variables
2. Ajoutez vos variables (ex: `DATABASE_URL`, `API_KEY`, etc.)

## 🔍 Vérification du déploiement

Après chaque push :
1. Allez dans l'onglet `Actions` de votre repository GitHub
2. Vérifiez que le workflow s'exécute correctement
3. Le lien de déploiement sera disponible dans les logs

## 🌐 Domaine personnalisé (optionnel)

Pour ajouter un domaine personnalisé :
1. Allez dans Vercel Dashboard → Project → Settings → Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions Vercel

## 📊 Monitoring

- **Logs** : Vercel Dashboard → Deployments → [Select deployment] → Logs
- **Analytics** : Vercel Dashboard → Analytics
- **Performance** : Vercel Dashboard → Speed Insights

## 🐛 Troubleshooting

### Build failed
```bash
# Testez le build localement
npm run build
```

### Variables d'environnement manquantes
Vérifiez que toutes les variables sont configurées dans Vercel Dashboard

### Problèmes de cache
```bash
# Dans Vercel Dashboard → Deployments → Redeploy → Clear cache
```

## 📝 Notes

- Le fichier `.vercel/` est ignoré par git (ajouté dans .gitignore)
- Les builds sont automatiquement optimisés par Vercel
- Les images sont automatiquement optimisées avec Next.js Image Optimization
- CDN global automatique pour une latence minimale

## 🎯 Checklist de déploiement

- [x] Configuration `vercel.json` créée
- [x] GitHub Actions workflow créé
- [ ] Secrets GitHub configurés
- [ ] Premier déploiement testé
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Variables d'environnement configurées (si nécessaire)

## 🔗 Liens utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)
