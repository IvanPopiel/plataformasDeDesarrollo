const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const { product_id } = req.query;
  try {
    if (product_id) {
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      return res.json(product);
    }

    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, image_url, price, quantity } = req.body;
  try {
    const product = await Product.create({ name, image_url, price, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { name, image_url, price, quantity } = req.body;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (name) product.name = name;
    if (image_url) product.image_url = image_url;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;

    await product.save();
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
