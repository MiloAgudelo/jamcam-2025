// Intersection Observer for scroll animations
const scrollAnimationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

// Function to initialize animations
function initAboutAnimations() {
    // Banner animations
    const banner = document.querySelector('.about-banner');
    banner.classList.add('fade-in');
    scrollAnimationObserver.observe(banner);

    // Intro section animations
    const introContent = document.querySelector('.about-intro-content');
    if (introContent) {
        const introText = introContent.querySelectorAll('.about-intro-description');
        introText.forEach((text, index) => {
            text.classList.add('fade-up');
            text.style.transitionDelay = `${index * 0.2}s`;
            scrollAnimationObserver.observe(text);
        });

        const introImage = introContent.querySelector('.carousel');
        if (introImage) {
            introImage.classList.add('slide-in-right');
            scrollAnimationObserver.observe(introImage);
        }
    }

    // Values section animations
    const valuesSection = document.querySelector('.about-values');
    if (valuesSection) {
        const valuesTitle = valuesSection.querySelector('.about-values-title');
        if (valuesTitle) {
            valuesTitle.classList.add('fade-up');
            scrollAnimationObserver.observe(valuesTitle);
        }

        const valueItems = valuesSection.querySelectorAll('.value-item');
        valueItems.forEach((item, index) => {
            item.classList.add('scale-up');
            item.style.transitionDelay = `${index * 0.2}s`;
            scrollAnimationObserver.observe(item);
        });
    }

    // Polaroid section animations
    const polaroidSection = document.querySelector('.polaroid-section');
    if (polaroidSection) {
        const polaroidTitle = polaroidSection.querySelector('.polaroid-title');
        if (polaroidTitle) {
            polaroidTitle.classList.add('fade-up');
            scrollAnimationObserver.observe(polaroidTitle);
        }

        const polaroids = polaroidSection.querySelectorAll('.polaroid');
        polaroids.forEach((polaroid, index) => {
            polaroid.classList.add('fade-up');
            polaroid.style.transitionDelay = `${index * 0.15}s`;
            scrollAnimationObserver.observe(polaroid);
        });
    }

    // Cards section animations
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection) {
        const cardsTitle = cardsSection.querySelector('.cards-section-title');
        if (cardsTitle) {
            cardsTitle.classList.add('fade-up');
            scrollAnimationObserver.observe(cardsTitle);
        }

        const cards = cardsSection.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.classList.add('slide-in-left');
            card.style.transitionDelay = `${index * 0.2}s`;
            scrollAnimationObserver.observe(card);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initAboutAnimations); 