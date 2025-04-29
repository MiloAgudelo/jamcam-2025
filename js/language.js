// Language configuration
const SUPPORTED_LANGUAGES = {
    'en': {
        code: 'en',
        path: '/en',
        browserCodes: ['en', 'en-US', 'en-GB']
    },
    'es': {
        code: 'es',
        path: '',  // Root path for index
        subpath: '/es', // Subpath for other pages
        browserCodes: ['es', 'es-ES', 'es-419', 'es-CO']
    },
    'fr': {
        code: 'fr',
        path: '/fr',
        browserCodes: ['fr', 'fr-FR', 'fr-CA']
    },
    'pt': {
        code: 'pt',
        path: '/pt',
        browserCodes: ['pt', 'pt-BR', 'pt-PT']
    }
};

// Get browser language
function getBrowserLanguage() {
    // Check if user has manually selected a language
    const userSelectedLang = localStorage.getItem('userLanguage');
    if (userSelectedLang && SUPPORTED_LANGUAGES[userSelectedLang]) {
        return userSelectedLang;
    }

    const browserLang = navigator.language || navigator.userLanguage;
    
    // Find matching language configuration
    for (const lang in SUPPORTED_LANGUAGES) {
        if (SUPPORTED_LANGUAGES[lang].browserCodes.includes(browserLang)) {
            return SUPPORTED_LANGUAGES[lang].code;
        }
    }
    
    // Default to English if no match
    return 'en';
}

// Handle language menu toggle
function handleLanguageMenu() {
    const languageButton = document.querySelector('.language-button');
    const languageOptions = document.querySelector('.language-options');
    let isTouch = false;
    let timeoutId;
    
    // Toggle menu on button click/touch
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageOptions.classList.toggle('active');
    });

    // Handle touch events
    languageButton.addEventListener('touchstart', () => {
        isTouch = true;
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            languageOptions.classList.remove('active');
        }
    });

    // Handle mouse leave with delay for better UX
    document.querySelector('.language-selector').addEventListener('mouseleave', () => {
        if (!isTouch) {
            timeoutId = setTimeout(() => {
                if (!languageOptions.matches(':hover')) {
                    languageOptions.classList.remove('active');
                }
            }, 500);
        }
    });

    // Clear timeout if mouse returns
    document.querySelector('.language-selector').addEventListener('mouseenter', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    });
}

// Handle language selection
function handleLanguageSelection() {
    const languageOptions = document.querySelectorAll('.language-option');
    const currentPath = window.location.pathname;
    const is404Page = currentPath.includes('404');

    // Add click event listeners to language options
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const langCode = option.querySelector('.language-label').textContent.toLowerCase();
            const targetLang = SUPPORTED_LANGUAGES[langCode];
            
            if (targetLang) {
                // Store user's language preference
                localStorage.setItem('userLanguage', langCode);
                
                if (is404Page) {
                    // Special handling for 404 pages
                    window.location.href = `${targetLang.path}/404.html`;
                    return;
                }
                
                // Get the current path segments
                const pathSegments = currentPath.split('/').filter(segment => segment);
                
                // Check if we're on the index page
                const isIndex = pathSegments.length === 0 || 
                              (pathSegments.length === 1 && pathSegments[0] === 'index.html') ||
                              (pathSegments.length === 1 && Object.keys(SUPPORTED_LANGUAGES).includes(pathSegments[0])) ||
                              (pathSegments.length === 2 && Object.keys(SUPPORTED_LANGUAGES).includes(pathSegments[0]) && pathSegments[1] === 'index.html');
                
                // Handle Spanish special case for non-index pages
                const targetPath = (langCode === 'es' && !isIndex) ? targetLang.subpath : targetLang.path;
                
                // If we're already in a language directory, remove it
                if (pathSegments.length > 0 && Object.keys(SUPPORTED_LANGUAGES).includes(pathSegments[0])) {
                    pathSegments.shift();
                }
                
                // Construct new path
                let newPath = targetPath;
                if (pathSegments.length > 0 && !isIndex) {
                    newPath += '/' + pathSegments.join('/');
                } else if (currentPath.endsWith('/')) {
                    newPath += '/';
                }
                
                window.location.href = newPath || '/';
            }
        });
    });
}

// Redirect to correct language version on initial load
function redirectToCorrectLanguage() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment);
    
    // Only redirect if we're not already in a language path
    if (!pathSegments.length || !Object.keys(SUPPORTED_LANGUAGES).includes(pathSegments[0])) {
        const detectedLang = getBrowserLanguage();
        const targetLang = SUPPORTED_LANGUAGES[detectedLang];
        
        // Check if we're on the index page
        const isIndex = pathSegments.length === 0 || 
                       (pathSegments.length === 1 && pathSegments[0] === 'index.html');
        
        // Handle Spanish special case for non-index pages
        const targetPath = (detectedLang === 'es' && !isIndex) ? targetLang.subpath : targetLang.path;
        
        // Construct the new path maintaining the current page structure
        let newPath = targetPath;
        if (pathSegments.length > 0 && !isIndex) {
            newPath += '/' + pathSegments.join('/');
        } else if (currentPath.endsWith('/')) {
            newPath += '/';
        }
        
        // Only redirect if we're going to a different path
        if (newPath !== currentPath) {
            window.location.href = newPath || '/';
        }
    }
}

// Initialize language handling
document.addEventListener('DOMContentLoaded', () => {
    handleLanguageMenu();
    handleLanguageSelection();
    redirectToCorrectLanguage();
});