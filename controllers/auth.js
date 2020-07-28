const express = require('express'); // importo express 

const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');




const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        /* verificamos si el email es correcto */
        const usuarioDB = await Usuario.findOne({ email });
        //verifico el correo 
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido' // no pongo email no valido para no darle pistas a una persona espia
            });

        }

        // verificar contrasenaa!!!
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contrasena no valida'
            });
        }

        // generar un TOKEN - JWT

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });


    }


}

module.exports = {
    login
}