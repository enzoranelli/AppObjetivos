const express = require('express');
const router = express.Router();


router.post('/', agregarUsuario);
router.put('/',actualizarUsuario);
router.post('/confirm', confirmarContrasena);
router.put('/confirm',actualizarContrasena);
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
            connection.query('SELECT idUsuario, email, rol, empleado FROM Usuario WHERE empleado = ?',[id], (err, results)=>{
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
async function confirmarContrasena(req,res){
    try{
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const {idUsuario, usuarioPassword} = req.body;
        if(!idUsuario || !usuarioPassword){
            return res.status(400).send({message:"Faltan datos"});
        }
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT usuarioPassword FROM Usuario WHERE idUsuario = ?',[idUsuario], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        if(results[0].usuarioPassword !== usuarioPassword){
            return res.status(400).send({message:"La contraseña no es valida."});
        }
        
        res.status(200).send('La contraseña es correcta');
    }catch(error){
        res.status(500).send({message:"Error en el servidor"});
    }
}
async function actualizarContrasena(req,res){
    try{
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const {idUsuario, usuarioPassword} = req.body;
        if(!idUsuario || !usuarioPassword){
            return res.status(400).send({message:"Faltan datos"});
        }
        const results = await new Promise((resolve, reject)=>{
            connection.query('UPDATE Usuario SET usuarioPassword = ? WHERE idUsuario = ?',[usuarioPassword,idUsuario], (err, results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
        console.log(results);
        res.status(200).send({message:"Contraseña actualizada correctamente!"});

    }catch(error){
        res.status(500).send({message:"Error en el servidor"});
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
        console.log("Entre en actualizar ususarop")
        // Verificar que todos los datos necesarios estén presentes
        if (!email || !rol ||!empleado) {
        return res.status(400).send("Faltan datos necesarios papa de dio");
        }

        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });

        const query = `
        UPDATE Usuario 
        SET email = ?, rol= ?
        WHERE empleado = ?
        `;
        console.log(email)
        const results = await new Promise((resolve, reject)=>{
            connection.query(query,[email, rol, empleado], (err, results)=>{
                if (err) {
                    console.error('Error en la consulta SQL:', err); // Muestra el error específico
                    reject(err);
                } else {
                    console.log('Resultado de la consulta SQL:', results); // Log para ver lo que devuelve la consulta
                    resolve(results);
                }
            });
        });

        console.log(results)
        res.status(200).send(results);

    } catch (error) {
        res.send(error);
    }
    
}

module.exports = router