const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbconfig= require('./db/dbconfig.js');
const app = express();

const objetivos = require('./routes/objetivos.js');
const empleados = require('./routes/empleados.js');
const usuarios = require('./routes/usuario.js');
const objetivoasignacion = require('./routes/objetivoAsignado.js');
//<--Middlewares-->//

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//Config

dbconfig(app);
//Rutass 

app.get('/', (req,res)=>{
    res.send('Hi servidor corriendo');
});
app.use('/api/objetivos',objetivos);
app.use('/api/empleados',empleados);
app.use('/api/usuarios',usuarios);
app.use('/api/objetivoasignacion',objetivoasignacion);

module.exports = app;