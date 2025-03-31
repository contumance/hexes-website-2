// Hexagon Animation

function initHexAnimation() {
    const hexContainer = document.querySelector('.hexagon-container');
    
    if (!hexContainer) return;
    
    // Create the hexagonal layers
    createHexagons(hexContainer);
    
    // Add hover interactions
    addHexInteractions(hexContainer);
}

function createHexagons(container) {
    // Clear any existing hexagons
    container.innerHTML = '';
    
    // Create 4 hexagonal layers with different sizes and colors
    const hexagons = [
        { class: 'hex-1', rotationClass: 'rotate-slow' },
        { class: 'hex-2', rotationClass: 'rotate-medium' },
        { class: 'hex-3', rotationClass: 'rotate-fast' },
        { class: 'hex-4', rotationClass: 'rotate-very-fast' }
    ];
    
    // Create each hexagon with proper classes
    hexagons.forEach(hex => {
        const hexElement = document.createElement('div');
        hexElement.classList.add('hexagon', hex.class, hex.rotationClass);
        container.appendChild(hexElement);
    });
}

function addHexInteractions(container) {
    // Get all hexagon elements
    const hexElements = container.querySelectorAll('.hexagon');
    
    // Pause animation on hover
    container.addEventListener('mouseenter', () => {
        hexElements.forEach(hex => {
            // Store the current rotation
            const computedStyle = window.getComputedStyle(hex);
            const transform = computedStyle.getPropertyValue('transform');
            
            // Pause the animation
            hex.style.animation = 'none';
            hex.style.transform = transform;
        });
    });
    
    // Resume animation on mouse leave
    container.addEventListener('mouseleave', () => {
        hexElements.forEach(hex => {
            // Clear inline styles to restore animation
            hex.style.animation = '';
            hex.style.transform = '';
            
            // Force a reflow to restart the animation
            void hex.offsetWidth;
            
            // Re-add the rotation classes
            if (hex.classList.contains('hex-1')) {
                hex.classList.add('rotate-slow');
            } else if (hex.classList.contains('hex-2')) {
                hex.classList.add('rotate-medium');
            } else if (hex.classList.contains('hex-3')) {
                hex.classList.add('rotate-fast');
            } else if (hex.classList.contains('hex-4')) {
                hex.classList.add('rotate-very-fast');
            }
        });
    });
    
    // Add subtle movement on mouse move for parallax effect
    container.addEventListener('mousemove', (e) => {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        
        // Get mouse position relative to the container center
        const mouseX = e.clientX - containerRect.left - centerX;
        const mouseY = e.clientY - containerRect.top - centerY;
        
        // Apply movement to each hexagon based on its layer (different intensities)
        hexElements.forEach((hex, index) => {
            // Adjust move factor based on the layer (outer layers move more)
            const moveFactor = 0.02 * (4 - index); // 0.08, 0.06, 0.04, 0.02
            
            const moveX = mouseX * moveFactor;
            const moveY = mouseY * moveFactor;
            
            // Apply the transform, preserving the rotation
            const currentTransform = window.getComputedStyle(hex).getPropertyValue('transform');
            
            if (currentTransform && currentTransform !== 'none') {
                hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            }
        });
    });
}

// Create random subtle movements for the hexagons when not hovering
function createRandomMovements() {
    const hexContainer = document.querySelector('.hexagon-container');
    if (!hexContainer) return;
    
    const hexElements = hexContainer.querySelectorAll('.hexagon');
    
    // Subtle random movements at intervals
    setInterval(() => {
        if (hexContainer.matches(':hover')) return; // Skip if being hovered
        
        hexElements.forEach((hex, index) => {
            const randomX = (Math.random() - 0.5) * 5; // -2.5 to 2.5
            const randomY = (Math.random() - 0.5) * 5;
            const moveFactor = 0.5 * (4 - index); // More movement for outer layers
            
            const moveX = randomX * moveFactor;
            const moveY = randomY * moveFactor;
            
            // Apply a subtle transition for the random movements
            hex.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            
            // Reset after the movement
            setTimeout(() => {
                if (!hexContainer.matches(':hover')) {
                    hex.style.transform = 'translate(-50%, -50%)';
                }
            }, 3000);
        });
    }, 5000); // Every 5 seconds
}

// Initialize random movements
document.addEventListener('DOMContentLoaded', createRandomMovements);