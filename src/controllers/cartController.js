

let cart = [];

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex > -1) {
   
    cart[productIndex].quantity += quantity;
  } else {
   
    cart.push({ productId, quantity });
  }

  res.json({ success: true, cart });
};

exports.getCart = (req, res) => {
  res.json({ cart });
};
