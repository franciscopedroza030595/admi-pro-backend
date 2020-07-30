/* paquete para leer archivos y carpetas */
const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

/* voy a extraer parte de la logica de los case  */
const borrarImagen = (path) => {


    if (fs.existsSync(path)) {
        fs.unlinkSync(path); // con esto borro la imagen si ya existe , la vieja 
    }

}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    /* voy a evaluar el tipo */
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('no se encontro medico por id');
                return false; // si no existe ese medico la imagen no se puede subir
            }
            /* antes de subir reviso si ya tiene una imagen guardar para borrar y remplazar */
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);


            medico.img = nombreArchivo; // le pongo al medico el nombre del archivo
            await medico.save(); // grabamos el medico
            return true;

            break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('no se encontro hospital por id');
                return false; // si no existe ese hospital la imagen no se puede subir
            }
            /* antes de subir reviso si ya tiene una imagen guardar para borrar y remplazar */
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);


            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('no se encontro usuario por id');
                return false; // si no existe ese usuario la imagen no se puede subir
            }
            /* antes de subir reviso si ya tiene una imagen guardar para borrar y remplazar */
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);


            usuario.img = nombreArchivo;
            await usuario.save();
            return true;


            break;

    }

}


module.exports = {
    actualizarImagen
}