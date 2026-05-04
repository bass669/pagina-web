document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById('contenedor-galeria');
    const filterMenu = document.getElementById('filter-menu');
    const API_URL = 'https://script.google.com/macros/s/AKfycbz7lLFqD-t_e_CnGRPZ_s8cyYtYrSNqNTejpOn9Osa2tvuINIeO_cQLCx8E5gjp-xxT/exec';

    // Función para renderizar los datos
    const renderGallery = (data) => {
        const categorias = Object.keys(data);
        const fragment = document.createDocumentFragment(); 

        const eventos = Object.keys(data);

        const btnTodos = document.createElement('button');
        btnTodos.className = 'btn btn-outline-danger active'; 
        btnTodos.innerText = 'Todos';
        btnTodos.onclick = function() { filterGallery('all', this); };
        filterMenu.appendChild(btnTodos);

        // Botones de categorias
        eventos.forEach(nombreEvento => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-danger';
            btn.innerText = nombreEvento;
            btn.onclick = function() { filterGallery(nombreEvento, this); };
            filterMenu.appendChild(btn);
        });
        
        // Crear secciones de galería
        categorias.forEach(nombreEvento => {
            const section = document.createElement('div');
            section.className = 'gallery-section';
            section.setAttribute('data-category', nombreEvento);
            section.innerHTML = `<h2 class="col-12 mt-5 mb-4 text-white "
                    style="color: #e60000;
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                    padding-bottom: 10px;">${nombreEvento}</h2>`;
            const row = document.createElement('div');
            row.className = 'row';

            data[nombreEvento].images.forEach(url => {
                const col = document.createElement('div');
                col.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
                col.innerHTML = `<div class="galeria-item"><img src="${url}" loading="lazy" style="aspect-ratio: 1/1; object-fit: cover;"></div>`;
                row.appendChild(col);
            });

            section.appendChild(row);
            fragment.appendChild(section); // Agregamos al fragmento
        });

        contenedor.innerHTML = ''; // Limpiamos antes de insertar
        contenedor.appendChild(fragment); // Insertamos todo de golpe
        
        // Iniciar en Expogame
        const btnExpogame = Array.from(filterMenu.querySelectorAll('.btn')).find(b => b.innerText === 'Expogame');
        if (btnExpogame) filterGallery('Expogame', btnExpogame);
    };

    // Carga con Caché
    const cachedData = localStorage.getItem('galleryData');
    if (cachedData) {
        renderGallery(JSON.parse(cachedData)); // Carga instantánea
    }

    // hacemos fetch para actualizar, pero renderizamos si no había caché
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('galleryData', JSON.stringify(data)); // Guardamos en caché
            if (!cachedData) renderGallery(data); // Solo renderizar si es la primera vez
        });
});

// Función de filtrado
function filterGallery(category, buttonElement) {
    const allButtons = document.querySelectorAll('#filter-menu .btn');
    allButtons.forEach(btn => btn.classList.remove('active'));

    buttonElement.classList.add('active');
    // Mostrar/Ocultar secciones
    const sections = document.querySelectorAll('.gallery-section');
    sections.forEach(sec => {
        if (category === 'all' || sec.getAttribute('data-category') === category) {
            sec.style.display = 'block';
        } else {
            sec.style.display = 'none';
        }
    });
}


