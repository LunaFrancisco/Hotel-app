const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controllers
const { agregarPedido } = require('../controllers/pedidos');

router.post('/agregarPedido', agregarPedido);

module.exports = router;