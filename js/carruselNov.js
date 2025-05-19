document.addEventListener('DOMContentLoaded', function() {
    const galeria = document.querySelector('.galeria-deslizante');
    const imagenes = document.querySelectorAll('.galeria-deslizante img');
    const btnAnterior = document.querySelector('.boton-anterior');
    const btnSiguiente = document.querySelector('.boton-siguiente');
    
    let indiceActual = 0;
    const imagenesVisibles = 3;
    const totalImagenes = imagenes.length;
    const espacioEntre = 15;
    
    function calcularDesplazamiento() {
        return imagenes[0].clientWidth + espacioEntre;
    }
    
    function actualizarGaleria() {
        const desplazamiento = indiceActual * calcularDesplazamiento();
        galeria.style.transform = `translateX(${-desplazamiento}px)`;
        
        btnAnterior.classList.toggle('no-visible', indiceActual === 0);
        btnSiguiente.classList.toggle('no-visible', indiceActual >= totalImagenes - imagenesVisibles);
    }
    
    btnAnterior.addEventListener('click', () => {
        if (indiceActual > 0) {
            indiceActual--;
            actualizarGaleria();
        }
    });
    
    btnSiguiente.addEventListener('click', () => {
        if (indiceActual < totalImagenes - imagenesVisibles) {
            indiceActual++;
            actualizarGaleria();
        }
    });
    
    actualizarGaleria();
    
    window.addEventListener('resize', actualizarGaleria);
});