# Configuration du domaine personnalisé lesotlylaisse71.fr

## Configuration dans Vercel

### Étape 1: Ajouter le domaine dans Vercel

1. Connectez-vous à [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `lesotlylaisse71`
3. Allez dans **Settings** > **Domains**
4. Cliquez sur **Add Domain**
5. Entrez votre domaine: `lesotlylaisse71.fr`
6. Ajoutez également le sous-domaine www: `www.lesotlylaisse71.fr`

### Étape 2: Configurer les enregistrements DNS

Vercel vous donnera les enregistrements DNS à configurer chez votre registrar:

#### Pour le domaine principal (lesotlylaisse71.fr)

```
Type: A
Name: @
Value: 76.76.21.21
```

**OU** (recommandé)

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

#### Pour le sous-domaine www

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Étape 3: Configuration chez votre registrar

1. Connectez-vous à votre registrar (OVH, Gandi, Namecheap, etc.)
2. Accédez à la gestion DNS de `lesotlylaisse71.fr`
3. Ajoutez les enregistrements DNS fournis par Vercel
4. Supprimez tout enregistrement A ou CNAME conflictuel pour @ et www

### Étape 4: Vérification SSL

Une fois les DNS propagés (peut prendre jusqu'à 48h):

1. Vercel détectera automatiquement le domaine
2. Un certificat SSL sera automatiquement généré
3. Le domaine sera accessible en HTTPS

### Configuration des redirections

Dans Vercel, configurez:

- Redirection de `www.lesotlylaisse71.fr` vers `lesotlylaisse71.fr` (ou inverse selon préférence)
- Force HTTPS activé

## Vérification

Pour vérifier la propagation DNS:

```bash
# Vérifier l'enregistrement A
dig lesotlylaisse71.fr A

# Vérifier l'enregistrement CNAME
dig www.lesotlylaisse71.fr CNAME

# Vérifier depuis un DNS public (Google)
dig @8.8.8.8 lesotlylaisse71.fr
```

## URLs actuelles

- **Production**: [Vercel URL actuelle]
- **Custom Domain** (après configuration): https://lesotlylaisse71.fr

## Support

Si vous rencontrez des problèmes:

1. Vérifiez la propagation DNS sur [DNS Checker](https://dnschecker.org/)
2. Consultez les logs Vercel
3. Vérifiez les paramètres de votre registrar

## Commandes utiles

```bash
# Trigger un redéploiement
gh workflow run cd.yml --ref main

# Vérifier le statut du dernier déploiement
gh run list --workflow=cd.yml --limit 1
```
