const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// **Rutas de Usuarios**

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, username, email, is_admin FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { username, email, password, is_admin } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [username, email, password, is_admin || false]
    );
    res.status(201).json({ id: result.insertId, username, email, is_admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Rutas de Productos**

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  const { name, image_url, price, quantity } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, image_url, price, quantity) VALUES (?, ?, ?, ?)',
      [name, image_url, price, quantity]
    );
    res.status(201).json({ id: result.insertId, name, image_url, price, quantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
  `);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
