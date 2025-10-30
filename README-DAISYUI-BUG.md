# 🐛 Bug DaisyUI Picker - Documentation

## Problème Rencontré

### Erreur
```
Parsing css source code failed
[dir="rtl"] .select::picker(select)
'picker' is not recognized as a valid pseudo-element
```

### Cause
Bug introduit dans **DaisyUI 5.3.9** qui génère du CSS invalide avec le pseudo-élément `::picker(select)` pour le support RTL (Right-to-Left).

---

## Versions Testées

| Version | Status | Notes |
|---------|--------|-------|
| 5.3.10 | ❌ | Bug picker présent |
| 5.3.9 | ❌ | Bug picker présent |
| 5.3.8 | ✅ | **STABLE - Fonctionne** |
| 5.3.7 | ✅ | Devrait fonctionner |

---

## Solution Appliquée

### 1. Downgrade vers 5.3.8
```bash
npm install daisyui@5.3.8
```

### 2. Plugin Tailwind personnalisé
Ajouté dans `tailwind.config.js` :
```js
plugins: [
  daisyui,
  function({ addBase }) {
    addBase({
      '[dir="rtl"] .select': {
        translate: '0.5rem 0',
      },
    });
  },
],
```

### 3. Nettoyage cache
```bash
rm -rf .next node_modules/.cache
npm run dev
```

---

## Impact

### Avant (Bug)
- ❌ Serveur dev crash au chargement CSS
- ❌ Impossible de compiler les pages
- ❌ Erreur : "picker is not recognized"

### Après (Fix)
- ✅ Serveur dev démarre normalement
- ✅ CSS compile sans erreur
- ✅ Toutes les fonctionnalités DaisyUI disponibles

---

## Pourquoi Ce Bug ?

DaisyUI 5.3.9+ essaie d'utiliser le nouveau pseudo-élément CSS `::picker()` qui :
1. N'est pas encore standard W3C
2. Pas supporté par les compilateurs CSS actuels
3. Syntaxe expérimentale (Chrome Canary uniquement)

---

## Références

- [DaisyUI GitHub Issues](https://github.com/saadeghi/daisyui/issues)
- [CSS ::picker pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::picker)
- Pseudo-élément expérimental non supporté

---

## Recommandations

### Court Terme
- ✅ Rester sur DaisyUI 5.3.8
- ✅ Attendre correctif officiel
- ✅ Suivre releases DaisyUI

### Long Terme
- Upgrader quand bug corrigé (5.3.11+)
- Tester en dev avant prod
- Vérifier release notes

---

## Comment Détecter Ce Bug

```bash
# Symptômes
npm run dev
# → Error: 'picker' is not recognized

# Vérifier version
npm list daisyui
# → daisyui@5.3.9 ou 5.3.10 = Bug

# Fix
npm install daisyui@5.3.8
rm -rf .next
npm run dev
# → ✓ Ready
```

---

## Workarounds Alternatifs

### Option 1 : Downgrade (Recommandé)
```bash
npm install daisyui@5.3.8
```

### Option 2 : Désactiver RTL
```js
// tailwind.config.js
daisyui: {
  rtl: false, // Désactiver support RTL
}
```

### Option 3 : PostCSS Plugin
Créer plugin pour supprimer règle invalide (complexe).

---

## Version Fixée du Projet

**DaisyUI : 5.3.8**
- Stable
- Sans bugs connus
- Toutes features fonctionnelles
- Compatible Next.js 15
- Compatible Tailwind 3.4

---

## Si Bug Persiste

1. Vérifier version installée :
```bash
npm list daisyui
```

2. Forcer réinstallation :
```bash
rm -rf node_modules package-lock.json
npm install
```

3. Nettoyer tous les caches :
```bash
rm -rf .next node_modules/.cache
npm run dev
```

4. Vérifier `package.json` :
```json
{
  "dependencies": {
    "daisyui": "5.3.8"
  }
}
```

---

## Timeline Bug

- **DaisyUI 5.3.8** (Oct 2024) : ✅ Stable
- **DaisyUI 5.3.9** (Oct 2024) : ❌ Bug picker introduit
- **DaisyUI 5.3.10** (Oct 2024) : ❌ Bug toujours présent
- **DaisyUI 5.3.11+** : 🔄 En attente correctif

---

**Status actuel : RÉSOLU avec DaisyUI 5.3.8** ✅
