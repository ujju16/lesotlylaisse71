# Documentation d'authentification

## Vue d'ensemble

Système d'authentification moderne avec Material UI, React Hook Form et Zod pour la validation.

## Technologies utilisées

- **Material UI (MUI)** : Composants UI Material Design
- **React Hook Form** : Gestion de formulaires performante
- **Zod** : Validation de schéma TypeScript-first
- **Framer Motion** : Animations fluides
- **Emotion** : CSS-in-JS pour MUI

## Structure des fichiers

```
app/auth/
├── layout.tsx                  # Layout parent pour auth
├── login/
│   ├── layout.tsx             # Layout login avec metadata
│   └── page.tsx               # Page de connexion
└── register/
    ├── layout.tsx             # Layout register avec metadata
    └── page.tsx               # Page d'inscription

components/auth/
├── AuthLayout.tsx             # Layout commun avec design Material
├── LoginForm.tsx              # Formulaire de connexion
└── RegisterForm.tsx           # Formulaire d'inscription

lib/
├── theme.ts                   # Thème Material UI personnalisé
└── validations/
    └── auth.ts                # Schémas Zod pour validation
```

## Charte graphique

### Couleurs principales

- **Primaire** : Brun café (#795548)
- **Secondaire** : Vert lime (#689F38)
- **Accent** : Ambre (#FFB300)

### Gradient d'arrière-plan

Le layout d'authentification utilise un dégradé entre les couleurs primaire et secondaire.

## Validation des formulaires

### Login

```typescript
{
  email: string (format email),
  password: string (min 8 caractères),
  rememberMe: boolean (optionnel)
}
```

### Register

```typescript
{
  name: string (2-50 caractères),
  email: string (format email),
  password: string (min 8 caractères + regex complexité),
  confirmPassword: string (doit correspondre à password),
  acceptTerms: boolean (requis = true)
}
```

### Règles de mot de passe

Le mot de passe doit contenir :
- Au moins 8 caractères
- Au moins une majuscule
- Au moins une minuscule
- Au moins un chiffre
- Au moins un caractère spécial (@$!%*?&)

## Fonctionnalités

### LoginForm

- Validation en temps réel avec Zod
- Toggle visibilité du mot de passe
- Option "Se souvenir de moi"
- Lien vers mot de passe oublié
- Lien vers page d'inscription
- État de chargement avec spinner
- Gestion d'erreurs avec alertes
- Animations d'entrée

### RegisterForm

- Validation stricte du mot de passe
- Confirmation de mot de passe
- Acceptation des conditions d'utilisation
- Liens vers mentions légales et confidentialité
- Message de succès après inscription
- Redirection automatique vers login

## Accessibilité (ARIA)

- Labels appropriés sur tous les champs
- aria-label sur les boutons d'actions
- Gestion du focus au clavier
- Messages d'erreur liés aux champs
- Contraste de couleurs respecté

## Animations

Utilisation de Framer Motion pour :
- Fade in du formulaire
- Transition du paper elevation
- Smooth transitions entre états

## Intégration Hygraph

Le token Hygraph est configuré dans `.env.local` :

```env
HYGRAPH_TOKEN=eyJhbGci...
NEXT_PUBLIC_HYGRAPH_URL=https://api-eu-west-2.hygraph.com/v2/...
```

### À faire

1. Créer une mutation GraphQL pour l'inscription
2. Créer une mutation pour la connexion
3. Implémenter JWT pour la session
4. Configurer les rôles et permissions dans Hygraph

## Pages accessibles

- `/auth/login` - Page de connexion
- `/auth/register` - Page d'inscription

## Prochaines étapes

1. Intégrer l'API Hygraph pour l'authentification réelle
2. Implémenter la gestion de session avec JWT
3. Ajouter la page de récupération de mot de passe
4. Configurer les rôles utilisateurs dans Hygraph
5. Ajouter les tests unitaires
6. Implémenter la protection des routes admin

## Déploiement

Le token Hygraph doit également être ajouté :
- Dans les secrets Vercel
- Dans les secrets GitHub (pour CI/CD)

Variables à configurer :
- `HYGRAPH_TOKEN`
- `NEXT_PUBLIC_HYGRAPH_URL`
- `NEXT_PUBLIC_BASE_URL`
