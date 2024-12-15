const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');

exports.register = async (req, res) => {
  const { username, password,is_admin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      username,
      password: hashedPassword, 
      is_admin: is_admin,
    });

    // Verificar si el usuario ya tiene un carrito
    const existingCart = await Cart.findOne({ where: { user_id: newUser.id } });
    if (!existingCart) {
      await Cart.create({ user_id: newUser.id });
    }


    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user_id: newUser.id,
      username: newUser.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para el login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const existingCart = await Cart.findOne({ where: { user_id: user.id } });
    if (!existingCart) {
    await Cart.create({ user_id: user.id });
    }

    
    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000, // 1 hora
    });

    const redirectUrl = user.is_admin ? '/admin' : '/';

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      redirect_url: redirectUrl,
      user_id: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};
