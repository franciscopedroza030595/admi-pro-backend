/* voy a importar para tener las ayudas de res status */
const { response } = require('express');

/* importo el modelo de usuario, medico y hospitales lo necesito para buscar alli  */
const Usuario = require('../models/usuario');

const Medico = require('../models/medico');

const Hospital = require('../models/hospital');

/* -------------------------------------------------------------- */
const getTodo = async(req, res = response) => {


    /* lo que se envia en el get /busquedad */
    const busqueda = req.params.busqueda;

    /* expresion regular */
    const regex = new RegExp(busqueda, 'i');

    /* para hacer busquedas individuales (filtros) */




    /*  const usuarios = await Usuario.find({ nombre: regex }); //aplico expresion regular para facilitar la busqueda
     const medicos = await Medico.find({ nombre: regex });
     const hospitales = await Hospital.find({ nombre: regex }); */
    /*  creo un promise all para que el proceso sea as rapido y no tener los 3 await */
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);


    /* asi busco en toda la db usando expresiones regulares lo mas acorde  */

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales

    })

}

/* ----------------------------------------------------- */

const getDocumentosColeccion = async(req, res = response) => {


    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');

            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });


            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser medicos, usuario o hospitales'
            });

    }

    res.json({
        ok: true,
        resultados: data
    });




}


module.exports = {
    getTodo,
    getDocumentosColeccion
}