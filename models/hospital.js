const { Schema, model, SchemaType } = require('mongoose');


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,


    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { coleccion: 'hospitales' });


HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

/* exporto el modelo para poder crear un hospital */
module.exports = model('Hospital', HospitalSchema);