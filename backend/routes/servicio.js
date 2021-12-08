// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { reservarHabitacion,estadoHabitaciones,cancelarReserva, desalojarHabitacion, listarHabitaciones, habilitarHabitacion, listarPromociones, getServicio, calcularExtras, editarServicio, pruebaJWT } = require('../controllers/servicio');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../helpers/validar-jwt');


router.post(
    '/reservarHabitacion',
    reservarHabitacion
);

router.get(
    '/state',
    estadoHabitaciones
);

router.post(
    '/cancel',
    cancelarReserva
);

router.post(
    '/desalojarHabitacion',
    desalojarHabitacion
);
router.get(
    '/',
    estadoHabitaciones
);
router.get(
    '/getService',
    getServicio
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

router.get('/listarHabitaciones', listarHabitaciones);
router.put('/habilitarHabitacion', habilitarHabitacion);
router.get('/listarPromociones', listarPromociones);
router.get('/editarServicio', editarServicio);
router.get('/pruebaJWT', validarJWT, pruebaJWT);

module.exports = router;