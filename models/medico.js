const { Schema, model } = require('mongoose');


const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,


    },
    usuario: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que el medico tiene relacion con un usuario
        ref: 'Usuario',
        required: true
    },
    hospital: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que el medico tiene relacion con el hospital
        ref: 'Hospital',
        required: true

    }

});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();



    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('Medico', MedicoSchema);