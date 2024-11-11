// Primero agregamos los estilos necesarios
const styles = `
.aroma-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.aroma-popup {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
}

.aroma-options {
    display: flex;
    gap: 10px;
    margin: 15px 0;
    flex-wrap: wrap;
}

.aroma-option {
    border: 1px solid #ccc;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.aroma-option:hover {
    border-color: #007185;
}

.aroma-option.selected {
    border-color: #007185;
    background-color: #f0f8ff;
}

.aroma-popup button {
    background: #ffd814;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
}

.aroma-popup button:hover {
    background: #f7ca00;
}

.product-counter {
    font-weight: bold;
    margin-bottom: 10px;
}
`;

// Agregar estilos al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Aromas disponibles
const AROMAS = ["Romero", "Lavanda", "Mandarina"];

const productos = [
  {
    id: 1,
    nombre: "Balulu",
    precio: 300,
    imagen: ["./img/balulu.jpeg", "./img/balulu2.jpeg"],
    descripcion:
      "¡Conoce a Balulu! Soy una suave y tierna amiga que no solo te abraza, sino que también te envuelvo en un delicioso aroma que transforma cada momento en pura calma. Perfecto para relajarte, ver una película o dar un tierno abrazo.",
  },
  {
    id: 2,
    nombre: "Cinetocoro",
    precio: 300,
    imagen: ["./img/cinetocoro.jpeg", "./img/cinetocoro2.jpeg"],
    descripcion:
      "¡Cinetocoro el oso polar! Tejido a mano y súper suave, soy el compañero perfecto para tus abrazos. Mi fragancia fresca te llevará a un mundo de calma y confort. Ideal para acurrucarte mientras disfrutas de tus momentos favoritos. ¡Haz que cada abrazo sea especial!",
  },
  {
    id: 3,
    nombre: "Piotau",
    precio: 300,
    imagen: ["./img/piotau.jpeg", "./img/piotau2.jpeg"],
    descripcion:
      "¿Qué tal? Soy Piotau, tu nuevo amigo emplumado que te acompañara en todas todas tus aventuras!",
  },
  {
    id: 4,
    nombre: "Poneru",
    precio: 300,
    imagen: ["./img/poneru.jpeg", "./img/poneru2.jpeg"],
    descripcion:
      "¡Hola! Mi nombre es Poneru, soy una rana a la que le encanta acompañarte atodos lados y pasarun buen rato. Conn tu amigo Poneru, nunca te sentirá solo.",
  },
];

// Muestra los productos en la página de productos
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto-card");

    // Contenedor del carrusel de imágenes
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");

    // Imagen actual del carrusel
    let currentImageIndex = 0;

    // Crear imágenes y ocultar las que no están activas
    producto.imagen.forEach((imgSrc, index) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = producto.nombre;
      img.style.display = index === currentImageIndex ? "block" : "none"; // Mostrar la primera imagen
      carouselContainer.appendChild(img);
    });

    // Función para mostrar la imagen basada en el índice
    function showImage(index) {
      const images = carouselContainer.querySelectorAll("img");
      images.forEach((img) => (img.style.display = "none"));
      images[index].style.display = "block";
    }

    // Mostrar la primera imagen al inicio
    showImage(currentImageIndex);

    // Botón de flecha izquierda
    const leftArrow = document.createElement("button");
    leftArrow.classList.add("carousel-arrow", "left-arrow");
    leftArrow.innerHTML = "◀";
    leftArrow.onclick = () => {
      currentImageIndex =
        (currentImageIndex - 1 + producto.imagen.length) %
        producto.imagen.length;
      showImage(currentImageIndex);
    };

    // Botón de flecha derecha
    const rightArrow = document.createElement("button");
    rightArrow.classList.add("carousel-arrow", "right-arrow");
    rightArrow.innerHTML = "▶";
    rightArrow.onclick = () => {
      currentImageIndex = (currentImageIndex + 1) % producto.imagen.length;
      showImage(currentImageIndex);
    };

    // Añadir flechas y contenedor de imágenes al carrusel
    carouselContainer.appendChild(leftArrow);
    carouselContainer.appendChild(rightArrow);

    // Contenido de la tarjeta
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    cardContent.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio} MXN</p>
        <a href="productoIndividual.html" onclick="guardarProductoID(${producto.id})" class="btn">Ver detalles</a>
        <a onclick="agregarAlCarrito(${producto.id})" class="btn">Agregar al carrito</a>
      `;

    div.appendChild(carouselContainer);
    div.appendChild(cardContent);
    contenedor.appendChild(div);
  });
}

const guardarProductoID = (id) => {
  localStorage.setItem("productoID", id);
};

// Script en JavaScript
let currentId;
let remainingQuantity;

function agregarAlCarrito(id) {
  currentId = id || obtenerProductoId();
  const quantityElement = document.getElementById("quantity");
  const cantidad = quantityElement ? parseInt(quantityElement.value) || 1 : 1;
  remainingQuantity = cantidad;

  mostrarAromaModal();
}

function mostrarAromaModal() {
  document.getElementById("modalTitle").innerText = `Selecciona un aroma para el producto (${remainingQuantity} restantes)`;
  document.getElementById("aromaModal").style.display = "flex";
}

function confirmarAroma() {
  const aromaSeleccionado = document.querySelector('input[name="aroma"]:checked');
  if (!aromaSeleccionado) {
    alert("Por favor, selecciona un aroma.");
    return;
  }

  const producto = productos.find((p) => p.id === currentId);
  const productoConAroma = { ...producto, aroma: aromaSeleccionado.value };
  carrito.push(productoConAroma);
  remainingQuantity--;

  if (remainingQuantity > 0) {
    document.querySelector('input[name="aroma"]:checked').checked = false;
    mostrarAromaModal();
  } else {
    cerrarAromaModal();
    actualizarCarrito();
    actualizarCarritoContador();
  }
}

function cerrarAromaModal() {
  document.getElementById("aromaModal").style.display = "none";
}


function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
  mostrarCarrito();
}

// Elimina un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarritoContador() {
  const contador = document.getElementById("carrito-contador");
  if (!contador) console.log("en esta página no hay contador");
  else contador.innerText = carrito.length;
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  if (!contenedor) {
    //para los casos en los que la página de carrito no esté cargada
    return;
  }
  console.log(carrito);
  contenedor.innerHTML = "";
  carrito.forEach((producto, index) => {
    if (producto == null) return;
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
        <img src=${producto.imagen[0]} alt="productimg" width="200"/>
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio} MXN</p>
        <p>Aroma: ${producto.aroma}<p>
        <button onclick="eliminarDelCarrito(${index})" class="btn">Eliminar</button>
      `;
    contenedor.appendChild(div);
  });
  calcularTotal();
}

// Calcula el total del carrito
function calcularTotal() {
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  document.getElementById("total").innerText = `Total: $${total} MXN`;
}

// Vacía el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

window.onload = function () {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarritoContador();

  if (window.location.pathname.endsWith("productos.html")) {
    mostrarProductos();
  }
  if (window.location.pathname.endsWith("carrito.html")) {
    mostrarCarrito(); // Mostrar carrito después de cargarlo desde localStorage
  }
};

function obtenerProductoId() {
  return parseInt(localStorage.getItem("productoID")) || 1; // Default a 1 si no hay ID
}

// Función para cambiar la imagen principal
function cambiarImagenPrincipal(src, index) {
  document.getElementById("mainImage").src = src;
  // Actualizar thumbnails activos
  document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

// Función para generar los thumbnails
function generarThumbnails(producto) {
  const thumbnailContainer = document.getElementById("thumbnails");
  thumbnailContainer.innerHTML = ""; // Limpiar contenedor existente

  producto.imagen.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active");
    thumb.onclick = () => cambiarImagenPrincipal(src, index);
    thumbnailContainer.appendChild(thumb);
  });
}

// Función para inicializar la página del producto
function inicializarPaginaProducto() {
  const productId = obtenerProductoId();
  const producto = productos.find((p) => p.id === productId);

  if (producto) {
    // Actualizar título de la página
    document.title = `${producto.nombre}`;

    // Actualizar elementos en la página
    document.getElementById("productName").textContent = producto.nombre;
    document.getElementById("descripcion").textContent = producto.descripcion;
    document.getElementById("productTitle").textContent = producto.nombre;
    document.getElementById("productPrice").textContent = producto.precio;
    document.getElementById("mainImage").src = producto.imagen[0];

    // Generar thumbnails
    generarThumbnails(producto);
  } else {
    // Manejar caso de producto no encontrado
    document.body.innerHTML =
      '<div class="container"><h1>Producto no encontrado</h1></div>';
  }
}

function seleccionarAroma(numeroProducto, total) {
  return new Promise((resolve, reject) => {
    const overlay = document.createElement("div");
    overlay.className = "aroma-popup-overlay";

    const popup = document.createElement("div");
    popup.className = "aroma-popup";

    const counter = document.createElement("div");
    counter.className = "product-counter";
    counter.textContent = `Producto ${numeroProducto} de ${total}`;

    const titulo = document.createElement("h3");
    titulo.textContent = "Selecciona un aroma";

    const opcionesContainer = document.createElement("div");
    opcionesContainer.className = "aroma-options";

    let aromaSeleccionado = null;

    AROMAS.forEach((aroma) => {
      const opcion = document.createElement("div");
      opcion.className = "aroma-option";
      opcion.textContent = aroma;
      opcion.onclick = () => {
        // Remover selección previa
        opcionesContainer.querySelectorAll(".aroma-option").forEach((op) => {
          op.classList.remove("selected");
        });
        // Seleccionar nueva opción
        opcion.classList.add("selected");
        aromaSeleccionado = aroma;
      };
      opcionesContainer.appendChild(opcion);
    });

    const confirmarBtn = document.createElement("button");
    confirmarBtn.textContent = "Confirmar selección";
    confirmarBtn.onclick = () => {
      if (aromaSeleccionado) {
        document.body.removeChild(overlay);
        resolve(aromaSeleccionado);
      } else {
        alert("Por favor selecciona un aroma");
      }
    };

    popup.appendChild(counter);
    popup.appendChild(titulo);
    popup.appendChild(opcionesContainer);
    popup.appendChild(confirmarBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  });
}

// Inicializar la página cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarPaginaProducto);
