document.addEventListener('DOMContentLoaded', () => {
    // Current year for copyright
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar Scrolled State
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add staggered fading animation using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections and gallery items
    const fadeElements = document.querySelectorAll('.section-title, .section-desc, .about-text, .about-image, .gallery-item');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Carousel Logic
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        if (slides.length > 1) {
            // Create dots container
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            
            // Create individual dots
            const dots = [];
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
            carousel.appendChild(dotsContainer);

            // Function to change active slide and dot
            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    if (i === index) slide.classList.add('active');
                    else slide.classList.remove('active');
                });
                dots.forEach((dot, i) => {
                    if (i === index) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            };

            let currentSlide = 0;
            let startX = 0;
            let isDragging = false;

            // Mouse Drag Support
            carousel.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                e.preventDefault(); // prevents native image drag
            });

            carousel.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                const diffX = startX - e.clientX;
                
                // If swiped left
                if (diffX > 40) {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                } 
                // If swiped right
                else if (diffX < -40) {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                }
            });

            carousel.addEventListener('mouseleave', () => {
                isDragging = false;
            });

            // Touch Swipe Support
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            carousel.addEventListener('touchend', (e) => {
                const diffX = startX - e.changedTouches[0].clientX;
                
                if (diffX > 40) {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                } else if (diffX < -40) {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                }
            }, { passive: true });
            
            // Allow clicking directly on dots
            dots.forEach((dot, i) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentSlide = i;
                    showSlide(currentSlide);
                });
            });
        }
    });
});
