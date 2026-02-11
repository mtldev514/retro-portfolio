#!/bin/bash

# Fix Repository Remote
# Changes your portfolio repo to point to YOUR GitHub repo instead of the template

set -e

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🔀 Fix Repository Remote"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Get current directory name
CURRENT_DIR=$(basename "$(pwd)")

echo "Current directory: $CURRENT_DIR"
echo ""

# Check current remote
echo "Current remote configuration:"
git remote -v
echo ""

# Check if pointing to template
ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [[ "$ORIGIN_URL" == *"retro-portfolio"* ]]; then
    echo "⚠️  Your repo is pointing to the template repo!"
    echo "   This means your changes would push to the template (not good)."
    echo ""
else
    echo "✅ Your repo is already pointing to your own repo."
    echo "   You're all set!"
    exit 0
fi

# Ask for their GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

# Ask for their repo name (suggest current directory)
read -p "Enter your GitHub repo name [$CURRENT_DIR]: " REPO_NAME
REPO_NAME=${REPO_NAME:-$CURRENT_DIR}

echo ""
echo "Configuration:"
echo "  GitHub User: $GITHUB_USER"
echo "  Repo Name: $REPO_NAME"
echo "  New URL: https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo ""

# Confirm
read -p "Does this look correct? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "Updating remotes..."

# Remove old origin
git remote remove origin

# Add new origin (user's repo)
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"

# Add template as upstream
if ! git remote get-url upstream > /dev/null 2>&1; then
    git remote add upstream https://github.com/yourusername/retro-portfolio.git
    echo "  ✓ Added upstream (template repo)"
fi

echo "  ✓ Changed origin to your repo"
echo ""

# Show new configuration
echo "New remote configuration:"
git remote -v
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Remote Fixed!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "⚠️  Important: You need to create the GitHub repo first!"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Name it: $REPO_NAME"
echo "3. Don't initialize with README or .gitignore"
echo "4. Click 'Create repository'"
echo ""
echo "Then push your portfolio:"
echo "  git push -u origin main"
echo ""
echo "To update from template in the future:"
echo "  git fetch upstream"
echo "  git merge upstream/main"
echo "  git push origin main"
echo ""
echo "See SEPARATE-REPO-SETUP.md for complete guide"
echo ""
