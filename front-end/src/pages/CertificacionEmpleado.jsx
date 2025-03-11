import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Confirmacion from '../components/Confirmacion.jsx';
import { getApiUrl } from '../config/configURL.js';
function CertificacionEmpleado(){
    const url = getApiUrl();
    const [vuelta, setVuelta] = useState(false);
    const {asignacion, empleado, certificacion} = useParams();
    const [getEmpleado, setGetEmpleado] = useState(null);
    const [getCertificacion, setGetCertificacion] = useState(null);
    const [getAsignacion, setGetAsignacion]= useState(null);

    const volver = () =>{
        setVuelta(true);
    }
    useEffect(()=>{
        axios.get(`${url}/api/empleados/${empleado}`)
            .then( response => {
                console.log(response)
                setGetEmpleado(response.data);
         
            })
            .catch( error => {
                setError(error.message);     
            });
        axios.get(`${url}/api/certificaciones/${certificacion}`)
            .then( response => {
                console.log(response)
                setGetCertificacion(response.data[0]);
        
            })
            .catch( error => {
                setError(error.message);     
            });
        axios.get(`${url}/api/certificacionasignacion/certificado-empleado/${asignacion}`)
            .then( response => {
                console.log(response)
                setGetAsignacion(response.data[0]);
        
            })
            .catch( error => {
                setError(error.message);     
            });
    },[]);

    if(vuelta){
        return <Navigate to={`/feed/certificaciones/${empleado}`}></Navigate>
    }
    return(
        <div className="container-objetivo-empleado"> 
            <div className='cuadrado'>
                {
                    getEmpleado && getCertificacion && getAsignacion? (<>
                    <div className='contenedor-fecha-boton'>
                            <h3>Progreso de {getEmpleado.nombre} en {getCertificacion.nombreCertificacion}</h3>
                            <button onClick={volver}> Volver</button>
                    </div>
                    <hr className='linea'></hr>

                    <div className='contenedor-fecha-boton'>
                        <h3>Fecha final de objetivo: {}</h3>
                        <div className='contenedor-botones'>
                            <div className='boton-rojo'>
                                <Confirmacion idElemento={asignacion} idEmpleado={empleado} tipo={'asignacion'}/>
                            </div>
                        </div>
                    </div>
                    <h3>Observaciones:</h3>
                    <label>{getAsignacion.observaciones}</label>
                    </>): null    
                }
                
            </div>
        </div>
    );
}

export default CertificacionEmpleado;