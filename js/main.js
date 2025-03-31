// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animaciones
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
    
    // Inicializar parallax effect
    if (typeof initParallax === 'function') {
        initParallax();
    }
    
    // Inicializar la animación de hexágonos (solo si la función existe)
    if (typeof initHexAnimation === 'function' && document.querySelector('.hexagon-container')) {
        initHexAnimation();
    }
    
    // Manejar navegación
    initNavigation();
});

function initNavigation() {
    // Get current page URL
    const currentPage = window.location.pathname;
    
    // Set active class for current page in navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPage.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.mobile-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            if (navMenu) {
                navMenu.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
                document.body.classList.remove('no-scroll');
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                    }
                    document.body.classList.remove('no-scroll');
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Page transitions for internal links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
        e.preventDefault();
        document.body.classList.add('page-transition-out');
        
        setTimeout(() => {
            window.location = link.href;
        }, 300);
    }
});