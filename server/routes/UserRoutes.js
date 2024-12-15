const express = require('express');
const { getUsers,createUser,updateUser,deleteUser } = require('../controllers/UserController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const adminMiddleware = require('../middlewares/AdminMiddleware');
const router = express.Router();


router.get('/users/:user_id',authMiddleware, getUsers);

router.get('/users/',authMiddleware, adminMiddleware, getUsers);
router.post('/users',authMiddleware, adminMiddleware, createUser);
router.put('/users/:user_id',authMiddleware,adminMiddleware, updateUser);
router.delete('/users/:user_id',authMiddleware,adminMiddleware, deleteUser);

module.exports = router;
