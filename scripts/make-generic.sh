#!/bin/bash

# Make Repository Generic
# Removes all personal references (alex, montreal, yourusername)

set -e

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🔧 Making Repository Generic"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Replacements map
# OLD -> NEW

declare -A replacements=(
    ["alex a montreal"]="Your Portfolio"
    ["alex-a-montreal"]="my-portfolio"
    ["Alex's Portfolio"]="Retro Portfolio"
    ["Alex's Radio"]="Your Radio"
    ["ALEX'S PORTFOLIO MANAGER"]="PORTFOLIO MANAGER"
    ["ALEX-CONTROL-PANEL"]="CONTROL-PANEL"
    ["ALEX-ADMIN"]="ADMIN"
    ["ALEX-OS-KERNAL"]="OS-KERNEL"
    ["alex@mtl"]="user@host"
    ["yourusername"]="yourusername"
    ["alexamontreal.ca"]="yourdomain.com"
    ["I'm Alex. DevOps"]="Portfolio owner. DevOps"
    ["Moi c'est Alex. DevOps"]="Propriétaire du portfolio. DevOps"
    ["Based in Montreal"]="Based in [Your City]"
    ["J'habite Montréal"]="J'habite [Votre Ville]"
    ["Radio Alex"]="Your Radio"
    ["Montreal, raw and beautiful"]="[City], raw and beautiful"
    ["Montreal is beautiful"]="[City] is beautiful"
    ["MONTREAL 2026"]="[CITY] 2026"
    ["Made with 💜 by Alex"]="Made with 💜"
    ["rainy Montreal overpass"]="rainy city overpass"
)

# Files to update (excluding .git, node_modules, etc.)
FILES=$(find . -type f \( \
    -name "*.md" -o \
    -name "*.json" -o \
    -name "*.html" -o \
    -name "*.js" -o \
    -name "*.py" -o \
    -name "*.sh" -o \
    -name "CNAME" \
\) -not -path "./.git/*" -not -path "./node_modules/*")

echo "Found $(echo "$FILES" | wc -l | xargs) files to process"
echo ""

# Create backup
BACKUP_DIR=".backup-before-generic-$(date +%Y%m%d-%H%M%S)"
echo "Creating backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/full-backup.tar.gz" . --exclude=".git" --exclude="$BACKUP_DIR" 2>/dev/null
echo "✓ Backup created"
echo ""

# Counter
TOTAL_REPLACEMENTS=0

# Process each file
for file in $FILES; do
    CHANGED=false

    # Skip this script itself
    if [[ "$file" == "./scripts/make-generic.sh" ]]; then
        continue
    fi

    # Create temp file
    TEMP_FILE=$(mktemp)
    cp "$file" "$TEMP_FILE"

    # Apply each replacement
    for old in "${!replacements[@]}"; do
        new="${replacements[$old]}"

        # Case-insensitive replacement
        if grep -qi "$old" "$file" 2>/dev/null; then
            # Use perl for case-insensitive replacement
            perl -i -pe "s/\Q$old\E/$new/gi" "$TEMP_FILE"
            CHANGED=true
            ((TOTAL_REPLACEMENTS++))
        fi
    done

    # If file was changed, update it
    if [ "$CHANGED" = true ]; then
        mv "$TEMP_FILE" "$file"
        echo "  ✓ Updated: $file"
    else
        rm "$TEMP_FILE"
    fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Repository is now generic!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Summary:"
echo "  Total replacements: $TOTAL_REPLACEMENTS"
echo "  Backup: $BACKUP_DIR/full-backup.tar.gz"
echo ""
echo "Replacements made:"
for old in "${!replacements[@]}"; do
    new="${replacements[$old]}"
    echo "  '$old' → '$new'"
done
echo ""
echo "⚠️  Manual review recommended for:"
echo "  - CNAME (delete or update with your domain)"
echo "  - config.example/*.json (verify generic values)"
echo "  - lang.example/*.json (verify generic text)"
echo ""
echo "To restore from backup:"
echo "  tar -xzf $BACKUP_DIR/full-backup.tar.gz"
echo ""
