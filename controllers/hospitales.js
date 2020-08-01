/* voy a importar para tener las ayudas de res status */
const { response } = require('express');

/* importo modelo */
const Hospital = require('../models/hospital');



const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img'); // en post verifico que del usuario que se tiene el id me trae el nombre

    res.json({
        ok: true,
        Hospitales: hospitales
    });
}

const crearHospitales = async(req, res = response) => {

        const uid = req.uid;
        const hospital = new Hospital({
            usuario: uid, // traigo todo lo que tiene el body
            ...req.body
        });



        try {

            const hospitalDB = await hospital.save();

            res.json({
                ok: true,
                hospital: hospitalDB
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admi'

            });
        }



        res.json({
            ok: true,
            msg: 'crearHospitales'
        });
    }
    /* --------------------------------------------- */

const actualizarHospitales = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        /* miro si existe el hospital */
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe el hospital'
            });

        }

        const cambiosHopsital = {
            ...req.body,
            usuario: uid // traigo el ususario que esta haciendo la actualizacion 
        }

        /* guardo en base de datos */
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHopsital, { new: true });


        res.json({
            ok: true,

            hospital: hospitalActualizado
        });

    } catch (error) {

        res.json({
            ok: false,
            msg: 'hable con el admi'
        });


    }


}

/* ---------------------------------------------- */
const borrarHospitales = async(req, res = response) => {

    const id = req.params.id;


    try {
        /* miro si existe el hospital */
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe el hospitalcon ese id '
            });

        }

        await Hospital.findByIdAndDelete(id); // se recomiendo no eliminar si no desactivar



        res.json({
            ok: true,
            msg: 'hospital eliminado'

        });

    } catch (error) {

        res.json({
            ok: false,
            msg: 'hable con el admi'
        });


    }
}



module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,

}