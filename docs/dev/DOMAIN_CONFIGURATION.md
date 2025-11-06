# Configuration du Domaine Personnalisé lesotlylaisse71.fr

## ✅ Statut Actuel

Le domaine `lesotlylaisse71.fr` est **configuré et actif** sur Vercel.

## 📋 Configuration

### Domaine Principal

- **Domaine**: lesotlylaisse71.fr
- **Registrar**: Third Party
- **Nameservers**: Vercel
- **Environnement**: Production (branche `main`)

### Vérifications

```bash
# Vérifier les domaines configurés
bun run vercel:check
# ou
vercel domains ls

# Vérifier les déploiements
vercel ls --yes
```

## 🔧 Configuration DNS

Les nameservers Vercel sont utilisés, ce qui simplifie la gestion DNS.

### Si vous utilisez les nameservers Vercel:

Tout est géré automatiquement par Vercel ✅

### Si vous utilisez un registrar externe:

Configurez les enregistrements DNS suivants:

#### Pour le domaine principal (@)

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600
```

#### Pour le sous-domaine www

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 3600
```

## 🌐 URLs du Projet

### Production (main)

- **URL principale**: https://lesotlylaisse71.fr
- **URL Vercel**: https://lesotlylaisse71.vercel.app
- **Environnement**: Production

### Preview (dev)

- **URL Vercel**: https://lesotlylaisse71-git-dev-ujju16s-projects.vercel.app
- **Environnement**: Preview

### Pull Requests

- **URL dynamique**: Générée automatiquement pour chaque PR
- **Format**: https://lesotlylaisse71-[hash]-ujju16s-projects.vercel.app
- **Environnement**: Preview

## 🚀 Déploiements Automatiques

### Branche main → Production

```yaml
Push sur main → GitHub Actions → Vercel Production → lesotlylaisse71.fr
```

### Branche dev → Preview

```yaml
Push sur dev → GitHub Actions → Vercel Preview → [url-preview].vercel.app
```

### Pull Requests → Preview

```yaml
Nouvelle PR → GitHub Actions → Vercel Preview → [url-unique].vercel.app
```

## ⚙️ Configuration Vercel Dashboard

### 1. Git Configuration

URL: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/git

- ✅ Production Branch: `main`
- ✅ Preview Branches: `dev` et toutes les PRs
- ✅ Auto-deployment: Activé

### 2. Domain Configuration

URL: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/domains

- ✅ `lesotlylaisse71.fr` → Production (main)
- ✅ `www.lesotlylaisse71.fr` → Redirect vers apex
- ✅ Certificat SSL: Automatique (Let's Encrypt)

### 3. Environment Variables

URL: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/environment-variables

Variables configurées pour tous les environnements:

- `HYGRAPH_TOKEN`: Token API Hygraph
- `NEXT_PUBLIC_HYGRAPH_URL`: URL endpoint Hygraph
- `CODECOV_TOKEN`: Token Codecov (optionnel)

## 🔍 Vérifications de Santé

### Vérifier que le domaine est accessible

```bash
# Vérifier le domaine principal
curl -I https://lesotlylaisse71.fr

# Vérifier le certificat SSL
openssl s_client -connect lesotlylaisse71.fr:443 -servername lesotlylaisse71.fr < /dev/null

# Vérifier la résolution DNS
dig lesotlylaisse71.fr
```

### Vérifier les déploiements Vercel

```bash
# Lister les déploiements
vercel ls --yes

# Obtenir les détails d'un déploiement
vercel inspect [deployment-url]

# Vérifier les logs
vercel logs [deployment-url]
```

## 🐛 Dépannage

### Le domaine ne répond pas

1. Vérifier les nameservers: `dig NS lesotlylaisse71.fr`
2. Vérifier les enregistrements A: `dig A lesotlylaisse71.fr`
3. Vérifier le statut sur Vercel Dashboard
4. Attendre la propagation DNS (jusqu'à 48h)

### Erreur de certificat SSL

1. Le certificat est généré automatiquement par Vercel
2. Attendre quelques minutes après la configuration du domaine
3. Vérifier dans Vercel Dashboard → Domains

### Déploiement bloqué

1. Vérifier les workflows GitHub: `gh run list`
2. Vérifier les logs: `gh run view [run-id]`
3. Vérifier les variables d'environnement sur Vercel
4. Vérifier les secrets GitHub

## 📚 Ressources

- [Documentation Vercel Domains](https://vercel.com/docs/concepts/projects/domains)
- [Configuration DNS Vercel](https://vercel.com/docs/concepts/projects/domains/dns)
- [Certificats SSL](https://vercel.com/docs/concepts/projects/domains/ssl)
- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

## 🔐 Sécurité

- ✅ HTTPS forcé (automatic redirect)
- ✅ Certificat SSL/TLS automatique (Let's Encrypt)
- ✅ HSTS activé
- ✅ Security headers configurés dans next.config.ts

## 📊 Monitoring

Le site est monitoré via:

- **Vercel Analytics**: Activé automatiquement
- **Lighthouse CI**: Tests de performance automatiques
- **GitHub Actions**: Statut des déploiements
- **Codecov**: Couverture de code

## ✨ Prochaines Étapes

1. ✅ Domaine configuré et actif
2. ✅ Déploiements automatiques configurés
3. ✅ SSL/TLS actif
4. 🔄 Configurer un CDN additionnel si nécessaire
5. 🔄 Configurer des redirections personnalisées
6. 🔄 Ajouter des sous-domaines si nécessaire (api.lesotlylaisse71.fr, admin.lesotlylaisse71.fr)
