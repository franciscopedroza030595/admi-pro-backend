const express = require('express'); // importo express 

require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

/* crear servidor express */

const app = express();

/* configurar cors */
app.use(cors());

/* base de datos */

dbConnection();

/* console.log(process.env);
 */
/* mongo */

// user: mean_user
//passwoord: AgIa6va1yy1yVqCv


/* rutas */

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'hola mundo'
    })
});


/* levanto el servidor  */

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + 3000);
});