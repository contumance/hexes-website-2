// Gallery functionality

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initScrollAnimation();
});

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (!galleryItems.length || !lightbox || !lightboxImage || !lightboxCaption || !closeLightbox) return;
    
    // Open lightbox when clicking on a gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('.gallery-image').src;
            const imgAlt = item.querySelector('.gallery-image').alt;
            const caption = item.querySelector('.gallery-caption').textContent;
            
            lightboxImage.src = imgSrc;
            lightboxImage.alt = imgAlt;
            lightboxCaption.textContent = caption;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking the close button
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navigate through images with arrow keys
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        const currentImg = lightboxImage.src;
        let currentIndex = -1;
        
        // Find current image index
        galleryItems.forEach((item, index) => {
            const itemImg = item.querySelector('.gallery-image').src;
            if (itemImg === currentImg) {
                currentIndex = index;
            }
        });
        
        if (currentIndex === -1) return;
        
        // Navigate with arrow keys
        if (e.key === 'ArrowRight') {
            // Go to next image
            const nextIndex = (currentIndex + 1) % galleryItems.length;
            showImage(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            // Go to previous image
            const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(prevIndex);
        }
    });
    
    // Show image by index
    function showImage(index) {
        const item = galleryItems[index];
        const imgSrc = item.querySelector('.gallery-image').src;
        const imgAlt = item.querySelector('.gallery-image').alt;
        const caption = item.querySelector('.gallery-caption').textContent;
        
        // Apply a fade effect
        lightboxImage.style.opacity = '0';
        lightboxCaption.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = imgSrc;
            lightboxImage.alt = imgAlt;
            lightboxCaption.textContent = caption;
            
            lightboxImage.style.opacity = '1';
            lightboxCaption.style.opacity = '1';
        }, 200);
    }
}

// Scroll animations for gallery items
function initScrollAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    // Add delay for each item to create a staggered effect
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Check which items are visible on page load
    checkItemsVisibility();
    
    // Check visibility on scroll
    window.addEventListener('scroll', () => {
        checkItemsVisibility();
    });
    
    function checkItemsVisibility() {
        galleryItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
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
}