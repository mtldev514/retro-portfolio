#!/bin/bash

# Setup Private Configuration Repository
# This script helps you create a private config repo and configure the portfolio

set -e

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🔒 Private Config Setup - Retro Portfolio"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "admin.html" ]; then
    echo "❌ Error: Please run this script from the portfolio root directory"
    exit 1
fi

# Ask user for config repo name
echo "📝 Step 1: Create Private Config Repository"
echo ""
read -p "Enter your GitHub username: " GITHUB_USER
read -p "Enter config repo name (e.g., my-portfolio-config): " CONFIG_REPO

CONFIG_DIR="../${CONFIG_REPO}"

# Check if directory already exists
if [ -d "$CONFIG_DIR" ]; then
    echo ""
    read -p "⚠️  Directory $CONFIG_DIR already exists. Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
    rm -rf "$CONFIG_DIR"
fi

# Create config directory
echo ""
echo "📁 Creating config directory: $CONFIG_DIR"
mkdir -p "$CONFIG_DIR"

# Copy config files
echo "📋 Copying configuration files..."
if [ -d "config" ]; then
    cp -r config "$CONFIG_DIR/"
else
    echo "⚠️  Warning: config/ directory not found, creating empty"
    mkdir -p "$CONFIG_DIR/config"
fi

if [ -d "data" ]; then
    cp -r data "$CONFIG_DIR/"
else
    echo "⚠️  Warning: data/ directory not found, creating empty"
    mkdir -p "$CONFIG_DIR/data"
fi

if [ -d "lang" ]; then
    cp -r lang "$CONFIG_DIR/"
else
    echo "⚠️  Warning: lang/ directory not found, creating empty"
    mkdir -p "$CONFIG_DIR/lang"
fi

if [ -f ".env" ]; then
    cp .env "$CONFIG_DIR/"
else
    echo "ℹ️  No .env file found (optional)"
fi

# Create .gitignore for config repo
echo ""
echo "📝 Creating .gitignore for config repo..."
cat > "$CONFIG_DIR/.gitignore" << 'EOF'
.DS_Store
.env
node_modules/
temp_uploads/
EOF

# Create README for config repo
echo "📝 Creating README for config repo..."
cat > "$CONFIG_DIR/README.md" << EOF
# Portfolio Configuration

Private configuration repository for retro-portfolio.

## Contents

- \`config/\` - Application configuration files
- \`data/\` - Content data (paintings, photography, etc.)
- \`lang/\` - Translation files
- \`.env\` - Environment variables (Cloudinary, GitHub token)

## Security

⚠️ **This repo contains your personal content and settings.**

Keep this repository **PRIVATE** to protect your data.

## GitHub Pages

Even though this repo is private, you can enable GitHub Pages to serve the config files:

1. Go to Settings → Pages
2. Source: main branch
3. Save

Your config will be accessible at:
\`https://${GITHUB_USER}.github.io/${CONFIG_REPO}/\`

## Usage

This config is loaded by the main portfolio repo:
\`https://github.com/${GITHUB_USER}/retro-portfolio\`

The portfolio's \`config-source.json\` points to this repo.
EOF

# Initialize git
echo ""
echo "🔧 Initializing git repository..."
cd "$CONFIG_DIR"
git init
git add .
git commit -m "Initial private configuration"

# Create remote
REPO_URL="https://github.com/${GITHUB_USER}/${CONFIG_REPO}.git"
git remote add origin "$REPO_URL"

cd - > /dev/null

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Config Repository Created!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📂 Location: $CONFIG_DIR"
echo "🔗 Remote: $REPO_URL"
echo ""
echo "Next steps:"
echo ""
echo "1. Create the repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: $CONFIG_REPO"
echo "   Visibility: PRIVATE ✓"
echo ""
echo "2. Push the config:"
echo "   cd $CONFIG_DIR"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages (Settings → Pages):"
echo "   Source: main branch"
echo ""
echo "4. Configure this portfolio:"
read -p "   Would you like to configure config-source.json now? (Y/n): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    echo ""
    echo "📝 Configuring config-source.json..."

    # Ask for mode
    echo ""
    echo "Select configuration mode:"
    echo "1) local   - Load from local directories (development)"
    echo "2) remote  - Load from GitHub Pages (production)"
    echo "3) hybrid  - Try remote, fallback to local (recommended)"
    echo ""
    read -p "Choice (1/2/3): " MODE_CHOICE

    case $MODE_CHOICE in
        1) MODE="local" ;;
        2) MODE="remote" ;;
        3) MODE="hybrid" ;;
        *) MODE="hybrid" ;;
    esac

    PAGES_URL="https://${GITHUB_USER}.github.io/${CONFIG_REPO}/"

    cat > config-source.json << EOF
{
  "mode": "${MODE}",
  "remote": {
    "enabled": true,
    "repo": "${GITHUB_USER}/${CONFIG_REPO}",
    "branch": "main",
    "baseUrl": "${PAGES_URL}"
  },
  "local": {
    "configDir": "config",
    "dataDir": "data",
    "langDir": "lang"
  },
  "deployment": {
    "type": "github-pages",
    "buildFromConfigRepo": false
  },
  "cache": {
    "enabled": true,
    "duration": 3600
  }
}
EOF

    echo "✅ config-source.json configured in mode: $MODE"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🎉 Setup Complete!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Your portfolio will load config from:"
if [ "$MODE" == "remote" ] || [ "$MODE" == "hybrid" ]; then
    echo "  🌐 Remote: $PAGES_URL"
fi
if [ "$MODE" == "local" ] || [ "$MODE" == "hybrid" ]; then
    echo "  💾 Local: ./config, ./data, ./lang"
fi
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
echo ""
