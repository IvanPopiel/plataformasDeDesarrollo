// models/index.js
const Product = require('./Product');
const CartProduct = require('./CartProduct');
const Cart = require('./Cart');


Product.hasMany(CartProduct, { foreignKey: 'product_id' });
Cart.hasMany(CartProduct, { foreignKey: 'product_id' });
CartProduct.belongsTo(Product, { foreignKey: 'product_id' });
CartProduct.belongsTo(Cart, { foreignKey: 'cart_id' });

module.exports = {
  Product,
  CartProduct,
  Cart,
};
