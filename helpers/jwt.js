const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {


            /* aqui puedo grabar el nombre, etc que no sea informacion sensible */
            uid
        }

        /* sign es para crear el token  */
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h' // expira la seccion en el portal

        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('NO SE PUDO GENERAR JWT');

            } else {
                resolve(token);
            }
        });


    });


}


module.exports = {
    generarJWT,
}