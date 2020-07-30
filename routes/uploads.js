/* importante, voy a subir archivo sobre un usuario, medico o hospital ya existente , uso PUT */

/* 
 ruta: api/uploads/
*/

const { Router } = require('express');

/* importo libreria express-fileupload(recuerde npm i express-fileupload) */
const expressFileUpload = require('express-fileupload');

/* importo el uso de JWT */
const { validarJWT } = require('../middlewares/validar-jwt');
/* controller */
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

/* el middleware por defecto de expressFileUpload*/
router.use(expressFileUpload());

/* ------------------------------- */

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', retornaImagen);





module.exports = router;