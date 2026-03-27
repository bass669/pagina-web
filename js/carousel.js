document.addEventListener("DOMContentLoaded", function() {
    let index = 1;
    const totalItems = 3;
    let autoPlay = true;

    // Función que cambia el slide
    const changeSlide = () => {
        if (autoPlay) {
            index++;
            if (index > totalItems) index = 1;
            
            const nextRadio = document.getElementById(`item-${index}`);
            if (nextRadio) {
                nextRadio.checked = true;
                console.log("cambio")
            }
        }
    };

    // Crear el intervalo (10 segundos)
    let carruselInterval = setInterval(changeSlide, 5000);
    const sliderContainer = document.getElementById('quienessomos');

    if (sliderContainer) {
        // Pausar con el mouse entra
        sliderContainer.addEventListener('mouseenter', () => {
            autoPlay = false;
            console.log("pausado"); 
        });
        
        // Reanudar con el mouse sale
        sliderContainer.addEventListener('mouseleave', () => {
            autoPlay = true;
            console.log("reanudado");
        });

    }
});
