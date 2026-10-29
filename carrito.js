
let carrito = [];

const botonAbrir = document.getElementById("abrirCarrito");
const botonCerrar = document.getElementById("cerrarCarrito");
const carritoElemento = document.getElementById("carrito");
const fondo = document.getElementById("fondo");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const contador = document.getElementById("contador-carrito");
const botonVaciar = document.getElementById("vaciarCarrito");

const botonesAgregar = document.querySelectorAll(".agregar");


botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        agregarProducto(nombre, precio);

        alert("¡Ya agregaste " + nombre + " al carrito!");
    });
});

function agregarProducto(nombre, precio) {
    const productoExistente = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML =
            `<p class="carrito-vacio">Tu carrito está vacío.</p>`;

        totalElemento.textContent = "$0";
        contador.textContent = "0";
        return;
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(function(producto, index) {
        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        cantidadTotal += producto.cantidad;

        const item = document.createElement("div");
        item.classList.add("item-carrito");

        item.innerHTML = `
            <div class="item-info">
                <h4>${producto.nombre}</h4>

                <div class="item-precio">
                    $${formatearPrecio(producto.precio)}
                </div>

                <div class="cantidad">
                    <button onclick="disminuirCantidad(${index})">−</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="aumentarCantidad(${index})">+</button>
                </div>
            </div>
        `;

        listaCarrito.appendChild(item);
    });

    totalElemento.textContent = "$" + formatearPrecio(total);
    contador.textContent = cantidadTotal;
}

function aumentarCantidad(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

function disminuirCantidad(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}

botonVaciar.addEventListener("click", function() {
    carrito = [];
    actualizarCarrito();
});

botonAbrir.addEventListener("click", function() {
    carritoElemento.classList.add("abierto");
    fondo.classList.add("activo");
});

botonCerrar.addEventListener("click", cerrarCarrito);
fondo.addEventListener("click", cerrarCarrito);

function cerrarCarrito() {
    carritoElemento.classList.remove("abierto");
    fondo.classList.remove("activo");
}

function formatearPrecio(numero) {
    return numero.toLocaleString("es-AR");
}

actualizarCarrito();

/* ==============================
   FINALIZAR PEDIDO POR WHATSAPP
   ============================== */



const numeroWhatsApp = "5493364249330";
const botonWhatsApp = document.getElementById("pedirWhatsApp");
const modalPedido = document.getElementById("modalPedido");
const formularioPedido = document.getElementById("formularioPedido");
const cerrarFormulario = document.getElementById("cerrarFormulario");
const tipoEntrega = document.getElementById("tipoEntrega");
const campoDireccion = document.getElementById("campoDireccion");
const direccionCliente = document.getElementById("direccionCliente");

// ABRIR EL FORMULARIO
botonWhatsApp.addEventListener("click", function () {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá productos antes de continuar.");
        return;
    }

    modalPedido.classList.add("activo");
});

// MOSTRAR LA DIRECCIÓN SI ELIGE ENVÍO
tipoEntrega.addEventListener("change", function () {
    if (tipoEntrega.value === "Envío a domicilio") {
        campoDireccion.classList.add("visible");
        direccionCliente.required = true;
    } else {
        campoDireccion.classList.remove("visible");
        direccionCliente.required = false;
        direccionCliente.value = "";
    }
});

// CERRAR EL FORMULARIO
cerrarFormulario.addEventListener("click", function () {
    modalPedido.classList.remove("activo");
});

// CONFIRMAR PEDIDO Y ABRIR WHATSAPP
formularioPedido.addEventListener("submit", function (event) {
    event.preventDefault();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        modalPedido.classList.remove("activo");
        return;
    }

    const nombre = document.getElementById("nombreCliente").value.trim();
    const apellido = document.getElementById("apellidoCliente").value.trim();
    const entrega = tipoEntrega.value;
    const direccion = direccionCliente.value.trim();

    if (!nombre || !apellido || !entrega) {
        alert("Completá todos los campos obligatorios.");
        return;
    }

    if (entrega === "Envío a domicilio" && !direccion) {
        alert("Ingresá la dirección de entrega.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    mensaje += "DATOS DEL CLIENTE\n";
    mensaje += "Nombre y apellido: " + nombre + " " + apellido + "\n";
    mensaje += "Modalidad: " + entrega + "\n";

    if (entrega === "Envío a domicilio") {
        mensaje += "Dirección: " + direccion + "\n";
    }

    mensaje += "\nDETALLE DEL PEDIDO\n";

    let total = 0;

    carrito.forEach(function (producto) {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        mensaje += "• " + producto.nombre +
            " x" + producto.cantidad +
            " - $" + formatearPrecio(subtotal) + "\n";
    });

    mensaje += "\nTOTAL DEL PEDIDO: $" + formatearPrecio(total);
    mensaje += "\n\n¡Muchas gracias!";

    const enlaceWhatsApp =
        "https://wa.me/" + numeroWhatsApp +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlaceWhatsApp, "_blank");
    modalPedido.classList.remove("activo");
});


/* BOTÓN PARA VOLVER ARRIBA */

const botonBajar = document.getElementById("bajarPagina");
const indiceMenu = document.querySelector(".indice-menu");

function controlarBoton() {
    const limite = indiceMenu.offsetTop + indiceMenu.offsetHeight;

    if (window.scrollY > limite) {
        botonBajar.classList.add("visible");
    } else {
        botonBajar.classList.remove("visible");
    }
}

botonBajar.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", controlarBoton);
controlarBoton();
