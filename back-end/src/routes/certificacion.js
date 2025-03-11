const express = require('express');
const router = express.Router();

router.get('/',obtenerCertificaciones);
router.post('/',agregarCertificacion);
router.get('/marcas',obtenerMarcas);
router.get('/:id',obtenerCertificacion);


async function obtenerCertificaciones(req, res){
    try{
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM certificacion', (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        connection.release();
        res.status(200).json(results);
    }catch(error){
        res.status(500).send(error);
    }
}

async function obtenerCertificacion(req,res){
    try{
        const id = req.params.id;
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err,conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM certificacion WHERE idCertificacion = ?',[id],(err,results)=>{
                if(err) reject(err);
                else resolve(results);
            })
        })
        res.send(results);
    }catch(error){
        res.status(500).send(error);
    }
}
async function obtenerMarcas(req,res){
    try{
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM marcas', (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        connection.release();
        res.status(200).json(results);
    }catch(error){
        res.status(500).send(error);
    }
}
async function agregarCertificacion(req,res){
    try {
        
        const { nombreCertificacion, url, marca, anio} = req.body;

        if (!nombreCertificacion|| !url || !marca || !anio) {
            return res.status(400).send("Faltan datos necesarios");
        }
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const query = 'INSERT INTO Certificacion (nombreCertificacion, url, marca, anio) VALUES (?,?,?,?)';
        const results = await new Promise((resolve, reject)=>{
            connection.query(query, [nombreCertificacion, url, marca, anio], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        console.log(results);
    
    res.status(200).send('Objetivo agregado con exito.');
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = router