import React, { useEffect, useState } from 'react';
import SinElementos from './SinElementos.jsx';
import { getApiUrl } from '../config/configURL.js';

function ArchivoAdjuntados({ archivos ,puntuacion, onEliminarArchivo}){
    const url = getApiUrl()
    return(
        <div className='contenedor-archivos' >
            <h3>Archivos adjuntados:</h3>
            {archivos && archivos.length !== 0? (
                <>
                    
                    <ul>
                        {console.log('Archivos:',archivos)}
                        {archivos.map((archivo, index) => (
                        <li key={index}>
                            <a href={`${url}/api/archivos/descargar/${archivo.idArchivo}`} download>
                            {archivo.nombre}
                            </a>
                            <button
                                onClick={() => onEliminarArchivo(archivo.idArchivo,puntuacion)}
                                style={{ marginLeft: '10px', background: 'red', color: 'white', width:'auto' }}
                            >
                                    X
                            </button>

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