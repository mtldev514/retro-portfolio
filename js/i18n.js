const i18n = {
    currentLang: localStorage.getItem('selectedLang') || 'en',
    translations: {},

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updateDOM();
        this.updateSwitcherUI();
    },

    async loadTranslations(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load ${lang} translation`);
            this.translations = await response.ok ? await response.json() : {};
            this.currentLang = lang;
            localStorage.setItem('selectedLang', lang);
        } catch (error) {
            console.error('i18n Error:', error);
            // Fallback to English if not already English
            if (lang !== 'en') await this.loadTranslations('en');
        }
    },

    updateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = this.translations[key];
                } else {
                    el.innerText = this.translations[key];
                }
            }
        });
    },

    updateSwitcherUI() {
        const langMap = {
            'en': { flag: '🇬🇧🇨🇦', name: 'English' },
            'fr': { flag: '⚜️🇨🇦', name: 'French' },
            'mx': { flag: '🇲🇽', name: 'Spanish' },
            'ht': { flag: '🇭🇹', name: 'Creole' }
        };
        const active = langMap[this.currentLang];
        if (active) {
            const btn = document.querySelector('.lang-btn');
            if (btn) btn.innerHTML = `<span class="lang-flag">${active.flag}</span> ${active.name}`;
        }
    },

    async changeLang(lang) {
        await this.loadTranslations(lang);
        this.updateDOM();
        this.updateSwitcherUI();
    }
};

document.addEventListener('DOMContentLoaded', () => i18n.init());
