const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbconfig= require('./db/dbconfig.js');
const app = express();

const objetivos = require('./routes/objetivos.js');

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

module.exports = app;