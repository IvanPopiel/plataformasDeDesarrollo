const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  const { user_id } = req.query; // `user_id` es opcional
  try {
    if (user_id) {
      const user = await User.findByPk(user_id, {
        attributes: ['id', 'username', 'email', 'is_admin'],
      });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.json(user);
    }

    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'is_admin'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password, is_admin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      is_admin: is_admin || false,
    });
    res.status(201).json({ id: user.id, username: user.username, email: user.email, is_admin: user.is_admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, password, is_admin } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (is_admin !== undefined) user.is_admin = is_admin;

    await user.save();
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
