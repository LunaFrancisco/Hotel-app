// host + /api/promociones

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getRegistros, getRegistrosTurno,getRegistrosVentasTurno} = require('../controllers/registro');

router.get('/getRegistros', getRegistros);
router.get('/getRegistrosTurno', getRegistrosTurno);
router.get('/getVentasTurno', getRegistrosVentasTurno);

module.exports = router;