# 🎨 Retro Portfolio - Fully Configurable Portfolio Template

A **fully configurable** retro-styled portfolio website with Win95/90s aesthetic. Perfect for artists, musicians, photographers, and creators who want a unique, nostalgic web presence.

![License](https://img.shields.io/badge/license-MIT-blue)
![Configurable](https://img.shields.io/badge/config-JSON-green)
![Template](https://img.shields.io/badge/template-ready-brightgreen)

---

## ✨ Features

### 🎯 Fully Configurable
- **No code changes needed** - Everything configurable via JSON
- **Custom content types** - Define your own categories (painting, music, blog, etc.)
- **Custom fields** - Add any metadata fields you need
- **Multiple languages** - Add/remove languages easily
- **Themes** - 4 retro themes built-in, easy to add more

### 🎨 Visual & Interactive
- **Winamp-style music player** - 90s nostalgia with full audio controls
- **Image galleries** - Pile multiple images with drag-to-reorder
- **Admin panel** - Easy content management
- **Visual effects** - Glitter text, 90s decorations (optional)
- **Responsive** - Works on all devices (with landscape mode for mobile)

### 🔧 Developer-Friendly
- **Two-level architecture** - MediaType (how) + ContentType (what)
- **Template repo** - Use as base for your own portfolio
- **Git submodule support** - Keep code and content separate
- **Well documented** - Extensive guides and examples

---

## 🚀 Quick Start

**👉 Complete step-by-step guide:** **[SETUP-GUIDE.md](SETUP-GUIDE.md)**

### Fastest Setup (Recommended)

```bash
# 1. Clone and create your portfolio
git clone https://github.com/yourusername/retro-portfolio.git
cd retro-portfolio
./create-site.sh my-portfolio

# 2. Add Cloudinary credentials
cd ../my-portfolio
nano .env  # Add CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET

# 3. Test locally
cd template && python3 admin_api.py &  # Start backend
cd .. && python3 -m http.server 8000   # Serve site
# Open http://localhost:8000
```

**Then:** Push to GitHub, enable Pages, done! See [SETUP-GUIDE.md](SETUP-GUIDE.md) for details.

### Alternative: Quick Test (No Submodules)

```bash
git clone https://github.com/yourusername/retro-portfolio.git my-test
cd my-test
./init.sh  # Copy example files
nano .env  # Add Cloudinary credentials
python3 -m http.server 8000
```

---

## 📁 Structure

### Template Files

```
retro-portfolio/
├── *.html                  # HTML pages
├── js/                     # JavaScript
├── *.css                   # Stylesheets
├── config.example/         # Configuration templates
├── data.example/           # Data templates
├── lang.example/           # Translation templates
├── init.sh                 # Initialize from templates
└── create-site.sh          # Create new site
```

### After Initialization

```
your-portfolio/
├── config/                # Your configuration
├── data/                  # Your content
├── lang/                  # Your translations
└── .env                  # Your secrets (gitignored)
```

---

## ⚙️ Configuration System

Everything configurable through JSON in `config/`:

- **`app.json`** - App settings, API, GitHub, UI
- **`media-types.json`** - Media type definitions (image, audio, video)
- **`categories.json`** - Content types with custom fields
- **`languages.json`** - Supported languages

**Visual Configuration Manager** available at `config-manager.html`!

---

## 🎓 Examples

### Add New Language

```json
// config/languages.json
{"code": "de", "name": "Deutsch", "flag": "🇩🇪"}
```

Create `lang/de.json`. Done!

### Add Content Type

```json
// config/categories.json
{
  "id": "podcast",
  "mediaType": "audio",
  "fields": {
    "optional": [
      {"name": "episode", "type": "text", "label": "Episode #"}
    ]
  }
}
```

---

## 🌐 Deployment

### GitHub Pages

```bash
# Push your portfolio repo
git push

# Enable Pages: Settings → Pages → main branch
# Live at: https://username.github.io/repo-name/
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for advanced options.

---

## 🔄 Updating

Keep your portfolio up-to-date while preserving your customizations:

```bash
./update.sh
```

Your personal data (`config/`, `data/`, `lang/`, `.env`) is **always preserved**!

See **[UPDATE.md](UPDATE.md)** for detailed update instructions.

---

## 📚 Documentation

**📖 [Complete Documentation Index](DOCUMENTATION-INDEX.md)** - Find any guide quickly!

### Getting Started
- **[Setup Guide](SETUP-GUIDE.md)** ⭐ - Complete beginner-to-deployed guide
- **[Quick Start](QUICKSTART.md)** - Fast reference for common tasks

### Reference
- **[Update Guide](UPDATE.md)** - Keep template current without losing data
- **[Configuration Guide](config/README.md)** - All config options
- **[Features Summary](FEATURES_SUMMARY.md)** - What this template can do

### Deployment & Advanced
- **[Deployment Guide](DEPLOYMENT-EN.md)** - GitHub Pages, Netlify, Vercel (English)
- **[Guide de Déploiement](DEPLOYMENT.md)** - Configuration avancée (Français)
- **[Separate Repo Setup](SEPARATE-REPO-SETUP.md)** - Fix git remote issues

---

## 🎯 Architecture

**Two-Level System:**

```
MediaType (How to display)     ContentType (What to create)
─────────────────────────      ─────────────────────────────
🖼️ Image → ImageViewer         🎨 Painting (medium, dimensions)
                                📷 Photography (camera, lens)

🎵 Audio → AudioPlayer          🎵 Music (genre, lyrics)
                                🎙️ Podcast (episode, guest)

🎬 Video → VideoPlayer          🎬 Film (duration, director)

📝 Text → TextRenderer          📝 Blog (tags, category)

🔗 Link → LinkCard              💻 Projects (tech stack, repo)
```

---

## 🤝 Contributing

Improvements welcome! Fork, make changes, submit PR.

---

## 📝 License

MIT - Free for personal or commercial use!

---

## 🙏 Credits

Made with 💜 by Alex

Inspired by Win95, Geocities, and 90s internet nostalgia.

---

## 🚀 Get Started Now

```bash
./create-site.sh my-portfolio
```

**Welcome to the retro web!** 🌟
