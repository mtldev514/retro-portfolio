# 🔒 Portfolio Configuration (Private)

This is your **private configuration repository** for the retro-portfolio.

---

## 📁 Contents

```
my-portfolio-config/
├── config/                  # Configuration files
│   ├── app.json            # App settings
│   ├── categories.json     # Content types
│   ├── languages.json      # Supported languages
│   └── media-types.json    # Media type definitions
│
├── data/                    # Your content
│   ├── painting.json
│   ├── photography.json
│   ├── music.json
│   └── ...
│
├── lang/                    # Translations
│   ├── en.json
│   ├── fr.json
│   └── ...
│
└── .env                     # Secrets (Cloudinary, GitHub token)
```

---

## 🔗 Linked Portfolio

This config is used by your portfolio at:
- **Code:** https://github.com/YOUR_USERNAME/retro-portfolio
- **Live:** https://YOUR_USERNAME.github.io/retro-portfolio/

---

## 🚀 GitHub Pages Setup

Even though this repo is **private**, you can enable GitHub Pages to serve the config:

1. Go to **Settings** → **Pages**
2. Source: **main** branch
3. Click **Save**

Your config will be accessible at:
```
https://YOUR_USERNAME.github.io/YOUR_CONFIG_REPO/
```

⚠️ **Note:** Files become publicly accessible via Pages even though repo is private!

---

## 🛡️ Security

### ✅ Safe to Commit

- Configuration files (config/)
- Content data (data/)
- Translation files (lang/)
- Public metadata

### ❌ NEVER Commit

- `.env` file (secrets!)
- API keys
- Passwords
- Tokens
- Personal info

**The `.gitignore` file protects you from accidentally committing `.env`**

---

## 📝 How to Update

### Add New Content

```bash
# Edit data files
nano data/painting.json

# Commit and push
git add data/
git commit -m "Add new painting"
git push

# GitHub Pages redeploys automatically
# Your portfolio loads the new content!
```

### Modify Configuration

```bash
# Edit config
nano config/categories.json

# Commit and push
git add config/
git commit -m "Add new content type"
git push
```

### Update Translations

```bash
# Edit language files
nano lang/en.json

# Commit and push
git add lang/
git commit -m "Update translations"
git push
```

---

## 🔄 Sync with Portfolio Code

The portfolio code repo is separate. To update the code:

```bash
cd ../retro-portfolio

# Pull latest updates
git pull origin main

# Your config stays intact!
```

---

## 🎯 Content Types

Available content types (configured in `config/categories.json`):

- 🎨 **Painting** - Traditional paintings
- ✏️ **Drawing** - Hand-drawn artwork
- 📷 **Photography** - Photographic works
- 🗿 **Sculpting** - 3D sculptural works
- 🎵 **Music** - Musical compositions
- 💻 **Projects** - Web projects and code

You can add more types via the Configuration Manager!

---

## 🌐 Languages

Supported languages (configured in `config/languages.json`):

- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇲🇽 Español (mx)
- 🇭🇹 Kreyòl (ht)

Add more languages by:
1. Adding to `config/languages.json`
2. Creating `lang/YOUR_LANG.json`
3. Translating all keys

---

## 📊 File Formats

### Data Files (data/*.json)

```json
[
  {
    "id": "unique_id",
    "title": {
      "en": "English Title",
      "fr": "Titre Français"
    },
    "url": "https://cloudinary.com/image.jpg",
    "description": {
      "en": "Description",
      "fr": "Description"
    },
    "date": "2024-01-01",
    "gallery": ["url1.jpg", "url2.jpg"]
  }
]
```

### Translation Files (lang/*.json)

```json
{
  "header_title": "My Portfolio",
  "nav_home": "Home",
  "nav_about": "About"
}
```

---

## 🔧 Admin Panel

Manage your content via the admin panel:

```
https://YOUR_DOMAIN/admin.html
```

Features:
- 📤 Upload new media
- ✏️ Edit existing items
- 🗑️ Delete items
- 🌐 Manage translations
- ⚙️ Configure content types

---

## 💾 Backup

This repo IS your backup! But consider:

```bash
# Clone to another location
git clone THIS_REPO ~/Backups/portfolio-config

# Or download ZIP regularly via GitHub UI
```

---

## 🆘 Troubleshooting

### Portfolio not loading config?

Check:
1. GitHub Pages is enabled
2. URL in portfolio's `config-source.json` is correct
3. Files are committed and pushed
4. Wait 1-2 minutes for Pages to deploy

### Changes not appearing?

```bash
# Clear browser cache
# Or open in incognito mode
```

### Config-source.json in portfolio

Make sure it points to THIS repo:

```json
{
  "mode": "remote",
  "remote": {
    "enabled": true,
    "baseUrl": "https://YOUR_USERNAME.github.io/THIS_REPO/"
  }
}
```

---

## 📞 Support

- Portfolio Code: https://github.com/mtldev514/retro-portfolio
- Documentation: See DEPLOYMENT.md in code repo
- Issues: GitHub Issues in code repo

---

**Keep this repo PRIVATE to protect your content!** 🔒
