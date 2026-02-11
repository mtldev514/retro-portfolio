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

### Option 1: Create New Portfolio Site (Recommended)

```bash
# Use create-site.sh to set up a new portfolio
./create-site.sh my-portfolio

# This creates:
# - New directory with git submodule
# - Your own config/data/lang directories
# - Symlinks to template code
# - Ready to customize!
```

### Option 2: Direct Use

```bash
# Clone this repo
git clone https://github.com/mtldev514/retro-portfolio.git
cd retro-portfolio

# Initialize (copies .example files)
./init.sh

# Edit your credentials
nano .env

# Start backend
python3 admin_api.py

# Open in browser
open index.html
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

## 📚 Documentation

- **[Configuration Guide](config/README.md)** - Complete reference
- **[Deployment Guide](DEPLOYMENT.md)** - Deployment options
- **[Features Summary](FEATURES_SUMMARY.md)** - All features
- **[Private Config](PRIVATE-CONFIG-SETUP.md)** - Advanced setup

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
