 (function(){
        emailjs.init("ke3vfKzM3kDH6SA4L");
    })();

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const btn = event.target.querySelector('button');
        const textoOriginal = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true; // Evita múltiples envíos

        emailjs.sendForm('service_lf9j5mr', 'template_2stcwyb', this)
            .then(function() {
                // VENTANA EMERGENTE DE ÉXITO
                Swal.fire({
                    title: '¡Mensaje Enviado!',
                    text: 'Te contactaremos a la brevedad.',
                    icon: 'success',
                    background: '#1a1a1a', 
                    color: '#fff',
                    showConfirmButton: false, // Oculta el botón OK
                    timer: 3000, // SE CIERRA EN 3 SEGUNDOS
                    timerProgressBar: true, // Muestra la barrita de tiempo
                    iconColor: '#54e600' 
                });

                btn.innerText = textoOriginal;
                btn.disabled = false;
                event.target.reset();
            }, function(error) {
                // VENTANA DE ERROR
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar: ' + JSON.stringify(error),
                    icon: 'error',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#e60000'
                });
                btn.innerText = textoOriginal;
                btn.disabled = false;
            });
    });

    document.addEventListener("DOMContentLoaded", function() {
    // 1. Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Extraer el valor de "servicio"
    const servicioSeleccionado = urlParams.get('servicio');
    
    // 3. Si existe un servicio en la URL, seleccionarlo en el dropdown
    if (servicioSeleccionado) {
        const selectElement = document.getElementById('servicio');
        if (selectElement) {
            selectElement.value = servicioSeleccionado;
        }
    }
});