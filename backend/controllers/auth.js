const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const { generarJWT } = require('../helpers/jwt');

// Conexion base de datos postgres
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'motel',
    port: '5432'
});

const crearUsuario = async (req, res = response) => {
    try {
        const { name, email, password, tipo } = req.body;
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);
        // Guardamos en la base de datos
        await pool.query('INSERT INTO usuarios(name, email, password, tipo) VALUES ($1, $2, $3, $4)', [name, email, passwordHash, tipo]);
        // Generar JWT
        const token = await generarJWT(email, tipo);
        return res.status(201).json({
            ok: true,
            msg: 'registrado',
            email,
            tipo,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Confirmar los passwords
        const result = await pool.query('SELECT password as passwordhash, tipo FROM usuarios WHERE email = ($1)', [email]);
        const { passwordhash, tipo } = result.rows[0];
        const validPassword = bcrypt.compareSync(password, passwordhash);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'email y/o contraseña incorrecta'
            });
        }
        // Generar JWT
        const token = await generarJWT(email, tipo);
        return res.json({
            ok: true,
            msg: 'Login',
            email,
            tipo,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const revalidarToken = async (req, res) => {
    const { email, tipo } = req;
    // Generar nuevo JWT
    const token = await generarJWT(email, tipo);
    return res.json({
        ok: 'renew',
        email,
        tipo,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};