# Changelog

All notable changes to this project will be documented in this file.

---

## [2.1.1] - 2026-02-11

### 📚 Documentation Overhaul

This release completely reorganizes and improves documentation for clarity, consistency, and completeness.

### Added

#### New Documentation
- 📖 **SETUP-GUIDE.md** - Comprehensive beginner-to-deployed guide
  - Clear path selection (Beginner/Quick Test/Advanced)
  - Step-by-step instructions with commands
  - Troubleshooting common issues
  - Understanding different setup types

- 📑 **DOCUMENTATION-INDEX.md** - Central documentation hub
  - Organized by topic, language, and skill level
  - Quick reference tables for scripts and files
  - Common workflows and "How do I..." index
  - Easy navigation to any guide

- 🚀 **DEPLOYMENT-EN.md** - English deployment guide
  - GitHub Pages, Netlify, Vercel instructions
  - Custom domain setup
  - Backend deployment options
  - Post-deployment checklist

- 📋 **DOCUMENTATION-FIXES-SUMMARY.md** - Documentation improvement details

### Changed

#### Updated Documentation
- **README.md** - Simplified and clarified
  - Single clear recommended path
  - Prominent link to SETUP-GUIDE.md
  - Documentation section reorganized
  - Language-appropriate doc links

- **Terminology standardized** across all docs
  - Consistent use of "template", "portfolio", "setup methods"
  - Clear distinction between beginner/quick/advanced paths

### Fixed

#### Documentation Issues Resolved
- ✅ Mixed language issue (French/English) now clearly labeled
- ✅ Multiple "recommended" paths consolidated to ONE clear path
- ✅ Backend startup instructions now consistent across all docs
- ✅ Eliminated contradicting information between guides
- ✅ Added English deployment guide (previously only French)

### Notes

- French documentation (DEPLOYMENT.md, PRIVATE-CONFIG-SETUP.md) retained for advanced users
- All docs now reference DOCUMENTATION-INDEX.md for easy navigation
- Beginner users now have clear, single path from zero to deployed

---

## [2.1.0] - 2026-02-11

### 🔄 Update System

This release adds comprehensive update tooling to safely update your portfolio while preserving customizations.

### Added

#### Update Infrastructure
- 🔄 **Automated update script** (`update.sh`)
  - Detects setup type (submodule/direct/fork)
  - Creates automatic backups before updating
  - Verifies data integrity after updates
  - Shows changelog and new features
  - Provides rollback instructions

- 📦 **Backup/Restore system**
  - `scripts/backup-personal.sh` - Backup user data
  - `scripts/restore-personal.sh` - Restore from backup
  - Timestamped backups (keeps last 5)
  - Backup verification and info files

- 📚 **Update Documentation** (`UPDATE.md`)
  - Complete update guide for all setup types
  - Safety mechanisms explained
  - Troubleshooting section
  - Best practices and update checklist

- 🛠️ **Repository Management**
  - `scripts/fix-repo-remote.sh` - Fix git remote issues
  - `SEPARATE-REPO-SETUP.md` - Guide for separate content repo
  - `QUICKSTART.md` - Quick reference guide

---

## [2.0.0] - 2026-02-11

### 🎉 Major Release - Complete Configuration System

This release makes the portfolio **fully configurable** through JSON files. No code changes needed!

### Added

#### Configuration System
- ✨ **Complete configuration infrastructure**
  - `config/app.json` - Application settings
  - `config/languages.json` - Language definitions
  - `config/categories.json` - Content type definitions
  - `config/README.md` - Comprehensive configuration guide

- 🔧 **Configuration loaders**
  - `js/config.js` - Frontend configuration loader
  - `scripts/config_loader.py` - Backend configuration loader
  - `js/init.js` - Application initializer

- ✅ **Validation tooling**
  - `scripts/validate_config.py` - Configuration validator
  - Checks JSON syntax, structure, and file references
  - Color-coded output with errors/warnings

- 📚 **Documentation**
  - `CONFIGURATION_MIGRATION.md` - Migration details
  - `FEATURES_SUMMARY.md` - Complete feature list
  - `.env.example` - Environment variables template

#### Individual Image Metadata
- ✏️ **Per-image metadata system**
  - Each gallery image can have its own title and description
  - Independent from pile metadata
  - Edit button (✏️) on gallery cards
  - Visual indicator when metadata exists
  - Metadata preserved during extraction

- 🎯 **Enhanced extraction**
  - Custom title prompt when extracting images
  - Uses image metadata as default values
  - Metadata automatically transferred to new items

#### Gallery Management
- 🖼️ **Gallery manager improvements**
  - Drag & drop image reordering
  - Cover image swap functionality
  - Extract to new item OR existing pile
  - Visual indicators (gold border for cover)

#### Bulk Operations
- 📦 **Bulk edit tools**
  - Multi-select with checkboxes
  - Bulk update titles and descriptions
  - Merge multiple piles
  - Works across all categories

#### Visual Effects
- ✨ **Retro effects (toggleable)**
  - Glitter text with rainbow animations
  - 90s-style decorations (Under Construction badges)
  - Settings menu toggles
  - Persistent preferences in localStorage

### Changed

#### Backend
- 🔄 **Refactored for configuration**
  - `admin_api.py` - Uses config for port, host, paths
  - `scripts/manager.py` - Dynamic category mapping from config
  - All multilingual objects now use config language codes
  - New `/api/config` endpoint to expose configuration

#### Frontend
- 🔄 **Refactored for configuration**
  - `js/i18n.js` - Loads languages from config
  - `js/render.js` - Loads categories from config
  - `index.html` - Loads config.js first
  - Dynamic language selector from config
  - Dynamic category filters from config

#### Configuration
- 📝 **Improved GitHub configuration**
  - Split `repo` into `username` and `repoName`
  - Clearer structure: `mtldev514` + `retro-portfolio`
  - Backend automatically combines into `username/repoName`
  - Better separation of concerns

#### Documentation
- 📖 **Enhanced documentation**
  - Complete configuration guide with examples
  - Migration documentation
  - Features summary with how-to guides
  - Environment variables template

### Fixed
- 🐛 Hardcoded language codes in multiple files
- 🐛 Hardcoded category definitions in 8+ locations
- 🐛 API port/host hardcoded in multiple places
- 🐛 File paths hardcoded throughout codebase
- 🐛 GitHub repo configuration unclear

### Technical Details

#### What's Now Configurable
- Languages (add/remove any language)
- Categories (add custom content types)
- Custom fields per category
- API host and port
- GitHub integration
- File paths (data, lang, pages)
- Pagination settings
- UI elements (Winamp title, etc.)

#### Breaking Changes
⚠️ **Configuration Required**
- Config files must exist in `config/` directory
- Environment variables must be set in `.env`
- Backend won't start without valid configuration

⚠️ **GitHub Config Format Changed**
- Old: `"repo": "mtldev514/retro-portfolio"`
- New: `"username": "mtldev514", "repoName": "retro-portfolio"`
- Backward compatible via fallback

#### Migration Guide
See `CONFIGURATION_MIGRATION.md` for full details on:
- How to migrate from hardcoded to config
- What changed and where
- How to customize everything
- Examples for different use cases

---

## [1.0.0] - 2026-02-10

### Initial Features

#### Core Portfolio
- Multi-language support (en, fr, mx, ht)
- 6 content categories (painting, drawing, photography, sculpting, music, projects)
- 4 retro themes (JR-16, Béton, Ciment, Bubble Gum)
- Winamp-style music player
- Visit counter
- Responsive grid layout

#### Admin Panel
- Content upload (Cloudinary + GitHub)
- Content editing
- Content deletion
- Translation management
- Basic gallery support

#### Media Hosting
- Cloudinary for images
- GitHub Releases for music
- Automatic upload via admin panel

---

## Future Plans

### Planned Features
- [ ] Web-based configuration editor
- [ ] Visual theme builder
- [ ] Multi-site support (different configs per domain)
- [ ] Hot reload for configuration changes
- [ ] Import/Export configuration sets
- [ ] Plugin system for extending categories
- [ ] Advanced bulk operations
- [ ] Search functionality
- [ ] Tags/categories system

### Potential Improvements
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with service workers
- [ ] Image lazy loading optimization
- [ ] CDN integration
- [ ] Analytics integration
- [ ] SEO optimization tools
- [ ] Social media preview cards

---

## Version History

- **2.0.0** (2026-02-11) - Configuration system, metadata, bulk tools
- **1.0.0** (2026-02-10) - Initial release

---

For detailed configuration instructions, see `config/README.md`

For complete feature list, see `FEATURES_SUMMARY.md`
