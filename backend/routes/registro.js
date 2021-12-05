// host + /api/promociones

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getRegistros } = require('../controllers/registro');

router.get('/', getRegistros);

module.exports = router;