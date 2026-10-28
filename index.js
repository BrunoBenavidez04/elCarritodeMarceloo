
/* =========================================================
   SELECCIONAMOS LOS ELEMENTOS DEL HTML
   ========================================================= */


/* Buscamos todos los botones "Agregar" */
const botones = document.querySelectorAll(".agregar-carrito");


/* Buscamos el contenedor donde aparecerán
   los productos del carrito */
const lista = document.getElementById("lista-carrito");


/* Buscamos el elemento donde aparecerá el total */
const total = document.getElementById("total");


/* =========================================================
   CARGAR CARRITO
   ========================================================= */


/* Intentamos recuperar el carrito guardado
   anteriormente en el navegador */

/* Si no existe ningún carrito, comenzamos con
   un array vacío */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


/* =========================================================
   GUARDAR CARRITO
   ========================================================= */


/* Esta función guarda el carrito en el navegador */

function guardarCarrito() {

    /* localStorage permite conservar los productos
       aunque el usuario cierre la página */

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


/* =========================================================
   MOSTRAR CARRITO
   ========================================================= */


/* Esta función actualiza visualmente el carrito */

function mostrarCarrito() {

    /* Primero limpiamos la lista */
    lista.innerHTML = "";


    /* Variable donde vamos a sumar los precios */
    let suma = 0;


    /* Si no hay productos mostramos un mensaje */

    if (carrito.length === 0) {

        lista.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

    }


    /* Recorremos todos los productos */
    carrito.forEach((producto, index) => {


        /* Sumamos el precio */
        suma += producto.precio;


        /* Creamos visualmente el producto */
        lista.innerHTML += `

            <div class="item-carrito">

                <div>

                    <!-- Nombre del producto -->
                    <strong>
                        ${producto.nombre}
                    </strong>

                    <br>

                    <!-- Precio -->
                    <span>
                        $${producto.precio}
                    </span>

                </div>


                <!-- Botón para eliminar -->
                <button
                    class="eliminar"
                    onclick="eliminarProducto(${index})">

                    X

                </button>

            </div>

        `;

    });


    /* Mostramos el total */
    total.textContent = suma;

}


/* =========================================================
   ELIMINAR PRODUCTO
   ========================================================= */


/* Esta función elimina un producto específico */

function eliminarProducto(index) {

    /* Eliminamos el producto utilizando su posición */
    carrito.splice(index, 1);


    /* Guardamos nuevamente el carrito */
    guardarCarrito();


    /* Actualizamos la pantalla */
    mostrarCarrito();

}


/* =========================================================
   AGREGAR PRODUCTOS
   ========================================================= */


/* Recorremos todos los botones */
botones.forEach(boton => {


    /* Detectamos cuando el usuario hace clic */
    boton.addEventListener("click", () => {


        /* Agregamos un nuevo objeto al carrito */

        carrito.push({

            /* Obtenemos el nombre desde
               data-nombre del botón */

            nombre: boton.dataset.nombre,


            /* Obtenemos el precio desde
               data-precio */

            precio: Number(boton.dataset.precio)

        });


        /* Guardamos los cambios */
        guardarCarrito();


        /* Actualizamos visualmente el carrito */
        mostrarCarrito();


        /* Pequeña animación visual del botón */

        boton.textContent = "✓ Agregado";


        /* Después de un segundo volvemos
           a mostrar "+ Agregar" */

        setTimeout(() => {

            boton.textContent = "+ Agregar";

        }, 1000);

    });

});


/* =========================================================
   VACIAR CARRITO
   ========================================================= */


/* Buscamos el botón Vaciar */
document
    .getElementById("vaciar")
    .addEventListener("click", () => {


        /* Eliminamos todos los productos */
        carrito = [];


        /* Guardamos el carrito vacío */
        guardarCarrito();


        /* Actualizamos la pantalla */
        mostrarCarrito();

    });


/* =========================================================
   INICIAR CARRITO
   ========================================================= */


/* Mostramos el carrito apenas se carga la página */

mostrarCarrito();

























const carrusel = document.querySelector("#carrusel");

new bootstrap.Carousel(carrusel, {
    interval: 3000,
    wrap: true
});
