#!/bin/bash

# Create New Portfolio Site
# Sets up a new portfolio project using this template as a base

set -e

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🎨 Create New Portfolio Site"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Get site name
if [ -z "$1" ]; then
    read -p "Enter your portfolio site name: " SITE_NAME
else
    SITE_NAME="$1"
fi

if [ -z "$SITE_NAME" ]; then
    echo "❌ Site name is required"
    exit 1
fi

# Check if directory exists
if [ -d "../$SITE_NAME" ]; then
    echo "❌ Directory ../$SITE_NAME already exists"
    exit 1
fi

echo ""
echo "Creating portfolio site: $SITE_NAME"
echo ""

# Create directory
mkdir -p "../$SITE_NAME"
cd "../$SITE_NAME"

echo "📦 Initializing git repository..."
git init

echo ""
echo "📥 Adding template as submodule..."
git submodule add https://github.com/mtldev514/retro-portfolio.git template

echo ""
echo "📋 Setting up directory structure..."

# Create directories
mkdir -p config
mkdir -p data
mkdir -p lang

# Copy example files from template
echo "📄 Copying configuration examples..."
if [ -d "template/config.example" ]; then
    for file in template/config.example/*.example; do
        if [ -f "$file" ]; then
            basename=$(basename "$file" .example)
            cp "$file" "config/$basename"
        fi
    done
fi

echo "📄 Copying data examples..."
if [ -d "template/data.example" ]; then
    for file in template/data.example/*.example; do
        if [ -f "$file" ]; then
            basename=$(basename "$file" .example)
            cp "$file" "data/$basename"
        fi
    done
fi

echo "📄 Copying language examples..."
if [ -d "template/lang.example" ]; then
    for file in template/lang.example/*.example; do
        if [ -f "$file" ]; then
            basename=$(basename "$file" .example)
            cp "$file" "lang/$basename"
        fi
    done
fi

# Copy essential files
echo "📄 Copying essential files..."
cp template/.env.example .env
cp template/config-source.json.example config-source.json

# Create symlinks to template files
echo "🔗 Creating symlinks to template..."
ln -s template/index.html index.html
ln -s template/admin.html admin.html
ln -s template/edit.html edit.html
ln -s template/config-manager.html config-manager.html
ln -s template/js js
ln -s template/style.css style.css
ln -s template/fonts.css fonts.css
ln -s template/admin.css admin.css
ln -s template/fonts fonts

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
.DS_Store
.env
node_modules/
__pycache__/
temp_uploads/
EOF

# Create README
echo "📝 Creating README.md..."
cat > README.md << EOF
# $SITE_NAME

My personal portfolio built with [Retro Portfolio](https://github.com/mtldev514/retro-portfolio).

## Structure

\`\`\`
$SITE_NAME/
├── template/          # Portfolio code (git submodule)
├── config/           # My configuration
├── data/             # My content
├── lang/             # My translations
└── .env             # My secrets
\`\`\`

## Setup

1. Edit credentials:
\`\`\`bash
nano .env
# Add CLOUDINARY credentials
\`\`\`

2. Customize configuration:
\`\`\`bash
nano config/app.json
nano config/categories.json
\`\`\`

3. Add content:
\`\`\`bash
nano data/painting.json
nano data/photography.json
\`\`\`

4. Start backend:
\`\`\`bash
cd template
python3 admin_api.py
\`\`\`

5. Open site:
\`\`\`bash
open index.html
# or
python3 -m http.server 8000
\`\`\`

## Update Template

Your personal data is safe during updates! Use the update script:

\`\`\`bash
cd template
../update.sh  # Automated update with backup
cd ..
\`\`\`

Or manually:

\`\`\`bash
cd template
git pull origin main
cd ..
git add template
git commit -m "Update template"
\`\`\`

See [template/UPDATE.md](template/UPDATE.md) for details.

## Deploy

Push to GitHub and enable GitHub Pages on this repo.

---

Built with 💜 using Retro Portfolio
EOF

# Initial commit
echo ""
echo "💾 Creating initial commit..."
git add .
git commit -m "Initial portfolio setup"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Portfolio Site Created!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📂 Location: ../$SITE_NAME"
echo ""
echo "Next steps:"
echo ""
echo "1. Go to your new site:"
echo "   cd ../$SITE_NAME"
echo ""
echo "2. Edit your credentials:"
echo "   nano .env"
echo ""
echo "3. Customize your portfolio:"
echo "   nano config/app.json"
echo ""
echo "4. Add your content:"
echo "   nano data/painting.json"
echo ""
echo "5. Start the backend:"
echo "   cd template && python3 admin_api.py"
echo ""
echo "6. Open in browser:"
echo "   open index.html"
echo ""
echo "📚 See README.md in your new site for more info"
echo ""
