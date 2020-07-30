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

const actualizarHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'ActualizarHospitales'
    });
}

const borrarHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });
}



module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,

}