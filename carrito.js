
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

botonWhatsApp.addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá productos antes de continuar.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";
    let total = 0;

    carrito.forEach(function(producto) {
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
});
