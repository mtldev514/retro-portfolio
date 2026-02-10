/**
 * Unified Render Engine for Alex's Portfolio
 * Loads ALL categories, renders a single grid, supports filter buttons
 */
const renderer = {
    categories: {
        art:          { file: 'art.json',         from: 'gallery' },
        photography:  { file: 'photography.json', from: 'photography' },
        sculpting:    { file: 'sculpting.json',   from: 'sculpting' },
        music:        { file: 'music.json',       from: 'music' },
        projects:     { file: 'projects.json',    from: 'projects' },
    },

    allItems: [],
    activeFilter: 'all',

    t(field) {
        if (!field) return '';
        if (typeof field === 'object' && !Array.isArray(field)) {
            const lang = (window.i18n && i18n.currentLang) || 'en';
            return field[lang] || field.en || '';
        }
        return field;
    },

    async init() {
        // Skip re-fetch if data is already loaded (returning from detail view)
        if (this.allItems.length === 0) {
            const entries = Object.entries(this.categories);
            const fetches = entries.map(async ([category, info]) => {
                try {
                    const res = await fetch(`data/${info.file}`);
                    const items = await res.json();
                    return items.map(item => ({
                        ...item,
                        _category: category,
                        _from: info.from
                    }));
                } catch (e) {
                    return [];
                }
            });
            const results = await Promise.all(fetches);
            this.allItems = results.flat();
            this.allItems.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        }

        this.renderGrid();
        this.setupFilters();
        if (window.i18n) window.i18n.updateDOM();
    },

    renderGrid() {
        const app = document.getElementById('app');
        if (!app) return;

        // Remove old grid but keep the filter bar
        const oldGrid = document.getElementById('gallery-container');
        if (oldGrid) oldGrid.remove();

        const container = document.createElement('div');
        container.id = 'gallery-container';
        container.className = 'gallery-grid';
        app.appendChild(container);

        this.allItems.forEach(item => {
            const el = this.createGalleryItem(item);
            container.appendChild(el);
        });

        // Restore active filter
        this.applyFilter(this.activeFilter);
    },

    createGalleryItem(item) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', item._category);

        const title = this.t(item.title);
        const dateStr = item.date || 'N/A';
        const itemId = item.id || (typeof item.title === 'string' ? item.title : (item.title && item.title.en) || '');
        const from = item._from || 'gallery';
        const detailHref = `detail.html?id=${encodeURIComponent(itemId)}&from=${from}`;

        if (item._category === 'music') {
            const genre = this.t(item.genre);
            const description = this.t(item.description);
            const playLabel = (window.i18n && i18n.translations.music_play_in_radio) || 'Play in Radio';
            div.innerHTML = `
                <a href="${detailHref}" class="gallery-link">
                    <div class="music-card-icon">&#127925;</div>
                    <h3 align="center">${title}</h3>
                    ${genre ? `<p align="center"><i>${genre}</i></p>` : ''}
                    <p align="center" class="item-date">
                        <span data-i18n="gallery_added_on">Added on:</span> ${dateStr}
                    </p>
                </a>
                ${item.url ? `<div align="center" style="padding: 5px;">
                    <button class="track-radio-btn" data-track-url="${item.url.replace(/"/g, '&quot;')}">
                        &#9654; ${playLabel}
                    </button>
                </div>` : ''}
            `;
            const radioBtn = div.querySelector('.track-radio-btn');
            if (radioBtn) {
                radioBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const url = radioBtn.dataset.trackUrl;
                    if (window.media && media.playlist) {
                        const idx = media.playlist.findIndex(p => p.src === url);
                        if (idx >= 0) media.switchTrack(idx);
                    }
                });
            }
        } else {
            const medium = this.t(item.medium);
            const description = this.t(item.description);
            let visibilityEmoji = '';
            const isProject = item.category === 'projects' || item._category === 'projects';
            if (isProject) {
                visibilityEmoji = item.visibility === 'private' ? ' &#128274;' : ' &#128275;';
            }
            const subTitle = isProject ? description : (medium ? `(${medium})` : '');

            div.innerHTML = `
                <a href="${detailHref}" class="gallery-link">
                    ${item.url && !isProject ? `<img src="${item.url}" alt="${title}">` : ''}
                    <h3 align="center">${title}${visibilityEmoji}</h3>
                    ${subTitle ? `<p align="center"><i>${subTitle}</i></p>` : ''}
                    <p align="center" class="item-date">
                        <span data-i18n="gallery_added_on">Added on:</span> ${dateStr}
                    </p>
                </a>
            `;
        }
        return div;
    },

    setupFilters() {
        const nav = document.getElementById('filter-nav');
        if (!nav) return;

        nav.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            nav.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            this.activeFilter = btn.dataset.filter;
            this.applyFilter(this.activeFilter);
        });
    },

    applyFilter(filter) {
        const items = document.querySelectorAll('#gallery-container .gallery-item');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
};

window.renderer = renderer;
