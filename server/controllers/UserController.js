const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Obtener el usuario actual desde el token
    const currentUser = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'is_admin'],
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'Usuario actual no encontrado' });
    }
    console.log(currentUser);
    // Verificar si el usuario actual es administrador
    if (currentUser.is_admin) {
      if (user_id) {
        const user = await User.findByPk(user_id, {
          attributes: ['id', 'username', 'is_admin'],
        });
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.json(user);
      } else {
        // Si no se proporciona user_id, devolver todos los usuarios
        const users = await User.findAll({
          attributes: ['id', 'username', 'is_admin'],
        });
        return res.json(users);
      }
    } else {
      // Si no es administrador
      if (user_id) {
        if (parseInt(user_id) !== currentUser.id) {
          return res.status(403).json({ message: 'No autorizado' });
        }
      }
      const user = await User.findByPk(currentUser.id, {
        attributes: ['id', 'username', 'is_admin'],
      });
      return res.json(user);
    }
  } catch (error) {
    console.error('Error en getUsers:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createUser = async (req, res) => {
  const { username, password, is_admin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      is_admin: is_admin || false,
    });
    res.status(201).json({ id: user.id, username: user.username, is_admin: user.is_admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, password, is_admin } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (username) user.username = username;
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
