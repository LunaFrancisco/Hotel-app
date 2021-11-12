const express = require('express');
const cors = require('cors');
require("dotenv").config();

// Base de datos
const sequelize = require('./database/database');
require('./database/relaciones');

// Crear servidor de express
const app = express();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body - Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Formularios

// Rutas disponibles
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/producto'));

// Escuchar peticiones
app.listen(process.env.PORT, async () => {
    console.log(`Servidor corriendo en puerto`, process.env.PORT);
    try {
        await sequelize.authenticate();
        console.log('Base de datos ONLINE');
        await sequelize.sync({ force: true });
        console.log("Tablas creadas.");
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
});