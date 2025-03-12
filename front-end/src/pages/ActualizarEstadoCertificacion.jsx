import { getApiUrl } from '../config/configURL';
import { Navigate, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatearISOtoFecha } from '../components/fechaHoy.js';
function ActualizarEstadoCertificacion(){
    /* Peticiones:

        Mostrar datos de la certificacion : id de la certificacion
        Mostrar datos del empleado : id del empleado
        Mostrar datos de la asignacion : id de la asignacion
        Actualizar estado de la asignacion : id de la asignacion
    */
    const url = getApiUrl();
    const {asignacion, empleado, certificacion} = useParams();
    const [getEmpleado, setGetEmpleado] = useState(null);
    const [getCertificacion, setGetCertificacion] = useState(null);
    const [getAsignacion, setGetAsignacion]= useState(null);
    const [redireccion, setRedireccion] = useState(false);
    const [estado, setEstado] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [error, setError] = useState(null);
    const [observaciones, setObservaciones] = useState('');
    const [nota, setNota] = useState(0);
    useEffect(()=>{
        axios.get(`${url}/api/empleados/${empleado}`)
            .then( response => {
                console.log(response)
                setGetEmpleado(response.data);
            })
            .catch( error => {
                console.log(error);     
            });
        axios.get(`${url}/api/certificaciones/${certificacion}`)
            .then( response => {

                console.log(response)
                setGetCertificacion(response.data[0])
            })
            .catch( error => {
                console.log(error);     
            });
        axios.get(`${url}/api/certificacionasignacion/certificado-empleado/${asignacion}`)
            .then( response => {
                console.log(response)
                const asignacionData = response.data[0]; // Guardamos los datos en una variable

                setGetAsignacion(asignacionData);
                setEstado(asignacionData.estado);
                setFechaLimite(asignacionData.fechaLimite.split("T")[0]);
                setObservaciones(asignacionData.observaciones);
                setNota(asignacionData.nota);

            })
            .catch( error => {
                console.log(error);     
            });
    },[]);
    const handleSubmit = async (e) =>{
        
        e.preventDefault();
        try{
            const data = {
                estado: estado,
                nota: nota,
                observaciones: observaciones,
                fechaLimite: fechaLimite,
            }
            console.log(data)
            const response = await axios.put(`${url}/api/certificacionasignacion/${asignacion}`, data);
            console.log(response)
            if(response.status === 200){
                console.log('Eentre aca')
                
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
        return <Navigate to={`/certificacion-empleado/${asignacion}/${empleado}/${certificacion}`}></Navigate> 
    }
    return(
        <div className="conetendor-puntuacion-actualizar">
            {getEmpleado && getCertificacion && getAsignacion ? (
                <form className="contenedor-actualizar">
                    <h1 className="titulo-puntuacion">Actualizar estado de certificacion</h1>
                    <h3>Certificacion: {getCertificacion.nombreCertificacion}</h3>
                    <h3>Empleado: {getEmpleado.nombre} </h3>
                    <h3>Fecha asignada: {formatearISOtoFecha(getAsignacion.fechaAsignada)}</h3>
                    <label className='descripcion-label'>Fecha Limite:</label>
                    <input
                        className="input-objetivo-nuevo"
                        type="date"
                        id="fechaInicio"
                        name="fechaInicio"
                        value={fechaLimite}
                        onChange={(e) => setFechaLimite(e.target.value)}
                        required
                    />
                    <label className="descripcion-label" htmlFor="texto">Observaciones: (Máximo de caracteres: {observaciones.length}/{400})</label>
                    <textarea
                        placeholder='Escribe un comentario o puede dejarlo vacio...'
                        className="text-datos-actualizar-obj"
                        name="descripcion"
                        maxLength={400}    
                        value={observaciones}
                        onChange={(e)=>setObservaciones(e.target.value)}
                    />
                    <label className='descripcion-label'>Nota: (0-100)</label>
                    <input
                        className="input-objetivo-nuevo"
                        type="number"
                        id="nota"
                        name="nota"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        required 
                        max={100}
                        min={0}/>
                    <label className='descripcion-label'>Estado:</label>
                    <select
                        className="input-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required>
                        <option value=''>Seleccione un estado</option>
                        <option value='pendiente'>Pendiente</option>
                        <option value='aprobado'>Aprobado</option>
                        <option value='deprobado'>Reprobado</option>
                    </select>
                    <button className='actualizar-puntuacion-boton' onClick={handleSubmit}>Actualizar estado</button>
                </form>
            ):(<>
                <h1> Error: no se cargaron los datos</h1>
            </>)}
           
        </div>
    )
}

export default ActualizarEstadoCertificacion;