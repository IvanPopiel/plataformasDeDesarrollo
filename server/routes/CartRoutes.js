const express = require('express');
const { getCart, createCart, addToCart,removeFromCart, deleteCart } = require('../controllers/CartController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get('/carts/',authMiddleware, getCart);
router.post('/carts/',authMiddleware, createCart);
router.put('/carts/add',authMiddleware, addToCart);
router.put('/carts/remove',authMiddleware, removeFromCart);
router.delete('/carts/:user_id/:product_id', authMiddleware, deleteCart);


module.exports = router;
