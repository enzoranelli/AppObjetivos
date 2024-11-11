import React, { useEffect, useState } from 'react';
import SinElementos from './SinElementos';
import { getApiUrl } from '../config/configURL';

function ArchivoAdjuntados({ objetivoId, archivos , onEliminarArchivo}){
    const url = getApiUrl
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
                            <button
                                onClick={() => onEliminarArchivo(archivo.idArchivo)}
                                style={{ marginLeft: '10px', background: 'red', color: 'white' }}
                            >
                                Eliminar
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