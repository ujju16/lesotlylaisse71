# Guide Rapide Hygraph - Configuration

Ce guide vous aide à configurer Hygraph pour Le Sotly Laissé.

## 📋 Prérequis

- Un compte Hygraph actif
- Accès à votre projet Hygraph

## 🔧 Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Hygraph Configuration
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://api-eu-west-2.hygraph.com/v2/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=votre_token_permanent_ici
```

**Important** : Le token fourni est un JWT qui sert pour les mutations (créer/modifier/supprimer).

### 2. Structure des Modèles Hygraph

#### Modèle `Category`

- **Nom** : `Category`
- **Nom pluriel** : `Categories`
- **Champs** :
  - `name` (String, obligatoire)
  - `description` (RichText ou String)
  - `image` (Asset pour les photos)
  - `slug` (String, unique, pour l'URL)
  - `displayOrder` (Int, pour l'ordre d'affichage)

#### Modèle `MenuItem`

- **Nom** : `MenuItem`
- **Nom pluriel** : `MenuItems`
- **Champs** :
  - `name` (String, obligatoire)
  - `description` (RichText)
  - `price` (Float, obligatoire)
  - `image` (Asset)
  - `category` (Reference → Category)
  - `isAvailable` (Boolean)
  - `allergens` (String[])

**⚠️ ATTENTION** : N'utilisez **PAS** le champ `status` - c'est un mot réservé par Hygraph. Utilisez `isAvailable` à la place.

#### Modèle `MenuConfig`

- **Nom** : `MenuConfig`
- **Nom pluriel** : `MenuConfigs`
- **Champs** :
  - `name` (String, obligatoire) - ex: "Menu Midi", "Menu Soir"
  - `isActive` (Boolean) - le menu actuellement actif
  - `categories` (Reference[] → Category)
  - `qrCode` (String) - stocke l'URL du QR code généré

### 3. Configuration des Permissions

1. Allez dans **Settings** → **Access**
2. Créez un **Permanent Auth Token**
3. Permissions nécessaires :
   - **Read** : Public (pour afficher le menu)
   - **Create/Update/Delete** : Avec token (pour l'admin)

### 4. Activer l'API publique

1. Dans **Settings** → **API Access**
2. Activez "Public Content API"
3. Copiez l'endpoint dans `NEXT_PUBLIC_HYGRAPH_ENDPOINT`

## 🎨 Gestion des Images

Les images uploadées dans Hygraph sont automatiquement optimisées et servies via CDN.

### Upload via l'admin

1. Dans le formulaire de catégorie/produit
2. Cliquez sur "Choisir une image"
3. L'image est compressée avant envoi
4. Hygraph génère automatiquement différentes tailles

## 🔄 Système de QR Code Dynamique

Le système permet d'avoir **un seul QR code** pour plusieurs menus :

1. Créez plusieurs `MenuConfig` (Menu Midi, Menu Soir, etc.)
2. Seul le `MenuConfig` avec `isActive: true` est affiché
3. Le QR code pointe toujours vers la même URL : `/menu`
4. Changez simplement `isActive` pour changer le menu affiché

### Générer le QR Code

```bash
# L'admin génère automatiquement le QR code
# Il sera accessible dans la section "QR Code" de l'admin
```

## 📱 Utilisation dans l'application

### Récupérer les catégories

```typescript
import { hygraphClient } from '@/lib/hygraph-client';

const categories = await hygraphClient.getCategories();
```

### Récupérer le menu actif

```typescript
const activeMenu = await hygraphClient.getActiveMenu();
```

## 🚀 Déploiement

Après configuration :

1. Vérifiez que `.env.local` contient les bonnes valeurs
2. Testez localement : `npm run dev`
3. Ajoutez les variables dans Vercel :
   - `NEXT_PUBLIC_HYGRAPH_ENDPOINT`
   - `HYGRAPH_TOKEN`
4. Déployez : `git push`

## 🆘 Dépannage

### Erreur "status is a reserved word"

→ Utilisez `isAvailable` au lieu de `status`

### Images ne s'affichent pas

→ Vérifiez que l'API publique est activée dans Hygraph

### Mutations échouent

→ Vérifiez que le `HYGRAPH_TOKEN` est valide et a les bonnes permissions

## 📚 Documentation supplémentaire

- [HYGRAPH_SETUP.md](./HYGRAPH_SETUP.md) - Configuration détaillée
- [HYGRAPH_CONFIG.md](./HYGRAPH_CONFIG.md) - Schémas GraphQL
- [README-ADMIN.md](./README-ADMIN.md) - Utilisation de l'interface admin
