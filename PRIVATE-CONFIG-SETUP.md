# 🔒 Configuration Privée - Guide Rapide

Tu veux que ta config, tes données et tes fichiers restent **100% privés** tout en ayant le code portfolio public et déployé sur GitHub Pages.

## ✅ Solution Implémentée

Le portfolio peut maintenant charger sa configuration depuis:
- 💾 **Local** - Dossiers locaux (config/, data/, lang/)
- 🌐 **Remote** - Repository GitHub privé via GitHub Pages
- 🔄 **Hybrid** - Remote avec fallback local

---

## 🚀 Quick Start

### Option A: Script Automatique (Recommandé)

```bash
./scripts/setup-private-config.sh
```

Le script va:
1. Créer un dossier pour ton repo de config privé
2. Copier config/, data/, lang/ dedans
3. Initialiser git
4. Configurer config-source.json

Ensuite:
1. Crée le repo sur GitHub (PRIVÉ)
2. Push: `git push -u origin main`
3. Active GitHub Pages
4. Done!

### Option B: Manuel

```bash
# 1. Créer repo config privé
mkdir ../my-portfolio-config
cp -r config data lang .env ../my-portfolio-config/
cd ../my-portfolio-config
git init
git add .
git commit -m "Private config"

# 2. Push vers GitHub (repo PRIVÉ)
git remote add origin https://github.com/YOU/my-config.git
git push -u origin main

# 3. Activer GitHub Pages sur ce repo
# (Settings → Pages → main branch)

# 4. Configurer le portfolio
cd ../retro-portfolio
cp config-source.json.example config-source.json
# Éditer avec ton URL GitHub Pages
```

---

## 📝 Configuration

### config-source.json

```json
{
  "mode": "remote",
  "remote": {
    "enabled": true,
    "repo": "username/my-portfolio-config",
    "branch": "main",
    "baseUrl": "https://username.github.io/my-portfolio-config/"
  }
}
```

**Modes disponibles:**
- `"local"` - Dev local
- `"remote"` - Production
- `"hybrid"` - Meilleur des 2!

---

## 🎯 Architecture Finale

```
REPO PUBLIC                        REPO PRIVÉ
───────────                        ──────────
retro-portfolio/                   my-portfolio-config/
├── index.html                     ├── config/
├── admin.html                     │   ├── app.json
├── js/                            │   ├── categories.json
├── config-source.json ────────┐   │   └── ...
│   (pointe vers privé)        │   ├── data/
└── .gitignore                 │   │   ├── painting.json
    (ignore config/)           │   │   └── ...
                               │   ├── lang/
                               │   │   ├── en.json
                               └───│   └── fr.json
                                   └── .env

Déploie sur:                       Déploie sur:
github.io/retro-portfolio/         github.io/my-config/
(PUBLIC)                           (PRIVÉ mais Pages actif)
```

---

## ✨ Avantages

### ✅ Séparation Code/Contenu
- Code portfolio = public, forkable
- Config/data = privé, protégé

### ✅ Mises à Jour Faciles
```bash
# Update code
cd retro-portfolio
git pull upstream main

# Config reste intact!
```

### ✅ Multi-Instances
Un code → plusieurs configs:
- Portfolio perso
- Portfolio pro
- Portfolio client
- etc.

### ✅ Sécurité
- Config gitignored du repo public
- Repo privé sur GitHub
- .env jamais commité

---

## 🔧 Workflow

### Modifier le Contenu

```bash
cd my-portfolio-config
# Éditer data/painting.json, etc.
git add .
git commit -m "Add new painting"
git push

# GitHub Pages redéploie
# Portfolio public charge automatiquement!
```

### Modifier la Config

```bash
cd my-portfolio-config
# Éditer config/categories.json
git add .
git commit -m "Add new content type"
git push

# Portfolio recharge config
```

### Déployer

```bash
# Portfolio public (code)
cd retro-portfolio
git push

# Active GitHub Pages
# Le site charge depuis ton config privé!
```

---

## 🛡️ Sécurité

### ⚠️ Important

GitHub Pages rend les fichiers **publiquement accessibles** même si le repo est privé!

**NE JAMAIS mettre:**
- ❌ Mots de passe
- ❌ Clés API
- ❌ Tokens
- ❌ Info bancaire

**Garder dans .env (jamais commité):**
- ✅ CLOUDINARY_API_SECRET
- ✅ GITHUB_TOKEN

---

## 🎓 Cas d'Usage

### Développement Local

```json
{"mode": "local"}
```

Charge depuis tes dossiers locaux.

### Production

```json
{"mode": "remote", "remote": {"baseUrl": "..."}}
```

Charge depuis GitHub Pages.

### Dev avec Fallback

```json
{"mode": "hybrid"}
```

Essaie remote, si ça échoue → local.

---

## 🔍 Debug

### Console Browser

```javascript
// Voir d'où vient la config
console.log('Source:', AppConfig.source);
// → "local" ou "remote"

console.log('Paths:', AppConfig.paths);
// → URLs ou paths locaux
```

### Vider Cache

```javascript
ConfigLoader.clearCache();
await AppConfig.load();
```

---

## 📚 Documentation Complète

- **DEPLOYMENT.md** - Guide complet de déploiement
- **config-source.json.example** - Template avec tous les paramètres
- **scripts/setup-private-config.sh** - Script d'installation

---

## ✅ Checklist

- [ ] Repo privé créé
- [ ] config/, data/, lang/ copiés
- [ ] .env copié (et gitignored)
- [ ] Git init + commit
- [ ] Repo créé sur GitHub (PRIVÉ)
- [ ] Push vers GitHub
- [ ] GitHub Pages activé
- [ ] URL notée
- [ ] config-source.json configuré
- [ ] Test en local
- [ ] Déploiement sur Pages
- [ ] Ça marche! 🎉

---

**Tu es prêt! Ton portfolio est maintenant public avec config privée.** 🚀
