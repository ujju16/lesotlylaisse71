# 📱 Configuration des Nouveaux Modèles Hygraph

## 🎯 Modèles à Créer

### 1. Modèle Category (Catégorie) 📂

**Création :**

1. Schema → + Add → Model
2. Display Name: `Category`
3. API ID: `Category`
4. Plural API ID: `categories`

**Champs :**

| Champ           | Type             | Configuration                   | Requis |
| --------------- | ---------------- | ------------------------------- | ------ |
| **name**        | Single line text | -                               | ✅ Oui |
| **slug**        | Slug             | Base field: `name`, Make unique | ✅ Oui |
| **description** | Multi line text  | -                               | ❌ Non |
| **order**       | Int              | Min: 0, Default: 0              | ✅ Oui |
| **icon**        | Single line text | Emoji ou nom d'icône            | ❌ Non |
| **image**       | Asset            | Single asset, Images only       | ❌ Non |

**Permissions :**

```
Public API:
✅ Read

Token API:
✅ Create, Read, Update, Delete, Publish, Unpublish
```

---

### 2. Modèle Menu 📋

**Création :**

1. Schema → + Add → Model
2. Display Name: `Menu`
3. API ID: `Menu`
4. Plural API ID: `menus`

**Champs :**

| Champ           | Type             | Configuration                                             | Requis |
| --------------- | ---------------- | --------------------------------------------------------- | ------ |
| **name**        | Single line text | -                                                         | ✅ Oui |
| **slug**        | Slug             | Base field: `name`, Make unique                           | ✅ Oui |
| **description** | Multi line text  | -                                                         | ❌ Non |
| **active**      | Boolean          | Default: false                                            | ✅ Oui |
| **startDate**   | Date             | -                                                         | ❌ Non |
| **endDate**     | Date             | -                                                         | ❌ Non |
| **dishes**      | Reference        | Allow multiple values, Reference: Dish, Two-way reference | ❌ Non |

**Permissions :**

```
Public API:
✅ Read

Token API:
✅ Create, Read, Update, Delete, Publish, Unpublish
```

---

### 3. Modifier le Modèle Dish (Plat) 🍴

**Ajouter la relation à Category :**

1. Ouvrez le modèle `Dish`
2. Cliquez sur `+ Add field`
3. Type: `Reference`
4. Display Name: `Category`
5. API ID: `category`
6. Reference model: `Category`
7. ✅ Required field
8. Allow multiple values: ❌ Non (single)
9. Two-way reference:
   - Reverse field display name: `Dishes`
   - Reverse field API ID: `dishes`

---

## 🔗 Relations entre Modèles

```
Category (1) ──> (N) Dish
     │
     └── Exemple: "Entrées" peut avoir plusieurs plats

Menu (N) <──> (N) Dish
     │
     └── Un menu peut contenir plusieurs plats
         Un plat peut être dans plusieurs menus
```

---

## 📝 Exemples de Données

### Catégories à créer :

```
1. Entrées
   - slug: entrees
   - order: 1
   - icon: 🥗

2. Plats
   - slug: plats
   - order: 2
   - icon: 🍖

3. Desserts
   - slug: desserts
   - order: 3
   - icon: 🍰

4. Boissons
   - slug: boissons
   - order: 4
   - icon: 🍷
```

### Menu à créer :

```
Menu de la Semaine
- slug: menu-semaine
- active: true (un seul menu actif à la fois)
- description: Notre sélection de la semaine
- dishes: [Sélectionnez vos plats]
```

---

## ⚠️ Important

1. **Un seul menu actif** : Assurez-vous qu'un seul menu a `active: true`
2. **Relations** : Configurez bien les relations Category → Dish et Menu ↔ Dish
3. **Publication** : N'oubliez pas de publier après création !

---

## 🧪 Test

Une fois configuré, testez dans l'API Playground :

```graphql
query {
  categories(orderBy: order_ASC) {
    name
    slug
    icon
  }

  menus(where: { active: true }) {
    name
    dishes {
      name
      category {
        name
      }
    }
  }
}
```
