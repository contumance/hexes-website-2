// Parallax effects

function initParallax() {
    // Select all elements with parallax class
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', () => {
        applyParallaxOnScroll(parallaxElements);
    });
    
    // Add parallax effect on mouse move for more interactivity
    document.addEventListener('mousemove', (e) => {
        applyParallaxOnMouseMove(e, parallaxElements);
    });
    
    // Initial application
    applyParallaxOnScroll(parallaxElements);
}

function applyParallaxOnScroll(elements) {
    // Get scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    elements.forEach(element => {
        // Get data attribute for parallax speed or use default
        const speed = element.dataset.parallaxSpeed || 0.3;
        
        // Calculate parallax offset
        const offset = scrollTop * speed;
        
        // Apply transform
        if (element.classList.contains('parallax-reverse')) {
            element.style.transform = `translateY(${-offset}px)`;
        } else {
            element.style.transform = `translateY(${offset}px)`;
        }
    });
}

function applyParallaxOnMouseMove(e, elements) {
    // Get viewport dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position relative to the center of the screen
    const mouseX = e.clientX - windowWidth / 2;
    const mouseY = e.clientY - windowHeight / 2;
    
    elements.forEach(element => {
        // Only apply mouse parallax to elements with the mouse-parallax class
        if (element.classList.contains('mouse-parallax')) {
            // Get data attribute for mouse parallax intensity or use default
            const intensity = element.dataset.mouseParallax || 0.05;
            
            // Calculate movement based on mouse position and intensity
            const moveX = mouseX * intensity;
            const moveY = mouseY * intensity;
            
            // Apply transform, preserving any existing transforms
            const currentTransform = element.style.transform || '';
            
            // Update with mouse movement
            if (currentTransform.includes('translateY')) {
                // If we already have a translateY (from scroll), add translateX
                element.style.transform = `${currentTransform} translateX(${moveX}px)`;
            } else {
                // Otherwise add both transforms
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        }
    });
}