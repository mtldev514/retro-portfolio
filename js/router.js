/**
 * SPA Router for Alex's Portfolio
 * Single shell (index.html) + HTML fragments in pages/
 */
const router = {
    routes: {
        'index.html':        { page: 'pages/home.html',         title: 'header_title',             subtitle: 'header_subtitle' },
        'gallery.html':      { page: 'pages/gallery.html',      title: 'gallery_title',            subtitle: 'gallery_subtitle' },
        'photography.html':  { page: 'pages/photography.html',  title: 'photo_consolidated_title', subtitle: 'photo_consolidated_subtitle' },
        'sculpting.html':    { page: 'pages/sculpting.html',    title: 'sculpting_title',          subtitle: 'sculpting_subtitle' },
        'music.html':        { page: 'pages/music.html',        title: 'music_title',              subtitle: 'music_subtitle' },
        'projects.html':     { page: 'pages/projects.html',     title: 'projects_title',           subtitle: null },
    },

    currentRoute: null,

    init() {
        // Intercept all internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.getAttribute('target')) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });

        // Load initial page based on current URL
        this.loadPage(window.location.pathname);
        console.log('Router initialized');
    },

    resolveRouteKey(url) {
        const path = typeof url === 'string' ? url : '';
        for (const key of Object.keys(this.routes)) {
            if (path.endsWith(key)) return key;
        }
        // Default to home for root, empty, or unknown paths
        return 'index.html';
    },

    async navigate(url) {
        window.history.pushState({}, '', url);
        await this.loadPage(url);
    },

    async loadPage(url) {
        const routeKey = this.resolveRouteKey(url);
        const route = this.routes[routeKey];
        this.currentRoute = routeKey;

        try {
            const response = await fetch(route.page);
            if (!response.ok) throw new Error(`Could not load ${route.page}`);
            const html = await response.text();

            // Inject fragment into #app
            const app = document.getElementById('app');
            app.innerHTML = html;

            // Update header title & subtitle
            this.updateHeader(route);

            // Re-execute inline scripts (they don't run via innerHTML)
            app.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                newScript.textContent = oldScript.textContent;
                oldScript.replaceWith(newScript);
            });

            // Re-init gallery renderer for pages that have galleries
            if (window.renderer) {
                await window.renderer.init();
            }

            // Translate all data-i18n elements (shell stays, only #app content is new)
            if (window.i18n) {
                window.i18n.updateDOM();
            }

            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Routing Error:', error);
        }
    },

    updateHeader(route) {
        const h1 = document.getElementById('page-title');
        const subtitleP = document.getElementById('page-subtitle');

        if (h1) {
            h1.setAttribute('data-i18n', route.title);
            const translated = (window.i18n && i18n.translations[route.title]);
            h1.innerText = translated || route.title;
        }

        if (subtitleP) {
            if (route.subtitle) {
                subtitleP.style.display = '';
                const inner = subtitleP.querySelector('i') || subtitleP;
                inner.setAttribute('data-i18n', route.subtitle);
                const translated = (window.i18n && i18n.translations[route.subtitle]);
                inner.innerText = translated || route.subtitle;
            } else {
                subtitleP.style.display = 'none';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => router.init());
window.router = router;
