# 🎨 Alex's Retro Art Portfolio

Welcome to my digital gallery! This project is a personal portfolio website inspired by the early 2000s web aesthetic (Web 1.0).

## 🚀 Features

- **Retro UI**: Pure HTML/CSS with marquee, sidebars, and classic layouts.
- **i18n Support**: Multilingual support for 6 languages/dialects:
  - 🇬🇧 English
  - 🇫🇷 French
  - 🇲🇽 Spanish (Mexico)
  - 🇭🇹 Haitian Creole
  - ⚜️ Joual (Quebec)
  - 🇨🇦 Acadian (Canada)
- **Dynamic Language Switcher**: Fast switching using client-side JSON translations and `localStorage` persistence.

## 🛠️ How to View Locally

Because the i18n system uses `fetch()` to load translation files (`.json`), you cannot simply double-click `index.html`. You need to run a local web server to avoid CORS issues.

### Option 1: Python (Recommended)
If you have Python installed, run this in your terminal:
```bash
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Option 2: VS Code Live Server
If you use VS Code, install the **Live Server** extension and click **"Go Live"** in the status bar.

## 📁 Project Structure

- `index.html`: Home page.
- `gallery.html`: Art gallery (Paint/Draw).
- `photography.html`: Photography collections.
- `street-photography.html`: Specialized street life gallery.
- `js/i18n.js`: Core internationalization logic.
- `lang/`: JSON translation files.
- `style.css`: Main styling (Retro theme).

---
*Best viewed in Netscape Navigator or Internet Explorer 6.0* 🌐
