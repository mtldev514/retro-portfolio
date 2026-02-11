# 🎨 Retro Portfolio Template

A fully configurable retro-styled portfolio with a Win95/90s aesthetic. Designed for artists, musicians, and creators who want a nostalgic web presence.

## 🚀 Quick Install

1. **Clone the repository**
   ```bash
   git clone https://github.com/mtldev514/retro-portfolio.git
   cd retro-portfolio
   ```

2. **Initialize personal data**
   ```bash
   ./scripts/init.sh
   # This copies generic templates into config/, data/, and lang/
   ```

3. **Configure your environment**
   Edit the `.env` file with your Cloudinary credentials:
   ```bash
   nano .env
   # Add CLOUDINARY_CLOUD_NAME, API_KEY, and API_SECRET
   ```

4. **Run and Preview**
   ```bash
   # Terminal 1: Start the Admin API
   python3 admin_api.py

   # Terminal 2: Serve the website
   python3 scripts/server.py 8000
   ```
   Open [http://localhost:8000](http://localhost:8000) in your browser.

## � Project Structure

- `config/`: Application settings and custom categories.
- `data/`: Your portfolio content (JSON).
- `lang/`: Translations and text.
- `admin_api.py`: Backend for managing uploads and configuration.
- `tests/`: Unit and integration tests.

## 🧪 Tests

Run the test suite to ensure everything is working correctly:

```bash
pip install -r requirements.txt
pytest
```

## 🌐 Deployment

Push your repository to GitHub and enable **GitHub Pages** in the repository settings.


---

### 📚 Documentation
- [Deployment Instructions](docs/DEPLOYMENT.md) (English)
- [How to Update](docs/UPDATE.md)
- [Configuration Migration](docs/CONFIGURATION_MIGRATION.md)
- [Guide de Déploiement](docs/DEPLOYMENT.fr.md) (Français)


Made with 💜 by Alex
