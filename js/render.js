/**
 * Render Engine for Alex's dynamic galleries
 */
const renderer = {
    async init() {
        const path = window.location.pathname;
        let dataFile = '';

        if (path.includes('gallery.html')) dataFile = 'art.json';
        else if (path.includes('photography.html')) dataFile = 'photography.json';
        else if (path.includes('sculpting.html')) dataFile = 'sculpting.json';
        else if (path.includes('projects.html')) dataFile = 'projects.json';

        if (dataFile) {
            await this.renderGallery(dataFile);
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

        // Format Date (Simple)
        const dateStr = item.date ? item.date : 'N/A';

        // Visibility Emoji
        let visibilityEmoji = '';
        if (item.category === 'projects') {
            visibilityEmoji = item.visibility === 'private' ? ' 🔒' : ' 🔓';
        }

        // Project specific: Use description instead of medium if available
        const subTitle = item.category === 'projects' ? item.description : (item.medium ? `(${item.medium})` : '');

        div.innerHTML = `
            ${item.url && item.category !== 'projects' ? `<img src="${item.url}" alt="${item.title}">` : ''}
            <h3 align="center">${item.title}${visibilityEmoji}</h3>
            ${subTitle ? `<p align="center"><i>${subTitle}</i></p>` : ''}
            ${item.url && item.category === 'projects' ? `<p align="center"><a href="${item.url}" target="_blank" data-i18n="projects_view_code">View Code</a></p>` : ''}
            <p align="center" class="item-date">
                <span data-i18n="gallery_added_on">Added on:</span> ${dateStr}
            </p>
        `;
        return div;
    }
};

// Auto-run if not using router (for direct access)
document.addEventListener('DOMContentLoaded', () => renderer.init());
window.renderer = renderer;
