import axios from 'axios';
import { useState, useEffect } from "react";
import { getApiUrl } from '../config/configURL';
import '../styles/Filtros.css';
function Filtros({manejarLista}){
    const url = getApiUrl();
    
    const [areas, setAreas] = useState(null);
    const [anios, setAnios] = useState(null);
    const [objetivos, setObjetivos] = useState(null);
    const [anioSeleccionado, setAnioSeleccionado] = useState('todos');
    const [areaSeleccionada, setAreaSeleccionada] = useState('todos');
    const [objetivoSinAsignacion, setObjetivoSinAsignacion] = useState(false);
    const [error,setError] = useState('');
    useEffect(()=>{
        
        axios.get(`${url}/api/filtros/objetivo-con-asignacion`)
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
        
        axios.get(`${url}/api/empleados/areas`)
            .then(response => {
                console.log(response)
                setAreas(response.data);
            })
            .catch(error => {
                setError(error.message);
            }); 
        axios.get(`${url}/api/filtros/anios`)
            .then(response => {
                console.log(response)
                setAnios(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    },[]);

    const filtrar = ()=>{
        if(areaSeleccionada !== 'todos'){
            console.log('Filtrar areas: ',areaSeleccionada)
        }else{
            console.log('Sin Filtrar areas')
        }
        if(anioSeleccionado !== 'todos'){
            console.log('Filtrar anio: ',anioSeleccionado )
        }else{
            console.log('No se Filtra año')
        }
        if(objetivoSinAsignacion){
            console.log('filtrar objetivo sin asignacion', objetivoSinAsignacion )
        }else{
            console.log('Sin Filtrar objetivo sin asignacion')
        }
    }
    return(
        <div className='contenedor-filtros'>
            <div className='contenedor-opciones-fitros'>
                <h3>Filtros:</h3>
                <label>Años:</label>
                <select
                    value={anioSeleccionado}
                    onChange={(e) => setAnioSeleccionado(e.target.value)} >
                    <option value="">Todos</option>
                    {anios?.map((anio)=> (
                        <option key={anio.anio} value={anio.anio}>
                            {anio.anio}
                        </option>
                    ))}
                </select>
                <label>Area:</label>
                    <select
                        value={areaSeleccionada}
                        onChange={(e) => setAreaSeleccionada(e.target.value)} >
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
                        checked={objetivoSinAsignacion}
                        onChange={(e) => setObjetivoSinAsignacion(e.target.checked)}
                    />
                    Objetivos sin asignacion
                </label>
               
            </div>
            <div className='contenedor-boton-filtro'>
                <button className='boton-filtro' onClick={filtrar}>Aplicar filtros</button> 
            </div>
            
        </div>
    );
}

export default Filtros;