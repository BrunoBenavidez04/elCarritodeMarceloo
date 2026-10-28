

const carrusel = document.querySelector("#carruselComidas");

if (carrusel) {
    new bootstrap.Carousel(carrusel, {
        interval: 3000,
        wrap: true
    });
}



/* CONTACTO POR WHATSAPP */

const botonContactar = document.getElementById("contactarWhatsApp");

if (botonContactar) {
    botonContactar.addEventListener("click", function(event) {
        event.preventDefault();

        const numeroWhatsApp = "5493364249330";

        let mensaje = "Hola, estoy interesado/a en el servicio de catering para eventos que ofrecen.\n\n";
        mensaje += "¿Me podrían contar qué incluye el servicio?";

        const enlaceWhatsApp =
            "https://wa.me/" + numeroWhatsApp +
            "?text=" + encodeURIComponent(mensaje);

        window.location.href = enlaceWhatsApp;
    });
}
