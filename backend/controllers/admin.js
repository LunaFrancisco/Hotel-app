const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const Roles = require('../models/rol');


const verUsuarios = async (req, res = response) => {
    try {
        const allUsers = await Usuario.findAll(
            {
            attributes: ['rut', 'correo'],
            include: [
                Roles
               ]
            });
            return res.json({      
                ok: true,
                msg: allUsers 
            })
         
         
            
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const nuevoRol = async (req, res = response) => {
    const { rol } = req.body;
    console.log(rol);
    Rol.create(
        { rol }
    )
        .then(result => {
            console.log(result);
            return res.status(200).json({
                ok: true,
                rol
            });
        })
        .catch(err => {
            console.log(err);
        });
};




module.exports = {
    verUsuarios,
    nuevoRol
};

