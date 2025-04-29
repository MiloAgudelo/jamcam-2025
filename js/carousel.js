document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    if (carousels.length > 0) {
        carousels.forEach(carousel => {
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
            }, 1500); // Change slide every 1.5 seconds
        });
    }
}); 