# Configuration Hygraph

## 1. Créer les modèles dans Hygraph

### Modèle Dish (Plat)
1. Allez dans votre projet Hygraph
2. Schema → Add Model → "Dish"
3. Ajoutez les champs suivants :
   - `name` (String, Single line text, Required)
   - `slug` (String, Slug, Required, Unique) - Basé sur "name"
   - `description` (String, Multi line text, Required)
   - `price` (Float, Required)
   - `category` (Enumeration: Entrées, Plats, Desserts, Boissons)
   - `available` (Boolean, Default: true)
   - `image` (Asset picker, Single asset)

### Modèle Reservation
1. Schema → Add Model → "Reservation"
2. Ajoutez les champs suivants :
   - `name` (String, Single line text, Required)
   - `email` (String, Single line text, Required)
   - `phone` (String, Single line text, Required)
   - `date` (Date, Required)
   - `time` (String, Single line text, Required)
   - `guests` (Int, Required)
   - `message` (String, Multi line text)
   - `status` (Enumeration: pending, confirmed, cancelled)

## 2. Configurer les permissions

1. Settings → API Access
2. Créez un "Permanent Auth Token"
3. Permissions :
   - Dish: Read (public), Create/Update/Delete (avec token)
   - Reservation: Create (public), Read/Update/Delete (avec token)

## 3. Configuration du projet

Ajoutez dans `.env.local`:
```
NEXT_PUBLIC_HYGRAPH_URL=https://mcp-eu-west-2.hygraph.com/cmgz5sumn041u07vzbfvygjzt/master
HYGRAPH_TOKEN=votre_token_ici
NEXT_PUBLIC_BASE_URL=https://lesotlylaisse71.vercel.app
```

## 4. Publier les contenus

Pour chaque Dish créé :
1. Créez le plat
2. Cliquez sur "Publish"

Les réservations sont automatiquement publiées via l'API.

## 5. Test local

```bash
npm run dev
```

Accédez à :
- Menu: http://localhost:3000/menu
- Réservations: http://localhost:3000/reservations
- Admin: http://localhost:3000/admin

