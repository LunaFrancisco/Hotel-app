const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearProducto,findAllProductos } = require('../controllers/productos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get(
    '/createProduct',
    [
        check('product', 'El nombre es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('category', 'Ingrese la categoria correcta').not().isEmpty(),
        
        validarCampos
    ],
    crearProducto
);
router.get(
    '/allProductos',
    [        
        validarCampos
    ],
    findAllProductos
);
// router.post(
//     '/',
//     [
//         check('rut', 'El rut es obligatorio').not().isEmpty(),
//         check('password', 'El password debe ser minimo de 5 caracteres').isLength({ min: 6 }),
//         validarCampos
//     ],
//     loginUsuario
// );

// router.get(
//     '/renew',
//     [
//         validarJWT
//     ],
//     revalidarToken
// );

// router.get(
//     '/deleteUser',
//     eliminarUsuario
// );


// router.put(
//     '/updateUser',
//     updateUsuario
// );

module.exports = router;