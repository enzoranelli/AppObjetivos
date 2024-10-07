const express = require('express');
const router = express.Router();

router.post('/', agregarAsignacion);

async function agregarAsignacion(req, res){
    try {
        
        const asignacion = {
            fechaAsignacion: req.body.fecha,
            empleado: req.body.idEmpleado,
            objetivo: req.body.idObjetivo,
        }

        console.log(asignacion)
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });

        const query = 'INSERT INTO ObjetivoEmpleado (fechaAsignacion, empleado, objetivo) VALUES (?,?,?)';
        const results = await new Promise((resolve,reject)=>{
            connection.query(query, [asignacion.fechaAsignacion, asignacion.empleado, asignacion.objetivo], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });

        console.log(results);
        res.status(200).send(results);
    } catch (error) {
        res.send(error);
    }
}

module.exports = router;