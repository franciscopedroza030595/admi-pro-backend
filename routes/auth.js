/* 
    Path: '/api/login'
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/* debo pasar los datos por un check email, password */
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);






module.exports = router;