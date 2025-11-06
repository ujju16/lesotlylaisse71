# Configuration des Déploiements Vercel

## Étapes à suivre sur le Dashboard Vercel

### 1. Configurer les Branches de Production et Preview

Aller sur: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/git

**Production Branch:**

- Définir `main` comme branche de production

**Preview Branches:**

- Activer les déploiements preview pour `dev`
- Activer les déploiements pour toutes les Pull Requests

### 2. Configurer les Domaines

Aller sur: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/domains

**Production (main):**

- lesotlylaisse71.fr → main branch
- www.lesotlylaisse71.fr → main branch (redirect)

**Preview (dev):**

- lesotlylaisse71-dev.vercel.app → dev branch (automatique)

### 3. Nommer les Déploiements

Les déploiements sont automatiquement nommés selon:

- **Production**: Nom du projet + domaine personnalisé
- **Preview**: Nom du projet + ID unique + vercel.app

### 4. Variables d'Environnement

Les variables sont déjà configurées:
✓ HYGRAPH_TOKEN (Production, Preview, Development)
✓ NEXT_PUBLIC_HYGRAPH_URL (Production, Preview, Development)
✓ CODECOV_TOKEN (à ajouter si nécessaire)

### 5. Protection des Déploiements

**Production (main):**

- Require status checks before merging
- Require branches to be up to date

**Preview (dev):**

- Auto-merge quand les checks passent

## Commandes CLI

### Promouvoir un déploiement preview en production

```bash
vercel promote <deployment-url> --scope=ujju16s-projects
```

### Créer un alias pour un déploiement

```bash
vercel alias set <deployment-url> lesotlylaisse71.fr
```

### Lister les domaines

```bash
vercel domains ls
```

## Vérification

Après configuration:

1. Push sur `main` → doit déployer sur lesotlylaisse71.fr (Production)
2. Push sur `dev` → doit déployer sur preview (Preview)
3. Nouvelle PR → doit créer un déploiement preview unique
