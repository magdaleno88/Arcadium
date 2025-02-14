// Datos de productos
const products = [
  { id: 1, name: "Anillo de la Invisibilidad Efímera", category: "Hechizos", price: 19.99, description: "Un anillo plateado con una gema transparente que brilla tenuemente. Alrededor de la gema, pequeñas ondas de distorsión en el aire sugieren su efecto de invisibilidad.", image: "img/Anillo.jpeg" },
  { id: 2, name: "Varita del Encantador", category: "Hechizos", price: 29.99, description: "Una varita de madera negra con una espiral dorada recorriendo su longitud. En su punta, un pequeño orbe púrpura flota, vibrando con energía arcana mientras deja un rastro de polvo brillante en el aire.", image: "img/Varita.jpeg" },
  { id: 3, name: "Esfera de Luz Sagrada", category: "Milagro", price: 399.99, description: "Un orbe resplandeciente que emana un brillo dorado celestial, flotando en el aire con runas luminosas girando a su alrededor. Irradia una sensación de calma y protección, con un resplandor cálido que ahuyenta la oscuridad.", image: "img/Milagro.jpg" },
  { id: 4, name: "Rosario de las Estrellas", category: "Milagro", price: 299.99, description: "Un collar de cuentas translúcidas que parecen contener pequeñas constelaciones en su interior. Al sostenerlo, un leve resplandor dorado ilumina la mano de quien lo porta, como si estuviera conectado a la energía del universo.", image: "img/Rosario.jpg" },
  { id: 5, name: "Dagas de la Sombra Silente", category: "Armas", price: 15.99, description: "Un par de dagas curvas de color negro mate, con empuñaduras envueltas en cuero oscuro. Alrededor de ellas, una leve neblina púrpura se retuerce, ocultando su filo en sombras mágicas.", image: "img/Dagas.jpeg" },
  { id: 6, name: "Hacha del Trueno Divino", category: "Armas", price: 12.99, description: "Un hacha de doble filo con un mango de hierro negro. Su cabeza brilla con un intenso resplandor azul mientras pequeños relámpagos recorren su superficie, generando chispas al golpear.", image: "img/Hacha.jpeg" }
];

// Carrito (persistido en localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para renderizar productos
function renderProducts(filter = 'all', search = '') {
  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  const filteredProducts = products.filter(p => {
    const matchCategory = filter === 'all' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    container.appendChild(productDiv);
  });
}

// Función para agregar producto al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Función para actualizar y renderizar el carrito
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <button onclick="removeFromCart(${item.id})">X</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
  document.getElementById('cartTotal').innerText = total.toFixed(2);
  document.getElementById('cartCount').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Función para eliminar un producto del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Manejo de filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    const search = document.getElementById('search').value;
    renderProducts(category, search);
  });
});

// Buscador en tiempo real
document.getElementById('search').addEventListener('input', function() {
  const search = this.value;
  const activeFilter = document.querySelector('.filter-btn.active') ? document.querySelector('.filter-btn.active').getAttribute('data-category') : 'all';
  renderProducts(activeFilter, search);
});

// Modo Oscuro
document.getElementById('toggleDark').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Abrir y cerrar carrito
document.getElementById('openCart').addEventListener('click', () => {
  document.getElementById('cart').classList.add('open');
});
document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cart').classList.remove('open');
});

// Proceso de checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if(cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  document.getElementById('checkoutModal').classList.add('active');
});
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('checkoutModal').classList.remove('active');
});
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Compra realizada con éxito. ¡Gracias por tu compra!');
  cart = [];
  updateCart();
  document.getElementById('checkoutModal').classList.remove('active');
});

// Crear estrellas
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  
  const size = Math.random() * 4 + 1; // Tamaño aleatorio
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 0.1 + 2}s`;
  
  document.querySelector(".stars-container").appendChild(star);
  
  setTimeout(() => {
    star.remove();
  }, 5000); // Remover después de la animación
}

// Inicializar estrellas
setInterval(createStar,150); // Crear estrellas constantemente

// Animación del canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const contenedor = document.querySelector('.contenedor');
canvas.width = contenedor.clientWidth;
canvas.height = contenedor.clientHeight;

// Posición y velocidad iniciales
let x = Math.random() * canvas.width;
let y = Math.random() * canvas.height;
let vx = (Math.random() - 0.5) * 1.2;
let vy = (Math.random() - 0.5) * 1.2;

function animate() {
  requestAnimationFrame(animate);
  
  // Borra gradualmente lo que se ha dibujado anteriormente usando 'destination-out'
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Ajusta este valor para controlar la velocidad del borrado
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Vuelve al modo de composición normal para dibujar el punto
  ctx.globalCompositeOperation = 'source-over';
  
  // Actualiza la posición
  x += vx;
  y += vy;

  // Rebota en los bordes
  if (x < 0 || x > canvas.width) vx = -vx;
  if (y < 0 || y > canvas.height) vy = -vy;
  
  // Efecto "flicker": varía aleatoriamente la intensidad y tamaño
  const flicker = Math.random() * 0.5 + 0.75; // Valor entre 0.75 y 1.25
  const innerRadius = 5 * flicker;
  const outerRadius = 20 * flicker;

  // Creamos un degradado radial que simula colores de fuego
  const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
  gradient.addColorStop(0, 'rgb(255, 255, 255)');       // Centro blanco
  gradient.addColorStop(0.3, 'rgba(225, 225, 225, 0.8)');       // Amarillo
  gradient.addColorStop(0.6, 'rgba(86, 86, 86, 0.5)');       // Naranja
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');             // Rojo transparente
  
  // Dibujamos la esfera con el efecto de fuego
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Inicializar
renderProducts();
renderCart();
animate();