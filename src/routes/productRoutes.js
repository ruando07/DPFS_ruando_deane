const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Listar productos
router.get('/', productController.list);

// Crear producto
router.get('/create', productController.create); // Formulario de creación
router.post('/create', productController.store); // Guardar producto creado

// Detalle del producto
router.get('/:id', productController.detail);

// Editar producto
router.get('/:id/edit', productController.edit); // Formulario de edición
router.put('/:id', productController.update); // Guardar producto editado

// Eliminar producto
router.delete('/:id', productController.delete);

module.exports = router;

