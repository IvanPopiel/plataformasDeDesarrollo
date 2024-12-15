// models/Product.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  
const CartProduct = require('./CartProduct');
class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false, 
  }
);


module.exports = Product;
