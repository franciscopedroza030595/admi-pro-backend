const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true

    },
    img: {
        type: String,


    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE"

    },
    google: {
        type: Boolean,
        default: false


    },
});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('Usuario', UsuarioSchema);