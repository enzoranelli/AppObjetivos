const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));  // Carpeta para archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.post('/:id', upload.array('archivo'),subirArchivo);
router.get('/:id',obtenerArchivos);
router.get('/descargar/:id',descargaArchivos);

async function subirArchivo(req,res){
    try{
        const objetivoAsignado = req.params.id;
        const archivos = req.files;

        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) reject(err);
                else resolve(conn);
            });
        });
        const query = 'INSERT INTO archivos (objetivoAsignado, nombre, ruta) VALUES (?, ?, ?)';
        for (const archivo of archivos) {
            const nombreArchivo = archivo.originalname;
            const rutaArchivo = archivo.path;

            await new Promise((resolve, reject) => {
                connection.query(query, [objetivoAsignado, nombreArchivo, rutaArchivo], (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                });
            });
        }
        
        res.status(200).json({ mensaje: 'Archivo subido y guardado con éxito' });
    }catch(error){
        res.status(500).send(error);
    }
}
async function obtenerArchivos(req,res){
    try{
        console.log('Entre en obtener archivos')
        const objetivoAsignado = req.params.id;
        
        const connection = await new Promise((resolve, reject)=>{
            req.getConnection((err, conn)=>{
                if(err) {
                    console.log(err)
                    reject(err);
                }
                else resolve(conn);
            });
        });

        
        const results = await new Promise((resolve, reject)=>{
            connection.query('SELECT nombre, idArchivo FROM Archivos WHERE objetivoAsignado = ?',[objetivoAsignado], (err, results)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }
                else resolve(results);
            });
        });
        console.log(results)
        if (results.length === 0) {
            
            return res.status(200).json(results);
        }
      
        
        
       
     
        res.json(results);
    }catch(error){
        res.status(500).json({ mensaje: error });;
    }
}
async function descargaArchivos(req,res){
    
    try {
        const id = req.params.id;
   
        const connection = await new Promise((resolve, reject) => {
            req.getConnection((err, conn) => {
                if (err) reject(err);
                else resolve(conn);
            });
        });
        const result = await new Promise((resolve, reject) => {
            connection.query('SELECT ruta, nombre FROM Archivos WHERE idArchivo = ?', [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });

        if (!result) {
            return res.status(404).json({ mensaje: 'Archivo no encontrado' });
        }
        const filePath = path.resolve(result.ruta);
        const nombreVisible = result.nombre;
        res.download(filePath, nombreVisible, (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err);
                res.status(500).json({ mensaje: 'Error al descargar el archivo' });
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
module.exports = router;