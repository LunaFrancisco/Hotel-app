const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {newRetiro, newGasto, allGastos,cierreCaja } = require('../controllers/caja');


router.post('/retiro', newRetiro);
router.post('/gasto', newGasto);
router.get('/allGastos', allGastos);
router.post('/cierre', cierreCaja);


module.exports = router;