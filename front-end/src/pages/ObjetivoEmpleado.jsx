import '../styles/ObjetivoEmpleado.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Confirmacion from '../components/Confirmacion';
import { getApiUrl } from '../config/configURL';
import ArchivoAdjuntados from '../components/ArchivosAdjuntados';
import SubirArchivos from '../components/SubirArchivos';
function ObjetivoEmpleado(){
    const {asignacion, empleado, objetivo} = useParams();
    const [getObjetivo, setGetObjetivo]= useState(null);
    const [getEmpleado, setGetEmpleado] = useState(null);
    const [puntuacion, setPuntuacion] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const url = getApiUrl();

    const [vuelta, setVuelta] = useState(false);
    const [actualizar, setActualizar] = useState(false);
    const cargarArchivos = async () => {
        try {
            const response = await axios.get(`${url}/api/archivos/${asignacion}`);
            setArchivos(response.data);
        } catch (error) {
            console.error('Error al cargar archivos:', error);
        }
    };
    const handleEliminarArchivo = async (archivoId) => {
        try {
            await axios.delete(`${url}/api/archivos/${archivoId}`);
            setArchivos((prevArchivos) => prevArchivos.filter(archivo => archivo.idArchivo !== archivoId));
            alert('Archivo eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el archivo:', error);
            alert('Error al eliminar el archivo');
        }
    };
    useEffect(() => {
        cargarArchivos();
    }, [asignacion]);
    const handleArchivoSubido = () => {
        cargarArchivos(); // Recargar archivos al subir uno nuevo
    };

    useEffect(()=>{
        axios.get(`${url}/api/empleados/${empleado}`)
            .then( response => {
                console.log(response)
                setGetEmpleado(response.data);
             
            })
            .catch( error => {
                setError(error.message);     
            });
        axios.get(`${url}/api/objetivos/${objetivo}`)
            .then(response => {
                console.log(response)
                setGetObjetivo(response.data);
            })
            .catch( error => {
                setError(error.message);
            })
        axios.get(`${url}/api/puntuacion/${asignacion}`)
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
                        <div className='contenedor-fecha-boton'>
                            <h2>Progreso de {getObjetivo.titulo} de {getEmpleado.nombre}</h2>
                            <button onClick={volver}> Volver</button>
                        
                        </div>
                        
                        <hr className='linea'></hr>
                        <div className='contenedor-fecha-boton'>
                            <h2>Fecha final de objetivo: {getObjetivo.fechaFinal}</h2>
                            <div className='contenedor-botones'>
                                
                                <button className='boton-obj-emp' onClick={actualizarPuntuacion}>Actualizar estado</button>
                                <div className='boton-rojo'>
                                <Confirmacion idElemento={asignacion} idEmpleado={empleado} tipo={'asignacion'}/>
                                </div>
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
                                        <li>Comentario: {punto.comentario ? <>{punto.comentario}</>:<>Sin comentarios</>}</li>
                                        <hr className='linea'></hr>
                                    </ul>
                                </li>
                            ))

                            }
                            
                        </ul>
                            
                        </div>
                        
                        <SubirArchivos objetivoId={asignacion} onArchivoSubido={handleArchivoSubido}/>
                        <ArchivoAdjuntados archivos={archivos} objetivoId={asignacion} onEliminarArchivo={handleEliminarArchivo} />
                    </>
                ):(
                    <></>
                )}
            </div>
        </div>
    );
}

export default ObjetivoEmpleado;