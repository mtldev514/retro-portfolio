/**
 * Theme Switcher for Alex's Portfolio
 * Follows same pattern as i18n.js — global object, localStorage, dropdown
 *
 * Palettes:
 *   JR-16      — Retro 16-color: navy header, mint terminal, clean & bright
 *   Ambre Chaud — Dark CRT amber: deep chocolate bg, gold/amber glow
 *   Naples Yellow — Mediterranean warmth: cream & sand, terracotta, olive
 */
const themes = {
    currentTheme: localStorage.getItem('selectedTheme') || 'jr16',

    definitions: {

        /* ──────────────────────────────────────────────
         * JR-16 — Retro 16-color palette (Lospec)
         * Cool & bright. Navy header, mint green terminal,
         * off-white page, clean Win95 buttons.
         * ────────────────────────────────────────────── */
        jr16: {
            name: 'JR-16',
            emoji: '🌿',
            colors: {
                /* Page */
                '--page-bg':              '#e8e8f0',
                '--container-bg':         '#f5fffd',
                '--text-primary':         '#040404',
                '--text-secondary':       '#4b4956',
                '--text-muted':           '#7a7a88',
                '--text-dim':             '#4b4956',
                '--text-light':           '#a2a2ac',
                /* Header */
                '--header-bg':            '#00374b',
                '--header-text':          '#f5fffd',
                '--header-border-light':  '#81f4b1',
                '--header-border-dark':   '#040404',
                /* Borders */
                '--border-light':         '#f5fffd',
                '--border-dark':          '#4b4956',
                '--border-groove':        '#a2a2ac',
                '--border-mid':           '#7a7a88',
                /* Buttons */
                '--btn-bg-start':         '#f5fffd',
                '--btn-bg-mid':           '#e8e8f0',
                '--btn-bg-end':           '#a2a2ac',
                '--btn-hover-start':      '#f6f8ad',
                '--btn-hover-mid':        '#f5fffd',
                '--btn-hover-end':        '#a2a2ac',
                '--btn-active-start':     '#a2a2ac',
                '--btn-active-mid':       '#4b4956',
                '--btn-active-end':       '#e8e8f0',
                '--btn-text':             '#040404',
                '--btn-text-active':      '#00374b',
                /* Filter / Lang */
                '--filter-bg':            '#e8e8f0',
                '--lang-btn-bg':          '#a2a2ac',
                '--lang-dropdown-bg':     '#f5fffd',
                /* Terminal */
                '--term-bg':              '#040404',
                '--term-green':           '#81f4b1',
                '--term-green-dim':       '#003808',
                '--term-cyan':            '#72ffff',
                '--term-text':            '#a2a2ac',
                '--term-dim':             '#4b4956',
                '--term-titlebar':        '#00374b',
                '--term-titlebar-border': '#81f4b1',
                '--term-btn-close':       '#d76f6c',
                '--term-btn-min':         '#f6f8ad',
                '--term-btn-max':         '#81f4b1',
                /* Marquee */
                '--marquee-bg':           '#040404',
                '--marquee-text':         '#81f4b1',
                /* Winamp */
                '--wp-bg':                '#040404',
                '--wp-surface':           '#4b4956',
                '--wp-display':           '#040404',
                '--wp-titlebar-start':    '#00374b',
                '--wp-titlebar-mid':      '#520a54',
                '--wp-playlist-bg':       '#040404',
                '--wp-btn-start':         '#4b4956',
                '--wp-btn-mid':           '#00374b',
                '--wp-btn-end':           '#040404',
                '--wp-btn-hover-start':   '#a2a2ac',
                '--wp-btn-hover-mid':     '#4b4956',
                '--wp-btn-hover-end':     '#00374b',
                '--wp-text':              '#f6f8ad',
                '--wp-green':             '#81f4b1',
                '--wp-info':              '#72ffff',
                '--wp-selected':          '#00374b',
                /* Music */
                '--music-bg':             '#040404',
                '--music-gold':           '#f6f8ad',
                '--music-text':           '#f5fffd',
                '--music-text-dim':       '#a2a2ac',
                /* Gallery / Detail */
                '--gallery-border':       '#00374b',
                '--detail-meta-bg':       '#e8e8f0',
                /* Badges */
                '--badge-public-bg':      '#003808',
                '--badge-public-text':    '#81f4b1',
                '--badge-private-bg':     '#580a0a',
                '--badge-private-text':   '#d76f6c',
                /* Counter / Accents */
                '--counter-text':         '#d76f6c',
                '--accent-navy':          '#00374b',
                '--accent-magenta':       '#d887f0',
                '--accent-yellow':        '#f6f8ad',
                /* Chrome / UI tones */
                '--chrome-black':         '#000',
                '--chrome-darkest':       '#111',
                '--chrome-darker':        '#222',
                '--chrome-dark':          '#333',
                '--chrome-mid':           '#444',
                '--chrome-gray':          '#555',
                '--chrome-light':         '#777',
                '--chrome-border':        '#999',
                '--chrome-soft':          '#ccc',
                '--chrome-active':        '#252525',
                '--chrome-grip-alt':      '#4a4a4a',
                '--chrome-vol-start':     '#060',
                /* Sparkle */
                '--sparkle-1':            '#ffd700',
                '--sparkle-2':            '#ff69b4',
                '--sparkle-3':            '#00ffff',
                '--sparkle-4':            '#ff00ff',
                '--sparkle-5':            '#fff',
                '--sparkle-6':            '#7fff00',
                '--sparkle-7':            '#ff4500'
            }
        },

        /* ──────────────────────────────────────────────
         * AMBRE CHAUD — Dark CRT amber monitor
         * Deep chocolate/espresso bg, amber & gold glow,
         * warm brown surfaces. Like a 1980s terminal.
         * ────────────────────────────────────────────── */
        ambre: {
            name: 'Ambre Chaud',
            emoji: '🔥',
            colors: {
                /* Page — deep chocolate */
                '--page-bg':              '#12100c',
                '--container-bg':         '#1e1a14',
                '--text-primary':         '#d4a030',
                '--text-secondary':       '#b08830',
                '--text-muted':           '#786030',
                '--text-dim':             '#b08830',
                '--text-light':           '#786030',
                /* Header — rich saddle brown with gold title */
                '--header-bg':            '#6b3000',
                '--header-text':          '#ffc040',
                '--header-border-light':  '#c08020',
                '--header-border-dark':   '#2a1200',
                /* Borders — warm brown 3D */
                '--border-light':         '#c08020',
                '--border-dark':          '#2a1200',
                '--border-groove':        '#5a4020',
                '--border-mid':           '#6b3000',
                /* Buttons — dark brown gradient */
                '--btn-bg-start':         '#3a2810',
                '--btn-bg-mid':           '#2a1e0e',
                '--btn-bg-end':           '#1e1508',
                '--btn-hover-start':      '#4a3818',
                '--btn-hover-mid':        '#c08020',
                '--btn-hover-end':        '#6b3000',
                '--btn-active-start':     '#1e1508',
                '--btn-active-mid':       '#6b3000',
                '--btn-active-end':       '#3a2810',
                '--btn-text':             '#d4a030',
                '--btn-text-active':      '#ffc040',
                /* Filter / Lang */
                '--filter-bg':            '#1e1a14',
                '--lang-btn-bg':          '#3a2810',
                '--lang-dropdown-bg':     '#1e1a14',
                /* Terminal — amber phosphor on black */
                '--term-bg':              '#080600',
                '--term-green':           '#ffa500',
                '--term-green-dim':       '#664200',
                '--term-cyan':            '#ffc040',
                '--term-text':            '#b08830',
                '--term-dim':             '#786030',
                '--term-titlebar':        '#2a1200',
                '--term-titlebar-border': '#c08020',
                '--term-btn-close':       '#a02000',
                '--term-btn-min':         '#c08020',
                '--term-btn-max':         '#664200',
                /* Marquee — amber on black */
                '--marquee-bg':           '#080600',
                '--marquee-text':         '#ffa500',
                /* Winamp — dark warm surfaces */
                '--wp-bg':                '#080600',
                '--wp-surface':           '#2a1e0e',
                '--wp-display':           '#080600',
                '--wp-titlebar-start':    '#2a1200',
                '--wp-titlebar-mid':      '#4a2800',
                '--wp-playlist-bg':       '#080600',
                '--wp-btn-start':         '#2a1e0e',
                '--wp-btn-mid':           '#2a1200',
                '--wp-btn-end':           '#080600',
                '--wp-btn-hover-start':   '#5a4020',
                '--wp-btn-hover-mid':     '#2a1e0e',
                '--wp-btn-hover-end':     '#2a1200',
                '--wp-text':              '#c08020',
                '--wp-green':             '#ffa500',
                '--wp-info':              '#ffc040',
                '--wp-selected':          '#2a1200',
                /* Music */
                '--music-bg':             '#080600',
                '--music-gold':           '#c08020',
                '--music-text':           '#d4a030',
                '--music-text-dim':       '#786030',
                /* Gallery / Detail */
                '--gallery-border':       '#6b3000',
                '--detail-meta-bg':       '#1e1a14',
                /* Badges */
                '--badge-public-bg':      '#1a3000',
                '--badge-public-text':    '#88a030',
                '--badge-private-bg':     '#400a0a',
                '--badge-private-text':   '#c08020',
                /* Counter / Accents */
                '--counter-text':         '#a02000',
                '--accent-navy':          '#2a1200',
                '--accent-magenta':       '#c08020',
                '--accent-yellow':        '#ffc040',
                /* Chrome / UI tones — warm amber */
                '--chrome-black':         '#080600',
                '--chrome-darkest':       '#120e08',
                '--chrome-darker':        '#1a1408',
                '--chrome-dark':          '#2a1e0e',
                '--chrome-mid':           '#3a2810',
                '--chrome-gray':          '#5a4020',
                '--chrome-light':         '#786030',
                '--chrome-border':        '#b08830',
                '--chrome-soft':          '#c08020',
                '--chrome-active':        '#1a1408',
                '--chrome-grip-alt':      '#4a3818',
                '--chrome-vol-start':     '#332000',
                /* Sparkle — amber glow */
                '--sparkle-1':            '#ffc040',
                '--sparkle-2':            '#c08020',
                '--sparkle-3':            '#ffa500',
                '--sparkle-4':            '#d4a030',
                '--sparkle-5':            '#ffe0a0',
                '--sparkle-6':            '#e8b840',
                '--sparkle-7':            '#a02000'
            }
        },

        /* ──────────────────────────────────────────────
         * NAPLES YELLOW — Mediterranean warmth
         * Sun-bleached cream, terracotta header,
         * burnt sienna accents, warm gold terminal.
         * ────────────────────────────────────────────── */
        naples: {
            name: 'Naples Yellow',
            emoji: '☀️',
            colors: {
                /* Page — warm cream & sand */
                '--page-bg':              '#e8d8c0',
                '--container-bg':         '#f5ead5',
                '--text-primary':         '#3c2415',
                '--text-secondary':       '#5c3d28',
                '--text-muted':           '#8c7058',
                '--text-dim':             '#5c3d28',
                '--text-light':           '#8c7058',
                /* Header — terracotta */
                '--header-bg':            '#b85c38',
                '--header-text':          '#f5ead5',
                '--header-border-light':  '#e0a870',
                '--header-border-dark':   '#5c2810',
                /* Borders — warm tan 3D */
                '--border-light':         '#e0c8a0',
                '--border-dark':          '#8c7058',
                '--border-groove':        '#c4a880',
                '--border-mid':           '#b85c38',
                /* Buttons — warm sand gradient */
                '--btn-bg-start':         '#e0c8a0',
                '--btn-bg-mid':           '#f5ead5',
                '--btn-bg-end':           '#c4a880',
                '--btn-hover-start':      '#f5ead5',
                '--btn-hover-mid':        '#e0c8a0',
                '--btn-hover-end':        '#b85c38',
                '--btn-active-start':     '#c4a880',
                '--btn-active-mid':       '#b85c38',
                '--btn-active-end':       '#e0c8a0',
                '--btn-text':             '#3c2415',
                '--btn-text-active':      '#8b2010',
                /* Filter / Lang */
                '--filter-bg':            '#e0c8a0',
                '--lang-btn-bg':          '#c4a880',
                '--lang-dropdown-bg':     '#f5ead5',
                /* Terminal — warm gold on dark brown */
                '--term-bg':              '#1a1008',
                '--term-green':           '#d8a030',
                '--term-green-dim':       '#5a3810',
                '--term-cyan':            '#e8b840',
                '--term-text':            '#8c7058',
                '--term-dim':             '#5c3d28',
                '--term-titlebar':        '#5c2810',
                '--term-titlebar-border': '#b85c38',
                '--term-btn-close':       '#8b2010',
                '--term-btn-min':         '#e0a870',
                '--term-btn-max':         '#5a3810',
                /* Marquee — gold on dark */
                '--marquee-bg':           '#1a1008',
                '--marquee-text':         '#d8a030',
                /* Winamp — warm dark surfaces */
                '--wp-bg':                '#1a1008',
                '--wp-surface':           '#3a2818',
                '--wp-display':           '#1a1008',
                '--wp-titlebar-start':    '#5c2810',
                '--wp-titlebar-mid':      '#7a4020',
                '--wp-playlist-bg':       '#1a1008',
                '--wp-btn-start':         '#3a2818',
                '--wp-btn-mid':           '#5c2810',
                '--wp-btn-end':           '#1a1008',
                '--wp-btn-hover-start':   '#8c7058',
                '--wp-btn-hover-mid':     '#3a2818',
                '--wp-btn-hover-end':     '#5c2810',
                '--wp-text':              '#e0a870',
                '--wp-green':             '#d8a030',
                '--wp-info':              '#e8b840',
                '--wp-selected':          '#5c2810',
                /* Music */
                '--music-bg':             '#1a1008',
                '--music-gold':           '#e0a870',
                '--music-text':           '#f5ead5',
                '--music-text-dim':       '#8c7058',
                /* Gallery / Detail */
                '--gallery-border':       '#b85c38',
                '--detail-meta-bg':       '#e0c8a0',
                /* Badges */
                '--badge-public-bg':      '#2a4010',
                '--badge-public-text':    '#98b048',
                '--badge-private-bg':     '#5c1810',
                '--badge-private-text':   '#b85c38',
                /* Counter / Accents */
                '--counter-text':         '#8b2010',
                '--accent-navy':          '#5c2810',
                '--accent-magenta':       '#b85c38',
                '--accent-yellow':        '#e0a870',
                /* Chrome / UI tones — warm terracotta */
                '--chrome-black':         '#1a1008',
                '--chrome-darkest':       '#2a1e10',
                '--chrome-darker':        '#3a2818',
                '--chrome-dark':          '#4a3820',
                '--chrome-mid':           '#5c3d28',
                '--chrome-gray':          '#6a5038',
                '--chrome-light':         '#8c7058',
                '--chrome-border':        '#c4a880',
                '--chrome-soft':          '#d4b890',
                '--chrome-active':        '#2a1e10',
                '--chrome-grip-alt':      '#5a4030',
                '--chrome-vol-start':     '#3a2010',
                /* Sparkle — Mediterranean warmth */
                '--sparkle-1':            '#e0a870',
                '--sparkle-2':            '#b85c38',
                '--sparkle-3':            '#e8b840',
                '--sparkle-4':            '#d8a030',
                '--sparkle-5':            '#f5ead5',
                '--sparkle-6':            '#98b048',
                '--sparkle-7':            '#8b2010'
            }
        }
    },

    init() {
        this.applyTheme(this.currentTheme);
        this.updateSwitcherUI();
    },

    applyTheme(themeId) {
        const theme = this.definitions[themeId];
        if (!theme) return;

        const root = document.documentElement;

        if (themeId === 'jr16') {
            // JR-16 is the CSS default — remove overrides so :root values take effect
            Object.keys(theme.colors).forEach(prop => {
                root.style.removeProperty(prop);
            });
        } else {
            // Clear any previous theme overrides first
            const defaultKeys = Object.keys(this.definitions.jr16.colors);
            defaultKeys.forEach(prop => root.style.removeProperty(prop));
            // Apply new theme
            Object.entries(theme.colors).forEach(([prop, value]) => {
                root.style.setProperty(prop, value);
            });
        }

        this.currentTheme = themeId;
        localStorage.setItem('selectedTheme', themeId);
    },

    changeTheme(themeId) {
        this.applyTheme(themeId);
        this.updateSwitcherUI();
    },

    updateSwitcherUI() {
        const theme = this.definitions[this.currentTheme];
        if (!theme) return;
        const btn = document.querySelector('.theme-btn');
        if (btn) btn.innerHTML = `<span class="theme-icon">${theme.emoji}</span> ${theme.name}`;
    }
};

window.themes = themes;
