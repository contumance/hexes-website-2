// Solución definitiva para el menú hamburguesa
// Guarda este archivo como 'js/menu-fix.js'

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del menú
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-nav');
    
    // Verificar que existan los elementos necesarios
    if (!menuButton || !mobileMenu) {
        console.error('Error: No se encontraron los elementos del menú móvil');
        return;
    }
    
    // Función para abrir y cerrar el menú
    function toggleMenu() {
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Evento para el botón hamburguesa
    menuButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir comportamiento por defecto
        e.stopPropagation(); // Evitar propagación del evento
        toggleMenu();
    });
    
    // Cerrar menú al hacer clic en los enlaces
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Cerrar menú al hacer clic fuera del menú
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !menuButton.contains(event.target)) {
            toggleMenu();
        }
    });
    
    console.log('Menú móvil inicializado correctamente');
});