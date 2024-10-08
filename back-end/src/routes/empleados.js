const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', obtenerEmpleados);
router.get('/areas',obtenerAreas);
router.post('/', agregarEmpleado);
async function obtenerEmpleados(req, res) {

    try{
        
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM Empleado', (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        console.log(results)
        
        
    
        res.status(200).json(results);
    } catch(err){
        res.send(err);
    }
}

async function obtenerAreas(req, res){
    try{
        
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT DISTINCT area FROM Empleado', (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        console.log(results)
        
        
    
        res.status(200).json(results);
    } catch(err){
        res.send(err);
    }
}


async function agregarEmpleado(req, res) {
    try {
        console.log('Entre en agregar emppleado')
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const empleado = {
            nombre: req.body.nombre+' '+req.body.apellido,
            puesto: req.body.puesto,
            area: req.body.area,

        }
        
        const query = 'INSERT INTO Empleado (nombre, puesto, area) VALUES (?,?,?)';
        const results = await new Promise((resolve, reject)=>{
            connection.query(query,[empleado.nombre, empleado.puesto, empleado.area], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });

        const claveForanea = await obtenerUltimoEmpleado(req,res);
        console.log("La clave foranea es: ");
        console.log(claveForanea)

        const usuario = {
            email: req.body.email,
            usuarioPassword : req.body.usuarioPassword,
            rol: req.body.rol ? 'admin' : 'user',
            empleado: claveForanea[0].idEmpleado,
        }

        const nuevoUsuario = await axios.post('http://localhost:9000/api/usuarios/',usuario);

        console.log(nuevoUsuario)
        res.status(200).send({message:"Usuario creado correctamente"});
        
    } catch (error) {
        res.send(error);
    }
}

async function obtenerUltimoEmpleado(req, res){
    try {
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err){
                    console.error("Error al conectar en la base de datos:", err);
                    reject(err);
                }
                else{ 
                    resolve(conn);
                }
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT idEmpleado FROM Empleado ORDER BY idEmpleado DESC LIMIT 1 ', (err, results)=>{
                if(err){
                    console.error("Error en la consulta:", err);
                    reject(err);
                } 
                else{
                    resolve(results);
                }
            });
        });
        
    
        return (results);
    } catch (err) {
        throw err;
    }
}
module.exports = router;