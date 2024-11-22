import '../styles/ActualizarPuntuacion.css'
import axios from 'axios';
import {Form, Navigate, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerFecha, fechaISO } from "../components/fechaHoy";
import { getApiUrl } from '../config/configURL';
function ActualizarPuntuacion(){
    const url = getApiUrl();
    const {asignacion, empleado, objetivo} = useParams();
    const fecha = fechaISO();
    const [puntuacion, setPuntuacion] = useState(0);
    const [comentario, SetComentario] = useState('');
    const fechaMostrar = obtenerFecha();
    const [getObjetivo, setGetObjetivo] = useState(null);
    const [getEmpleado, setGetEmpleado] = useState(null);
    const [redireccion, setRedireccion] = useState(null);

    useEffect(()=>{
        axios.get(`${url}/api/objetivos/${objetivo}`)
            .then( response => {
                console.log(response)
                setGetObjetivo(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
        axios.get(`${url}/api/empleados/${empleado}`)
            .then( response => {
                console.log(response)
                setGetEmpleado(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
            
    },[empleado]);

    const handleSubmit = async (e) =>{
        
        e.preventDefault();
        try{
           

            const data = {
                objetivo: asignacion,
                valor: puntuacion,
                fechaPuntuacion: fecha,
                comentario:comentario,
            }
            console.log(data)
            const response = await axios.post(`${url}/api/puntuacion/`, data);

            if(response.status === 202){
               setRedireccion(true);
            }
        }catch(err){
           if(err.response){
            setError(err.response.data.message || 'Ocurrió un error en el servidor');
           }else if(err.request){
            setError('No se recibio respuesta del servidor');
           }else{
            setError('Error en la configuracion de la solicitud: '+ err.message);
           }
        }
    }
    if(redireccion){
        return <Navigate to={`/redireccion/puntuacion/${empleado}`}></Navigate>
    }
    return (
        <div className="conetendor-puntuacion-actualizar">
            { getEmpleado && getObjetivo ? (
                <form className="contenedor-actualizar">
                    <h1 className="titulo-puntuacion">Actualizar puntuacion</h1>
                    
                    <h3>Objetivo: {getObjetivo.titulo}</h3>
                    <h3>Empleado: {getEmpleado.nombre} </h3>
                    <h3>Fecha asignada: {fechaMostrar}</h3>
                    <label className="descripcion-label" htmlFor="texto">Descripcion del objetivo: (Máximo de caracteres: {comentario.length}/{2500})</label>
                    <textarea
                        placeholder='Escribe un comentario o puede dejarlo vacio...'
                        className="text-datos-actualizar-obj"
                        name="descripcion"
                        maxLength={2500}    
                        value={comentario}
                        onChange={(e)=>SetComentario(e.target.value)}
                    />
                    <h3>Puntuar:</h3>
                    <div className="contenedor-input">
                        <label htmlFor="slider" className="descripcion-label">Asigne el peso del objetivo: </label>
                        <input 
                            className='input-puntuacion'
                            type="range"
                            id="puntuacion"
                            min="0"
                            max="100"
                            value={puntuacion}
                            onChange={(e)=>setPuntuacion(e.target.value)}
                        />
                        <label>{puntuacion}%</label>
                        <button className='actualizar-puntuacion-boton' onClick={handleSubmit}>Agregar puntuacion</button>
                    </div>
                </form>) :(<>
                <h1> Error: no se cargaron los datos</h1>
            </>)}
            
        </div>
    );
}

export default ActualizarPuntuacion;