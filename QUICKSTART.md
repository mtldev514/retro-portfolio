# ⚡ Quick Start Guide

Get your retro portfolio up and running in minutes!

---

## 🎯 Choose Your Setup Method

### Option 1: New Portfolio with Submodule (Safest for Updates)

```bash
./create-site.sh my-portfolio
cd ../my-portfolio
nano .env  # Add Cloudinary credentials
python3 -m http.server 8000
```

**Why use this?** Updates are safest with submodules - your data is completely isolated.

### Option 2: Direct Clone (Quick Start)

```bash
git clone https://github.com/yourusername/retro-portfolio.git my-portfolio
cd my-portfolio
./init.sh  # Copy example files
nano .env  # Add Cloudinary credentials
python3 -m http.server 8000
```

**Why use this?** Fastest way to get started and explore.

---

## 📝 Essential Configuration (5 minutes)

### 1. Set Up Cloudinary (Free)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from Dashboard
3. Add to `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Customize Your Portfolio

Edit `config/app.json`:

```json
{
  "siteTitle": "Your Name",
  "githubUser": "yourusername",
  "availableThemes": [
    {"value": "win95", "name": "Windows 95"}
  ]
}
```

### 3. Add Your First Content

Edit `data/painting.json` (or create your own):

```json
[
  {
    "id": "1",
    "title": "My First Artwork",
    "description": "Description here",
    "src": "https://example.com/image.jpg"
  }
]
```

---

## 🎨 Adding Content

### Using the Admin Panel

1. Start backend: `python3 admin_api.py`
2. Open `admin.html` in browser
3. Click "Add New Item"
4. Fill in details and upload
5. Done!

### Manual Upload (Images)

1. Upload to Cloudinary
2. Copy URL
3. Add to `data/your-category.json`

---

## 🌐 Deploy to GitHub Pages (2 minutes)

```bash
git add .
git commit -m "My portfolio"
git push

# On GitHub:
# Settings → Pages → Source: main branch → Save
```

Your site will be live at: `https://yourusername.github.io/repo-name/`

---

## 🔄 Updating Later

When new features are released:

```bash
./update.sh
```

Your personal data (`config/`, `data/`, `lang/`) is **never** affected by updates!

See [UPDATE.md](UPDATE.md) for details.

---

## 🎓 Next Steps

### Customize Appearance
- Change themes in `config/app.json`
- Edit colors in `style.css` (advanced)
- Add/remove languages in `config/languages.json`

### Add Content Types
- Edit `config/categories.json`
- Add corresponding `data/category.json` files
- Add translations in `lang/en.json`

### Advanced Features
- Multi-language: Add `lang/es.json`, `lang/de.json`, etc.
- Custom fields: Edit category definitions
- Private config: See [PRIVATE-CONFIG-SETUP.md](PRIVATE-CONFIG-SETUP.md)

---

## 📚 Full Documentation

- **[README.md](README.md)** - Complete overview
- **[UPDATE.md](UPDATE.md)** - Update guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment options
- **[FEATURES_SUMMARY.md](FEATURES_SUMMARY.md)** - All features
- **[config/README.md](config/README.md)** - Configuration reference

---

## 🆘 Common Issues

### "Admin panel not loading"
```bash
# Make sure backend is running
python3 admin_api.py
```

### "Images not uploading"
```bash
# Check .env file has correct Cloudinary credentials
cat .env
```

### "Changes not showing"
```bash
# Clear browser cache
# Chrome/Firefox: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### "Update broke something"
```bash
# Restore from backup
./scripts/restore-personal.sh latest
```

---

## 🚀 You're Ready!

1. ✅ Portfolio configured
2. ✅ Content added
3. ✅ Deployed online
4. ✅ Know how to update

**Welcome to the retro web!** 🌟

Need help? Check [GitHub Issues](https://github.com/yourusername/retro-portfolio/issues)
