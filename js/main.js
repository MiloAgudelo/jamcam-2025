document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navbarMenu.contains(event.target);
        const isClickOnToggle = navbarToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    });

    // Countdown Timer functionality
    const countdownDate = new Date('December 27, 2025 00:00:00').getTime();
    let previousValues = {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    };

    function animateValue(element) {
        element.classList.add('animate');
        setTimeout(() => {
            element.classList.remove('animate');
        }, 300);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        const currentValues = {
            days: days.toString().padStart(3, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };

        // Check and update each value with animation if changed
        if (currentValues.days !== previousValues.days) {
            daysElement.innerHTML = currentValues.days;
            animateValue(daysElement);
        }
        if (currentValues.hours !== previousValues.hours) {
            hoursElement.innerHTML = currentValues.hours;
            animateValue(hoursElement);
        }
        if (currentValues.minutes !== previousValues.minutes) {
            minutesElement.innerHTML = currentValues.minutes;
            animateValue(minutesElement);
        }
        if (currentValues.seconds !== previousValues.seconds) {
            secondsElement.innerHTML = currentValues.seconds;
            animateValue(secondsElement);
        }

        // Update previous values
        previousValues = {...currentValues};

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.innerHTML = '000';
            hoursElement.innerHTML = '00';
            minutesElement.innerHTML = '00';
            secondsElement.innerHTML = '00';
        }
    }

    updateCountdown(); // Initial call
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Scroll Animation Observer
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'active' class when element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a stagger animation container, animate its children
                if (entry.target.classList.contains('stagger-animation')) {
                    entry.target.querySelectorAll('*').forEach(child => {
                        child.classList.add('active');
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .scale-up, .stagger-animation');

    // Observe each animated element
    animatedElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Function to move to a specific slide
        const goToSlide = (index) => {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Reset index if it exceeds total slides
            if (index >= totalSlides) {
                index = 0;
            }
            
            // Add active class to current slide
            slides[index].classList.add('active');
            currentIndex = index;
        };

        // Set first slide as active initially
        goToSlide(0);

        // Automatic slide transition
        setInterval(() => {
            currentIndex++;
            goToSlide(currentIndex);
        }, 1500);
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Language selector visibility
    const languageSelector = document.querySelector('.language-selector');
    const footer = document.querySelector('.footer');

    if (languageSelector && footer) {
        function checkLanguageSelectorVisibility() {
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            languageSelector.style.opacity = footerRect.top <= windowHeight ? '0' : '1';
            languageSelector.style.pointerEvents = footerRect.top <= windowHeight ? 'none' : 'auto';
        }

        window.addEventListener('scroll', checkLanguageSelectorVisibility);
        window.addEventListener('resize', checkLanguageSelectorVisibility);
        checkLanguageSelectorVisibility();
    }
}); 