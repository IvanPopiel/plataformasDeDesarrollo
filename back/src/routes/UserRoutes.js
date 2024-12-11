const express = require('express');
const { getUsers,createUser,updateUser,deleteUser } = require('../controllers/UserController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();


router.get('/users/:user_id',authMiddleware, getUsers);
router.post('/users',authMiddleware, createUser);
router.put('/users/:user_id',authMiddleware, updateUser);
router.delete('/users/:user_id',authMiddleware, deleteUser);

module.exports = router;
