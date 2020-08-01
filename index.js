const express = require('express'); // importo express 

require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

/* crear servidor express */

const app = express();

/* configurar cors */
app.use(cors());

/* middleware para configurar lectura y parseo del body */
app.use(express.json());

/* base de datos */

dbConnection();

/* console.log(process.env);
 */
/* mongo */

// user: mean_user
//passwoord: AgIa6va1yy1yVqCv

/* DIRECTORIO PUBLICO PARA PRUEBAS DE GOOGLE SIGN IN */
app.use(express.static('public'));

/* rutas */

app.use('/api/usuarios', require('./routes/usuarios'));
/* creo nueva ruta para el login */
app.use('/api/login', require('./routes/auth'));
/* ruta de hospitales */
app.use('/api/hospitales', require('./routes/hospitales'));
/* ruta de medicos */
app.use('/api/medicos', require('./routes/medicos'));
/* ruta para busqueda */
app.use('/api/todo', require('./routes/busquedas'));
/* ruta para uploads */
app.use('/api/upload', require('./routes/uploads'));





/* levanto el servidor  */

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});