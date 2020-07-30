/* 
ruta: '/api/hospitales'
 */

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
} = require('../controllers/hospitales');



const router = Router();

/* middleware validarJWT */
router.get('/', getHospitales);

/* voy a enviar un middleware en este caso validators previo al crear usuarios  */
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos

    ],
    crearHospitales);

/* creo una nueva ruta para hacer put */


router.put('/:id', [


    ],
    actualizarHospitales
);

/* ruta para hacer el delete */
router.delete('/:id', borrarHospitales);



module.exports = router;