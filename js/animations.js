// General animations

function initAnimations() {
    // Apply fade-in animations to elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        
        // Check if element is in viewport
        if (isElementInViewport(element)) {
            setTimeout(() => {
                element.style.opacity = '1';
            }, 100);
        } else {
            // If not in viewport, add observer to fade in when it becomes visible
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                        }, 100);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        }
    });
    
    // Staggered animations for lists
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    staggerContainers.forEach(container => {
        const children = Array.from(container.children);
        
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            child.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Check if container is in viewport
        if (isElementInViewport(container)) {
            applyStaggeredAnimation(children);
        } else {
            // If not in viewport, add observer to animate when it becomes visible
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        applyStaggeredAnimation(children);
                        observer.unobserve(container);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(container);
        }
    });
    
    // Apply hover animations
    initHoverAnimations();
}

function applyStaggeredAnimation(elements) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 100);
    });
}

function initHoverAnimations() {
    // Add hover effect to elements with hover-animation class
    const hoverElements = document.querySelectorAll('.hover-animation');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('hover-active');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('hover-active');
        });
    });
}

// Add smooth page transitions
function initPageTransitions() {
    // Apply fade effect when navigating between pages
    document.querySelectorAll('a').forEach(link => {
        // Skip external links, hash links, and links with no href
        if (!link.href || link.href.indexOf('#') !== -1 || link.href.indexOf(window.location.origin) === -1) {
            return;
        }
        
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // Start fade out
            document.body.classList.add('transition-out');
            
            // After animation completes, navigate to the new page
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
    
    // Add transition-in class to body when page loads
    window.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('transition-in');
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && 
        rect.bottom >= 0
    );
}