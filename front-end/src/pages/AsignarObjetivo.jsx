import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { obtenerFecha, fechaISO } from "../components/fechaHoy";
function AsignarObjetivo(){
    const [objetivo, setObjetivo] = useState(null);
    const [error, setError]  =useState(null);
    const { id } = useParams();
    const [empleados, setEmpleados] = useState(null);
    const [areas, setAreas] = useState(null);

    const [idEmpleado, setIdEmpleado] = useState('');
    const [area, setArea] = useState('');

    const fechaMostrar = obtenerFecha();
    const fecha = fechaISO();

    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:9000/api/objetivos/${id}`)
            .then( response => {
                console.log(response)
                setObjetivo(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
        axios.get(`http://localhost:9000/api/empleados`)
            .then( response => {
                console.log(response)
                setEmpleados(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
            axios.get(`http://localhost:9000/api/empleados/areas`)
            .then( response => {
                console.log(response)
                setAreas(response.data);
            })
            .catch( error => {
                setError(error.message);
            }); 
    },[id]);

    const onSubmit =  async (e)=>{
        e.preventDefault();
        try{
            setIdObjetivo(objetivo.idObjetivo);

            const data = {
                fecha: fecha,
                idEmpleado: idEmpleado,
                idObjetivo: objetivo.idObjetivo,
            }
            const response = await axios.post('http://localhost:9000/api/objetivoasignacion/', data);

            if(response.status === 200){
                setRedirect(true);
            }
        }catch(error){
            console.log('Hubo un error al eviar los datos: ',error);
        }
    }

    

    useEffect(()=>{
        console.log(empleados)
    },empleados);

    if (redirect) {
        return <Navigate to='/redireccion/asignado' />;
    }

    return (
        <div>
        {objetivo && empleados && areas? (
            <div className="objetivo-container">
                
                <form className="form-objetivo" onSubmit={onSubmit}>
                    <h1>Objetivo: {objetivo.titulo}</h1>
                    <h4>Descripcion:</h4>
                    <label>{objetivo.descripcion}</label>
                    <h4>Peso:</h4>
                    <div>
                        <progress id="progreso "value={objetivo.peso} max="100"></progress>
                        <label htmlFor="progreso">{objetivo.peso}%</label>
                    </div>
                    <h4>Fecha de asignación de hoy: {fechaMostrar}</h4>
                    <h4>Asignar a</h4>
                    <label>Empleado:</label>
                    
                    <select className='select-form' value={idEmpleado} onChange={(e)=>setIdEmpleado(e.target.value)} disabled={area !== ''} required>
                        <option value="" >Elige un empleado</option>
                        {empleados.map(empleado =>(
                            <option key={empleado.idEmpleado} value={empleado.idEmpleado}>
                                {empleado.nombre}
                            </option>
                        ))}
                    </select>
                    <label>Area:</label>
                    <select className='select-form' value={area} onChange={(e)=>setArea(e.target.value)} disabled={idEmpleado !== ''}>
                        <option value="" >Elija un area</option>
                        {areas.map(areaItem =>(
                            <option key={areaItem.area} value={areaItem.area}>
                                {areaItem.area}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Asignar</button>
                </form>
            </div>
        ):(
            <div>{error}</div>
        )}
        </div>
    );
}

export default AsignarObjetivo;