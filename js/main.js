document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');

    if (mobileToggle && navMenu) {
        // Toggle Mobile Menu
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Scroll Effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Infinite Marquee Logic
    const marqueeContainer = document.querySelector('.marquee-container');
    if (marqueeContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let scrollSpeed = 1; // Default speed
        let autoScroll = true;

        // Auto Scroll Function
        const step = () => {
            if (autoScroll && !isDown) {
                marqueeContainer.scrollLeft += scrollSpeed;

                // Infinite Loop Reset
                const contentWidth = marqueeContainer.scrollWidth / 2;
                if (marqueeContainer.scrollLeft >= contentWidth) {
                    marqueeContainer.scrollLeft -= contentWidth;
                }
            }
            requestAnimationFrame(step);
        };

        // Mouse/Touch Events for Manual Drag
        marqueeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            marqueeContainer.classList.add('active');
            startX = e.pageX - marqueeContainer.offsetLeft;
            scrollLeft = marqueeContainer.scrollLeft;
            autoScroll = false;
        });

        marqueeContainer.addEventListener('mouseleave', () => {
            isDown = false;
            autoScroll = true;
        });

        marqueeContainer.addEventListener('mouseup', () => {
            isDown = false;
            autoScroll = true;
        });

        marqueeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - marqueeContainer.offsetLeft;
            const walk = (x - startX) * 2;
            marqueeContainer.scrollLeft = scrollLeft - walk;

            // Infinite loop check during manual scroll
            const contentWidth = marqueeContainer.scrollWidth / 2;
            if (marqueeContainer.scrollLeft >= contentWidth) {
                marqueeContainer.scrollLeft -= contentWidth;
            } else if (marqueeContainer.scrollLeft <= 0) {
                marqueeContainer.scrollLeft += contentWidth;
            }
        });

        // Speed adjustment for mobile
        if (window.innerWidth < 600) {
            scrollSpeed = 2; // Faster for mobile as requested
        }

        requestAnimationFrame(step);
    }
});
