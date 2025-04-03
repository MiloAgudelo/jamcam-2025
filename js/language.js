// Language configuration
const SUPPORTED_LANGUAGES = {
    'en': {
        code: 'en',
        path: '/en',
        browserCodes: ['en', 'en-US', 'en-GB']
    },
    'es': {
        code: 'es',
        path: '/es',
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

// Store scroll position in session storage before redirecting
function storeScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

// Restore scroll position after page load
function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition'); // Clear after use
    }
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

    // Add click event listeners to language options
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const langCode = option.querySelector('.language-label').textContent.toLowerCase();
            const targetLang = SUPPORTED_LANGUAGES[langCode];
            
            if (targetLang) {
                // Store current scroll position
                storeScrollPosition();
                
                // Get the current path segments
                const pathSegments = currentPath.split('/').filter(segment => segment);
                
                // If we're already in a language directory, remove it
                if (pathSegments.length > 0 && Object.keys(SUPPORTED_LANGUAGES).includes(pathSegments[0])) {
                    pathSegments.shift();
                }
                
                // Construct new path
                const newPath = `${targetLang.path}/${pathSegments.join('/')}`;
                window.location.href = newPath;
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
        const targetPath = SUPPORTED_LANGUAGES[detectedLang].path;
        window.location.href = `${targetPath}${currentPath}`;
    }
}

// Redirect to correct 404 page if inside fallback 404.html
function redirectToLocalized404IfNeeded() {
    const pathname = window.location.pathname;
    if (pathname === "/404.html") {
        const detectedLang = getBrowserLanguage();
        const redirectUrl = `${SUPPORTED_LANGUAGES[detectedLang].path}/404.html`;
        window.location.replace(redirectUrl);
    }
}

// Initialize language handling
document.addEventListener('DOMContentLoaded', () => {
    handleLanguageMenu();
    handleLanguageSelection();
    redirectToCorrectLanguage();
    restoreScrollPosition();
    redirectToLocalized404IfNeeded();
});