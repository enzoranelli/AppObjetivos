const {app} = require('./app.js');
const port = 8001;
//<--Servidor corriendo-->//

app.listen(port,()=>{
    console.log('Servidor corriendo en puerto: ', port)
});