const express = require('express');
const router = express.Router();


router.get('/', obtenerObjetivos);
router.post('/', agregarObjetivos);

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
    res.json(results);
 }  catch (err){
    res.send(err);
 } 
}

async function agregarObjetivos(req, res) {
    try{
        console.log(req.body);
        res.status(200).send({'mensage':'Bien'});
    } catch(err){
        res.send(err);
    }
}

module.exports = router;