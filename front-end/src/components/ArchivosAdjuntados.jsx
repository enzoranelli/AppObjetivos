import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SinElementos from './SinElementos';
import { getApiUrl } from '../config/configURL';
function ArchivoAdjuntados({ objetivoId }){
    const [archivos, setArchivos] = useState([]);
    const url = getApiUrl();
    const [error,setError] = useState(null);
    useEffect(()=>{
        axios.get(`${url}/api/archivos/${objetivoId}`)
            .then( response => {
                
                setArchivos(response.data);
             
            })
            .catch( error => {
                setError(error.message);     
            });
        
    },[objetivoId]);

    return(
        <div className='contenedor-archivos'>
            <h3>Archivos adjuntados:</h3>
            {archivos && archivos.length !== 0? (
                <>
                    
                    <ul>
                        {archivos.map((archivo, index) => (
                        <li key={index}>
                            <a href={`${url}/api/archivos/descargar/${archivo.idArchivo}`} download>
                            {archivo.nombre}
                            </a>
                        </li>
                        ))}
                    </ul>
                </>
            ):
            (
                <SinElementos elemento={'archivos adjuntados.'}/>
            )}
        </div>
    );
}
export default ArchivoAdjuntados;