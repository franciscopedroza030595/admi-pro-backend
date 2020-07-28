// Ruta: /api/usuarios

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');




const router = Router();

/* middleware validarJWT */
router.get('/', validarJWT, getUsuarios);

/* voy a enviar un middleware en este caso validators previo al crear usuarios  */
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarCampos,

    ],
    crearUsuario);

/* creo una nueva ruta para hacer put */


router.put('/:id', [
        validarJWT, // si no viene el token no quiero que mi backend haga algo, evito el proceso del servidor
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarUsuario
);

/* ruta para hacer el delete */
router.delete('/:id', validarJWT, borrarUsuario);



module.exports = router;