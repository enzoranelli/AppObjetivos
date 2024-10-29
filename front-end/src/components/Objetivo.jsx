import React,{useState, useEffect} from "react";
import "../styles/Objetivo.css"
import { useUserContext} from "../UserProvider.jsx";
import { Navigate } from "react-router-dom";

function Objetivo(props){
    const {user} = useUserContext();
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
            <p>Descripcion:<b> {props.objetivo.descripcion}</b></p>
            <p>Fecha de incicio: <b>{props.objetivo.fechaInicio}</b></p>
            <p>Fecha Final: <b>{props.objetivo.fechaFinal}</b></p>
            <p>Fue asignado el: <b>{props.objetivo.fechaAsignacion}</b></p>
            <div className="contenedor-progreso">
                <p style={{margin:0}}>Peso: </p>
                <progress id="progreso "value={props.objetivo.peso} max="100" className="no-print"></progress>
                <label htmlFor="progreso"> <b>{props.objetivo.peso}%</b></label>
            </div>
            <br></br>
            {
                user && user.rol === 'admin' ? (
                    <button onClick={()=>{setRedireccion(true)}} className="no-print">Ver mas detalles</button>
                ) : (
                    <></>
                )
            }
            
        </div>
    );

}

export default Objetivo;