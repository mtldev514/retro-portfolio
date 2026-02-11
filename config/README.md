# Configuration Guide

This directory contains all configuration files for the portfolio application. You can customize the entire application behavior without touching any code!

## Configuration Files

### 1. `app.json` - Main Application Settings

Controls core application settings, paths, and integrations.

```json
{
  "app": {
    "name": "Alex's Portfolio",           // Site name
    "version": "1.0",                      // Version number
    "adminTitle": "..."                    // Admin panel title
  },
  "api": {
    "host": "127.0.0.1",                   // API server host
    "port": 5001,                          // API server port
    "baseUrl": "http://127.0.0.1:5001"    // Full API URL
  },
  "paths": {
    "dataDir": "data",                     // Where JSON data files are stored
    "langDir": "lang",                     // Where translation files are stored
    "pagesDir": "pages"                    // Where page content is stored
  },
  "github": {
    "username": "mtldev514",               // GitHub username
    "repoName": "retro-portfolio",         // GitHub repository name
    "mediaReleaseTag": "media",            // Release tag for media files
    "uploadCategories": ["music"]          // Categories to upload to GitHub
  },
  "counter": {
    "apiUrl": "https://api.counterapi.dev/..." // Visit counter API
  },
  "winamp": {
    "title": "Radyo",                      // Winamp player title
    "bitrate": "192",                      // Display bitrate
    "frequency": "44"                      // Display frequency
  },
  "pagination": {
    "pageSize": 24                         // Items per page
  }
}
```

**Common Customizations:**
- Change `api.port` to use a different port (e.g., 3000, 8080)
- Update `github.username` and `github.repoName` to your own repository
- Modify `pagination.pageSize` to show more/fewer items per page
- Change `winamp.title` to customize the music player name

**Note:** The GitHub configuration requires both `username` and `repoName`. The system automatically combines them into `username/repoName` format for API calls.

---

### 2. `languages.json` - Language Configuration

Define which languages your portfolio supports.

```json
{
  "defaultLanguage": "en",               // Default language on first visit
  "supportedLanguages": [
    {
      "code": "en",                      // Language code (must match translation files)
      "name": "English",                 // Display name in language selector
      "flag": "🇬🇧🇨🇦"                    // Flag emoji(s) to show
    },
    {
      "code": "fr",
      "name": "Français",
      "flag": "⚜️🇨🇦"
    }
  ]
}
```

**How to Add a New Language:**

1. Add entry to `supportedLanguages` array:
   ```json
   {
     "code": "de",
     "name": "Deutsch",
     "flag": "🇩🇪"
   }
   ```

2. Create translation file at `lang/de.json` with all translation keys

3. Your data files will automatically support the new language!

**Note:** Language codes must match between:
- `languages.json` config
- Translation files in `lang/` directory
- Data file multilingual fields

---

### 3. `categories.json` - Content Categories & Fields

Define what types of content your portfolio displays and what fields each type has.

```json
{
  "categories": [
    {
      "id": "painting",                  // Unique identifier (used in code)
      "name": "Painting",                // Display name
      "icon": "🎨",                      // Icon for category
      "dataFile": "data/painting.json",  // Where data is stored
      "hasGallery": true,                // Can items have image galleries?
      "fields": {
        "required": ["title", "url"],    // Fields that must have values
        "optional": [                    // Additional optional fields
          {
            "name": "medium",            // Field identifier
            "type": "text",              // Input type (text/textarea)
            "label": "Medium"            // Display label in admin
          },
          {
            "name": "description",
            "type": "textarea",
            "label": "Description"
          }
        ]
      }
    }
  ]
}
```

**Field Types:**
- `text` - Single-line text input
- `textarea` - Multi-line text area

**How to Add a New Category:**

1. Add entry to `categories` array:
   ```json
   {
     "id": "ceramics",
     "name": "Ceramics",
     "icon": "🏺",
     "dataFile": "data/ceramics.json",
     "hasGallery": true,
     "fields": {
       "required": ["title"],
       "optional": [
         {"name": "description", "type": "textarea", "label": "Description"},
         {"name": "glazing", "type": "text", "label": "Glazing Type"}
       ]
     }
   }
   ```

2. Create data file at `data/ceramics.json`:
   ```json
   []
   ```

3. The category will automatically appear in:
   - Admin panel category dropdowns
   - Main page filter buttons
   - Upload forms
   - Edit forms (with custom fields!)

**How to Add Custom Fields:**

Add to the `optional` array for any category:
```json
{
  "name": "size",
  "type": "text",
  "label": "Dimensions"
}
```

The field will automatically appear in:
- Upload form
- Edit form
- Be saved with multilingual support

---

## Configuration Tips

### For Developers
- All configs are loaded at runtime - no build step needed
- Frontend uses `js/config.js` to load configs
- Backend uses `scripts/config_loader.py` to load configs
- Changes take effect immediately after page refresh

### For Content Creators
- Edit JSON files directly - they're human-readable
- Use a JSON validator before deploying changes
- Keep backups before making major changes
- Test configuration changes on a local server first

### For Translators
- Only edit files in `lang/` directory, not these config files
- Language codes in `languages.json` must match `lang/*.json` filenames
- Translation files are separate from configuration

---

## Validation

Before deploying configuration changes:

1. **Validate JSON Syntax:**
   - Use https://jsonlint.com or your code editor's JSON validator
   - Invalid JSON will break the app!

2. **Check Required Fields:**
   - All categories must have `id`, `name`, `icon`, `dataFile`
   - All languages must have `code`, `name`, `flag`

3. **Verify File Paths:**
   - Data files referenced in `categories.json` must exist
   - Translation files for each language must exist

4. **Test Locally:**
   - Run `python3 admin_api.py`
   - Open `http://localhost:5001` in browser
   - Check browser console for configuration errors

---

## Examples

### Example: Portfolio for a Musician

```json
// categories.json
{
  "categories": [
    {
      "id": "albums",
      "name": "Albums",
      "icon": "💿",
      "dataFile": "data/albums.json",
      "hasGallery": false,
      "fields": {
        "required": ["title", "url"],
        "optional": [
          {"name": "releaseDate", "type": "text", "label": "Release Date"},
          {"name": "label", "type": "text", "label": "Record Label"},
          {"name": "description", "type": "textarea", "label": "About"}
        ]
      }
    },
    {
      "id": "concerts",
      "name": "Concerts",
      "icon": "🎤",
      "dataFile": "data/concerts.json",
      "hasGallery": true,
      "fields": {
        "required": ["title"],
        "optional": [
          {"name": "venue", "type": "text", "label": "Venue"},
          {"name": "date", "type": "text", "label": "Date"},
          {"name": "setlist", "type": "textarea", "label": "Setlist"}
        ]
      }
    }
  ]
}
```

### Example: Bilingual Portfolio (English + Japanese)

```json
// languages.json
{
  "defaultLanguage": "en",
  "supportedLanguages": [
    {
      "code": "en",
      "name": "English",
      "flag": "🇬🇧"
    },
    {
      "code": "ja",
      "name": "日本語",
      "flag": "🇯🇵"
    }
  ]
}
```

Don't forget to create `lang/ja.json` with all translations!

---

## Need Help?

- **JSON Syntax:** https://www.json.org
- **Emoji Codes:** https://emojipedia.org
- **Language Codes:** Use ISO 639-1 codes (en, fr, es, de, ja, etc.)
- **Issues:** Check browser console for detailed error messages

---

Made with 💜 by Alex
