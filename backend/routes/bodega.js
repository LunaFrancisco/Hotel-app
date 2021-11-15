// host + /api/bodega

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getBodega, crearProductoBodega } = require('../controllers/bodega');

router.get('/getBodega', getBodega);
router.post('/crearProductoBodega', crearProductoBodega);

module.exports = router;