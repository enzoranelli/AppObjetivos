import axios from "axios";
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../old_styles/ActualizarObjetivo.css';
import { formatearFechaToISO } from "../utils/fechaHoy.js";
import MensajeConfirmacion from '../components/MensajeConfirmacion.jsx';
import Confirmacion from '../components/Confirmacion.jsx';
import { getApiUrl } from '../context/configURL.js';
import BotonAtras from "../components/BotonAtras";
import CustomRange from "../components/CustomRange.jsx";
function ActualizarObjetivo(){
    const url = getApiUrl();
    const [objetivoData, setObjetivoData] = useState(null);
    const {id} = useParams();
    const [error, setError] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [contador, setContador] = useState(3);
    const [redirigir, setRedirigir] = useState(false);

    useEffect(()=>{
        axios.get(`${url}/api/objetivos/${id}`)
        .then(response => {
            console.log(response)
            const data = response.data;
            const fechaIncioISO = formatearFechaToISO(data.fechaInicio);
            const fechaFinalISO = formatearFechaToISO(data.fechaFinal);
            setObjetivoData({
                ...data,
                fechaInicio: fechaIncioISO,
                fechaFinal: fechaFinalISO,
            });
        })
        .catch(error => {
            setError(error.message);
        });
    },[id, formatearFechaToISO]);

    useEffect(()=>{
        if (contador > 0 && mostrarMensaje && !error) {
            // Si el contador es mayor que 0, configura un intervalo para restar 1 cada segundo
            const timer = setTimeout(() => {
              setContador(contador - 1);
            }, 1000);
      
            return () => clearTimeout(timer); // Limpia el timeout al desmontar el componente
          } else if(contador === 0) {
            // Cuando el contador llega a 0, activa la redirección
            setRedirigir(true);
          }
      
    },[mostrarMensaje,contador])

    if (redirigir) {
        return <Navigate to="/panel" />;
    }
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Manejar los cambios en los campos de usuario
        if (name === 'titulo' || name === 'descripcion' || name === 'peso' || name === 'fechaInicio' || name === 'fechaFinal') {
            let processedValue = value;
            
            // Validar y procesar el campo peso
            if (name === 'peso') {
                // Asegurar que el valor esté entre 0 y 100
                const numValue = parseInt(value) || 0;
                processedValue = Math.max(0, Math.min(100, numValue));
            }
            
            setObjetivoData({
                ...objetivoData,
                [name]: processedValue,
            });
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Aquí podrías hacer una llamada a la API para actualizar los datos
        try {
            const data = {
                titulo: objetivoData.titulo,
                descripcion: objetivoData.descripcion,
                peso: objetivoData.peso,
                fechaInicio: objetivoData.fechaInicio,
                fechaFinal: objetivoData.fechaFinal,
                idObjetivo: id,
            }
            
            const response = await axios.put(`${url}/api/objetivos/`, data);
       
            if(response.status === 200){
                console.log(response)
                
                setMostrarMensaje(true);

            }
        }catch (error) {
            setMostrarMensaje(false);
            if(error.response){
                setError(error.response.data.message || 'Ocurrió un error en el servidor');
            }else if(error.request){
                setError('No se recibio respuesta del servidor');
            }else{
                setError('Error en la configuracion de la solicitud: '+ error.message);
            }
        } 
    }
    return (
        <div className="relative min-h-screen">
            <BotonAtras />
            <div className='flex justify-center items-center h-screen JosefinSans'>
                {objetivoData ? (
                    <form onSubmit={handleSubmit} className="flex flex-col w-md gap-1.5" >
                        <h1 className="font-black text-2xl">Actualizar campos del Objetivo</h1>
                        {mostrarMensaje && <MensajeConfirmacion titulo={`Campos actualizados del objetivo con exito. Regresando en ${contador} segundos.`} tipo={'exito'}/> }
                        {error && <MensajeConfirmacion titulo={error} tipo={'error'}/>}
                        <div>
                            <label >Titulo:</label>
                            
                            <input
                                className='w-full p-1 border-2 border-custom-orange rounded-lg dark:border-custom-dark-orange '
                                type="text"
                                name="titulo"
                                value={objetivoData.titulo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='contenedor-input'>
                            <label className="descripcion-label" htmlFor="texto">Descripcion del objetivo: (Máximo de caracteres: {objetivoData.descripcion.length}/{2500})</label>
                            <textarea
                                className="resize-none w-full custom-scroll h-28 text-[17px] border-2 border-custom-orange rounded-lg p-1 dark:border-custom-dark-orange"
                                name="descripcion"
                                maxLength={2500}    
                                value={objetivoData.descripcion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div >
                            <label htmlFor="fechaInicio"> Fecha de inicio: </label>
                            <input
                                className='input-custom w-full'
                                type="date"
                                name="fechaInicio"
                                value={objetivoData.fechaInicio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div >
                            <label htmlFor="fechaFinal"> Fecha de final: </label>
                            <input
                                className='input-custom w-full'
                                type="date"
                            
                                name="fechaFinal"
                                value={objetivoData.fechaFinal}
                                min={objetivoData.fechaInicio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="contenedor-input">
                            <label htmlFor="peso" className="descripcion-label">Peso del objetivo: </label>
                            <div className="flex items-center gap-4 mb-4">
                                <input
                                    className='w-20 p-1 border-2 border-custom-orange rounded-lg text-center dark:border-custom-dark-orange'
                                    type="number"
                                    name="peso"
                                    min="0"
                                    max="100"
                                    value={objetivoData.peso}
                                    onChange={handleInputChange}
                                />
                                <span className="text-sm">%</span>
                            </div>
                            <CustomRange
                                min={0}
                                max={100}
                                value={objetivoData.peso}
                                onChange={handleInputChange}
                                name="peso"
                            />
                        </div>
                        <button className='button-datos' type="submit">Guardar</button>
                        <Confirmacion idElemento={id} tipo={'objetivo'}/>
                    </form>    
                ):(
                    <p>No se cargaron los datos...</p>
                )}
                
            </div>
        </div>
      );
}

export default ActualizarObjetivo;