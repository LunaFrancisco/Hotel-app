// host + /api/promociones

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getRegistros, RegistrosTurno } = require('../controllers/registro');

router.get('/getRegistros', getRegistros);
router.get('/RegistrosTurno', RegistrosTurno);

module.exports = router;