// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getInventario, crearProductoInventario, descontarProductoInventario } = require('../controllers/inventario');

router.get('/getInventario', getInventario);
router.post('/crearProductoInventario', crearProductoInventario);
router.get('/descontarProductoInventario', descontarProductoInventario);

module.exports = router;