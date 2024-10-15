import React,{useState, useEffect} from "react";
import "../styles/Objetivo.css"
import { useUserContext} from "../UserProvider";
import { Navigate } from "react-router-dom";

function Objetivo(props){
    const user = useUserContext();
    /**
     *  const objetivo = {
        titulo: "Certificaciones",
        fecha: "12/09/2024",
        descripcion: "El proposito de este objetivo es plasmar si el usuario completo certificaciones.",
        valor: "50%"

    } 
     */

    const [redireccion,setRedireccion]= useState(false);

 
    if(redireccion){
        return <Navigate to={`/objetivo-empleado/${props.objetivo.idObjetivoEmpleado}/${props.empleado}/${props.objetivo.idObjetivo}`} />
    }
    return (

        <div className="contenedor-objetivo">
            <h2>{props.objetivo.titulo}</h2>
            <p>Descripcion: {props.objetivo.descripcion}</p>
            <p>Fecha de incicio: {props.objetivo.fechaInicio}</p>
            <p>Fecha Final: {props.objetivo.fechaFinal}</p>
            <p>Fue asignado el: {props.objetivo.fechaAsignacion}</p>
            <p>Peso: </p>
            <progress id="progreso "value={props.objetivo.peso} max="100"></progress>
            <label htmlFor="progreso"> {props.objetivo.peso}%</label>
            <br></br>
            {
                user && user.rol === 'admin' ? (
                    <button onClick={()=>{setRedireccion(true)}}>Ver mas detalles</button>
                ) : (
                    <></>
                )
            }
            
        </div>
    );

}

export default Objetivo;