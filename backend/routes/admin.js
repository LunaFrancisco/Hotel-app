// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { verUsuarios, nuevoRol } = require('../controllers/admin');

router.get('/verUsuarios', verUsuarios);
router.post('/nuevoRol', nuevoRol);

module.exports = router;