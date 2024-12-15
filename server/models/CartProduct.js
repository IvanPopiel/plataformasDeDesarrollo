// models/CartProduct.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  
const Product = require('./Product'); 
const Cart = require('./Cart');

class CartProduct extends Model {}

CartProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'CartProduct',
    tableName: 'cart_products', 
    timestamps: false, 
  }
);


module.exports = CartProduct;
