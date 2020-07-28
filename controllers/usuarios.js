/* voy a importar para tener las ayudas de res status */
const { response } = require('express');
/* importo el bcryptjs para la contrasena */
const bcrypt = require('bcryptjs');


/* modelo para crear ususarios */
const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');

/* ------------------------- --------------------------- ----- */

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid // se configurio en el middleware validar jws y se llama en la ruta primero probar con postman 
    });
}

/* ------------------------------------------------------------------ */

const crearUsuario = async(req, res = response) => {

    /* debo leer el body */
    /* console.log(req.body); */
    const { email, password } = req.body;





    /* voy a verificar  si existe*/
    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        /* creo instancia del objeto Usuario */
        const usuario = new Usuario(req.body);


        /* encriptar contrasena  */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        /* para grabar en la base de datos  */
        await usuario.save(); // esto es una promeda entonces debe esperar

        // generar un TOKEN - JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado... revisar logs'
        })
    }


}

/* --------------------------- --------------------------------*/

const actualizarUsuario = async(req, res = response) => {

    /* validar token y comprobar si es el usuario correcto */

    /* obtengo el id */
    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);
        /* el ususario no existe */
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        /* el usuario si existe */
        /* creo los campos sin el password ni google 
            no es necesario usar el res.body.email por ejemplo*/
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email; // poner el email que quiero actualizar



        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

/* ------------------------------------------------- */

const borrarUsuario = async(req, res = response) => {

    /* obtengo el id */
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        /* recomendacion no borrar usuarios mejor desactivarlos con un put , haciendo update */
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}




module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}