// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { reservarHabitacion,estadoHabitaciones } = require('../controllers/servicio');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [
        check('servicios', 'Agregue un servicio').not().isEmpty(),
        check('metodo_de_pago', 'Ingrese metodo de pago').not().isEmpty(),
        validarCampos
    ],
    reservarHabitacion
);

// router.post(
//     '/',
//     [
//         check('rut', 'El rut es obligatorio').not().isEmpty(),
//         check('password', 'El password debe ser minimo de 5 caracteres').isLength({ min: 6 }),
//         validarCampos
//     ],
//     estadoHabitaciones
// );

// router.get(
//     '/renew',
//     [
//         validarJWT
//     ],
//     eliminarServicio
// );

// router.get(
//     '/find',
//     buscarServicio
// );


// router.put(
//     '/updateUser',
//     updateUsuario
// );

module.exports = router;