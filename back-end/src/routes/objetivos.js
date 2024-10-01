const express = require('express');
const router = express.Router();
const {format, parseISO} = require('date-fns'); 

router.get('/', obtenerObjetivos);
router.post('/', agregarObjetivo);

async function agregarObjetivo(req, res) {
 try{

    console.log(req.body);

    const { titulo, descripcion, peso, fechaInicio, fechaFinal} = req.body;

    if (!titulo || !descripcion || peso === undefined || !fechaInicio || !fechaFinal) {
        return res.status(400).send("Faltan datos necesarios");
    }

    const connection = await new Promise((resolve, reject)=>{
        req.getConnection((err, conn)=>{
            if(err) reject(err);
            else resolve(conn);
        });
    });

    const query = 'INSERT INTO Objetivo (titulo, descripcion, peso, fechaInicio, fechaFinal) VALUES (?,?,?,?,?)';
    const results = await new Promise((resolve, reject)=>{
        connection.query(query, [titulo,descripcion,peso,fechaInicio,fechaFinal], (err, results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
    console.log(results);
    res.status(200).send('Objetivo agregado con exito.');
 }  catch (err){
    res.status(404).send(err);
 } 
}

async function obtenerObjetivos(req, res) {
    try{
        
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM Objetivo', (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        console.log(results)
        console.log(results[0]?.fechaFinal);
        const dataFormateado = results.map(result =>({
            ...result,
            fechaInicio: format(parseISO(result.fechaInicio), 'dd/MM/yyyy'),
            fechaFinal: format(parseISO(result.fechaFinal), 'dd/MM/yyyy')
        }))

        //console.log(dataFormateado[0].fechaFinal);
        res.status(200).json(results);
    } catch(err){
        res.send(err);
    }
}

module.exports = router;