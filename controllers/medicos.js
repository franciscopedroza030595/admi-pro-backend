const { response } = require('express');

/* importo modelo */
const Medico = require('../models/medico');





const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img'); // en post verifico que del usuario que se tiene el id me trae el nombre

    res.json({
        ok: true,
        Medicos: medicos
    });
}

const crearMedicos = async(req, res = response) => {


    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });



    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admi'

        });
    }


    res.json({
        ok: true,
        msg: 'crearMedicos'
    });
}

const ActualizarMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'ActualizarMedicos'
    });
}

const borrarMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarMedicos'
    });
}



module.exports = {
    getMedicos,
    crearMedicos,
    ActualizarMedicos,
    borrarMedicos,

}