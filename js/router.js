/**
 * Simple SPA Router for Alex's Portfolio
 * Loads content dynamically into the .main-content container
 */
const router = {
    init() {
        // Intercept all clicks on <a> tags
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.getAttribute('target')) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });

        console.log('Router initialized');
    },

    async navigate(url) {
        window.history.pushState({}, '', url);
        await this.loadPage(url);
    },

    async loadPage(url) {
        const path = url === '/' || url.endsWith('index.html') ? 'index.html' : url;

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Could not load ${path}`);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the main content
            const newMain = doc.querySelector('.main-content');
            const currentMain = document.querySelector('.main-content');

            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;

                // Re-apply translations
                if (window.i18n) {
                    window.i18n.updateDOM();
                }

                // Scroll to top
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error('Routing Error:', error);
            // Fallback to normal navigation if fetch fails
            window.location.href = url;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => router.init());
