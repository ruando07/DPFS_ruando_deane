// src/controllers/cartController.js

let cart = [];

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex > -1) {
    // Si el producto ya está en el carrito, actualizamos la cantidad
    cart[productIndex].quantity += quantity;
  } else {
    // Si no está, lo agregamos al carrito
    cart.push({ productId, quantity });
  }

  res.json({ success: true, cart });
};

exports.getCart = (req, res) => {
  res.json({ cart });
};
