const express = require('express');
const cors = require('cors');
require("dotenv").config();

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

// Escuchar peticiones
const port = 4000;
app.listen(port,  () => {
    console.log(`Servidor corriendo en puerto `, port);
});