# 🔄 Updating Retro Portfolio

This guide explains how to update your portfolio to the latest version while preserving your personal customizations.

---

## 📋 What Gets Preserved During Updates

Your personal data is **completely safe** during updates:

✅ **Always Preserved:**
- `config/` - Your configuration files
- `data/` - Your content (paintings, photos, music, etc.)
- `lang/` - Your translations
- `.env` - Your API credentials
- `config-source.json` - Your deployment settings

✅ **Updated:**
- `*.html` - Core HTML files
- `*.css` - Stylesheets
- `js/` - JavaScript functionality
- `*.example` files - Templates (you can manually copy new features)

---

## 🎯 Update Methods

Choose based on how you set up your portfolio:

### Method 1: Git Submodule (Recommended - Safest)

If you used `create-site.sh` to create your portfolio:

```bash
# Navigate to your portfolio
cd my-portfolio

# Update the template
cd template
git pull origin main
cd ..

# Commit the update
git add template
git commit -m "Update template to latest version"

# Done! Your config/data/lang are untouched
```

**Why this is safest:** Your content is in a separate repo, completely isolated from template code.

---

### Method 2: Direct Repo (Manual Update)

If you cloned the repo directly and customized it:

#### Step 1: Backup Your Data

```bash
# Create backup
./scripts/backup-personal.sh

# Or manually:
cp -r config .backup-config
cp -r data .backup-data
cp -r lang .backup-lang
cp .env .backup-env
cp config-source.json .backup-config-source.json
```

#### Step 2: Update Template Code

```bash
# Stash your changes (they're gitignored, so this is just to be safe)
git stash

# Pull latest updates
git pull origin main

# Restore your stash (should be no conflicts)
git stash pop
```

#### Step 3: Verify Your Data

```bash
# Check that your data is still there
ls -la config/
ls -la data/
ls -la lang/

# If anything is missing, restore from backup:
# cp -r .backup-config/* config/
# cp -r .backup-data/* data/
# cp -r .backup-lang/* lang/
```

---

### Method 3: Fork Update

If you forked the repo on GitHub:

```bash
# Add upstream remote (first time only)
git remote add upstream https://github.com/mtldev514/retro-portfolio.git

# Fetch upstream changes
git fetch upstream

# Backup first
./scripts/backup-personal.sh

# Merge upstream changes
git merge upstream/main

# Resolve conflicts if any (should be minimal since your data is gitignored)
```

---

## 🆕 Getting New Features

When we add new features, they appear in `.example` files. To adopt them:

### New Configuration Options

```bash
# Compare your config with the new example
diff config/app.json config.example/app.json.example

# Manually add any new fields you want to use
nano config/app.json
```

### New Content Types

```bash
# Check for new categories
cat config.example/categories.json.example

# Check for new media types
cat config.example/media-types.json.example

# Copy relevant sections to your config
```

### New Languages

```bash
# See if new language keys were added
diff lang/en.json lang.example/en.json.example

# Add new keys to your translation files
nano lang/en.json
nano lang/fr.json
```

---

## 🛡️ Safety Mechanisms

Your data is protected by multiple layers:

1. **`.gitignore`** - Prevents `config/`, `data/`, `lang/` from being tracked
2. **`.example` files** - Templates are separate from your data
3. **Submodules** (if used) - Complete isolation
4. **Backup scripts** - Easy restoration if needed

---

## 📦 Update Script (Automated)

We provide an update script that handles everything:

```bash
./update.sh
```

This script will:
1. Detect your setup type (submodule or direct)
2. Create automatic backups
3. Pull latest changes
4. Verify your data integrity
5. Show you what changed
6. Provide rollback instructions if needed

---

## 🔍 Checking What Changed

After updating, see what's new:

```bash
# View changelog
cat CHANGELOG.md

# See git changes
git log --oneline --graph --decorate -10

# Compare example files
diff -r config.example/ .backup-personal/config.example/
```

---

## 🚨 Troubleshooting

### "I lost my data!"

Don't panic. Check these locations:

```bash
# 1. Check gitignored files are still there
ls -la config/ data/ lang/

# 2. Check automatic backup
ls -la .backup-personal/

# 3. Check git reflog
git reflog

# 4. Restore from backup
./scripts/restore-personal.sh

# Or manually:
cp -r .backup-personal/config/* config/
cp -r .backup-personal/data/* data/
cp -r .backup-personal/lang/* lang/
```

### "Merge conflicts on update"

This should be rare since your data is gitignored:

```bash
# See what's conflicting
git status

# Usually you can just keep your version
git checkout --ours config/app.json

# Or keep the new version and re-add your changes
git checkout --theirs config/app.json
nano config/app.json  # Re-add your settings
```

### "New features aren't showing up"

```bash
# Clear browser cache
# - Chrome: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
# - Firefox: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)

# Or force reload all assets
rm -rf .cache/  # If you have caching enabled
```

---

## 🎓 Best Practices

1. **Always backup before updating**
   ```bash
   ./scripts/backup-personal.sh
   ```

2. **Read the changelog first**
   ```bash
   cat CHANGELOG.md
   ```

3. **Test locally before deploying**
   ```bash
   python3 -m http.server 8000
   open http://localhost:8000
   ```

4. **Use submodules for new projects**
   ```bash
   ./create-site.sh my-new-portfolio
   ```

5. **Keep your fork/repo synced regularly** (don't wait for major versions)

---

## 📅 Update Frequency

- **Check for updates:** Monthly
- **Security updates:** Apply immediately
- **Feature updates:** When you need the feature
- **Breaking changes:** We'll mark clearly in CHANGELOG.md

---

## 🆘 Need Help?

1. Check [GitHub Issues](https://github.com/mtldev514/retro-portfolio/issues)
2. Read [Documentation](README.md)
3. Open a new issue with:
   - Your setup method (submodule/direct/fork)
   - Error messages
   - What you tried

---

## ✅ Update Checklist

Before updating:
- [ ] Read CHANGELOG.md
- [ ] Backup your data (`./scripts/backup-personal.sh`)
- [ ] Note current version (`git log -1`)
- [ ] Close any running backend (`admin_api.py`)

After updating:
- [ ] Verify your content is intact
- [ ] Check for new `.example` files
- [ ] Test locally
- [ ] Update your deployment
- [ ] Clear browser cache

---

**Remember:** Your `config/`, `data/`, and `lang/` directories are **never** affected by updates. They're gitignored and completely under your control!

🎨 Happy updating!
