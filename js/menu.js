// Archivo específico para la funcionalidad del menú hamburguesa
// Este script debe cargarse en todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    console.log('Menu elements:', { 
        mobileMenuToggle: mobileMenuToggle, 
        mobileNav: mobileNav 
    });
    
    if (mobileMenuToggle && mobileNav) {
        // Añadir listener para el botón de hamburguesa
        mobileMenuToggle.addEventListener('click', function(e) {
            // Prevenir comportamiento predeterminado si existe
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle clases
            console.log('Toggle clicked - toggling menu');
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Log state after toggle
            console.log('Menu state after click:', {
                buttonActive: this.classList.contains('active'),
                navActive: mobileNav.classList.contains('active')
            });
        });
        
        // Cerrar menú al hacer clic en un enlace
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Link clicked - closing menu');
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('active') && 
                !e.target.closest('.mobile-nav') && 
                !e.target.closest('.mobile-menu-toggle')) {
                console.log('Outside click - closing menu');
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        console.log('Mobile menu initialized successfully');
    } else {
        console.error('Mobile menu elements not found in the page');
    }
});