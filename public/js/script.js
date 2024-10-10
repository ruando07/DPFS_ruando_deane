let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-id');
    const productName = button.previousElementSibling.previousElementSibling.innerText;
    const productPrice = button.previousElementSibling.innerText;
    const productImage = button.previousElementSibling.previousElementSibling.previousElementSibling.src;

    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }
    updateCartDisplay();
    saveCart();
  });
});

function updateCartDisplay() {
  const cartContainer = document.querySelector('.cart-items');
  cartContainer.innerHTML = ''; // Limpiar el carrito actual

  cart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p>${product.name}</p>
      <p>$${product.price}</p>
      <input type="number" value="${product.quantity}" min="1" class="quantity" data-id="${product.id}">
      <button class="remove" data-id="${product.id}">Eliminar</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('change', event => {
      const productId = event.target.getAttribute('data-id');
      const newQuantity = parseInt(event.target.value);
      const productInCart = cart.find(item => item.id === productId);
      if (productInCart) {
        productInCart.quantity = newQuantity;
      }
      saveCart();
    });
  });

  document.querySelectorAll('.remove').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      const productIndex = cart.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        updateCartDisplay();
      }
      saveCart();
    });
  });
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartDisplay();
  }
}

// Cargar el carrito al cargar la página
loadCart();
``
// Togle del Menu responsivo 
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show-menu');
}

// Duracion de Publicidad Banner de Inicio
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slides img');
  let currentIndex = 0;

  function showNextSlide() {
    // Ocultar todas las imágenes
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });

    // Avanzar al siguiente slide
    currentIndex = (currentIndex + 1) % slides.length; // Volver a 0 cuando llegue al final
  }

  // Cambiar de imagen cada 3 segundos
  setInterval(showNextSlide, 3000);
});

// Logicapara el carrito de compra 
document.addEventListener('DOMContentLoaded', () => {
  let cart = [];
  const cartIcon = document.querySelector('.cart-icon');
  const cartPanel = document.querySelector('.cart-panel');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  const cartCountElement = document.querySelector('.cart-count');
  const emptyCartButton = document.querySelector('.empty-cart-btn');

  // Verificar que los elementos existan antes de agregar eventos
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      cartPanel.classList.toggle('active');
    });
  }

  if (emptyCartButton) {
    emptyCartButton.addEventListener('click', () => {
      cart = []; // Vaciar el array del carrito
      updateCart(); // Actualizar el carrito después de vaciarlo
    });
  }

  // Agregar producto al carrito
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      const productName = e.target.dataset.name;
      const productPrice = parseFloat(e.target.dataset.price);

      addToCart(productId, productName, productPrice);
      updateCart();
    });
  });

  // Función para agregar productos al carrito
  function addToCart(id, name, price) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
  }

  // Función para actualizar el carrito (mostrar productos y calcular total)
  function updateCart() {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor del carrito
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('cart-item');
      productElement.innerHTML = `
        <p>${product.name}</p>
        <p>$${product.price} x ${product.quantity}</p>
      `;
      cartItemsContainer.appendChild(productElement);

      totalPrice += product.price * product.quantity;
      totalItems += product.quantity;
    });

    if (totalPriceElement) {
      totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }
});
