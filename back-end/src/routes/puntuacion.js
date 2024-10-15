const express = require('express');
const router = express.Router();

router.post('/',agregarPuntuacion);
router.get('/puntuacionBarra/:id', obtenerPuntuacionBarra);
router.get('/:id',obtenerPuntaciones);


async function agregarPuntuacion(req, res){
    try {
        
        const puntuacion = {
            objetivo: req.body.objetivo,
            valor: req.body.valor,
            fechaPuntuacion: req.body.fechaPuntuacion,
        }

        console.log(puntuacion)
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });

        const query = 'INSERT INTO Puntuacion (objetivo, valor, fechaPuntuacion) VALUES (?,?,?)';
        const results = await new Promise((resolve,reject)=>{
            connection.query(query, [puntuacion.objetivo, puntuacion.valor, puntuacion.fechaPuntuacion], (err, results)=>{
                if(err){ 
                    if(err.code === 'ER_DUP_ENTRY'){
                        return res.status(409).send({message:'Este objetivo ya ha sido asignado a este empleado. '})
                    }
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
        res.status(202).send(results);
    }catch (error) {
        res.send(error);
    }
}

async function obtenerPuntuacionBarra(req,res) {
    try {
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const id = req.params.id;
        const query = `SELECT oe.idObjetivoEmpleado, o.titulo, p.valor, o.peso, 
       (o.peso * p.valor / 100) AS despeno
        FROM ObjetivoEmpleado oe
        JOIN Empleado e ON oe.empleado = e.idEmpleado
        JOIN Objetivo o ON oe.objetivo = o.idObjetivo
        JOIN Puntuacion p ON oe.idObjetivoEmpleado = p.objetivo
        JOIN (
            SELECT p.objetivo, MAX(p.idPuntuacion) AS maxPuntuacion
            FROM Puntuacion p
            GROUP BY p.objetivo
        ) maxP ON p.objetivo = maxP.objetivo AND p.idPuntuacion = maxP.maxPuntuacion
        WHERE e.idEmpleado = ?
        ORDER BY idOBjetivoEmpleado;`
        const results = await new Promise((resolve, reject)=>{
            connection.query(query,[id], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        res.status(202).send(results);
        
    } catch (error) {
        res.send(error);
    }
    
}

async function obtenerPuntaciones(req,res){
    try{
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const id = req.params.id;
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM Puntuacion WHERE objetivo = ? ORDER BY idPuntuacion DESC',[id], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        res.status(202).send(results);
    }catch(error){
        res.status(500).send(error)
    }
}
module.exports = router