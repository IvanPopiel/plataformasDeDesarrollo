const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: 'Acceso denegado.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Acceso denegado.' });
    }

    if (!user.is_admin) {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }


    next();
  } catch (error) {
    console.error('Error en adminMiddleware:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
