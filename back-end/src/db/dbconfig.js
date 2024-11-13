const mysql = require('mysql2');
const myConnection = require('express-myconnection');
/*
module.exports = function (app) {
    app.use(myConnection( mysql, {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'objetivosdb'
    },'pool'));
}*/
module.exports = function (app) {
    app.use(myConnection(mysql, {
        host: '172.31.50.156',
        port: '3306',
        user: 'backend_user',
        password: 'P4r4d1gm4!',
        database: 'objetivosDB'
    }, 'pool'));
}
