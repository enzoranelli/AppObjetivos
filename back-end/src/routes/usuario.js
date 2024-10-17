const express = require('express');
const router = express.Router();


router.post('/', agregarUsuario);
router.put('/',actualizarUsuario);
router.get('/:id',obtenerUsuario);

async function obtenerUsuario(req, res){
    try{
        const id = req.params.id;
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM Usuario WHERE empleado = ?',[id], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        console.log(results);
        res.send(results[0]);
    }catch(error){
        res.status(500).send(error);
    }

}
async function agregarUsuario(req,res){
    try {
        console.log('Entre a post usuario')
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });

        const usuario = {
            email: req.body.email,
            usuarioPassword: req.body.usuarioPassword,
            rol: req.body.rol,
            empleado: req.body.empleado,
        }
        console.log(usuario);

        const query = 'INSERT INTO Usuario (email, usuarioPassword, rol, empleado) VALUES (?,?,?,?)';
        const results = await new Promise((resolve, reject)=>{
            connection.query(query,[usuario.email, usuario.usuarioPassword, usuario.rol, usuario.empleado], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });


        res.send(results);

    } catch (error) {
        res.send(error);
    }

}
async function actualizarUsuario(req,res){
    try {
        const {  email, rol, empleado } = req.body;

        // Verificar que todos los datos necesarios estén presentes
        if (!email || !rol ||!empleado) {
        return res.status(400).send("Faltan datos necesarios");
        }
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });

        const usuario = {
            
            email: email,
            usuarioPassword: usuarioPassword,
            rol: rol,
            empleado: empleado,
        }
       

        const query = `
        UPDATE Usuario 
        SET email = ?, rol= ?
        WHERE empleado = ?
        `;
        const results = await new Promise((resolve, reject)=>{
            connection.query(query,[usuario.email, usuario.rol, usuario.empleado], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });


        res.send(results);

    } catch (error) {
        res.send(error);
    }
    
}

module.exports = router