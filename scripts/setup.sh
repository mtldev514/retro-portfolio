#!/bin/bash

# Portfolio Setup Script
# Helps new users get started quickly

set -e

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🎨 Retro Portfolio - Setup Script"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env - Please edit it with your credentials!"
    echo ""
    echo "   Required:"
    echo "   - CLOUDINARY_CLOUD_NAME"
    echo "   - CLOUDINARY_API_KEY"
    echo "   - CLOUDINARY_API_SECRET"
    echo ""
    echo "   Optional:"
    echo "   - GITHUB_TOKEN (for music uploads)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if Python dependencies are installed
echo ""
echo "📦 Checking Python dependencies..."
python3 -c "import flask" 2>/dev/null || {
    echo "⚠️  Flask not found. Installing dependencies..."
    pip3 install flask flask-cors python-dotenv cloudinary requests
}
echo "✅ Python dependencies ready"

# Validate configuration
echo ""
echo "🔍 Validating configuration files..."
python3 scripts/validate_config.py

# Check if data files exist
echo ""
echo "📁 Checking data files..."
for category in painting drawing photography sculpting music projects; do
    if [ ! -f "data/${category}.json" ]; then
        echo "   Creating data/${category}.json..."
        echo "[]" > "data/${category}.json"
    fi
done
echo "✅ All data files exist"

# Summary
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Setup Complete!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit .env with your Cloudinary credentials:"
echo "   nano .env"
echo ""
echo "2. (Optional) Customize configuration:"
echo "   nano config/app.json"
echo "   nano config/languages.json"
echo "   nano config/categories.json"
echo ""
echo "3. Start the backend:"
echo "   python3 admin_api.py"
echo ""
echo "4. Open in browser:"
echo "   open index.html"
echo "   or"
echo "   python3 -m http.server 8000"
echo ""
echo "📚 Documentation:"
echo "   - config/README.md - Configuration guide"
echo "   - FEATURES_SUMMARY.md - Feature overview"
echo "   - CONFIGURATION_MIGRATION.md - Technical details"
echo ""
echo "Happy creating! 🎨✨"
echo ""
