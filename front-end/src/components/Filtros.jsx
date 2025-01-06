import axios from 'axios';
import { useState, useEffect } from "react";
import { getApiUrl } from '../config/configURL';
import '../styles/Filtros.css';
import { parse, getYear } from 'date-fns';
function Filtros({manejarLista, lista}){
    const url = getApiUrl();
    
    const [areas, setAreas] = useState(null);
    const [anios, setAnios] = useState(null);
    const [objetivos, setObjetivos] = useState(null);
    const [anioSeleccionado, setAnioSeleccionado] = useState('todos');
    const [areaSeleccionada, setAreaSeleccionada] = useState('todos');
    const [objetivosArea, setObjetivosArea] = useState(null);
    const [objetivoSinAsignacion, setObjetivoSinAsignacion] = useState(false);
    const [error,setError] = useState('');
    useEffect(()=>{
        
        axios.get(`${url}/api/filtros/objetivo-con-asignacion`)
            .then( response => {
                console.log(response)
                setObjetivos(response.data);
               
            })
            .catch( error => {
                setError(error.message);
               
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
    useEffect(()=>{
        axios.get(`${url}/api/filtros/objetivos-por-area?area=${areaSeleccionada}`)
        .then( response => {
            console.log(response)
            setObjetivosArea(response.data);
           
        })
        .catch( error => {
            setError(error.message);
           
        });
    
    },[areaSeleccionada]);
    const filtrarPorAño = (lista, anio) => {
        return lista.filter(item => {
            
            const fechaInicio = parse(item.fechaInicio, 'dd/MM/yyyy', new Date());
            const fechaFinal = parse(item.fechaFinal, 'dd/MM/yyyy', new Date());
            console.log('AnIO:',anio)
            console.log('AÑÓ EN FILTRAR AÑO: ',getYear(fechaInicio))
            console.log('AÑÓ EN FILTRAR AÑO: ',fechaFinal)
            console.log('AÑÓ EN FILTRAR AÑO: ',fechaInicio)
            return getYear(fechaInicio) === parseInt(anio) || getYear(fechaFinal) === parseInt(anio);
        });
      };
    const filtrar = ()=>{
        console.log(areaSeleccionada)
        if(areaSeleccionada !== 'todos'){
           const listaFiltrada = lista.filter(item => objetivosArea.some(area => area.idObjetivo === item.idObjetivo));
           console.log(listaFiltrada)
        }else{
            console.log('Sin Filtrar areas')
        }
        if(anioSeleccionado !== 'todos'){
            const fechasFiltradas = filtrarPorAño(lista, anioSeleccionado);
            console.log('LISTA CON AÑO')
            console.log(fechasFiltradas)
            manejarLista(fechasFiltradas);
        }else{
            console.log('No se Filtra año')
        }
        if(objetivoSinAsignacion){
            console.log('filtrar objetivo sin asignacion', objetivoSinAsignacion )
            const idsExcluidos = objetivos.map((item) => item.idObjetivo);
            const listaFiltrada = lista.filter(
                (item) => !idsExcluidos.includes(item.idObjetivo)
              );
            manejarLista(listaFiltrada);
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
                    <option value="todos">Todos</option>
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
                        <option value="todos">Todos</option>
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