const express = require('express');
const router = express.Router();


router.post('/', agregarUsuario);
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

module.exports = router