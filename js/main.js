// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize the hexagon animation
    initHexAnimation();
    
    // Handle navigation
    initNavigation();
});

function initNavigation() {
    // Get current page URL
    const currentPage = window.location.pathname;
    
    // Set active class for current page in navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
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

function initAnimations() {
    // Add fade-in class to body to create page transition effect
    document.body.classList.add('fade-in');
    
    // Apply staggered animations to lists
    const staggeredLists = document.querySelectorAll('.stagger-animation');
    staggeredLists.forEach(list => {
        list.classList.add('stagger-fade-in');
    });
    
    // Apply hover animations
    const hoverElements = document.querySelectorAll('.hover-animation');
    hoverElements.forEach(element => {
        element.classList.add('hover-lift');
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