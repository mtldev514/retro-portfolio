/**
 * SPA Router for Alex's Portfolio
 * Single shell (index.html) + HTML fragments in pages/
 */
const router = {
    routes: {
        'index.html':        { page: 'pages/home.html',         subtitle: 'header_subtitle' },
        'gallery.html':      { page: 'pages/gallery.html',      subtitle: 'gallery_subtitle' },
        'photography.html':  { page: 'pages/photography.html',  subtitle: 'photo_consolidated_subtitle' },
        'sculpting.html':    { page: 'pages/sculpting.html',    subtitle: 'sculpting_subtitle' },
        'music.html':        { page: 'pages/music.html',        subtitle: 'music_subtitle' },
        'projects.html':     { page: 'pages/projects.html',     subtitle: 'projects_subtitle' },
        'detail.html':       { page: 'pages/detail.html',       subtitle: null },
    },

    currentRoute: null,

    async init() {
        // 1. Load translations FIRST so all subsequent renders have i18n data
        if (window.i18n) {
            await i18n.init();
            console.log('i18n initialized');
        }

        // 2. Intercept all internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.getAttribute('target')) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });

        // 3. Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });

        // 4. Check for GitHub Pages SPA redirect
        const redirectPath = sessionStorage.getItem('spa-redirect');
        if (redirectPath) {
            sessionStorage.removeItem('spa-redirect');
            window.history.replaceState({}, '', redirectPath);
        }

        // 5. Load initial page based on current URL (or restored redirect path)
        await this.loadPage(window.location.pathname);
        console.log('Router initialized');

        // 5. Init media controller AFTER DOM is populated
        if (window.media) {
            await media.init();
            console.log('Media initialized');
        }
    },

    resolveRouteKey(url) {
        // Strip query string and hash for matching
        const path = (typeof url === 'string' ? url : '').split('?')[0].split('#')[0];
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
        // h1 stays untouched — always "Alex's Artistic Portfolio" (translated by i18n.updateDOM)
        // Only the subtitle changes per page
        const subtitleP = document.getElementById('page-subtitle');

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

document.addEventListener('DOMContentLoaded', () => router.init());  // Single boot entry point
window.router = router;
