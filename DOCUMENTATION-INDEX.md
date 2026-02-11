# 📚 Documentation Index

Complete guide to all Retro Portfolio documentation.

---

## 🎯 Start Here

**New to Retro Portfolio?** Follow this path:

1. **[README.md](README.md)** - Overview and quick start
2. **[SETUP-GUIDE.md](SETUP-GUIDE.md)** ⭐ - Complete setup from zero to deployed
3. **[QUICKSTART.md](QUICKSTART.md)** - Quick reference for common tasks

---

## 📖 By Topic

### Setup & Installation

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[SETUP-GUIDE.md](SETUP-GUIDE.md)** | Complete beginner guide | First-time setup |
| **[QUICKSTART.md](QUICKSTART.md)** | Fast reference | Need quick commands |
| **[SEPARATE-REPO-SETUP.md](SEPARATE-REPO-SETUP.md)** | Fix git remote issues | Cloned wrong repo |

### Configuration

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[config/README.md](config/README.md)** | Complete config reference | Customizing portfolio |
| **[CONFIGURATION_MIGRATION.md](CONFIGURATION_MIGRATION.md)** | Migration from old versions | Upgrading from v1.x |
| **[FEATURES_SUMMARY.md](FEATURES_SUMMARY.md)** | All available features | What can this do? |

### Deployment

| Document | Language | Description | When to Use |
|----------|----------|-------------|-------------|
| **[DEPLOYMENT-EN.md](DEPLOYMENT-EN.md)** | English | Deployment guide | Deploying to web |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Français | Guide complet de déploiement | Configuration avancée |
| **[PRIVATE-CONFIG-SETUP.md](PRIVATE-CONFIG-SETUP.md)** | Français | Configuration privée | Contenu privé |

### Updates & Maintenance

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[UPDATE.md](UPDATE.md)** | Update guide | Template has new features |
| **[CHANGELOG.md](CHANGELOG.md)** | Version history | See what's new |

---

## 🔤 By Language

### English

- README.md
- SETUP-GUIDE.md
- QUICKSTART.md
- UPDATE.md
- DEPLOYMENT-EN.md
- SEPARATE-REPO-SETUP.md
- CONFIGURATION_MIGRATION.md
- FEATURES_SUMMARY.md
- config/README.md

### Français

- DEPLOYMENT.md (Guide de déploiement complet)
- PRIVATE-CONFIG-SETUP.md (Configuration privée)

---

## 🎓 By Skill Level

### Beginner

Start with these:

1. [README.md](README.md) - Overview
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Step-by-step setup
3. [DEPLOYMENT-EN.md](DEPLOYMENT-EN.md) - Deploy to web

### Intermediate

Once you're comfortable:

1. [config/README.md](config/README.md) - Deep customization
2. [FEATURES_SUMMARY.md](FEATURES_SUMMARY.md) - Advanced features
3. [UPDATE.md](UPDATE.md) - Keep template updated

### Advanced

For power users:

1. [DEPLOYMENT.md](DEPLOYMENT.md) - Private config deployment (French)
2. [PRIVATE-CONFIG-SETUP.md](PRIVATE-CONFIG-SETUP.md) - Separate repos (French)
3. [CONFIGURATION_MIGRATION.md](CONFIGURATION_MIGRATION.md) - Version migrations

---

## 🚀 Common Workflows

### "I want to create my portfolio"
1. Read [SETUP-GUIDE.md](SETUP-GUIDE.md)
2. Follow "Beginner Setup" section
3. Deploy with [DEPLOYMENT-EN.md](DEPLOYMENT-EN.md)

### "I need to update the template"
1. Read [UPDATE.md](UPDATE.md)
2. Run `./update.sh`
3. Test and deploy

### "My git remote is wrong"
1. Read [SEPARATE-REPO-SETUP.md](SEPARATE-REPO-SETUP.md)
2. Follow Option A (change remote)
3. Push to your repo

### "I want private content, public code"
1. Read [DEPLOYMENT.md](DEPLOYMENT.md) (French)
2. Create two repos
3. Configure `config-source.json`

### "I want to customize everything"
1. Read [config/README.md](config/README.md)
2. Edit `config/*.json` files
3. See [FEATURES_SUMMARY.md](FEATURES_SUMMARY.md) for available options

---

## 📋 Quick Reference

### Scripts

| Script | Purpose | Where |
|--------|---------|-------|
| `create-site.sh` | Create new portfolio with submodule | Template repo |
| `init.sh` | Initialize direct clone | Template repo |
| `update.sh` | Update template safely | Both |
| `scripts/backup-personal.sh` | Backup your data | Both |
| `scripts/restore-personal.sh` | Restore from backup | Both |
| `scripts/fix-repo-remote.sh` | Fix git remote | Template repo |

### Key Files

| File | Purpose | Location |
|------|---------|----------|
| `.env` | Cloudinary credentials | Root (gitignored) |
| `config-source.json` | Config source mode | Root (gitignored) |
| `config/*.json` | Portfolio configuration | `config/` (gitignored) |
| `data/*.json` | Portfolio content | `data/` (gitignored) |
| `lang/*.json` | Translations | `lang/` (gitignored) |

### Important Directories

| Directory | Purpose | Gitignored? |
|-----------|---------|-------------|
| `config/` | Your configuration | ✅ Yes |
| `data/` | Your content | ✅ Yes |
| `lang/` | Your translations | ✅ Yes |
| `config.example/` | Config templates | ❌ No |
| `data.example/` | Data templates | ❌ No |
| `lang.example/` | Translation templates | ❌ No |
| `template/` | Code (submodule) | Varies |

---

## 🔍 Finding Information

### "How do I..."

| Task | Document |
|------|----------|
| Set up for the first time | [SETUP-GUIDE.md](SETUP-GUIDE.md) |
| Deploy to GitHub Pages | [DEPLOYMENT-EN.md](DEPLOYMENT-EN.md) |
| Update the template | [UPDATE.md](UPDATE.md) |
| Change git remote | [SEPARATE-REPO-SETUP.md](SEPARATE-REPO-SETUP.md) |
| Add a new language | [config/README.md](config/README.md) |
| Create custom content type | [config/README.md](config/README.md) |
| Use private config | [DEPLOYMENT.md](DEPLOYMENT.md) (French) |
| Fix update issues | [UPDATE.md](UPDATE.md) #Troubleshooting |

### "What is..."

| Question | Answer |
|----------|--------|
| The difference between `config/` and `config.example/`? | `config/` is yours (gitignored), `config.example/` is the template |
| A submodule setup? | Template code in `template/` folder, your content in parent |
| Direct setup? | Everything in one repo, examples copied to working dirs |
| Remote config? | Config loaded from separate GitHub repo |
| Cloudinary? | Cloud service for hosting images/audio/video |

---

## 💡 Tips

1. **Bookmark this page** - Central reference for all docs
2. **Read SETUP-GUIDE.md first** - Most comprehensive beginner guide
3. **Check CHANGELOG.md** - See what's new in updates
4. **Use scripts** - They're safer than manual commands
5. **Your data is safe** - `config/`, `data/`, `lang/` are gitignored

---

## 🆘 Still Need Help?

1. Check [GitHub Issues](https://github.com/mtldev514/retro-portfolio/issues)
2. Search existing issues for your problem
3. Open new issue with:
   - What you're trying to do
   - What you expected
   - What actually happened
   - Error messages

---

**Last Updated:** 2026-02-11
**Documentation Version:** 2.1.0
