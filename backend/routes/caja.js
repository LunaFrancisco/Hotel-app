const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {newRetiro, newGasto, allGastos,cierreCaja,informacionCaja } = require('../controllers/caja');


router.post('/retiro', newRetiro);
router.post('/gasto', newGasto);
router.get('/allGastos', allGastos);
router.post('/cierre', cierreCaja);
router.get('/', informacionCaja);


module.exports = router;