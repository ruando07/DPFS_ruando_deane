const express = require('express');
const router = express.Router();
const db = require('../databas/models'); 
router.get('/', async (req, res) => {
    try {
        const products = await db.Product.findAll(); 
        res.json({
            count: products.length,
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                detail: `/api/products/${product.id}` 
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({
            id: product.id,
            name: product.name,
            description: product.description,
            imageUrl: `/images/products/${product.image}` 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

module.exports = router;
