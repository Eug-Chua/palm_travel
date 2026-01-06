/**
 * Palm Travel - Main JavaScript
 * Handles animations, interactions, and UI components
 */

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optionally unobserve after animation
            // animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, [data-animate]'
    );

    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Auto-add animations to common elements
    const autoAnimateSelectors = [
        'section > .max-w-7xl > .grid > div',
        'section > .max-w-7xl > .text-center',
        '.service-card',
        '.feature-card'
    ];

    autoAnimateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            if (!el.classList.contains('animate-fade-up')) {
                el.classList.add('animate-fade-up');
                el.style.transitionDelay = `${index * 100}ms`;
                animateOnScroll.observe(el);
            }
        });
    });
});


// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Animate menu icon
            menuBtn.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.classList.remove('menu-open');
            }
        });
    }
}


// ============================================
// CHATBOT
// ============================================

function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    const chatToggle = document.getElementById('chatbot-toggle');

    if (chatWindow) {
        chatWindow.classList.toggle('hidden');

        // Add animation class
        if (!chatWindow.classList.contains('hidden')) {
            chatWindow.classList.add('chat-open');
        } else {
            chatWindow.classList.remove('chat-open');
        }
    }
}

// Make toggleChatbot globally available
window.toggleChatbot = toggleChatbot;


// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }

        lastScroll = currentScroll;
    });
}


// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// ============================================
// FORM INTERACTIONS
// ============================================

function initFormInteractions() {
    const form = document.getElementById('contact-form');

    if (form) {
        // Add focus animations to inputs
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Add loading state to button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual submission)
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Message Sent!</span>
                `;
                submitBtn.classList.remove('bg-primary', 'hover:bg-secondary');
                submitBtn.classList.add('bg-green-600');

                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.add('bg-primary', 'hover:bg-secondary');
                    submitBtn.classList.remove('bg-green-600');
                    submitBtn.disabled = false;
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }
}


// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
}


// ============================================
// HOVER EFFECTS
// ============================================

function initHoverEffects() {
    // Card tilt effect
    document.querySelectorAll('.hover-tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}


// ============================================
// INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initFormInteractions();
    animateCounters();
    initHoverEffects();
});
