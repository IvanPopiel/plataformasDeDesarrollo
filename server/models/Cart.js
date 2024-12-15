// models/Cart.js

const { Model, DataTypes } = require('sequelize');
const CartProduct = require('./CartProduct');
const sequelize = require('../config/db'); 

class Cart extends Model {}

Cart.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: false, 
  }
);


module.exports = Cart;
