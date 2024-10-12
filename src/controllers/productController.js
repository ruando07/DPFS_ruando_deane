const db = require('../../models');
const { validationResult } = require('express-validator');

const productController = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      res.render('products/list', { products });
    } catch (error) {
      console.log(error);
      res.render('error', { error: 'Error al enlistar' });
    }
  },

  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      res.render('products/detail', { product });
    } catch (error) {
      console.log(error);
      res.render('error', { error: 'Error en el detalle' });
    }
  },

  create: (req, res) => {
    res.render('products/create');
  },

  store: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('products/create', {
        errors: errors.array(),
        oldData: req.body
      });
    }

    try {
      const newProduct = await db.Product.create({
        ...req.body,
        image: req.file ? req.file.filename : null  
      });
      res.redirect('/products');
    } catch (error) {
      console.log(error);
      res.render('products/create', { error: 'Error al crear' });
    }
  },

  edit: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      res.render('products/edit', { product });
    } catch (error) {
      console.log(error);
      res.render('error', { error: 'Error al editar el producto' });
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const product = await db.Product.findByPk(req.params.id);
      return res.render('products/edit', {
        errors: errors.array(),
        oldData: req.body,
        product
      });
    }

    try {
      const product = await db.Product.findByPk(req.params.id);

      await db.Product.update({
        ...req.body,
        image: req.file ? req.file.filename : product.image  
      }, {
        where: { id: req.params.id }
      });

      res.redirect('/products');
    } catch (error) {
      console.log(error);
      res.render('products/edit', { error: 'Error en la actualización' });
    }
  },

  delete: async (req, res) => {
    try {
      await db.Product.destroy({ where: { id: req.params.id } });
      res.redirect('/products');
    } catch (error) {
      console.log(error);
      res.render('error', { error: 'Error al momento de eliminar' });
    }
  }
};

module.exports = productController;
