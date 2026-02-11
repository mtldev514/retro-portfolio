# 🎯 Complete Setup Guide

**New to Retro Portfolio?** This is your step-by-step guide from zero to deployed portfolio.

---

## 🚦 Choose Your Path

### Path 1: Beginner-Friendly (Recommended) ⭐

**Best for:**
- First-time users
- Want safest updates
- Plan to keep portfolio long-term

**Setup time:** 10 minutes

**Method:** Submodule setup via `create-site.sh`

👉 **[Jump to Beginner Setup](#beginner-setup-recommended)**

---

### Path 2: Quick Test

**Best for:**
- Just exploring the template
- Quick customization test
- Don't need separate repos

**Setup time:** 5 minutes

**Method:** Direct clone with `init.sh`

👉 **[Jump to Quick Test Setup](#quick-test-setup)**

---

### Path 3: Advanced

**Best for:**
- Experienced developers
- Custom git workflow
- Fork + modify template

**Setup time:** 15+ minutes

**See:** [ADVANCED-SETUP.md](ADVANCED-SETUP.md)

---

## 🌟 Beginner Setup (Recommended)

This creates a clean separation between template code and your content.

### Prerequisites

- [ ] Git installed
- [ ] GitHub account
- [ ] Cloudinary account (free tier works) - [Sign up](https://cloudinary.com)

### Step 1: Create Your Portfolio Structure

```bash
cd ~/Developer  # or wherever you keep projects

# Clone the template
git clone https://github.com/mtldev514/retro-portfolio.git
cd retro-portfolio

# Create your portfolio site
./create-site.sh my-portfolio
```

**What this does:**
- Creates `../my-portfolio/` directory
- Adds template as git submodule in `my-portfolio/template/`
- Copies example files to `my-portfolio/config/`, `data/`, `lang/`
- Creates symlinks to template HTML/CSS/JS files
- Initializes git repo for your portfolio

**Result:**
```
my-portfolio/
├── template/          ← Template code (submodule)
│   ├── index.html
│   ├── admin.html
│   ├── js/
│   └── ...
├── config/           ← YOUR configuration
├── data/             ← YOUR content
├── lang/             ← YOUR translations
└── .env              ← YOUR credentials
```

### Step 2: Set Up Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com) (free)
2. Go to Dashboard
3. Copy your credentials

```bash
cd ../my-portfolio
nano .env
```

Add your credentials:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Save and exit (Ctrl+O, Enter, Ctrl+X).

### Step 3: Customize Your Portfolio

Edit your basic info:

```bash
nano config/app.json
```

Change at minimum:
```json
{
  "siteTitle": "Your Name",
  "githubUser": "your-github-username"
}
```

### Step 4: Test Locally

**Option A: Static site only (no admin panel)**
```bash
python3 -m http.server 8000
```
Open: http://localhost:8000

**Option B: With admin panel (recommended)**
```bash
# Terminal 1: Start backend
cd template
python3 admin_api.py

# Terminal 2: Serve frontend
cd ..
python3 -m http.server 8000
```
Open: http://localhost:8000
Admin: http://localhost:8000/admin.html

### Step 5: Add Your Content

#### Using Admin Panel (Easiest)

1. Open http://localhost:8000/admin.html
2. Click "Add New Item"
3. Upload image/audio/video
4. Fill in details
5. Save

#### Manual Method

Edit data files directly:

```bash
nano data/painting.json
```

Add your items:
```json
[
  {
    "id": "1",
    "title": "My Artwork",
    "description": "Description here",
    "src": "https://res.cloudinary.com/YOUR_CLOUD/..."
  }
]
```

### Step 6: Create GitHub Repo

1. Go to https://github.com/new
2. Name: `my-portfolio` (or whatever you used)
3. **Don't** initialize with README or .gitignore
4. Click "Create repository"

### Step 7: Push to GitHub

```bash
# Set your repo as remote
git remote remove origin  # Remove template remote
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git

# Push your portfolio
git push -u origin main
```

### Step 8: Deploy to GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Source: **main** branch
5. Folder: **/ (root)**
6. Click **Save**

Wait 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/my-portfolio/
```

### Step 9: Update in the Future

When template gets new features:

```bash
cd my-portfolio

# Automated update (safest)
cd template
git pull origin main
cd ..

# Commit the update
git add template
git commit -m "Update template"
git push
```

**Your content is NEVER affected** - it's in separate directories!

---

## ⚡ Quick Test Setup

For quick testing without submodules.

### Step 1: Clone and Initialize

```bash
cd ~/Developer

# Clone the repo
git clone https://github.com/mtldev514/retro-portfolio.git my-portfolio-test
cd my-portfolio-test

# Copy example files
./init.sh
```

### Step 2: Set Up Cloudinary

```bash
nano .env
```

Add credentials:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Customize

```bash
nano config/app.json
```

Change `siteTitle` and `githubUser`.

### Step 4: Test Locally

**Static site:**
```bash
python3 -m http.server 8000
```

**With admin panel:**
```bash
# Terminal 1
python3 admin_api.py

# Terminal 2
python3 -m http.server 8000
```

### Step 5: Deploy

**To use this long-term, you need to change the git remote:**

See: [SEPARATE-REPO-SETUP.md](SEPARATE-REPO-SETUP.md)

**Or just keep testing locally!**

---

## 🆘 Common Issues

### "Admin panel not loading"

**Problem:** Backend not running

**Solution:**
```bash
# Make sure you're in the right directory
cd my-portfolio/template  # (for submodule setup)
# OR
cd my-portfolio  # (for direct setup)

# Start backend
python3 admin_api.py
```

### "Images not uploading"

**Problem:** Wrong Cloudinary credentials

**Solution:**
```bash
# Check your .env file
cat .env

# Make sure values match your Cloudinary dashboard
# No quotes, no spaces around =
```

### "Changes not showing"

**Problem:** Browser cache

**Solution:**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### "Update broke something"

**Problem:** Rare, but if template update conflicts

**Solution:**
```bash
# Your data is safe! Just restore:
git checkout config/
git checkout data/
git checkout lang/
git checkout .env

# Then try update again
```

---

## 📚 Next Steps

After setup, explore these topics:

### Customization
- **[Configuration Guide](config/README.md)** - All config options
- **[Features Summary](FEATURES_SUMMARY.md)** - Available features

### Content Management
- Use admin panel at `/admin.html`
- Or edit JSON files in `data/` directly
- Multi-language support in `lang/`

### Updates
- **[Update Guide](UPDATE.md)** - Keep template current
- Your data is always preserved
- Easy rollback if needed

### Advanced
- **[Advanced Setup](ADVANCED-SETUP.md)** - Custom workflows
- **[Private Config](PRIVATE-CONFIG-SETUP.md)** - Separate config repo
- **[Deployment Options](DEPLOYMENT.md)** - Netlify, Vercel, etc.

---

## 🎓 Understanding the Structure

### Submodule Setup (Beginner Path)

```
my-portfolio/          ← YOUR repo (your content)
├── template/          ← Submodule (template code)
│   ├── index.html
│   ├── admin.html
│   └── js/
├── config/           ← Gitignored (your config)
├── data/             ← Gitignored (your content)
├── lang/             ← Gitignored (your translations)
└── .env              ← Gitignored (your secrets)
```

**Updates:**
- `cd template && git pull` gets new features
- Your `config/data/lang/` never touched
- Super safe!

### Direct Setup (Quick Test)

```
my-portfolio/         ← Clone of template
├── index.html        ← Template files
├── admin.html
├── js/
├── config/          ← Gitignored (your config)
├── data/            ← Gitignored (your content)
└── .env             ← Gitignored (your secrets)
```

**Updates:**
- `git pull` gets new features
- Your `config/data/lang/` gitignored, so safe
- Need to manage git remote manually

---

## ✅ Setup Checklist

After following this guide, you should have:

- [x] Portfolio running locally
- [x] Cloudinary configured
- [x] Basic customization done
- [x] At least one content item added
- [x] Pushed to GitHub
- [x] Deployed to GitHub Pages
- [x] Know how to update in future

**Congratulations! Your retro portfolio is live! 🎉**

---

## 💡 Pro Tips

1. **Start simple** - Use example content first, customize later
2. **Backup before updates** - `./scripts/backup-personal.sh`
3. **Test locally first** - Don't push broken code to production
4. **Use admin panel** - Easier than editing JSON manually
5. **Clear cache often** - Browser caches CSS/JS aggressively

---

Need help? Check [GitHub Issues](https://github.com/mtldev514/retro-portfolio/issues) or open a new one!
