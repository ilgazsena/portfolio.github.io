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

            // Scrubbing logic on mousemove (hover)
            carousel.addEventListener('mousemove', (e) => {
                const rect = carousel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                
                // Calculate which slide to show based on mouse X position
                const percentage = Math.max(0, Math.min(1, x / width));
                const slideIndex = Math.floor(percentage * slides.length);
                const safeIndex = slideIndex === slides.length ? slides.length - 1 : slideIndex;
                
                showSlide(safeIndex);
            });

            // Touch fallback for mobile swiping intuition
            carousel.addEventListener('touchmove', (e) => {
                const rect = carousel.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const width = rect.width;
                
                const percentage = Math.max(0, Math.min(1, x / width));
                const slideIndex = Math.floor(percentage * slides.length);
                const safeIndex = slideIndex === slides.length ? slides.length - 1 : slideIndex;
                
                showSlide(safeIndex);
            }, { passive: true });
        }
    });
});
