const express = require('express'); // importo express 

const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');




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

/* autenticacion de GOOGLE */


const googleSignIn = async(req, res = response) => {


    const googleToken = req.body.token;




    /* res.json({
        ok: true,
        msg: 'google Sign in'

    }); */

    try {


        const { name, email, picture } = await googleVerify(googleToken);

        /* verifico si ya existe el usuario con ese email */
        const usuarioDB = await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDB) {

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else { // si existe el ususario es que paso de user pass a google
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@'; // se cambia la contrasena para que solo pueda entar por google , se puede no cambiar para tener ambos ingresos

        }

        //guardar en base de datos

        await usuario.save();

        // generar un TOKEN - JWT

        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token: token
        });


    } catch (error) {

        res.json({
            ok: false,
            msg: 'token no es correcto'
        });

    }
}

/* creo el de renwe token */

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    /* es el token que se debe grabar en el local storage para renovar el token, recordar que el token tiene 12h de vigencia  */
    // generar un TOKEN - JWT

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}