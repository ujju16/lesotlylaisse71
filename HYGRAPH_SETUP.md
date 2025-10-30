# 🔧 Configuration Hygraph - Guide Complet

Guide détaillé pour configurer Hygraph (anciennement GraphCMS) pour le projet LeSotLyLaisse71.

## 📋 Prérequis

- Un compte Hygraph (gratuit sur https://hygraph.com)
- Node.js et npm installés
- Le projet cloné localement

---

## 🚀 Démarrage Rapide

### Étape 1 : Créer un projet Hygraph

1. **Connexion à Hygraph**
   - Allez sur https://app.hygraph.com
   - Connectez-vous ou créez un compte gratuit

2. **Créer un nouveau projet**
   - Cliquez sur "Create Project"
   - Nom du projet : `LeSotLyLaisse71`
   - Région : `EU-West-2` (Europe)
   - Plan : `Community` (gratuit)

3. **Notez votre endpoint**
   - Une fois créé, allez dans `Settings → API Access`
   - Copiez l'URL du endpoint (Content API)
   - Format : `https://[region].hygraph.com/v2/[project-id]/master`

---

## 📦 Étape 2 : Créer les Modèles (Schema)

### Modèle 1 : Dish (Plat) 🍽️

**Création du modèle :**
1. Dans Hygraph, allez dans `Schema`
2. Cliquez sur `+ Add` → `Model`
3. Display Name : `Dish`
4. API ID : `Dish` (auto-généré)
5. Plural API ID : `dishes`

**Ajout des champs :**

| Champ | Type | Configuration | Requis |
|-------|------|---------------|--------|
| **name** | Single line text | - | ✅ Oui |
| **slug** | Slug | Base field: `name`, Make unique | ✅ Oui |
| **description** | Multi line text | - | ✅ Oui |
| **price** | Float | Min: 0 | ✅ Oui |
| **category** | Enumeration | Values: `Entrées`, `Plats`, `Desserts`, `Boissons` | ✅ Oui |
| **available** | Boolean | Default: `true` | ❌ Non |
| **image** | Asset | Single asset, Allow only images | ❌ Non |

**Détails de configuration :**

```
1. Cliquez sur "Add field" dans le modèle Dish

2. Pour "name" :
   - Type: Single line text
   - Display Name: Name
   - API ID: name
   - ✅ Required field
   - ✅ Use as title field

3. Pour "slug" :
   - Type: Slug
   - Display Name: Slug
   - API ID: slug
   - Base field: name
   - ✅ Required field
   - ✅ Unique field

4. Pour "description" :
   - Type: Multi line text
   - Display Name: Description
   - API ID: description
   - ✅ Required field

5. Pour "price" :
   - Type: Float
   - Display Name: Price
   - API ID: price
   - ✅ Required field
   - Validations → Min: 0

6. Pour "category" :
   - Type: Enumeration
   - Display Name: Category
   - API ID: category
   - ✅ Required field
   - Values:
     * Entrées
     * Plats
     * Desserts
     * Boissons

7. Pour "available" :
   - Type: Boolean
   - Display Name: Available
   - API ID: available
   - Default value: true

8. Pour "image" :
   - Type: Asset
   - Display Name: Image
   - API ID: image
   - Asset type: Single asset
   - Allow only: Images
```

---

### Modèle 2 : Reservation (Réservation) 📅

**Création du modèle :**
1. `Schema` → `+ Add` → `Model`
2. Display Name : `Reservation`
3. API ID : `Reservation`
4. Plural API ID : `reservations`

**Ajout des champs :**

| Champ | Type | Configuration | Requis |
|-------|------|---------------|--------|
| **name** | Single line text | - | ✅ Oui |
| **email** | Single line text | Validation: Email format | ✅ Oui |
| **phone** | Single line text | - | ✅ Oui |
| **date** | Date | - | ✅ Oui |
| **time** | Single line text | - | ✅ Oui |
| **guests** | Int | Min: 1, Max: 20 | ✅ Oui |
| **message** | Multi line text | - | ❌ Non |
| **reservationStatus** | Enumeration | Values: `pending`, `confirmed`, `cancelled`, Default: `pending` | ✅ Oui |

**Détails de configuration :**

```
1. Pour "name" :
   - Type: Single line text
   - Display Name: Name
   - API ID: name
   - ✅ Required field
   - ✅ Use as title field

2. Pour "email" :
   - Type: Single line text
   - Display Name: Email
   - API ID: email
   - ✅ Required field
   - Validations → Match specific pattern: Email

3. Pour "phone" :
   - Type: Single line text
   - Display Name: Phone
   - API ID: phone
   - ✅ Required field

4. Pour "date" :
   - Type: Date
   - Display Name: Date
   - API ID: date
   - ✅ Required field

5. Pour "time" :
   - Type: Single line text
   - Display Name: Time
   - API ID: time
   - ✅ Required field

6. Pour "guests" :
   - Type: Int
   - Display Name: Guests
   - API ID: guests
   - ✅ Required field
   - Validations → Min: 1, Max: 20

7. Pour "message" :
   - Type: Multi line text
   - Display Name: Message
   - API ID: message

8. Pour "reservationStatus" :
   - Type: Enumeration
   - Display Name: Reservation Status
   - API ID: reservationStatus
   - ✅ Required field
   - Default value: pending
   - Values:
     * pending
     * confirmed
     * cancelled
```

---

## 🔐 Étape 3 : Configurer les Permissions

### 3.1 Créer un Token d'API

1. Allez dans `Settings → API Access`
2. Sous "Permanent Auth Tokens", cliquez sur `+ Create token`
3. Token name : `Production Token`
4. Description : `Token pour le site en production`
5. Cliquez sur `Create & configure permissions`

### 3.2 Configurer les Permissions

**Pour le modèle Dish :**
```
Public API Permissions (sans token) :
✅ Read (pour afficher le menu publiquement)

Permanent Auth Token Permissions :
✅ Create
✅ Read
✅ Update
✅ Delete
✅ Publish
✅ Unpublish
```

**Pour le modèle Reservation :**
```
Public API Permissions (sans token) :
✅ Create (pour permettre les réservations depuis le site)

Permanent Auth Token Permissions :
✅ Create
✅ Read
✅ Update
✅ Delete
✅ Publish
✅ Unpublish
```

**Pour les Assets :**
```
Public API Permissions :
✅ Read

Permanent Auth Token Permissions :
✅ Create
✅ Read
✅ Update
✅ Delete
```

### 3.3 Copier le Token

1. Une fois les permissions configurées, copiez le token généré
2. ⚠️ **IMPORTANT** : Sauvegardez-le immédiatement, il ne sera plus visible !

---

## ⚙️ Étape 4 : Configuration du Projet Next.js

### 4.1 Créer le fichier d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# .env.local

# Hygraph Configuration
NEXT_PUBLIC_HYGRAPH_URL=https://mcp-eu-west-2.hygraph.com/v2/VOTRE_PROJECT_ID/master
HYGRAPH_TOKEN=votre_token_permanent_ici

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Remplacez :**
- `VOTRE_PROJECT_ID` par l'ID de votre projet (visible dans l'URL)
- `votre_token_permanent_ici` par le token créé à l'étape 3

### 4.2 Configuration pour la Production (Vercel)

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. `Settings → Environment Variables`
4. Ajoutez les mêmes variables :
   ```
   NEXT_PUBLIC_HYGRAPH_URL = https://...
   HYGRAPH_TOKEN = eyJ...
   NEXT_PUBLIC_BASE_URL = https://lesotlylaisse71.vercel.app
   ```

---

## 📝 Étape 5 : Ajouter du Contenu de Test

### 5.1 Ajouter des Plats

1. Dans Hygraph, allez dans `Content`
2. Cliquez sur `Dish` dans la sidebar
3. Cliquez sur `+ Create entry`
4. Remplissez les champs :

**Exemple 1 - Entrée :**
```
Name: Œuf en meurette
Slug: oeuf-en-meurette (auto-généré)
Description: Œuf poché dans une sauce au vin rouge, accompagné de lardons et croûtons
Price: 12.50
Category: Entrées
Available: ✅ true
Image: [Uploadez une image]
```

**Exemple 2 - Plat :**
```
Name: Bœuf bourguignon
Slug: boeuf-bourguignon
Description: Bœuf mijoté au vin rouge avec carottes, oignons et champignons, servi avec des pommes vapeur
Price: 24.90
Category: Plats
Available: ✅ true
Image: [Uploadez une image]
```

**Exemple 3 - Dessert :**
```
Name: Tarte tatin
Slug: tarte-tatin
Description: Tarte aux pommes caramélisées, servie tiède avec crème fraîche
Price: 8.50
Category: Desserts
Available: ✅ true
Image: [Uploadez une image]
```

5. **Important** : Cliquez sur `Publish` pour rendre le contenu visible !

### 5.2 Tester les Réservations

Les réservations seront créées automatiquement via le formulaire du site, mais vous pouvez en créer une manuellement :

```
Name: Jean Dupont
Email: jean.dupont@example.com
Phone: 06 12 34 56 78
Date: 2025-11-15
Time: 20:00
Guests: 4
Message: Table près de la fenêtre si possible
Reservation Status: pending
```

---

## 🧪 Étape 6 : Tester l'Installation

### 6.1 Test en Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### 6.2 Vérifier les Pages

Ouvrez votre navigateur et testez :

```
✅ Page d'accueil : http://localhost:3000
✅ Menu : http://localhost:3000/menu
✅ Réservations : http://localhost:3000/reservations
✅ Admin : http://localhost:3000/admin
```

### 6.3 Tester l'API GraphQL

Dans Hygraph, allez dans `API Playground` et testez cette requête :

```graphql
query {
  dishes {
    id
    name
    slug
    description
    price
    category
    available
    image {
      url
    }
  }
}
```

Vous devriez voir vos plats s'afficher !

---

## 🔧 Dépannage

### Problème : "Invalid API token"
- ✅ Vérifiez que le token dans `.env.local` est correct
- ✅ Vérifiez que le token a les bonnes permissions
- ✅ Redémarrez le serveur Next.js après avoir modifié `.env.local`

### Problème : "No content found"
- ✅ Vérifiez que vous avez **publié** le contenu (bouton "Publish")
- ✅ Vérifiez l'URL de l'API dans `.env.local`
- ✅ Vérifiez les permissions publiques dans Hygraph

### Problème : "Can't create reservation"
- ✅ Vérifiez que le modèle Reservation a la permission "Create" publique
- ✅ Vérifiez que tous les champs requis sont remplis

### Problème : Images non affichées
- ✅ Vérifiez que les Assets ont la permission "Read" publique
- ✅ Vérifiez que l'image a été uploadée et publiée

---

## 📚 Ressources Utiles

- **Documentation Hygraph** : https://hygraph.com/docs
- **API GraphQL Playground** : Dans votre projet → API Playground
- **Next.js + Hygraph** : https://hygraph.com/docs/guides/frameworks/nextjs

---

## 🎯 Prochaines Étapes

1. ✅ Ajouter tous vos plats dans Hygraph
2. ✅ Uploader des images de qualité
3. ✅ Tester le système de réservation
4. ✅ Configurer les webhooks (optionnel)
5. ✅ Mettre en place un backup automatique

---

## 💡 Conseils

- 📸 **Images** : Utilisez des images optimisées (WebP, < 500KB)
- 🔄 **Backup** : Exportez régulièrement votre contenu (Settings → Export)
- 🔐 **Sécurité** : Ne commitez JAMAIS le fichier `.env.local` sur Git
- 📊 **Monitoring** : Consultez les Analytics dans Hygraph pour voir l'utilisation

---

**Besoin d'aide ?**
- 📖 Documentation : https://hygraph.com/docs
- 💬 Discord Hygraph : https://hygraph.com/discord
- 🐛 Issues GitHub : https://github.com/ujju16/lesotlylaisse71/issues

