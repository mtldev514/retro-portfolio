/**
 * Configuration Loader
 * Loads all configuration files and makes them available globally
 */

const AppConfig = {
    app: null,
    languages: null,
    categories: null,
    loaded: false,

    /**
     * Load all configuration files
     */
    async load() {
        try {
            const [appData, languagesData, categoriesData] = await Promise.all([
                fetch('config/app.json').then(r => r.json()),
                fetch('config/languages.json').then(r => r.json()),
                fetch('config/categories.json').then(r => r.json())
            ]);

            this.app = appData;
            this.languages = languagesData;
            this.categories = categoriesData;
            this.loaded = true;

            console.log('✅ Configuration loaded successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to load configuration:', error);
            return false;
        }
    },

    /**
     * Get API base URL
     */
    getApiUrl() {
        return this.app?.api?.baseUrl || 'http://127.0.0.1:5001';
    },

    /**
     * Get supported language codes
     */
    getLanguageCodes() {
        return this.languages?.supportedLanguages.map(l => l.code) || ['en'];
    },

    /**
     * Get default language
     */
    getDefaultLanguage() {
        return this.languages?.defaultLanguage || 'en';
    },

    /**
     * Get category configuration by ID
     */
    getCategory(categoryId) {
        return this.categories?.categories.find(c => c.id === categoryId);
    },

    /**
     * Get all categories
     */
    getAllCategories() {
        return this.categories?.categories || [];
    },

    /**
     * Get categories that support galleries
     */
    getGalleryCategories() {
        return this.categories?.categories.filter(c => c.hasGallery).map(c => c.id) || [];
    },

    /**
     * Get data file path for a category
     */
    getCategoryDataFile(categoryId) {
        const category = this.getCategory(categoryId);
        return category?.dataFile || `data/${categoryId}.json`;
    },

    /**
     * Get optional fields for a category
     */
    getCategoryFields(categoryId) {
        const category = this.getCategory(categoryId);
        return category?.fields?.optional || [];
    },

    /**
     * Check if a field exists for a category
     */
    categoryHasField(categoryId, fieldName) {
        const fields = this.getCategoryFields(categoryId);
        return fields.some(f => f.name === fieldName);
    },

    /**
     * Create multilingual object with all supported languages
     */
    createMultilingualObject(value) {
        const obj = {};
        this.getLanguageCodes().forEach(code => {
            obj[code] = value;
        });
        return obj;
    },

    /**
     * Get app setting
     */
    getSetting(path) {
        const parts = path.split('.');
        let value = this.app;
        for (const part of parts) {
            value = value?.[part];
            if (value === undefined) return null;
        }
        return value;
    }
};

// Export for use in other modules
window.AppConfig = AppConfig;
