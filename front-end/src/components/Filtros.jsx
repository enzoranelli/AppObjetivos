import axios from 'axios';
import { useState, useEffect } from "react";
import { getApiUrl } from '../config/configURL';
import '../styles/Filtros.css';
function Filtros(){
    const url = getApiUrl();
    /*const [filtros, setFiltros] = useState({
        anioActual: false,
        area: false,
        noAsignados: false,
        hardware: false,
        documentacion: false
    });*/
    const [areas, setAreas] = useState(null);
    const [anios, setAnios] = useState(null);
    //const [objetivos, setObjetivos] = useState(null);
    const [error,setError] = useState('');
    useEffect(()=>{
        /*
        axios.get(`${url}/api/objetivos/objetivo-con-asignacion`)
            .then( response => {
                console.log(response)
                setObjetivos(response.data);
                setIsLoading(false);
            })
            .catch( error => {
                setError(error.message);
                setIsLoading(false);
            });
        
            console.log(objetivos)
        */
        axios.get(`${url}/api/empleados/areas`)
            .then(response => {
                console.log(response)
                setAreas(response.data);
            })
            .catch(error => {
                setError(error.message);
            }); 
        axios.get(`${url}/api/objetivos/anios`)
            .then(response => {
                console.log(response)
                setAnios(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    },[]);

    return(
        <div className='contenedor-filtros'>
            <div>
                <h3>Filtros:</h3>
                <label>Años:</label>
                    <select >
                        <option value="">Todos</option>
                        {anios?.map((anio)=> (
                            <option key={anio.anio} value={anio.anio}>
                                {anio.anio
                                }
                            </option>
                        ))}
                </select>
                <label>Area</label>
                    <select >
                        <option value="">Todos</option>
                        {areas?.map((area)=> (
                            <option key={area.nombre} value={area.nombre}>
                                {area.nombre}
                            </option>
                        ))}
                </select>
                <label>
                    <input 
                        className='input-filtros'
                        type='checkbox'
                        name='Año actual'
                
                    />
                    Objetivos sin asignacion
                </label>
               
            </div>
        </div>
    );
}

export default Filtros;