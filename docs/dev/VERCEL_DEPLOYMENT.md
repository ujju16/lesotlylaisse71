# Configuration des Déploiements Vercel

## Structure des Environnements

### Production (main)
- **Branche**: `main`
- **URL**: https://lesotlylaisse71.fr
- **Domaine personnalisé**: lesotlylaisse71.fr
- **Environnement**: Production
- **Auto-déploiement**: Activé

### Preview (dev)
- **Branche**: `dev`
- **URL**: https://lesotlylaisse71-dev.vercel.app
- **Environnement**: Preview
- **Auto-déploiement**: Activé

### Pull Requests
- **Environnement**: Preview
- **URL dynamique**: Générée automatiquement
- **Auto-déploiement**: Activé pour chaque PR

## Variables d'Environnement

Les variables suivantes sont configurées sur Vercel:

### Production
- `HYGRAPH_TOKEN`: Token API Hygraph
- `NEXT_PUBLIC_HYGRAPH_URL`: URL de l'API Hygraph
- `CODECOV_TOKEN`: Token Codecov

### Preview & Development
- Mêmes variables que Production

## Configuration du Domaine Personnalisé

Le domaine `lesotlylaisse71.fr` est configuré pour pointer vers la branche `main` en production.

### DNS Configuration
Assurez-vous que les enregistrements DNS suivants sont configurés:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.19
```

## Commandes Utiles

### Lister les déploiements
```bash
vercel ls
```

### Promouvoir un déploiement en production
```bash
vercel promote <deployment-url>
```

### Lister les variables d'environnement
```bash
vercel env ls
```

### Ajouter une variable d'environnement
```bash
vercel env add <NAME>
```

## Workflow CI/CD

Les déploiements sont automatiques via GitHub Actions:
- Push sur `main` → Déploiement Production
- Push sur `dev` → Déploiement Preview
- Pull Request → Déploiement Preview temporaire

## Monitoring

Les déploiements sont monitorés via:
- Vercel Dashboard
- GitHub Actions
- Codecov pour la couverture de code
- Lighthouse CI pour les performances
