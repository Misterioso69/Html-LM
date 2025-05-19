document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const carrusel = document.querySelector('.carrusel');
    const contenedor = document.querySelector('.carrusel-productos');
    const items = document.querySelectorAll('.carrusel-item');
    const btnAnterior = document.querySelector('.control.anterior');
    const btnSiguiente = document.querySelector('.control.siguiente');
    const indicadoresContainer = document.querySelector('.indicadores');
    
    // Configuración
    const itemsPorVista = 4;
    const totalItems = items.length;
    let indiceActual = 0; 
    let intervalo;

    // Función para crear indicadores (ajustada para desplazamiento por producto)
    function crearIndicadores() {
        indicadoresContainer.innerHTML = '';
        const totalIndicadores = totalItems - itemsPorVista + 1;
        
        for (let i = 0; i < totalIndicadores; i++) {
            const indicador = document.createElement('span');
            indicador.className = 'indicador' + (i === 0 ? ' activo' : '');
            indicador.addEventListener('click', () => irAProducto(i));
            indicadoresContainer.appendChild(indicador);
        }
    }

    // Función para mover el carrusel (modificada para desplazamiento suave)
    function moverCarrusel() {
        const anchoItem = items[0].offsetWidth + 20; // Incluye margen
        const desplazamiento = -indiceActual * anchoItem;
        contenedor.style.transform = `translateX(${desplazamiento}px)`;
        contenedor.style.transition = 'transform 0.5s ease-in-out';
        
        actualizarControles();
        actualizarIndicadores();
    }

    // Actualizar controles de navegación
    function actualizarControles() {
        btnAnterior.style.display = indiceActual === 0 ? 'none' : 'block';
        btnSiguiente.style.display = indiceActual >= totalItems - itemsPorVista ? 'none' : 'block';
    }

    // Actualizar indicadores
    function actualizarIndicadores() {
        const indicadores = document.querySelectorAll('.indicador');
        const totalIndicadores = totalItems - itemsPorVista + 1;
        const indicadorActivo = Math.min(indiceActual, totalIndicadores - 1);
        
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('activo', i === indicadorActivo);
        });
    }

    // Cambiar producto (ahora avanza de 1 en 1)
    function cambiarProducto(paso) {
        const nuevoIndice = indiceActual + paso;
        const maxIndice = totalItems - itemsPorVista;
        
        if (nuevoIndice >= 0 && nuevoIndice <= maxIndice) {
            indiceActual = nuevoIndice;
            moverCarrusel();
            reiniciarIntervalo();
        }
    }


    // Event listeners actualizados
    btnAnterior.addEventListener('click', () => cambiarProducto(-1));
    btnSiguiente.addEventListener('click', () => cambiarProducto(1));
    
    // Pausar al interactuar
    carrusel.addEventListener('mouseenter', () => clearInterval(intervalo));
    carrusel.addEventListener('mouseleave', iniciarIntervalo);

    // Inicialización
    crearIndicadores();
    moverCarrusel();
    iniciarIntervalo();

    // Ajustes de estilo para el desplazamiento suave
    contenedor.style.marginLeft = '10px';
    contenedor.style.width = 'calc(100% - 20px)';
    contenedor.style.display = 'flex';
    contenedor.style.flexWrap = 'nowrap';
    
    // Asegurar que los items no se envuelvan
    items.forEach(item => {
        item.style.flexShrink = '0';
    });
});