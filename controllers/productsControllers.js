let db = require('../database/models');
const { validationResult } = require('express-validator');

let productsControllers = {

    create: async (req, res) => {
        try {
            const categories = await db.Categoria.findAll(); // Obtener todas las categorías para el formulario
            res.render('productCreate', { categories }); // Renderizar la vista del formulario de creación y pasar las categorías
        } catch (error) {
            console.error('Error en el formulario:', error);
            res.status(500).send('Error en el formulario');
        }
    },

    send: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const categories = await db.Categoria.findAll(); // Volver a obtener las categorías en caso de error
            return res.render('productCreate', { categories, errors: errors.array() });
        }

        try {
            const { name, description, price} = req.body;
            
    
            const product = await db.Producto.create({
                name,
                description,
                image: req.file ? req.file.filename : null,
                category_id,
                price,
                colors: colorArray.join(',') // Si decides cambiar `colors` a un tipo STRING
            });
    
            res.redirect('/products');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).send('Error al crear el producto');
        }
    },

    list: async (req, res) => {
        try {
            const products = await db.Producto.findAll({
                include: [{ model: db.Categoria }]
            });
            res.render('products', { products });
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).send('Error al obtener los productos');
        }
    }, 

    modifying: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const productId = req.params.id;
            const product = await db.Producto.findByPk(productId);
            const categories = await db.Categoria.findAll();
            return res.render('productEdit', { product, categories, errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const { name, description, price} = req.body;
    
            const product = await db.Producto.findByPk(id);
    
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }
    
            const updatedProduct = {
                name,
                description,
                price,
            };
    
            if (req.file) {
                updatedProduct.image = req.file.filename;
            }
    
            await product.update(updatedProduct);
    
            const colorArray = colors.split(',').map(color => color.trim());
            const colorInstances = await db.Color.findAll({
                where: { colorName: colorArray }
            });
    
            await product.setColors(colorInstances);
    
            res.redirect(`/products/${id}`);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send('Error al actualizar el producto');
        }
      },

      detail: async (req, res) => {
        try {
            const { id } = req.params;
            const categories = await db.Categoria.findAll();
            const product = await db.Producto.findByPk(id, {
                include: [db.Categoria, db.Color]
            });
    
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }
            res.render('productDetail', { product, categories });
        } catch (error) {
            console.error('Error al ver el detalle del producto:', error);
            res.status(500).send('Error al ver el detalle del producto');
        }
      },

      delete: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await db.Producto.findByPk(id);
    
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }
    
            await product.destroy();
            res.redirect('/products');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send('Error al eliminar el producto');
        }
      }
}

module.exports = productsControllers;