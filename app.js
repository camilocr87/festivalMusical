document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header'); //Selecciono el elemento del html que deseo.
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0 ){
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        } else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){ //Efecto que repasa la pagina al darle click a un enlace en el contenedor de navegacion.
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlaces.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <img width="200" height="300" src="img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <img width="200" height="300" src="img/grande/${id}.jpg" alt="imagen galeria">
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV'); //Efecto que oscurece el fondo cuando se abre una imagen.
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){ //Nos permite cerrar la imagen si doy click fuera de la imagen.
        const body = document.querySelector('body');;
        body.classList.remove('fijar-body'); // Elimina la clase que me impide dar scroll.
        overlay.remove(); // Cerrar la imagen al hacer click.
    }

    //Boton para cerrar el modal

    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');;
        body.classList.remove('fijar-body'); // Elimina la clase que me impide dar scroll.
        overlay.remove(); // Cerrar la imagen al hacer click.
    }
    overlay.appendChild(cerrarModal);


    // Añadirlo a HTML
    const body = document.querySelector('body');;
    body.appendChild(overlay)
    body.classList.add('fijar-body');
}