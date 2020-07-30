const { response } = require('express');
/* importo file system */
const fs = require('fs');
/* importo uuid  */
const { v4: uuidv4 } = require('uuid');
/* helper de actualizar imagen */
const { actualizarImagen } = require('../helpers/actualizar-imagen');
/* importo const path funcion de node */
const path = require('path');


const fileUpload = (req, res = response) => {


    /* se deben hacer verificaciones el tipo, el id*/
    const tipo = req.params.tipo;
    const id = req.params.id;

    /* me aseguro que el tipo sea medico, hospital o usuario asi prevengo errores y subo archivos el path a la carpeta uploads*/

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        });
    }

    /* validacion de que el archivo si existe antes de subirlo */
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        });
    }

    /* procesar la imagen.... o archivo */
    /* la voy a extraer, el nombre imagen es el mismo que puse en postman en form-data */
    const file = req.files.imagen;
    /* genero o extraigo la extension del archivo */
    const nombreCortado = file.name.split('.'); // nombre.1.2.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    /* validar extension, ya que solo voy a permitir algunas */
    const extesionesValidas = ['png', 'jpg', 'jpeg', 'gif']; // aqui podria tener texto, pdf, etc 
    if (!extesionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok: false,
            msg: 'No es una extension de archivo valida'
        });

    }


    /* generar el nombre de la imagen o archivo (esto mediante la instalacion de uuid) para poder ser guardadas en las carpetas de uploads */

    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
    /* creo el path donde guardar la imagen carpeta upload del tipo */
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    /* mover la iamgen o archivo  */
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }


        /* aqui debemos actualizar la base de datoss!! CREO ARCHIVO EN LA CARPETA HELPERS*/
        actualizarImagen(tipo, id, nombreArchivo);


        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });



}

/* ------------------------- */

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;


    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`); // este es el path de la imagen

    /* si ese path no existe mandamos imagen vacia, imagen por defecto*/
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg); // evnio la imagen
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`); // este es el path de la imagen que no existe
        res.sendFile(pathImg); // evnio la imagen
    }



}


/* --------------------- */
module.exports = {
    fileUpload,
    retornaImagen
}