const mysql = require('mysql');
const myConnection = require('express-myconnection');

module.exports = function (app) {
    app.use(myConnection( mysql, {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'objetivosdb'
    },'pool'));
}