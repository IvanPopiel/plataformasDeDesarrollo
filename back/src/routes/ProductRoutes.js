const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get('/products',authMiddleware, getProducts);
router.post('/products',authMiddleware, createProduct);
router.put('/products/:product_id',authMiddleware, updateProduct);
router.delete('/products/:product_id',authMiddleware, deleteProduct);


module.exports = router;
