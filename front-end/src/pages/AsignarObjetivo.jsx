import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { obtenerFecha, fechaISO } from "../utils/fechaHoy";
import '../old_styles/AsignarObjetivo.css';
import { getApiUrl } from "../context/configURL";
function AsignarObjetivo(){
    const url = getApiUrl();
    const navigate = useNavigate();
    const [objetivo, setObjetivo] = useState(null);
    const [error, setError]  =useState(null);
    const { id } = useParams();
    const [empleados, setEmpleados] = useState(null);
  

    const [idEmpleado, setIdEmpleado] = useState('');
   

    const fechaMostrar = obtenerFecha();
    const fecha = fechaISO();

    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{
        axios.get(`${url}/api/objetivos/${id}`)
            .then( response => {
                console.log(response)
                setObjetivo(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
        axios.get(`${url}/api/empleados`)
            .then( response => {
                console.log(response)
                
                setEmpleados(response.data.filter(empleado => empleado.activo));
            })
            .catch( error => {
                setError(error.message);
            });
            
    },[id]);

    const onSubmit =  async (e)=>{
        e.preventDefault();
        try{
            const data = {
                fecha: fecha,
                idEmpleado: idEmpleado,
                idObjetivo: objetivo.idObjetivo,
            }
            const response = await axios.post(`${url}/api/objetivoasignacion/`, data);

            if(response.status === 200){
                setRedirect(true);
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

    useEffect(()=>{
        console.log(empleados)
    },empleados);

    if (redirect) {
        return <Navigate to={`/redireccion/asignado/${id}`} />;
    }

    return (
        <div className="relative min-h-screen">
            <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="absolute top-20 left-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors z-10"
                >
                    ← Volver
            </button>
        {objetivo && empleados ? (
            <div className="flex justify-center items-center h-screen JosefinSans">
                
                <form className="flex flex-col w-md gap-1.5" onSubmit={onSubmit}>
                    <div className="flex items-center gap-4 mb-4">
                        
                        <h1 className="text-2xl font-black">Objetivo: {objetivo.titulo}</h1>
                    </div>
                    {error && <div style={{color:"red"}}>{error}</div>}
                    <h4 className="font-black">Descripcion:</h4>
                    <label>{objetivo.descripcion}</label>
                    <h4 className="font-black">Peso:</h4>
                   
                    <div className="flex items-center gap-2 w-full">   
                       <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-custom-orange transition-all duration-300 dark:bg-custom-dark-orange"
                                style={{ width: `${objetivo.peso}%` }}
                            ></div>
                        </div>
                        <span className="min-w-[40px] text-right">{objetivo.peso}%</span>
                    </div> 
                    <h4 className="font-black">Fecha de asignación de hoy: {fechaMostrar}</h4>
                    <h4 className="font-black">Asignar a</h4>
                    <label>Empleado:</label>
                    
                    <select className='w-full h-10 text-xl rounded-xl  my-1.5 bg-amber-50 dark:text-black' value={idEmpleado} onChange={(e)=>setIdEmpleado(e.target.value)} required>
                        <option value="" >Elige un empleado</option>
                        {empleados.map(empleado =>(
                            <option key={empleado.idEmpleado} value={empleado.idEmpleado}>
                                {empleado.nombre}
                            </option>
                        ))}
                    </select>
                    
                    <button type="submit" className='orange-button'>Asignar</button>
                </form>
            </div>
        ):(
            <div>{error}</div>
        )}
        </div>
    );
}

export default AsignarObjetivo;