// host + /api/promociones

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getRegistros, getRegistrosTurno} = require('../controllers/registro');

router.get('/getRegistros', getRegistros);
router.get('/getRegistrosTurno', getRegistrosTurno);

module.exports = router;