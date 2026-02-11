/**
 * Unified Render Engine for Alex's Portfolio
 * Loads ALL categories, renders a single grid, supports filter buttons
 */
const renderer = {
    categories: {
        painting: { file: 'painting.json', from: 'painting' },
        drawing: { file: 'drawing.json', from: 'drawing' },
        photography: { file: 'photography.json', from: 'photography' },
        sculpting: { file: 'sculpting.json', from: 'sculpting' },
        music: { file: 'music.json', from: 'music' },
        projects: { file: 'projects.json', from: 'projects' },
    },

    categoryIcons: {
        painting: '🎨',
        drawing: '✏️',
        photography: '📷',
        sculpting: '🗿',
        music: '🎵',
        projects: '💻',
    },

    allItems: [],
    activeFilter: 'all',
    sortOrder: 'desc',

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
            this.sortItems();
        }

        this.renderGrid();
        this.setupFilters();
        if (window.i18n) window.i18n.updateDOM();
    },

    sortItems() {
        const dir = this.sortOrder === 'desc' ? -1 : 1;
        this.allItems.sort((a, b) => {
            const da = a.created || a.date || '';
            const db = b.created || b.date || '';
            return dir * da.localeCompare(db);
        });
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
        const dateStr = item.created || item.date || 'N/A';
        const dateLabel = item.created ? 'gallery_created_on' : 'gallery_added_on';
        const dateFallback = item.created ? 'Created:' : 'Added:';
        const itemId = item.id || (typeof item.title === 'string' ? item.title : (item.title && item.title.en) || '');
        const from = item._from || 'gallery';
        const detailHref = `detail.html?id=${encodeURIComponent(itemId)}&from=${from}`;
        const icon = this.categoryIcons[item._category] || '';

        if (item._category === 'music') {
            const genre = this.t(item.genre);
            const playMeLabel = (window.i18n && i18n.translations.music_play_me) || 'Play Me';
            div.innerHTML = `
                <a href="${detailHref}" class="gallery-link">
                    ${item.url ? `<button class="music-card-play" data-track-url="${item.url.replace(/"/g, '&quot;')}" title="${playMeLabel}">&#9654;</button>` : `<div class="card-icon">&#127925;</div>`}
                    <h3 align="center">${title}</h3>
                    ${genre ? `<p align="center" class="gallery-subtitle">${genre}</p>` : ''}
                    <p align="center" class="item-date">
                        <span data-i18n="${dateLabel}">${dateFallback}</span> ${dateStr}
                    </p>
                </a>
            `;
            const playBtn = div.querySelector('.music-card-play');
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const url = playBtn.dataset.trackUrl;
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
                visibilityEmoji = item.visibility === 'private' ? '🔒' : '🌍';
            }
            const subTitle = isProject ? description : (medium ? `(${medium})` : '');

            const hasImage = item.url && !isProject;
            const githubLabel = (window.i18n && i18n.translations.card_github) || 'GitHub';
            const websiteLabel = (window.i18n && i18n.translations.card_website) || 'Website';
            const isPublic = isProject && item.visibility === 'public';

            let cardActionHtml = '';
            if (isPublic) {
                if (item.website) {
                    cardActionHtml = `<div class="card-actions">
                        <a href="${item.website}" target="_blank" class="card-action-btn" onclick="event.stopPropagation()">
                            <svg class="icon" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg> ${websiteLabel}
                        </a>
                    </div>`;
                } else if (item.url) {
                    cardActionHtml = `<div class="card-actions">
                        <a href="${item.url}" target="_blank" class="card-action-btn" onclick="event.stopPropagation()">
                            <svg class="icon" viewBox="0 0 24 24"><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z"/></svg> ${githubLabel}
                        </a>
                    </div>`;
                }
            }

            div.innerHTML = `
                <a href="${detailHref}" class="gallery-link">
                    ${hasImage ? `<img src="${item.url}" alt="${title}">` : `<div class="card-icon">${icon}</div>`}
                    <h3 align="center">${title}</h3>
                    ${subTitle ? `<p align="center" class="gallery-subtitle">${subTitle}</p>` : ''}
                    <p align="center" class="item-date">
                        <span data-i18n="${dateLabel}">${dateFallback}</span> ${dateStr}
                    </p>
                </a>
                ${cardActionHtml}
            `;
        }
        return div;
    },

    setupFilters() {
        const nav = document.getElementById('filter-nav');
        if (!nav) return;

        nav.addEventListener('click', (e) => {
            // Filter buttons
            const btn = e.target.closest('.filter-btn:not(.filter-btn-back)');
            if (btn) {
                nav.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeFilter = btn.dataset.filter;
                this.applyFilter(this.activeFilter);
                return;
            }

            // Sort buttons
            const sortBtn = e.target.closest('.sort-btn');
            if (sortBtn) {
                nav.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                sortBtn.classList.add('active');
                this.sortOrder = sortBtn.dataset.sort;
                this.sortItems();
                this.renderGrid();
                this.applyFilter(this.activeFilter);
            }
        });
    },

    applyFilter(filter) {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        const items = container.querySelectorAll('.gallery-item');
        let visibleCount = 0;
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Empty filter message
        let emptyMsg = document.getElementById('empty-filter-msg');
        if (visibleCount === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('p');
                emptyMsg.id = 'empty-filter-msg';
                emptyMsg.className = 'empty-message';
                container.appendChild(emptyMsg);
            }
            emptyMsg.textContent = (window.i18n && i18n.translations.filter_empty) || 'Nothing here yet.';
            emptyMsg.style.display = '';
        } else if (emptyMsg) {
            emptyMsg.remove();
        }
    }
};

window.renderer = renderer;
