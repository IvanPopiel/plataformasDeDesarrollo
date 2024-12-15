const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const adminMiddleware = require('../middlewares/AdminMiddleware');
const router = express.Router();

router.get('/products/:product_id', getProducts);
router.get('/products', getProducts);
router.post('/products',authMiddleware,adminMiddleware, createProduct);
router.put('/products/:product_id',authMiddleware,adminMiddleware, updateProduct);
router.delete('/products/:product_id',authMiddleware,adminMiddleware, deleteProduct);


module.exports = router;
