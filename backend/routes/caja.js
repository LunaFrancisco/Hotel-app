const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { newRetiro, newGasto, allGastos, cierreCaja, allRetiros } = require('../controllers/caja');


router.post('/retiro', newRetiro);
router.post('/gasto', newGasto);
router.get('/allGastos', allGastos);
router.get('/allRetiros', allRetiros);
router.post('/cierre', cierreCaja);


module.exports = router;