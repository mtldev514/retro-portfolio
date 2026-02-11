# 🚀 Deployment Guide - Private Config Setup

Ce guide explique comment déployer ton portfolio avec une configuration **privée** séparée du code public.

---

## 📦 Architecture

```
Repo PUBLIC (Code)                 Repo PRIVÉ (Config)
──────────────────                 ───────────────────
retro-portfolio/                   my-portfolio-config/
├── index.html                     ├── config/
├── admin.html                     │   ├── app.json
├── js/                            │   ├── categories.json
├── style.css                      │   ├── languages.json
└── config-source.json             │   └── media-types.json
    (pointe vers repo privé)       ├── data/
                                   │   ├── painting.json
                                   │   └── ...
                                   ├── lang/
                                   │   ├── en.json
                                   │   └── fr.json
                                   └── .env
```

---

## 🎯 Modes de Déploiement

### Option 1: Config Locale (Développement)

Pour développer en local avec tes fichiers de config:

```bash
# 1. Garder config/ data/ lang/ en local
# 2. Configurer config-source.json:
{
  "mode": "local",
  "local": {
    "configDir": "config",
    "dataDir": "data",
    "langDir": "lang"
  }
}
```

**Avantages:**
- ✅ Rapide pour développer
- ✅ Pas besoin d'internet
- ✅ Config reste privée (gitignored)

**Désavantages:**
- ❌ Config pas versionée
- ❌ Difficile à déployer

---

### Option 2: Repo Privé + GitHub Pages depuis Repo Config

**Setup:**

1. **Créer repo privé de config:**
```bash
mkdir my-portfolio-config
cd my-portfolio-config

# Copier tes fichiers privés
cp -r ../retro-portfolio/config .
cp -r ../retro-portfolio/data .
cp -r ../retro-portfolio/lang .
cp ../retro-portfolio/.env .

git init
git add .
git commit -m "Initial config"
git remote add origin https://github.com/username/my-portfolio-config.git
git push -u origin main
```

2. **Copier le code public dans le repo config:**
```bash
# Dans my-portfolio-config/
cp -r ../retro-portfolio/*.html .
cp -r ../retro-portfolio/js .
cp -r ../retro-portfolio/style.css .
cp -r ../retro-portfolio/fonts.css .
# etc...

# Créer config-source.json pour mode local
echo '{"mode": "local"}' > config-source.json

git add .
git commit -m "Add portfolio code"
git push
```

3. **Activer GitHub Pages:**
- Settings → Pages
- Source: main branch
- Deploy!

**Avantages:**
- ✅ Tout est privé
- ✅ GitHub Pages gratuit
- ✅ Versionné et sauvegardé
- ✅ URL personnalisée possible

**Désavantages:**
- ❌ Faut copier code à chaque mise à jour

---

### Option 3: Repo Public + Remote Config (Recommandé!)

Le meilleur des deux mondes!

1. **Créer repo privé de config:**
```bash
mkdir my-portfolio-config
cd my-portfolio-config

cp -r ../retro-portfolio/config .
cp -r ../retro-portfolio/data .
cp -r ../retro-portfolio/lang .

git init
git add .
git commit -m "Private config"
git remote add origin https://github.com/username/my-portfolio-config.git
git push -u origin main
```

2. **Activer GitHub Pages sur repo privé:**
- Settings → Pages
- Source: main branch
- Obtenir l'URL: `https://username.github.io/my-portfolio-config/`

3. **Configurer le repo public:**
```bash
cd retro-portfolio

# Éditer config-source.json:
{
  "mode": "remote",
  "remote": {
    "enabled": true,
    "repo": "username/my-portfolio-config",
    "branch": "main",
    "baseUrl": "https://username.github.io/my-portfolio-config/"
  }
}

# Commit et push
git add config-source.json
git commit -m "Configure remote config source"
git push
```

4. **Déployer repo public sur GitHub Pages:**
- Le code public charge automatiquement depuis ton repo privé!

**Avantages:**
- ✅ Code public → tout le monde peut utiliser
- ✅ Config privée → tes données protégées
- ✅ Mises à jour faciles (pull code, config reste)
- ✅ Deux repos indépendants

**Désavantages:**
- ❌ Besoin de gérer 2 repos
- ❌ GitHub Pages doit être activé sur repo privé

---

### Option 4: Mode Hybride (Fallback)

Config remote avec fallback local:

```json
{
  "mode": "hybrid",
  "remote": {
    "enabled": true,
    "repo": "username/my-config",
    "baseUrl": "https://username.github.io/my-config/"
  },
  "local": {
    "configDir": "config",
    "dataDir": "data",
    "langDir": "lang"
  }
}
```

Si remote échoue → utilise local automatiquement!

---

## 🔧 Configuration

### config-source.json

```json
{
  "mode": "local|remote|hybrid",

  "remote": {
    "enabled": true,
    "repo": "username/my-portfolio-config",
    "branch": "main",
    "baseUrl": "https://username.github.io/my-portfolio-config/"
  },

  "local": {
    "configDir": "config",
    "dataDir": "data",
    "langDir": "lang"
  },

  "deployment": {
    "type": "github-pages",
    "buildFromConfigRepo": false
  },

  "cache": {
    "enabled": true,
    "duration": 3600
  }
}
```

---

## 📋 Workflow Recommandé

### Setup Initial

```bash
# 1. Fork/clone le repo public
git clone https://github.com/yourusername/retro-portfolio.git my-portfolio
cd my-portfolio

# 2. Créer ton repo de config privé
mkdir ../my-portfolio-config
cp -r config data lang ../my-portfolio-config/
cd ../my-portfolio-config
git init
git add .
git commit -m "Initial private config"
git remote add origin https://github.com/YOU/my-config.git
git push -u origin main

# 3. Activer GitHub Pages sur repo config
# (via GitHub UI)

# 4. Configurer le portfolio pour charger depuis remote
cd ../my-portfolio
cp config-source.json.example config-source.json
# Éditer config-source.json avec ton URL

# 5. Déployer portfolio public
git push
```

### Mise à jour du Code

```bash
# Pull les dernières updates du portfolio
git pull upstream main

# Ton config reste inchangé!
```

### Mise à jour du Contenu

```bash
cd my-portfolio-config

# Modifier config/data/lang
# ...

git add .
git commit -m "Update content"
git push

# GitHub Pages redéploie automatiquement
# Portfolio public charge la nouvelle config!
```

---

## 🛡️ Sécurité

### Repo Privé de Config

- ✅ GitHub Pages fonctionne même sur repos privés
- ✅ Seul toi as accès au repo
- ✅ Mais les fichiers sont publiquement accessibles via Pages URL
- ⚠️ **Important:** GitHub Pages rend les fichiers publics même si repo privé!

### Protection des Secrets

**NE JAMAIS mettre dans config/data/lang:**
- ❌ Mots de passe
- ❌ Clés API
- ❌ Tokens
- ❌ Informations sensibles

**Garder dans .env (jamais commité):**
- ✅ CLOUDINARY_API_SECRET
- ✅ GITHUB_TOKEN
- ✅ Autres secrets

---

## 🔍 Debug

### Vérifier quel mode est actif

```javascript
// Dans la console du navigateur
console.log('Config source:', AppConfig.source);
console.log('Config paths:', AppConfig.paths);
```

### Forcer rechargement

```javascript
// Vider le cache
ConfigLoader.clearCache();

// Recharger
await AppConfig.load();
```

### Test en local

```bash
# Démarrer serveur local
python3 -m http.server 8000

# Ouvrir http://localhost:8000
# Checker console pour voir d'où vient la config
```

---

## 📝 Checklist de Déploiement

- [ ] Repo privé créé avec config/data/lang
- [ ] GitHub Pages activé sur repo privé
- [ ] URL du repo privé notée
- [ ] config-source.json configuré dans repo public
- [ ] .gitignore empêche commit de config locale
- [ ] .env pas commité
- [ ] Tests en local (mode hybrid recommandé)
- [ ] GitHub Pages activé sur repo public
- [ ] Site fonctionne!

---

## 🎯 Résumé

**Pour développement:**
```json
{"mode": "local"}
```

**Pour production:**
```json
{"mode": "remote", "remote": {"baseUrl": "https://..."}}
```

**Pour sécurité:**
```json
{"mode": "hybrid"}
```

Enjoy! 🚀
