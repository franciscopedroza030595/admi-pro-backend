/* 
    MEDICOS
    ruta: '/api/medicos'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getMedicos,
    crearMedicos,
    ActualizarMedicos,
    borrarMedicos,
} = require('../controllers/Medicos');



const router = Router();

/* middleware validarJWT */
router.get('/', getMedicos);

/* voy a enviar un middleware en este caso validators previo al crear usuarios  */
router.post('/', [

        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearMedicos);

/* creo una nueva ruta para hacer put */


router.put('/:id', [


    ],
    ActualizarMedicos
);

/* ruta para hacer el delete */
router.delete('/:id', borrarMedicos);



module.exports = router;