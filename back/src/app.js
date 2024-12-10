const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
// Rutas
app.use('/', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


