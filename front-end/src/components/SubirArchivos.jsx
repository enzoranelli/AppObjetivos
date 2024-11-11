import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/configURL';
function SubirArchivos({objetivoId, onArchivoSubido}){
    const [archivos, setArchivos] = useState([]);
    const url = getApiUrl();
    const handleAgregarArchivos = (event) => {
    const nuevosArchivos = Array.from(event.target.files);
        setArchivos((prevArchivos) => [...prevArchivos, ...nuevosArchivos]);
    };
    const handleEliminarArchivo = (index) => {
        setArchivos((prevArchivos) => prevArchivos.filter((_, i) => i !== index));
    };
    const handleSubirArchivos = async () => {
        const formData = new FormData();
        archivos.forEach((archivo) => {
            formData.append('archivo', archivo); // Usa la clave 'files' para todos los archivos
        });
    
        try {
            const response = await axios.post(`${url}/api/archivos/${objetivoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                alert('Archivos subidos con éxito');
                setArchivos([]); // Limpia la lista después de subir
                onArchivoSubido(); 
            } else {
                alert('Error al subir los archivos');
            }
        } catch (error) {
            console.error('Error al subir los archivos:', error);
            alert('Error al subir los archivos');
        }
    }
    
    return(
        <div className='contenedor-archivos'>
            <h3>Adjuntar archivos:</h3>
  
            {/* Botón para agregar archivos */}
            <input type="file" multiple onChange={handleAgregarArchivos} />
  
            {/* Lista de archivos seleccionados */}
            <ul>
                {archivos.map((archivo, index) => (
                    <li key={index}>
                        {archivo.name}
                        <button onClick={() => handleEliminarArchivo(index)} style={{background:'red',width:'40px',fontWeight:'bold', marginLeft:'10px'}}>X</button>
                    </li>
                ))}
            </ul>
  
            {/* Botón para subir todos los archivos */}
            <button 
                className={`boton ${archivos.length === 0 ? 'boton-desactivado' : ''}`}
                onClick={handleSubirArchivos} 
                disabled={archivos.length === 0}>
                Subir archivos
            </button>
      </div>
    );
}
export default SubirArchivos;