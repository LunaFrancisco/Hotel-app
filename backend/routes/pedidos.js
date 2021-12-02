const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { agregarPedido} = require('../controllers/pedidos');

router.post(
    '/addPedido',
    agregarPedido
);


module.exports = router;