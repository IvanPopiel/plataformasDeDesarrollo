const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/CartRoutes');
const sequelize = require('./config/db');  
require('dotenv').config();


const cors = require('cors');
const app = express();

sequelize.sync({ force: false }).then(() => {
  console.log('Sincronización de la base de datos completada');
}).catch((error) => {
  console.error('Error de sincronización: ', error);
});


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.use(express.json());
app.use(cookieParser());
// Rutas
app.use('/', authRoutes);
app.use('/api/', userRoutes);
app.use('/api/', productRoutes);
app.use('/api/', cartRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


