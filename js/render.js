/**
 * Render Engine for Alex's dynamic galleries
 */
const renderer = {
    /**
     * Resolve a translatable field.
     * If the field is an object with lang keys, return the value for the current language (fallback to 'en').
     * If it's a plain string (backward compat), return it as-is.
     */
    t(field) {
        if (!field) return '';
        if (typeof field === 'object' && !Array.isArray(field)) {
            const lang = (window.i18n && i18n.currentLang) || 'en';
            return field[lang] || field.en || '';
        }
        return field;
    },

    // Map route key to data file and detail 'from' category
    routeMap: {
        'gallery':      { file: 'art.json',         from: 'gallery' },
        'photography':  { file: 'photography.json', from: 'photography' },
        'sculpting':    { file: 'sculpting.json',   from: 'sculpting' },
        'projects':     { file: 'projects.json',    from: 'projects' },
    },
    currentFrom: null,

    async init() {
        const route = (window.router && router.currentRoute) || window.location.pathname;
        this.currentFrom = null;

        for (const [key, info] of Object.entries(this.routeMap)) {
            if (route.includes(key)) {
                this.currentFrom = info.from;
                await this.renderGallery(info.file);
                return;
            }
        }
    },

    async renderGallery(fileName) {
        const container = document.getElementById('gallery-container');
        if (!container) return;

        try {
            const response = await fetch(`data/${fileName}`);
            if (!response.ok) throw new Error(`Could not load data/${fileName}`);
            const data = await response.json();

            container.innerHTML = ''; // Clear container

            data.forEach(item => {
                const itemEl = this.createGalleryItem(item);
                container.appendChild(itemEl);
            });

            // Re-apply i18n for the newly added items
            if (window.i18n) window.i18n.updateDOM();

        } catch (error) {
            console.error('Render Error:', error);
            container.innerHTML = '<p align="center" style="color:red">Error loading gallery data.</p>';
        }
    },

    createGalleryItem(item) {
        const div = document.createElement('div');
        div.className = 'gallery-item';

        const dateStr = item.date ? item.date : 'N/A';
        const title = this.t(item.title);
        const description = this.t(item.description);
        const medium = this.t(item.medium);

        // Build detail link: use item.id, or plain title for projects
        const itemId = item.id || (typeof item.title === 'string' ? item.title : (item.title && item.title.en) || '');
        const from = this.currentFrom || 'gallery';
        const detailHref = `detail.html?id=${encodeURIComponent(itemId)}&from=${from}`;

        let visibilityEmoji = '';
        if (item.category === 'projects') {
            visibilityEmoji = item.visibility === 'private' ? ' 🔒' : ' 🔓';
        }

        const subTitle = item.category === 'projects' ? description : (medium ? `(${medium})` : '');

        div.innerHTML = `
            <a href="${detailHref}" class="gallery-link">
                ${item.url && item.category !== 'projects' ? `<img src="${item.url}" alt="${title}">` : ''}
                <h3 align="center">${title}${visibilityEmoji}</h3>
                ${subTitle ? `<p align="center"><i>${subTitle}</i></p>` : ''}
                <p align="center" class="item-date">
                    <span data-i18n="gallery_added_on">Added on:</span> ${dateStr}
                </p>
            </a>
        `;
        return div;
    }
};

// Renderer is called by router.loadPage() — no auto-run needed
window.renderer = renderer;
