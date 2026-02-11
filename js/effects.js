/**
 * 90s Effects Manager
 * Glitter text, GIF decorations, and other retro fun
 */

const effects = {
    glitterEnabled: false,
    decorationsEnabled: false,

    init() {
        // Load saved preferences
        this.glitterEnabled = localStorage.getItem('glitter-enabled') === 'true';
        this.decorationsEnabled = localStorage.getItem('decorations-enabled') === 'true';

        if (this.glitterEnabled) {
            this.enableGlitter();
        }
        if (this.decorationsEnabled) {
            this.enableDecorations();
        }

        this.updateIndicators();
    },

    enableGlitter() {
        document.body.classList.add('glitter-mode');
        // Apply glitter to main title
        const title = document.getElementById('page-title');
        if (title && !title.classList.contains('glitter-text')) {
            title.classList.add('glitter-text');
        }
        // Apply to all h3 in gallery
        document.querySelectorAll('.gallery-item h3').forEach(h3 => {
            if (!h3.classList.contains('glitter-text-alt')) {
                h3.classList.add('glitter-text-alt');
            }
        });
    },

    disableGlitter() {
        document.body.classList.remove('glitter-mode');
        const title = document.getElementById('page-title');
        if (title) {
            title.classList.remove('glitter-text');
        }
        document.querySelectorAll('.gallery-item h3').forEach(h3 => {
            h3.classList.remove('glitter-text-alt');
        });
    },

    enableDecorations() {
        document.body.classList.add('decorations-mode');
        this.addDecorations();
    },

    disableDecorations() {
        document.body.classList.remove('decorations-mode');
        this.removeDecorations();
    },

    addDecorations() {
        // Remove existing decorations first
        this.removeDecorations();

        const container = document.createElement('div');
        container.id = 'retro-decorations';
        container.innerHTML = `
            <div class="retro-corner retro-corner-tl">
                <span class="retro-emoji">✨</span>
            </div>
            <div class="retro-corner retro-corner-tr">
                <span class="retro-emoji">✨</span>
            </div>
            <div class="retro-badge retro-badge-1">
                <span class="retro-text">🚧 UNDER CONSTRUCTION 🚧</span>
            </div>
            <div class="retro-badge retro-badge-2">
                <span class="retro-text">🔥 NEW! 🔥</span>
            </div>
            <div class="retro-divider"></div>
        `;
        document.body.appendChild(container);
    },

    removeDecorations() {
        const existing = document.getElementById('retro-decorations');
        if (existing) {
            existing.remove();
        }
    },

    updateIndicators() {
        const glitterIndicator = document.getElementById('glitter-indicator');
        const decorationsIndicator = document.getElementById('decorations-indicator');

        if (glitterIndicator) {
            glitterIndicator.textContent = this.glitterEnabled ? '✨' : '○';
        }
        if (decorationsIndicator) {
            decorationsIndicator.textContent = this.decorationsEnabled ? '🎨' : '○';
        }
    }
};

// Global toggle functions
window.toggleGlitterText = function() {
    effects.glitterEnabled = !effects.glitterEnabled;
    localStorage.setItem('glitter-enabled', effects.glitterEnabled);

    if (effects.glitterEnabled) {
        effects.enableGlitter();
    } else {
        effects.disableGlitter();
    }
    effects.updateIndicators();
};

window.toggle90sDecorations = function() {
    effects.decorationsEnabled = !effects.decorationsEnabled;
    localStorage.setItem('decorations-enabled', effects.decorationsEnabled);

    if (effects.decorationsEnabled) {
        effects.enableDecorations();
    } else {
        effects.disableDecorations();
    }
    effects.updateIndicators();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => effects.init());
} else {
    effects.init();
}

// Re-apply glitter to new gallery items when they're rendered
const observer = new MutationObserver(() => {
    if (effects.glitterEnabled) {
        document.querySelectorAll('.gallery-item h3:not(.glitter-text-alt)').forEach(h3 => {
            h3.classList.add('glitter-text-alt');
        });
    }
});

observer.observe(document.body, { childList: true, subtree: true });

window.effects = effects;
