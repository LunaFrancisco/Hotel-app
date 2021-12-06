const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {newRetiro, newGasto, allGastos,cierreCaja,informacionCaja,allRetiros ,informacionMensual} = require('../controllers/caja');



router.post('/retiro', newRetiro);
router.post('/gasto', newGasto);
router.get('/allGastos', allGastos);
router.get('/allRetiros', allRetiros);
router.post('/cierre', cierreCaja);
router.get('/', informacionCaja);
router.get('/info', informacionMensual);



module.exports = router;