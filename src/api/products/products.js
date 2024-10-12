const express = require('express');
const router = express.Router();

// Simulación de base de datos de productos
const products = [
  { id: 1, name: 'Perro de concreto', description: 'Diseño de perro estilo lobo totalmente fabricado en concreto solido' },
  { id: 2, name: 'Gallina de concreto', description: 'Gallina decorativa de concreto para patio ' },
  { id: 3, name: 'Banca de parque', description: 'Banca grande para parque realizada en concreto' },
  { id: 4, name: 'Fuente pequeña', description: 'Fuente de concreto de 3 niveles con  sistema de agua interno' },
  { id: 5, name: 'Fuente Grande', description: 'Fuente grande de 2 niveles con diseño decotarivo y sistema de agua integrado' },
  { id: 6, name: 'Pote grande para planta', description: 'Pote de concreto grande para planta en forma de copa' },
  { id: 7, name: 'Pote pequeño para planca', description: 'Pote decorativo pequeño para plantas pequeñas realizado en concreto' },
  { id: 8, name: 'Figuras de concreto', description: 'Diferentes figuras de concreto para decoraciones' }

];

// Endpoint para obtener todos los productos
router.get('/', (req, res) => {
  res.json({
    count: products.length,
    products: products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      detail: `/api/products/${product.id}`
    }))
  });
});

// Endpoint para obtener el detalle de un producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json({
    id: product.id,
    name: product.name,
    description: product.description,
    imageURL: `/images/img/products/${product.image}`
  });
});

module.exports = router;
