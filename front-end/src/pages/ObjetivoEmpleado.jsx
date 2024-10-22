import '../styles/ObjetivoEmpleado.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Confirmacion from '../components/Confirmacion';
function ObjetivoEmpleado(){
    const {asignacion, empleado, objetivo} = useParams();
    const [getObjetivo, setGetObjetivo]= useState(null);
    const [getEmpleado, setGetEmpleado] = useState(null);
    const [puntuacion, setPuntuacion] = useState(null);

    const [vuelta, setVuelta] = useState(false);
    const [actualizar, setActualizar] = useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:9000/api/empleados/${empleado}`)
            .then( response => {
                console.log(response)
                setGetEmpleado(response.data);
             
            })
            .catch( error => {
                setError(error.message);     
            });
        axios.get(`http://localhost:9000/api/objetivos/${objetivo}`)
            .then(response => {
                console.log(response)
                setGetObjetivo(response.data);
            })
            .catch( error => {
                setError(error.message);
            })
        axios.get(`http://localhost:9000/api/puntuacion/${asignacion}`)
            .then(response => {
                console.log(response)
                setPuntuacion(response.data);
            })
            .catch( error => {
                setError(error.message);
            })
    },[]);

    const volver = () =>{
       setVuelta(true);
    }
    const actualizarPuntuacion = () =>{
        setActualizar(true);
     }
    if(vuelta){
        return <Navigate to={`/feed/${empleado}`}></Navigate>
    }
    if(actualizar){
        return <Navigate to={`/actualizar-puntuacion/${asignacion}/${empleado}/${objetivo}`} ></Navigate>
    }
    return (
        <div className="container-objetivo-empleado">
            <div className='cuadrado'>
                {(getEmpleado && getObjetivo && puntuacion) ? (
                    <>
                        <button onClick={volver}> Volver</button>
                        <h2>Progreso de {getObjetivo.titulo} de {getEmpleado.nombre}</h2>
                        <hr className='linea'></hr>
                        <h2>Fecha final de objetivo: {getObjetivo.fechaFinal}</h2>
                        <div className='contenedor-botones'>
                            <button className='boton-obj-emp' onClick={actualizarPuntuacion}>Actualizar estado</button>
                            <div className='boton-rojo'>
                            <Confirmacion idElemento={asignacion} idEmpleado={empleado} tipo={'asignacion'}/>
                            </div>
                        </div>
                        
                        <h3>Historial de {getEmpleado.nombre} en el objetivo:</h3>
                        <div className='contenedor-lista'>
                        <ul className='lista-puntuacion'>
                            {puntuacion.map((punto) => (
                                <li key={punto.idPuntuacion} className='contenedor-punto'>
                                    <ul className='lista-puntuacion'>
                                        <li>Fecha: {new Date(punto.fechaPuntuacion).toLocaleDateString()}</li>
                                        <li>Progreso: <progress value={punto.valor} max='100'></progress> {punto.valor}%</li>
                                        <hr className='linea'></hr>
                                    </ul>
                                </li>
                            ))

                            }
                            
                        </ul>
                        </div>
                    </>
                ):(
                    <></>
                )}
            </div>
        </div>
    );
}

export default ObjetivoEmpleado;