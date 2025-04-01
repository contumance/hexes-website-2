// Script simplificado para la funcionalidad del menú hamburguesa
// Esta versión elimina código innecesario y se centra en hacer que el menú funcione

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing mobile menu');
    
    // Elementos del menú
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-nav');
    
    // Verificar que existen los elementos
    if (!menuButton || !mobileMenu) {
        console.error('Menu elements not found!');
        return;
    }
    
    console.log('Menu elements found, setting up click handler');
    
    // Añadir evento de clic al botón del menú
    menuButton.addEventListener('click', function() {
        // Toggle de clases activas
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        console.log('Menu button clicked - menu is now:', 
                   mobileMenu.classList.contains('active') ? 'VISIBLE' : 'HIDDEN');
    });
    
    // Cerrar menú al hacer clic en enlaces
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            console.log('Link clicked - menu closed');
        });
    });
    
    console.log('Mobile menu fully initialized');
});